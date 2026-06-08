<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    protected $fillable = [
        'name',
        'price',
        'job_limit',
        'featured_job',
        'cv_access',
        'duration_days',
        'status',
    ];
    public function subscriptions()
{
    return $this->hasMany(Subscription::class);
}
}