<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Education extends Model
{
    protected $fillable = [
        'cv_id',
        'school_name',
        'degree',
        'start_year',
        'end_year',
    ];

    public function cv()
    {
        return $this->belongsTo(Cv::class);
    }
}