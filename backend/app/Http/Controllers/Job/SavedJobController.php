<?php

namespace App\Http\Controllers\Job;

use App\Http\Controllers\Controller;
use App\Models\Job;
use App\Models\SavedJob;
use Illuminate\Http\Request;

class SavedJobController extends Controller
{
    public function saveJob($jobId)
    {
        $userId = auth()->id();

        // Check job exists and is active
        Job::where('status', 'active')->findOrFail($jobId);

        // Prevent duplicate saved jobs
        if (
            SavedJob::where('user_id', $userId)
                ->where('job_id', $jobId)
                ->exists()
        ) {
            return response()->json([
                'success' => false,
                'message' => 'Job already saved'
            ], 400);
        }

        $savedJob = SavedJob::create([
            'user_id' => $userId,
            'job_id' => $jobId,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Job saved successfully',
            'data' => $savedJob,
        ], 201);
    }

    
    public function unsaveJob($jobId)
    {
        $userId = auth()->id();

        $deleted = SavedJob::where('user_id', $userId)
            ->where('job_id', $jobId)
            ->delete();

        if (!$deleted) {
            return response()->json([
                'success' => false,
                'message' => 'Saved job not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Job removed from saved list'
        ]);
    }

   
    public function mySavedJobs()
    {
        $userId = auth()->id();

        $savedJobs = SavedJob::with([
            'job.company',
            'job.category'
        ])
            ->where('user_id', $userId)
            ->latest()
            ->paginate(10);

        return response()->json([
            'success' => true,
            'data' => $savedJobs
        ]);
    }
}