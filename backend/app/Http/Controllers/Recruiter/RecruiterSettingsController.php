<?php

namespace App\Http\Controllers\Recruiter;

use App\Http\Controllers\Controller;
use App\Http\Requests\Recruiter\UpdateRecruiterSettingsRequest;

class RecruiterSettingsController extends Controller
{
    public function show()
    {
        $user = auth()->user();

        return response()->json([
            'success' => true,
            'data' => [
                'telegram_chat_id' => $user->telegram_chat_id,
                'telegram_notifications' => $user->telegram_notifications,
            ],
        ]);
    }

    public function update(UpdateRecruiterSettingsRequest $request)
    {
        $user = auth()->user();
        $user->update($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Recruiter settings updated successfully',
            'data' => [
                'telegram_chat_id' => $user->telegram_chat_id,
                'telegram_notifications' => $user->telegram_notifications,
            ],
        ]);
    }
}
