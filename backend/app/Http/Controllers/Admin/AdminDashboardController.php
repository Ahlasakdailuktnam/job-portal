<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\Job;
use App\Models\JobApplication;
use App\Models\Payment;
use App\Models\Subscription;
use App\Models\User;
use Carbon\Carbon;

class AdminDashboardController extends Controller
{
    public function dashboard()
    {
        $monthlyRevenue = collect(range(11, 0))
            ->map(function ($monthsAgo) {
                $date = Carbon::now()->startOfMonth()->subMonths($monthsAgo);
                $nextMonth = $date->copy()->addMonth();

                return [
                    'month' => $date->format('M'),
                    'month_number' => $date->format('m'),
                    'year' => $date->format('Y'),
                    'label' => $date->format('M Y'),
                    'revenue' => (float) Payment::where('status', 'paid')
                        ->where('paid_at', '>=', $date)
                        ->where('paid_at', '<', $nextMonth)
                        ->sum('amount'),
                    'payments' => Payment::where('status', 'paid')
                        ->where('paid_at', '>=', $date)
                        ->where('paid_at', '<', $nextMonth)
                        ->count(),
                ];
            });

        $currentMonthStart = Carbon::now()->startOfMonth();
        $nextMonthStart = $currentMonthStart->copy()->addMonth();
        $previousMonthStart = $currentMonthStart->copy()->subMonth();

        $currentMonthRevenue = (float) Payment::where('status', 'paid')
            ->where('paid_at', '>=', $currentMonthStart)
            ->where('paid_at', '<', $nextMonthStart)
            ->sum('amount');

        $previousMonthRevenue = (float) Payment::where('status', 'paid')
            ->where('paid_at', '>=', $previousMonthStart)
            ->where('paid_at', '<', $currentMonthStart)
            ->sum('amount');

        $monthlyRevenueChange = $previousMonthRevenue > 0
            ? round((($currentMonthRevenue - $previousMonthRevenue) / $previousMonthRevenue) * 100, 1)
            : ($currentMonthRevenue > 0 ? 100 : 0);

        return response()->json([
            'success' => true,
            'data' => [
                'total_users' => User::count(),
                'total_admins' => User::where(
                    'role',
                    'admin'
                )->count(),

                'total_recruiters' => User::where(
                    'role',
                    'recruiter'
                )->count(),

                'total_job_seekers' => User::where(
                    'role',
                    'job_seeker'
                )->count(),

                // Companies
                'total_companies' => Company::count(),

                // Jobs
                'total_jobs' => Job::count(),

                'pending_jobs' => Job::where(
                    'status',
                    'pending'
                )->count(),

                'active_jobs' => Job::where(
                    'status',
                    'active'
                )->count(),

                'rejected_jobs' => Job::where(
                    'status',
                    'rejected'
                )->count(),

                'closed_jobs' => Job::where(
                    'status',
                    'closed'
                )->count(),

                // Applications
                'total_applications' => JobApplication::count(),

                'pending_applications' => JobApplication::where(
                    'status',
                    'pending'
                )->count(),

                'accepted_applications' => JobApplication::where(
                    'status',
                    'accepted'
                )->count(),

                'rejected_applications' => JobApplication::where(
                    'status',
                    'rejected'
                )->count(),

                // Subscriptions
                'total_subscriptions' => Subscription::count(),

                'active_subscriptions' => Subscription::where(
                    'status',
                    'active'
                )->count(),

                'pending_subscriptions' => Subscription::where(
                    'status',
                    'pending'
                )->count(),

                'expired_subscriptions' => Subscription::where(
                    'status',
                    'expired'
                )->count(),

                'cancelled_subscriptions' => Subscription::where(
                    'status',
                    'cancelled'
                )->count(),

                // Payments
                'total_payments' => Payment::count(),

                'paid_payments' => Payment::where(
                    'status',
                    'paid'
                )->count(),

                'pending_payments' => Payment::where(
                    'status',
                    'pending'
                )->count(),

                'failed_payments' => Payment::where(
                    'status',
                    'failed'
                )->count(),

                // Revenue
                'total_revenue' => Payment::where(
                    'status',
                    'paid'
                )->sum('amount'),
                'current_month_revenue' => $currentMonthRevenue,
                'previous_month_revenue' => $previousMonthRevenue,
                'monthly_revenue_change' => $monthlyRevenueChange,
                'monthly_revenue' => $monthlyRevenue,
            ]
        ]);
    }
}
