<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    protected $fillable = [
        'cv_id',
        'name',
    ];

    public function cv()
    {
        return $this->belongsTo(Cv::class);
    }
}