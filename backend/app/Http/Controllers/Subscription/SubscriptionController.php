<?php

namespace App\Http\Controllers\Subscription;

use App\Http\Controllers\Controller;
use App\Models\Plan;
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
        $validated = $request->validate([
            'plan_id' => 'required|exists:plans,id',
        ]);

        $plan = Plan::findOrFail($validated['plan_id']);

        $subscription = Subscription::create([
            'user_id' => auth()->id(),
            'plan_id' => $plan->id,
            'price' => $plan->price,
            'status' => 'pending',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Subscription created successfully',
            'data' => $subscription
        ], 201);
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

        $subscription->update($validated);

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