<?php

namespace App\Models;

use App\Models\Post;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Like extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'post_id',
        'likes',
    ];

    public function post()
    {
        return $this->belongsTo(Post::class);
    }
}
