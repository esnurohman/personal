<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $table = 'profiles';
    protected $fillable = ['user_id', 'full_name', 'job_title', 'bio', 'photo', 'location', 'cv_url'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}