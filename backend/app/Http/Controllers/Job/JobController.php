<?php

namespace App\Http\Controllers\Job;

use App\Http\Controllers\Controller;
use App\Models\Job;
use App\Services\TelegramService;
use Illuminate\Http\Request;

class JobController extends Controller
{
    // CREATE JOB
    public function store(Request $request)
    {
        $user = auth()->user();
        $company = $user->company;

        // Get active subscription for the plan job limit
        $subscription = $user->subscriptions()
            ->with('plan')
            ->where('status', 'active')
            ->latest()
            ->first();

        // Check job limit
        $currentJobs = $company->jobs()
            ->whereIn('status', [
                'pending',
                'active'
            ])
            ->count();
        $jobLimit = $subscription->plan->job_limit;

        if (
            $jobLimit != -1 &&
            $currentJobs >= $jobLimit
        ) {
            return response()->json([
                'success' => false,
                'message' => 'Job limit reached for your plan'
            ], 403);
        }

        $validated = $request->validate([
            'category_id' => 'required|exists:job_categories,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'requirement' => 'nullable|string',
            'responsibility' => 'nullable|string',
            'salary_min' => 'nullable|numeric',
            'salary_max' => 'nullable|numeric',
            'job_type' => 'required|in:full_time,part_time,remote,internship',
            'job_level' => 'nullable|string|max:100',
            'experience' => 'nullable|string|max:100',
            'qualification' => 'nullable|string|max:255',
            'available_position' => 'required|integer|min:1',
            'language' => 'nullable|string|max:255',
            'deadline' => 'required|date',

        ]);
        $validated['status'] = 'pending';
        $job = $company->jobs()->create($validated);
        TelegramService::send(
            env('TELEGRAM_ADMIN_CHAT_ID'),
            "📢 New Job Pending Approval\n\n"
                . "Company: " . $company->company_name . "\n"
                . "Job: " . $job->title
        );

        return response()->json([
            'success' => true,
            'message' => 'Job created successfully',
            'data' => $job
        ], 201);
    }

    // GET ALL JOBS
    public function index(Request $request)
    {
        $jobs = Job::with([
            'company',
            'category'
        ])
            ->where('status', 'active');

        // Search by title
        if ($request->filled('keyword')) {
            $jobs->where(
                'title',
                'like',
                '%' . $request->keyword . '%'
            );
        }

        // Filter by category
        if ($request->filled('category')) {
            $jobs->where(
                'category_id',
                $request->category
            );
        }

        // Filter by job type
        if ($request->filled('job_type')) {
            $jobs->where(
                'job_type',
                $request->job_type
            );
        }

        // Salary min
        if ($request->filled('salary_min')) {
            $jobs->where(
                'salary_min',
                '>=',
                $request->salary_min
            );
        }

        // Salary max
        if ($request->filled('salary_max')) {
            $jobs->where(
                'salary_max',
                '<=',
                $request->salary_max
            );
        }

        $jobs = $jobs
            ->latest()
            ->paginate(10);

        return response()->json([
            'success' => true,
            'data' => $jobs
        ]);
    }

    // GET SINGLE JOB
    public function show($id)
    {
        $job = Job::with([
            'company',
            'category'
        ])
            ->where('status', 'active')
            ->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $job
        ]);
    }

    public function myJobs(Request $request)
    {
        $company = auth()->user()->company;

        $jobs = $company->jobs()
            ->with('category')
            ->withCount('applications')
            ->when($request->filled('status'), function ($query) use ($request) {
                $query->where('status', $request->status);
            })
            ->latest()
            ->paginate($request->integer('per_page', 10));

        return response()->json([
            'success' => true,
            'data' => $jobs
        ]);
    }

    // UPDATE JOB
    public function update(Request $request, $id)
    {
        $company = auth()->user()->company;

        $job = Job::where('id', $id)
            ->where('company_id', $company->id)
            ->firstOrFail();

        $validated = $request->validate([
            'category_id' => 'sometimes|exists:job_categories,id',
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'requirement' => 'nullable|string',
            'responsibility' => 'nullable|string',
            'salary_min' => 'nullable|numeric',
            'salary_max' => 'nullable|numeric',
            'job_type' => 'sometimes|in:full_time,part_time,remote,internship',
            'job_level' => 'nullable|string|max:100',
            'experience' => 'nullable|string|max:100',
            'qualification' => 'nullable|string|max:255',
            'available_position' => 'nullable|integer|min:1',
            'language' => 'nullable|string|max:255',
            'deadline' => 'nullable|date',
        ]);
        $validated['status'] = 'pending';
        $job->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Job updated successfully',
            'data' => $job->fresh()
        ]);
    }

    // DELETE JOB
    public function destroy($id)
    {
        $company = auth()->user()->company;

        $job = Job::where('id', $id)
            ->where('company_id', $company->id)
            ->firstOrFail();

        $job->delete();

        return response()->json([
            'success' => true,
            'message' => 'Job deleted successfully'
        ]);
    }

    public function close($id)
    {
        $job = $this->findCompanyJob($id);

        if ($job->status === 'closed') {
            return response()->json([
                'success' => false,
                'message' => 'Job is already closed'
            ], 400);
        }

        $job->update([
            'status' => 'closed'
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Job closed successfully',
            'data' => $job->fresh()
        ]);
    }

    public function reopen($id)
    {
        $job = $this->findCompanyJob($id);

        if ($job->status === 'active') {
            return response()->json([
                'success' => false,
                'message' => 'Job is already active'
            ], 400);
        }

        $job->update([
            'status' => 'active'
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Job reopened successfully',
            'data' => $job->fresh()
        ]);
    }

    private function findCompanyJob($id): Job
    {
        $company = auth()->user()->company;

        return Job::where('id', $id)
            ->where('company_id', $company->id)
            ->firstOrFail();
    }
}
