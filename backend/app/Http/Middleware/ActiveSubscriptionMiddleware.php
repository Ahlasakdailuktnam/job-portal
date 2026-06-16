<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ActiveSubscriptionMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
     public function handle(Request $request, Closure $next)
    {
        $subscription = $request->user()
            ->subscriptions()
            ->where('status', 'active')
            ->latest()
            ->first();

        if (
            !$subscription ||
            !$subscription->end_date ||
            $subscription->end_date < now()
        ) {
            return response()->json([
                'success' => false,
                'message' => 'Subscription expired'
            ], 403);
        }

        return $next($request);
    }
}
