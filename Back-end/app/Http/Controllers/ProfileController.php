<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\File;
use Illuminate\Support\Facades\Validator;

class ProfileController extends Controller
{


    // Upload user image
    public function uploadImage(Request $request)
    {

        $validator = Validator::make($request->all(), ['image' => ['required', File::image()->max(20 * 1024)]]);

        if ($validator->fails()) return response()->json($validator->messages());

        $user = Auth::user();

        $file = $request->file('image');
        $filename = uniqid() . "_" . $file->getClientOriginalName();
        $file->move(public_path('public/images'), $filename);
        $url = URL::to('/') . '/public/images/' . $filename;
        $user['image'] = $url;

        $user->save();

        $user->favorites;
        return response()->json([
            'status' => 200,
            'user' => $user,

        ]);
    }
    // Upload user banner
    public function uploadBanner(Request $request)
    {

        $validator = Validator::make($request->all(), ['banner' => ['required', File::image()->max(20 * 1024)]]);

        if ($validator->fails()) return response()->json($validator->messages());

        $user = Auth::user();

        $file = $request->file('banner');
        $filename = uniqid() . "_" . $file->getClientOriginalName();
        $file->move(public_path('public/images'), $filename);
        $url = URL::to('/') . '/public/images/' . $filename;
        $user['banner'] = $url;

        $user->save();

        $user->favorites;
        return response()->json([
            'status' => 200,
            'user' => $user,

        ]);
    }

    // Get user posts
    public function getUserPosts()
    {
        $user = Auth::user();
        $posts = Post::whereBelongsTo($user)->with(['like', 'comments.user', 'user'])->get();

        return response()->json([
            'status' => 200,
            'posts' => $posts
        ]);
    }

    // Get user comments
    public function getUserComments()
    {
        $user = Auth::user();
        $comments = Comment::whereBelongsTo($user)->with('post.user')->latest()->get();

        return response()->json([
            'status' => 200,
            'comments' => $comments
        ]);
    }
}
