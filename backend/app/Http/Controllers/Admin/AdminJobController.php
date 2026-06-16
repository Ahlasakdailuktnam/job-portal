<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Job;
use App\Models\Notification;
use Illuminate\Http\Request;

class AdminJobController extends Controller
{
    // GET ALL PENDING JOBS
    public function pendingJobs()
    {
        $jobs = Job::with([
            'company',
            'category'
        ])
        ->where('status', 'pending')
        ->latest()
        ->paginate(10);

        return response()->json([
            'success' => true,
            'data' => $jobs
        ]);
    }

    // APPROVE JOB
    public function approveJob($id)
    {
        $job = Job::with('company.user')
            ->findOrFail($id);

        if ($job->status !== 'pending') {
            return response()->json([
                'success' => false,
                'message' => 'Job already processed'
            ], 400);
        }

        $job->update([
            'status' => 'active'
        ]);

        // Notification
        Notification::create([
            'user_id' => $job->company->user_id,
            'title' => 'Job Approved',
            'message' => "Your job '{$job->title}' has been approved"
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Job approved successfully',
            'data' => $job->fresh()
        ]);
    }

    // REJECT JOB
    public function rejectJob($id)
    {
        $job = Job::with('company.user')
            ->findOrFail($id);

        if ($job->status !== 'pending') {
            return response()->json([
                'success' => false,
                'message' => 'Job already processed'
            ], 400);
        }

        $job->update([
            'status' => 'rejected'
        ]);

        // Notification
        Notification::create([
            'user_id' => $job->company->user_id,
            'title' => 'Job Rejected',
            'message' => "Your job '{$job->title}' has been rejected"
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Job rejected successfully',
            'data' => $job->fresh()
        ]);
    }
}