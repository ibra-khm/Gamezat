<?php

namespace App\Models;

use App\Models\Post;
use App\Models\User;
use App\Models\Review;
use App\Models\Comment;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Report extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'feedback',
        'user_id',
        'review_id',
        'post_id',
        'comment_id',
        'game_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function comment()
    {
        return $this->belongsTo(Comment::class);
    }
    public function post()
    {
        return $this->belongsTo(Post::class);
    }
    public function review()
    {
        return $this->belongsTo(Review::class);
    }
}
