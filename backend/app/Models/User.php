<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Subscription;
use App\Models\Cv;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'otp',
        'otp_expires_at',
        'is_verified',
        'role',
        'google_id',
        'telegram_chat_id',
        'telegram_notifications',
    ];



    protected $hidden = [
        'password',
        'remember_token',
        'otp',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'otp_expires_at' => 'datetime',
            'is_verified' => 'boolean',
            'telegram_notifications' => 'boolean',
            'password' => 'hashed',
        ];
    }
    public function company()
    {
        return $this->hasOne(Company::class);
    }
    public function subscriptions()
    {
        return $this->hasMany(Subscription::class);
    }
    public function cvs()
    {
        return $this->hasMany(Cv::class);
    }
    public function applications()
    {
        return $this->hasMany(JobApplication::class);
    }
    public function savedJobs()
    {
        return $this->hasMany(SavedJob::class);
    }
    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }
    public function cvViews()
    {
        return $this->hasMany(RecruiterCvView::class);
    }
}
