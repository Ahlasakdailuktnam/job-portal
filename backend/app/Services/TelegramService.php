<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class TelegramService
{
    public static function send($chatId, $message)
    {
        try {
            Http::post(
                "https://api.telegram.org/bot"
                . env('TELEGRAM_BOT_TOKEN')
                . "/sendMessage",
                [
                    'chat_id' => $chatId,
                    'text' => $message,
                ]
            );
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
        }
    }
}