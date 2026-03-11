<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected $fillable = ['name', 'email', 'message'];
    protected $appends = ['created_at_human'];

    public function getCreatedAtHumanAttribute()
{
    return Carbon::parse($this->created_at)
        ->locale('id')
        ->diffForHumans();
}
}