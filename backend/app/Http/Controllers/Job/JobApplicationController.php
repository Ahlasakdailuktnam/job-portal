<?php

namespace App\Http\Controllers\Job;

use App\Http\Controllers\Controller;
use App\Models\Cv;
use App\Models\Job;
use App\Models\JobApplication;
use Illuminate\Http\Request;

class JobApplicationController extends Controller
{
    public function apply(Request $request, $jobId)
    {
        $job = Job::findOrFail($jobId);

        $validated = $request->validate([
            'cv_id' => 'required|exists:cvs,id',
            'cover_letter' => 'nullable|string'
        ]);

        $alreadyApplied = JobApplication::where(
            'job_id',
            $job->id
        )
            ->where(
                'user_id',
                auth()->id()
            )
            ->exists();

        if ($alreadyApplied) {
            return response()->json([
                'success' => false,
                'message' => 'You already applied for this job'
            ], 400);
        }

        $application = JobApplication::create([
            'job_id' => $job->id,
            'user_id' => auth()->id(),
            'cv_id' => $validated['cv_id'],
            'cover_letter' => $validated['cover_letter'] ?? null,
            'status' => 'pending',
            'applied_at' => now()
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Applied successfully',
            'data' => $application
        ], 201);
    }
    public function myApplications()
    {
        $applications = auth()->user()
            ->applications()
            ->with([
                'job.company',
                'cv'
            ])
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'data' => $applications
        ]);
    }
}
