<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Models\Plan;
use App\Models\Subscription;
use App\Models\User;
use App\Services\KhqrService;
use App\Services\TelegramService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PaymentController extends Controller
{
    private const TRANSACTION_PREFIX = 'SUB';

    public function store(Request $request)
    {
        $validated = $request->validate([
            'plan_id' => 'required_without:subscription_id|exists:plans,id',
            'subscription_id' => 'required_without:plan_id|exists:subscriptions,id',
        ]);

        $subscription = null;
        $plan = null;

        if (isset($validated['subscription_id'])) {
            $subscription = Subscription::where(
                'id',
                $validated['subscription_id']
            )
            ->where(
                'user_id',
                auth()->id()
            )
            ->firstOrFail();

            $plan = $subscription->plan;
        } else {
            $plan = Plan::findOrFail($validated['plan_id']);
        }

        // Prevent creating payment for active subscription
        if (
            $subscription?->status === 'active' ||
            Subscription::where('user_id', auth()->id())
                ->where('status', 'active')
                ->exists()
        ) {
            return response()->json([
                'success' => false,
                'message' => 'Subscription is already active'
            ], 400);
        }

        $transactionId = $this->makeTransactionId(
            auth()->id(),
            $plan->id,
            $subscription?->id
        );

        $khqr = new KhqrService();

        $checkoutUrl = $khqr->generateCheckoutUrl(
            $transactionId,
            (float) ($subscription?->price ?? $plan->price),
            'Subscription Payment'
        );

        return response()->json([
            'success' => true,
            'message' => 'Payment checkout created successfully',
            'payment' => [
                'subscription_id' => $subscription?->id,
                'plan_id' => $plan->id,
                'amount' => $subscription?->price ?? $plan->price,
                'transaction_id' => $transactionId,
                'status' => 'pending',
            ],
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
        ])
            ->where('transaction_id', $id)
            ->when(ctype_digit((string) $id), function ($query) use ($id) {
                $query->orWhere('id', (int) $id);
            })
            ->first();

        if ($payment) {
            if ($payment->subscription->user_id !== auth()->id()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized'
                ], 403);
            }

            if ($payment->status === 'paid') {
                return response()->json([
                    'success' => true,
                    'payment' => $payment,
                    'subscription' => $payment->subscription,
                ]);
            }
        }

        $transactionId = $payment?->transaction_id ?? $id;
        $context = $payment
            ? [
                'subscription' => $payment->subscription,
                'user' => $payment->subscription->user,
                'plan' => $payment->subscription->plan,
            ]
            : $this->paymentContextFromTransaction($transactionId);

        if (!$context) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid transaction'
            ], 404);
        }

        if ($context['user']->id !== auth()->id()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 403);
        }

        if ($context['subscription']?->status === 'active') {
            return response()->json([
                'success' => true,
                'payment' => Payment::where('transaction_id', $id)->first(),
                'subscription' => $context['subscription'],
            ]);
        }

        $khqr = new KhqrService();

        $result = $khqr->checkTransaction(
            $transactionId
        );

        if (
            isset($result['data']['status']) &&
            $result['data']['status'] === 'success'
        ) {
            $payment = $this->recordPaidPayment(
                $context,
                $transactionId,
                $result
            );
        }

        return response()->json([
            'success' => true,
            'khqr_response' => $result,
            'payment' => $payment?->fresh(),
            'subscription' => $payment?->subscription?->fresh(),
        ]);
    }

    public function callback(Request $request)
    {
        $transactionId = $request->input(
            'transaction_id',
            $request->input('tran_id')
        );

        if (!$transactionId) {
            return response()->json([
                'success' => false,
                'message' => 'Transaction id is required'
            ], 400);
        }

        $context = $this->paymentContextFromTransaction($transactionId);

        if (!$context) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid transaction'
            ], 404);
        }

        $khqr = new KhqrService();

        $result = $khqr->checkTransaction($transactionId);

        if (
            !isset($result['data']['status']) ||
            $result['data']['status'] !== 'success'
        ) {
            return response()->json([
                'success' => false,
                'message' => 'Payment is not confirmed',
                'khqr_response' => $result,
            ], 400);
        }

        $payment = $this->recordPaidPayment(
            $context,
            $transactionId,
            $result
        );

        return response()->json([
            'success' => true,
            'message' => 'Payment confirmed',
            'payment' => $payment,
            'subscription' => $payment->subscription->fresh(),
        ]);
    }

    private function makeTransactionId(
        int $userId,
        int $planId,
        ?int $subscriptionId = null
    ): string
    {
        $parts = [
            self::TRANSACTION_PREFIX,
            $userId,
            $planId,
            now()->timestamp,
            Str::upper(Str::random(8)),
        ];

        if ($subscriptionId) {
            $parts[] = $subscriptionId;
        }

        return implode('_', $parts);
    }

    private function paymentContextFromTransaction(string $transactionId): ?array
    {
        $parts = explode('_', $transactionId);

        if (
            $parts[0] !== self::TRANSACTION_PREFIX ||
            count($parts) < 4
        ) {
            return null;
        }

        if (
            count($parts) >= 5 &&
            ctype_digit($parts[1]) &&
            ctype_digit($parts[2])
        ) {
            $user = User::find((int) $parts[1]);
            $plan = Plan::find((int) $parts[2]);
            $subscription = null;

            if (isset($parts[5]) && ctype_digit($parts[5])) {
                $subscription = Subscription::with([
                    'plan',
                    'user'
                ])->find((int) $parts[5]);
            }

            if (!$user || !$plan) {
                return null;
            }

            return [
                'user' => $user,
                'plan' => $subscription?->plan ?? $plan,
                'subscription' => $subscription,
            ];
        }

        if (!ctype_digit($parts[1])) {
            return null;
        }

        $subscription = Subscription::with([
            'plan',
            'user'
        ])->find((int) $parts[1]);

        if (!$subscription) {
            return null;
        }

        return [
            'user' => $subscription->user,
            'plan' => $subscription->plan,
            'subscription' => $subscription,
        ];
    }

    private function recordPaidPayment(
        array $context,
        string $transactionId,
        array $khqrResult
    ): Payment {
        $user = $context['user'];
        $plan = $context['plan'];
        $subscription = $context['subscription'];
        $paidAmount = data_get($khqrResult, 'data.amount');

        if (
            number_format((float) $paidAmount, 2, '.', '') !==
            number_format((float) ($subscription?->price ?? $plan->price), 2, '.', '')
        ) {
            abort(400, 'Amount mismatch');
        }

        $shouldNotify = false;

        return DB::transaction(function () use (
            $user,
            $plan,
            $subscription,
            $transactionId,
            &$shouldNotify
        ) {
            $payment = Payment::where('transaction_id', $transactionId)
                ->lockForUpdate()
                ->first();

            if ($payment?->subscription) {
                $subscription = $payment->subscription;
            }

            if (!$payment) {
                $payment = new Payment([
                    'transaction_id' => $transactionId,
                ]);
            }

            if (!$payment->exists || $payment->status !== 'paid') {
                $shouldNotify = true;
            }

            if (!$subscription) {
                $subscription = Subscription::create([
                    'user_id' => $user->id,
                    'plan_id' => $plan->id,
                    'price' => $plan->price,
                    'status' => 'active',
                    'start_date' => now(),
                    'end_date' => now()->addDays($plan->duration_days),
                ]);
            }

            if ($subscription->status !== 'active') {
                $subscription->update([
                    'status' => 'active',
                    'start_date' => now(),
                    'end_date' => now()->addDays(
                        $subscription->plan->duration_days
                    ),
                ]);

                $user = $subscription->user;
            }

            $payment->fill([
                'subscription_id' => $subscription->id,
                'amount' => $subscription->price,
                'payment_method' => 'bakong',
                'status' => 'paid',
                'paid_at' => $payment->paid_at ?? now(),
            ]);
            $payment->save();

            if (
                $user &&
                $user->role === 'user'
            ) {
                $user->update([
                    'role' => 'recruiter'
                ]);
            }

            $freshPayment = $payment->fresh([
                'subscription.plan',
                'subscription.user',
            ]);

            if ($shouldNotify) {
                TelegramService::send(
                    env('TELEGRAM_ADMIN_CHAT_ID'),
                    "Paid Subscription\n\n"
                        . "User: " . $freshPayment->subscription->user->name . "\n"
                        . "Plan: " . $freshPayment->subscription->plan->name . "\n"
                        . "Price: $" . $freshPayment->amount . "\n"
                        . "Transaction: " . $freshPayment->transaction_id
                );
            }

            return $freshPayment;
        });
    }
}
