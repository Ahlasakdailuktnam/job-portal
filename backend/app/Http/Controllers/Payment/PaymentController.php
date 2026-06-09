<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Models\Subscription;
use App\Services\KhqrService;
use Carbon\Carbon;
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

        $transactionId = 'SUB_' . time();

        $payment = Payment::create([
            'subscription_id' => $subscription->id,
            'amount' => $subscription->price,
            'transaction_id' => $transactionId,
            'status' => 'pending',
        ]);

        $khqr = new KhqrService();

        $qrResponse = $khqr->generateQr(
            $transactionId,
            (float)$payment->amount,
            'Subscription Payment'
        );

        return response()->json([
            'success' => true,
            'message' => 'Payment created successfully',
            'payment' => $payment,
            'khqr' => $qrResponse
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
    public function checkPayment($id)
{
    $payment = Payment::with([
        'subscription.plan'
    ])->findOrFail($id);

    $khqr = new KhqrService();

    $result = $khqr->checkTransaction(
        $payment->transaction_id
    );

    if (
        isset($result['data']['status']) &&
        $result['data']['status'] === 'success'
    ) {

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
