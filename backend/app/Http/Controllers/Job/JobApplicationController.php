<?php

namespace App\Http\Controllers\Job;

use App\Http\Controllers\Controller;
use App\Models\Cv;
use App\Models\Job;
use App\Models\JobApplication;
use App\Models\Notification;
use App\Models\RecruiterCvView;
use App\Services\TelegramService;
use Illuminate\Http\Request;

class JobApplicationController extends Controller
{
    // APPLY JOB
    public function apply(Request $request, $jobId)
    {
        $job = Job::findOrFail($jobId);

        // Job must be active
        if ($job->status !== 'active') {
            return response()->json([
                'success' => false,
                'message' => 'This job is not available'
            ], 400);
        }

        $validated = $request->validate([
            'cv_id' => 'required|exists:cvs,id',
            'cover_letter' => 'nullable|string'
        ]);

        // Check CV ownership
        $cv = Cv::where(
            'id',
            $validated['cv_id']
        )
            ->where(
                'user_id',
                auth()->id()
            )
            ->first();

        if (!$cv) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid CV'
            ], 403);
        }

        // Prevent duplicate apply
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

        $recruiter = $job->company?->user;

        if (
            $recruiter?->telegram_notifications &&
            $recruiter?->telegram_chat_id
        ) {
            TelegramService::send(
                $recruiter->telegram_chat_id,
                "New application received\n\nJob: {$job->title}"
            );
        }

        return response()->json([
            'success' => true,
            'message' => 'Applied successfully',
            'data' => $application
        ], 201);
    }

    // MY APPLICATIONS
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
    public function companyApplications()
    {
        $company = auth()->user()->company;

        $applications = JobApplication::with([
            'user',
            'cv',
            'job'
        ])
            ->whereHas('job', function ($query) use ($company) {
                $query->where(
                    'company_id',
                    $company->id
                );
            })
            ->latest()
            ->paginate(10);

        if (!$this->hasActiveSubscription()) {
            $applications->getCollection()->transform(function ($application) {
                return $this->hideCandidateContact($application);
            });
        }

        return response()->json([
            'success' => true,
            'data' => $applications
        ]);
    }
    public function show($id)
    {
        $company = auth()->user()->company;

        $application = JobApplication::with([
            'user',
            'job',
            'cv.educations',
            'cv.experiences',
            'cv.skills'
        ])
            ->whereHas('job', function ($query) use ($company) {
                $query->where(
                    'company_id',
                    $company->id
                );
            })
            ->find($id);

        if (!$application) {
            return response()->json([
                'success' => false,
                'message' => 'Application not found'
            ], 404);
        }

        if (!$this->hasActiveSubscription()) {
            $application = $this->hideCandidateContact($application);
        }

        $subscription = auth()->user()
            ->subscriptions()
            ->with('plan')
            ->where('status', 'active')
            ->latest()
            ->first();

        if ($subscription) {

            $alreadyViewed = RecruiterCvView::where(
                'user_id',
                auth()->id()
            )
                ->where(
                    'cv_id',
                    $application->cv_id
                )
                ->exists();

            if (!$alreadyViewed) {

                $usedViews = RecruiterCvView::where(
                    'user_id',
                    auth()->id()
                )->count();

                $limit = $subscription->plan->cv_access;

                if (
                    $limit != -1 &&
                    $usedViews >= $limit
                ) {
                    return response()->json([
                        'success' => false,
                        'message' => 'CV view limit reached'
                    ], 403);
                }

                RecruiterCvView::create([
                    'user_id' => auth()->id(),
                    'cv_id' => $application->cv_id
                ]);
            }
        }
        return response()->json([
            'success' => true,
            'data' => $application
        ]);
    }
    public function updateStatus(Request $request, $id)
    {
        $company = auth()->user()->company;

        $validated = $request->validate([
            'status' => 'required|in:accepted,rejected'
        ]);

        $application = JobApplication::whereHas(
            'job',
            function ($query) use ($company) {
                $query->where(
                    'company_id',
                    $company->id
                );
            }
        )->find($id);

        if (!$application) {
            return response()->json([
                'success' => false,
                'message' => 'Application not found'
            ], 404);
        }

        if ($application->status !== 'pending') {
            return response()->json([
                'success' => false,
                'message' => 'Application already processed'
            ], 400);
        }

        $application->update([
            'status' => $validated['status']
        ]);
        Notification::create([
            'user_id' => $application->user_id,
            'title' => 'Application Update',
            'message' => 'Your application has been ' . $validated['status']
        ]);

        $application->load('job.company.user');
        $recruiter = $application->job->company->user;

        if (
            $recruiter?->telegram_notifications &&
            $recruiter?->telegram_chat_id
        ) {
            TelegramService::send(
                $recruiter->telegram_chat_id,
                "Application status updated\n\nStatus: {$validated['status']}"
            );
        }

        return response()->json([
            'success' => true,
            'message' => 'Application status updated successfully',
            'data' => $application
        ]);
    }

    private function hasActiveSubscription(): bool
    {
        return auth()->user()
            ->subscriptions()
            ->where('status', 'active')
            ->whereNotNull('end_date')
            ->where('end_date', '>=', now())
            ->exists();
    }

    private function hideCandidateContact(JobApplication $application): JobApplication
    {
        if ($application->relationLoaded('user') && $application->user) {
            $application->user->makeHidden([
                'email',
            ]);
        }

        if ($application->relationLoaded('cv') && $application->cv) {
            $application->cv->makeHidden([
                'phone',
                'address',
                'linkedin',
                'telegram',
                'cv_file',
            ]);
        }

        return $application;
    }
}
