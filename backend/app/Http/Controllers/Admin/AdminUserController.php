<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\User;
use Illuminate\Http\Request;

class AdminUserController extends Controller
{
    public function users(Request $request)
    {
        $users = User::query()
            ->when($request->filled('search'), function ($query) use ($request) {
                $query->where(function ($query) use ($request) {
                    $query->where('name', 'like', '%' . $request->search . '%')
                        ->orWhere('email', 'like', '%' . $request->search . '%');
                });
            })
            ->when($request->filled('role'), function ($query) use ($request) {
                $query->where('role', $request->role);
            })
            ->when($request->filled('is_verified'), function ($query) use ($request) {
                $query->where('is_verified', filter_var(
                    $request->is_verified,
                    FILTER_VALIDATE_BOOLEAN
                ));
            })
            ->latest()
            ->paginate($request->integer('per_page', 10));

        return response()->json([
            'success' => true,
            'data' => $users,
        ]);
    }

    public function recruiters(Request $request)
    {
        $recruiters = User::with([
            'company',
            'subscriptions.plan',
        ])
            ->where('role', 'recruiter')
            ->when($request->filled('search'), function ($query) use ($request) {
                $query->where(function ($query) use ($request) {
                    $query->where('name', 'like', '%' . $request->search . '%')
                        ->orWhere('email', 'like', '%' . $request->search . '%');
                });
            })
            ->when($request->filled('subscription_status'), function ($query) use ($request) {
                $query->whereHas('subscriptions', function ($query) use ($request) {
                    $query->where('status', $request->subscription_status);
                });
            })
            ->latest()
            ->paginate($request->integer('per_page', 10));

        return response()->json([
            'success' => true,
            'data' => $recruiters,
        ]);
    }

    public function companies(Request $request)
    {
        $companies = Company::with('user')
            ->withCount('jobs')
            ->when($request->filled('search'), function ($query) use ($request) {
                $query->where('company_name', 'like', '%' . $request->search . '%');
            })
            ->when($request->filled('user_id'), function ($query) use ($request) {
                $query->where('user_id', $request->user_id);
            })
            ->latest()
            ->paginate($request->integer('per_page', 10));

        return response()->json([
            'success' => true,
            'data' => $companies,
        ]);
    }
}
