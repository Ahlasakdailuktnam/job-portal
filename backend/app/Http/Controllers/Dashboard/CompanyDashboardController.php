<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Job;
use App\Models\JobApplication;
use App\Models\RecruiterCvView;

class CompanyDashboardController extends Controller
{
    public function dashboard()
    {
        $company = auth()->user()->company;

        $totalJobs = Job::where(
            'company_id',
            $company->id
        )->count();

        $activeJobs = Job::where(
            'company_id',
            $company->id
        )
            ->where(
                'status',
                'active'
            )
            ->count();

        $inactiveJobs = Job::where(
            'company_id',
            $company->id
        )
            ->where(
                'status',
                '!=',
                'active'
            )
            ->count();

        $totalApplications = JobApplication::whereHas(
            'job',
            function ($query) use ($company) {
                $query->where(
                    'company_id',
                    $company->id
                );
            }
        )->count();

        $pendingApplications = JobApplication::whereHas(
            'job',
            function ($query) use ($company) {
                $query->where(
                    'company_id',
                    $company->id
                );
            }
        )
            ->where(
                'status',
                'pending'
            )
            ->count();

        $acceptedApplications = JobApplication::whereHas(
            'job',
            function ($query) use ($company) {
                $query->where(
                    'company_id',
                    $company->id
                );
            }
        )
            ->where(
                'status',
                'accepted'
            )
            ->count();

        $rejectedApplications = JobApplication::whereHas(
            'job',
            function ($query) use ($company) {
                $query->where(
                    'company_id',
                    $company->id
                );
            }
        )
            ->where(
                'status',
                'rejected'
            )
            ->count();
        $subscription = auth()->user()
            ->subscriptions()
            ->with('plan')
            ->where('status', 'active')
            ->latest()
            ->first();
        return response()->json([

            'success' => true,
            'data' => [
                'total_jobs' => $totalJobs,
                'active_jobs' => $activeJobs,
                'inactive_jobs' => $inactiveJobs,
                'total_applications' => $totalApplications,
                'pending_applications' => $pendingApplications,
                'accepted_applications' => $acceptedApplications,
                'rejected_applications' => $rejectedApplications,
                'cv_limit' => $subscription?->plan?->cv_access,
                'cv_used' => RecruiterCvView::where(
                    'user_id',
                    auth()->id()
                )->count(),
            ],
            'subscription' => [
                'active' => $subscription ? true : false,
                'plan_name' => $subscription?->plan?->name,
                'expires_at' => $subscription?->end_date,
                'job_limit' => $subscription?->plan?->job_limit,
                'remaining_slots' => $subscription
                    ? ($subscription->plan->job_limit == -1
                        ? 'Unlimited'
                        : max(
                            0,
                            $subscription->plan->job_limit - $totalJobs
                        ))
                    : 0
            ]
        ]);
    }
}
