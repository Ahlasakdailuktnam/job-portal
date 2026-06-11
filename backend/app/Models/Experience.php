<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    protected $fillable = [
        'cv_id',
        'company_name',
        'position',
        'start_date',
        'end_date',
        'description',
    ];

    public function cv()
    {
        return $this->belongsTo(Cv::class);
    }
}