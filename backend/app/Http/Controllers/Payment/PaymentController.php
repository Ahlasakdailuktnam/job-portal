<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Models\Subscription;
use App\Services\KhqrService;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'subscription_id' => 'required|exists:subscriptions,id',
        ]);

        $subscription = Subscription::where(
            'id',
            $validated['subscription_id']
        )
        ->where(
            'user_id',
            auth()->id()
        )
        ->firstOrFail();

        // Prevent creating payment for active subscription
        if ($subscription->status === 'active') {
            return response()->json([
                'success' => false,
                'message' => 'Subscription is already active'
            ], 400);
        }

        $transactionId = 'SUB_' . time();

        $payment = Payment::create([
            'subscription_id' => $subscription->id,
            'amount' => $subscription->price,
            'transaction_id' => $transactionId,
            'status' => 'pending',
        ]);

        $khqr = new KhqrService();

        $checkoutUrl = $khqr->generateCheckoutUrl(
            $transactionId,
            (float) $payment->amount,
            'Subscription Payment'
        );

        return response()->json([
            'success' => true,
            'message' => 'Payment created successfully',
            'payment' => $payment,
            'checkout_url' => $checkoutUrl,
        ]);
    }

    public function show($id)
    {
        $payment = Payment::with('subscription')
            ->findOrFail($id);

        if (
            $payment->subscription->user_id !== auth()->id()
        ) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 403);
        }

        return response()->json([
            'success' => true,
            'data' => $payment
        ]);
    }

    public function checkPayment($id)
    {
        $payment = Payment::with([
            'subscription.plan',
            'subscription.user'
        ])->findOrFail($id);

        // Ownership Check
        if (
            $payment->subscription->user_id !== auth()->id()
        ) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 403);
        }

        $khqr = new KhqrService();

        $result = $khqr->checkTransaction(
            $payment->transaction_id
        );

        if (
            isset($result['data']['status']) &&
            $result['data']['status'] === 'success'
        ) {

            // Verify Amount
            $paidAmount = (float) $result['data']['amount'];

            if (
                $paidAmount !== (float) $payment->amount
            ) {
                return response()->json([
                    'success' => false,
                    'message' => 'Amount mismatch'
                ], 400);
            }

            // Prevent double update
            if ($payment->status !== 'paid') {

                $payment->update([
                    'status' => 'paid',
                    'payment_method' => 'bakong',
                    'paid_at' => now(),
                ]);

                $subscription = $payment->subscription;

                if ($subscription->status !== 'active') {

                    $subscription->update([
                        'status' => 'active',
                        'start_date' => now(),
                        'end_date' => now()->addDays(
                            $subscription->plan->duration_days
                        ),
                    ]);

                    $user = $subscription->user;

                    if (
                        $user &&
                        $user->role === 'user'
                    ) {
                        $user->update([
                            'role' => 'recruiter'
                        ]);
                    }
                }
            }
        }

        return response()->json([
            'success' => true,
            'khqr_response' => $result,
            'payment' => $payment->fresh(),
            'subscription' => $payment->subscription->fresh(),
        ]);
    }
}