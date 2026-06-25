<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobCategory extends Model
{
    protected $fillable = [
        'name',
        'icon',
    ];
    protected $appends = ['icon_url'];
    public function jobs()
    {
        return $this->hasMany(Job::class, 'category_id');
    }
    public function getIconUrlAttribute()
    {
        return $this->icon
            ? url('/storage/' . $this->icon)
            : null;
    }
}
