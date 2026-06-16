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
        $job = Job::where(
            'status',
            'active'
        )->findOrFail($jobId);
        $exists = SavedJob::where(
            'user_id',
            auth()->id()
        )
            ->where(
                'job_id',
                $jobId
            )
            ->exists();

        if ($exists) {
            return response()->json([
                'success' => false,
                'message' => 'Job already saved'
            ], 400);
        }

        $savedJob = SavedJob::create([
            'user_id' => auth()->id(),
            'job_id' => $jobId
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Job saved successfully',
            'data' => $savedJob
        ]);
    }
    public function unsaveJob($jobId)
    {
        $savedJob = SavedJob::where(
            'user_id',
            auth()->id()
        )
            ->where(
                'job_id',
                $jobId
            )
            ->first();

        if (!$savedJob) {
            return response()->json([
                'success' => false,
                'message' => 'Saved job not found'
            ], 404);
        }

        $savedJob->delete();

        return response()->json([
            'success' => true,
            'message' => 'Job removed from saved list'
        ]);
    }
    public function mySavedJobs()
    {
        $jobs = SavedJob::with([
            'job.company'
        ])
            ->where(
                'user_id',
                auth()->id()
            )
            ->latest()
            ->paginate(10);

        return response()->json([
            'success' => true,
            'data' => $jobs
        ]);
    }
}
