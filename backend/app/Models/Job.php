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
    public function savedByUsers()
    {
        return $this->hasMany(SavedJob::class);
    }
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }
    public function scopeFilter($query, array $filters)
    {
        return $query
            ->when(
                $filters['keyword'] ?? null,
                fn($q, $keyword) =>
                $q->where('title', 'like', "%{$keyword}%")
            )

            ->when(
                $filters['category'] ?? null,
                fn($q, $category) =>
                $q->where('category_id', $category)
            )

            ->when(
                $filters['job_type'] ?? null,
                fn($q, $jobType) =>
                $q->where('job_type', $jobType)
            )

            ->when(
                $filters['job_level'] ?? null,
                fn($q, $jobLevel) =>
                $q->where('job_level', $jobLevel)
            )

            ->when(
                $filters['salary_min'] ?? null,
                fn($q, $salaryMin) =>
                $q->where('salary_min', '>=', $salaryMin)
            )

            ->when(
                $filters['salary_max'] ?? null,
                fn($q, $salaryMax) =>
                $q->where('salary_max', '<=', $salaryMax)
            );
    }
}
