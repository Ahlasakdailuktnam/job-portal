<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cv extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'phone',
        'address',
        'linkedin',
        'telegram',
        'summary',
        'profile_image',
        'cv_file',
        "template",
        'source',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function educations()
    {
        return $this->hasMany(Education::class);
    }

    public function experiences()
    {
        return $this->hasMany(Experience::class);
    }

    public function skills()
    {
        return $this->hasMany(Skill::class);
    }
    public function applications()
    {
        return $this->hasMany(JobApplication::class);
    }
}
