<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Job;
use App\Models\Notification;
use App\Services\TelegramService;
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

        $recruiter = $job->company->user;

        if (
            $recruiter?->telegram_notifications &&
            $recruiter?->telegram_chat_id
        ) {
            TelegramService::send(
                $recruiter->telegram_chat_id,
                "Job approved\n\nJob: {$job->title}"
            );
        }

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

        $recruiter = $job->company->user;

        if (
            $recruiter?->telegram_notifications &&
            $recruiter?->telegram_chat_id
        ) {
            TelegramService::send(
                $recruiter->telegram_chat_id,
                "Job rejected\n\nJob: {$job->title}"
            );
        }

        return response()->json([
            'success' => true,
            'message' => 'Job rejected successfully',
            'data' => $job->fresh()
        ]);
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'company_id' => 'required|exists:companies,id',
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

        $validated['status'] = 'active';

        $job = Job::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Job created successfully',
            'data' => $job
        ], 201);
    }
}
