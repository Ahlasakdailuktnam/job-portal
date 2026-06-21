<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class KhqrService
{
     public function generateCheckoutUrl(
        string $transactionId,
        float $amount,
        string $remark
    ): string {

        $profileId = env('KHQR_PROFILE_ID');
        $secretKey = env('KHQR_SECRET_KEY');

        $successUrl = rtrim(
            env('FRONTEND_URL', 'http://localhost:5173'),
            '/'
        ) . '/payment-success?' . http_build_query([
            'transaction_id' => $transactionId,
        ]);

        $formattedAmount = number_format($amount, 2, '.', '');

        $hash = sha1(
            $secretKey .
            $transactionId .
            $formattedAmount .
            $successUrl .
            $remark
        );

        return "https://khqr.cc/api/payment/request/{$profileId}?"
            . http_build_query([
                'transaction_id' => $transactionId,
                'amount' => $formattedAmount,
                'success_url' => $successUrl,
                'remark' => $remark,
                'hash' => $hash,
            ]);
    }
    public function checkTransaction(string $transactionId)
{
    $profileId = env('KHQR_PROFILE_ID');
    $secretKey = env('KHQR_SECRET_KEY');

    $hash = sha1(
        $secretKey .
        $transactionId
    );

    $url = "https://khqr.cc/api/{$profileId}/payment-gateway/v1/payments/check-transv2-khqrcc";

    $response = Http::asForm()->post($url, [
        'transaction_id' => $transactionId,
        'hash' => $hash,
    ]);

    return $response->json();
}
}
