<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\URL;

class PostController extends Controller
{

    public function index()
    {

        $posts = Post::with(['comments.user', 'user'])->where('is_approved', 1)->oldest()->get();

        return response()->json([
            'status' => 200,
            'data' => $posts,
        ]);
    }

    public function store(Request $request)
    {
        $file = $request->file('image');
        if ($file) {
            $filename = uniqid() . "_" . $file->getClientOriginalName();
            $file->move(public_path('public/images'), $filename);
            $url = URL::to('/') . '/public/images/' . $filename;

            $addPost = Post::create([
                'user_id' => Auth::user()->id,
                'content' => $request->content,
                'image' => $url,

            ]);
        } else {
            $addPost = Post::create([
                'user_id' => Auth::user()->id,
                'content' => $request->content,
            ]);
        }

        $posts = Post::with(['comments.user', 'user'])->oldest()->get();

        return response()->json([
            'status' => 200,
            'data' => $posts,
        ]);
    }

    public function destroy(Post $post)
    {
        // Check if the authenticated user's ID matches the ID of the user who posted the post
        // $post = Post::findOrFail($id);
        if (Auth::user()->id === $post->user_id) {
            $post->delete();
            $posts = Post::with(['comments.user', 'user'])->oldest()->get();
            return response()->json([
                'status' => 200,
                'message' => 'Post deleted successfully.',
                'data' => $posts
            ]);
        } else {
            // Handle unauthorized delete attempt
            return response()->json([
                'status' => 403,
                'message' => 'You are not authorized to delete this post.',
            ]);
        }
    }
}
