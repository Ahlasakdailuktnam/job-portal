<?php

namespace App\Http\Controllers\Subscription;

use App\Http\Controllers\Controller;
use App\Models\Subscription;
use Illuminate\Http\Request;

class SubscriptionController extends Controller
{
    // GET ALL SUBSCRIPTIONS
    public function index()
    {
        $subscriptions = Subscription::with([
            'user',
            'plan'
        ])->latest()->get();

        return response()->json([
            'success' => true,
            'data' => $subscriptions
        ]);
    }

    // CREATE SUBSCRIPTION
    public function store(Request $request)
    {
        $request->validate([
            'plan_id' => 'required|exists:plans,id',
        ]);

        return response()->json([
            'success' => false,
            'message' => 'Start checkout with /payments. Subscription is saved only after payment is paid.',
        ], 400);
    }

    // GET SINGLE SUBSCRIPTION
    public function show($id)
    {
        $subscription = Subscription::with([
            'user',
            'plan'
        ])->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $subscription
        ]);
    }

    // UPDATE STATUS
    public function update(Request $request, $id)
    {
        $subscription = Subscription::findOrFail($id);

        $validated = $request->validate([
            'status' => 'required|in:pending,active,expired,cancelled',
        ]);

        if ($validated['status'] === 'active') {

            $subscription->update([
                'status' => 'active',
                'start_date' => now(),
                'end_date' => now()->addDays(
                    $subscription->plan->duration_days
                )
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Subscription updated successfully',
            'data' => $subscription
        ]);
    }

    // DELETE SUBSCRIPTION
    public function destroy($id)
    {
        $subscription = Subscription::findOrFail($id);

        $subscription->delete();

        return response()->json([
            'success' => true,
            'message' => 'Subscription deleted successfully'
        ]);
    }
}
