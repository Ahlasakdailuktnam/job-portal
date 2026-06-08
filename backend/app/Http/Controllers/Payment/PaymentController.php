<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Models\Subscription;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'subscription_id' => 'required|exists:subscriptions,id',
        ]);

        $subscription = Subscription::findOrFail(
            $validated['subscription_id']
        );

        $payment = Payment::create([
            'subscription_id' => $subscription->id,
            'amount' => $subscription->price,
            'status' => 'pending',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Payment created successfully',
            'data' => $payment
        ]);
    }

    public function show($id)
    {
        $payment = Payment::with('subscription')
            ->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $payment
        ]);
    }
}