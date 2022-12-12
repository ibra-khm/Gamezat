<?php

namespace App\Models;

use App\Models\Like;
use App\Models\User;
use App\Models\Report;
use App\Models\Comment;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Post extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'content',
        'image',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function comments()
    {
        return $this->hasMany(Comment::class)->orderByDesc('created_at');
    }
    public function reports()
    {
        return $this->hasMany(Report::class);
    }
    public function like()
    {
        return $this->hasOne(Like::class);
    }
}
