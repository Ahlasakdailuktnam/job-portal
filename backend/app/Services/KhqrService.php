<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class KhqrService
{
    public function generateQr(
        string $transactionId,
        float $amount,
        string $remark
    ) {

        $profileId = env('KHQR_PROFILE_ID');
        $secretKey = env('KHQR_SECRET_KEY');

        $successUrl = 'https://google.com';

        $hash = sha1(
            $secretKey .
            $transactionId .
            $amount .
            $successUrl .
            $remark
        );

        $url = "https://khqr.cc/api/{$profileId}/payment-gateway/v1/payments/qr-api";

        $response = Http::asForm()->post($url, [
            'transaction_id' => $transactionId,
            'amount' => $amount,
            'success_url' => $successUrl,
            'remark' => $remark,
            'hash' => $hash,
        ]);

        return [
            'status' => $response->status(),
            'body' => $response->body(),
            'json' => $response->json(),
        ];
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