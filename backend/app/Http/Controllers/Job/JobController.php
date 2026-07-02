<?php

namespace App\Http\Controllers\Job;

use App\Http\Controllers\Controller;
use App\Http\Requests\JobFilterRequest;
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

        if (!$company) {
            return response()->json([
                'success' => false,
                'message' => 'Company profile not found'
            ], 404);
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
            'status' => 'nullable|in:draft,pending,active,rejected,closed',
        ]);

        // Default = draft
        $validated['status'] = $request->input(
            'status',
            'draft'
        );


        if ($validated['status'] === 'pending') {

            $subscription = $user->subscriptions()
                ->with('plan')
                ->where('status', 'active')
                ->latest()
                ->first();

            if (!$subscription) {
                return response()->json([
                    'success' => false,
                    'message' => 'No active subscription found'
                ], 403);
            }

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
        }


        $job = $company->jobs()->create($validated);


        if ($validated['status'] === 'pending') {

            TelegramService::send(
                env('TELEGRAM_ADMIN_CHAT_ID'),
                "📢 New Job Pending Approval\n\n"
                    . "Company: {$company->company_name}\n"
                    . "Job: {$job->title}"
            );
        }

        return response()->json([
            'success' => true,
            'message' => $validated['status'] === 'draft'
                ? 'Draft saved successfully'
                : 'Job submitted successfully',
            'data' => $job->load([
                'company',
                'category'
            ])
        ], 201);
    }

    public function index(JobFilterRequest $request)
    {
        $jobs = Job::query()
            ->with(['company', 'category'])
            ->active()
            ->filter($request->validated())
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
    public function showMyJob($id)
    {
        $company = auth()->user()->company;

        $job = Job::with([
            'company',
            'category'
        ])
            ->where('company_id', $company->id)
            ->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $job
        ]);
    }
    public function myJobs(JobFilterRequest $request)
    {
        $company = auth()->user()->company;

        $jobs = $company->jobs()
            ->with('category')
            ->withCount('applications')
            ->filter($request->validated())
            ->latest()
            ->paginate(
                $request->integer('per_page', 10)
            );

        return response()->json([
            'success' => true,
            'data' => $jobs
        ]);
    }

    public function update(Request $request, $id)
    {
        $company = auth()->user()->company;

        $job = Job::where('id', $id)
            ->where('company_id', $company->id)
            ->firstOrFail();

        // Only draft and pending can be edited
        if (!in_array($job->status, ['draft', 'pending'])) {
            return response()->json([
                'success' => false,
                'message' => 'Only draft and pending jobs can be updated.'
            ], 403);
        }
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
            'status' => 'nullable|in:draft,pending,active,rejected,closed',
        ]);

        if ($request->has('status')) {
            $validated['status'] = $request->status;
        }

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
