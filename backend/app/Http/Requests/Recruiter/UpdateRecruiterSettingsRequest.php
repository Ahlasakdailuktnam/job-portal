<?php

namespace App\Http\Requests\Recruiter;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRecruiterSettingsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'telegram_chat_id' => 'nullable|string|max:255',
            'telegram_notifications' => 'sometimes|boolean',
        ];
    }
}
