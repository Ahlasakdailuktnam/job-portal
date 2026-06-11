<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    protected $fillable = [
        'company_id',
        'category_id',
        'title',
        'description',
        'requirement',
        'responsibility',
        'salary_min',
        'salary_max',
        'job_type',
        'job_level',
        'experience',
        'qualification',
        'available_position',
        'language',
        'deadline',
        'status',
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function category()
    {
        return $this->belongsTo(JobCategory::class);
    }
    public function applications()
    {
        return $this->hasMany(JobApplication::class);
    }
}
