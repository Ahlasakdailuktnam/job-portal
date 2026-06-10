<?php

namespace App\Http\Controllers\Job;

use App\Http\Controllers\Controller;
use App\Models\Job;
use Illuminate\Http\Request;

class JobController extends Controller
{
    // CREATE JOB
    public function store(Request $request)
    {
        $user = auth()->user();

        // Check role
        if ($user->role !== 'recruiter') {
            return response()->json([
                'success' => false,
                'message' => 'Only recruiters can create jobs'
            ], 403);
        }

        // Check company
        $company = $user->company;

        if (!$company) {
            return response()->json([
                'success' => false,
                'message' => 'Please create company first'
            ], 403);
        }

        // Check active subscription
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

        // Check job limit
        $currentJobs = $company->jobs()->count();

        if ($currentJobs >= $subscription->plan->job_limit) {
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
            'status' => 'required|in:draft,active,closed',
        ]);

        $job = $company->jobs()->create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Job created successfully',
            'data' => $job
        ], 201);
    }

    // GET ALL JOBS
    public function index()
    {
        $jobs = Job::with([
            'company',
            'category'
        ])->latest()->get();

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
        ])->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $job
        ]);
    }

    // UPDATE JOB
    public function update(Request $request, $id)
    {
        $company = auth()->user()->company;

        if (!$company) {
            return response()->json([
                'success' => false,
                'message' => 'Company not found'
            ], 403);
        }

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
            'status' => 'nullable|in:draft,active,closed',
        ]);

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

        if (!$company) {
            return response()->json([
                'success' => false,
                'message' => 'Company not found'
            ], 403);
        }

        $job = Job::where('id', $id)
            ->where('company_id', $company->id)
            ->firstOrFail();

        $job->delete();

        return response()->json([
            'success' => true,
            'message' => 'Job deleted successfully'
        ]);
    }
}