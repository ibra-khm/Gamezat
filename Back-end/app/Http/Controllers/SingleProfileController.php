<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Comment;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SingleProfileController extends Controller
{
    // Get user posts
    public function getUserPosts($id)
    {
        $user = User::find($id);
        $posts = Post::whereBelongsTo($user)->with(['like', 'comments.user', 'user'])->get();

        return response()->json([
            'status' => 200,
            'posts' => $posts
        ]);
    }

    // Get user comments
    public function getUserComments($id)
    {
        $user = User::find($id);
        $comments = Comment::whereBelongsTo($user)->with('post.user')->get();
        $count = $comments->count();

        return response()->json([
            'status' => 200,
            'comments' => $comments,
            'count' => $count
        ]);
    }

    // Get user info with favorites
    public function user($id)
    {
        $user = User::find($id);
        $user->favorites;
        return response()->json([
            'status' => 200,
            'user' => $user,

        ]);
    }
}
