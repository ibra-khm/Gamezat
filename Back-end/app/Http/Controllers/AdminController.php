<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use App\Models\Report;
use App\Models\Review;
use App\Models\Comment;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
    public function mainData()
    {
        $users = User::select('name', 'email', 'image')->take(5)->get();
        $allComments = Comment::with(['user', 'post'])->take(20)->get();
        // $allComments = Comment::select('comment')->take(20)->get();
        // foreach ($allComments as $comment) {
        //     $comment->user;
        // }
        $count = User::count();
        $products = Product::count();
        $posts = Post::count();
        $comments = Comment::count();
        $reports = Report::count();

        return response()->json([
            'status' => 200,
            'usersPrev' => $users,
            'usersCount' => $count,
            'productCount' => $products,
            'postsCount' => $posts,
            'commentsCount' => $comments,
            'reportsCount' => $reports,
            'allComments' => $allComments,
        ]);
    }
    public function delPost(Request $request)
    {
        $post = Post::find($request->id);
        $post->delete();
        $allPosts = Post::with(['comments.user', 'user'])->get();
        return response()->json([
            'status' => 200,
            'posts' => $allPosts,
        ]);
    }
    public function allReports()
    {
        // $commentsReports = Report::withWhereHas('comment')->get();
        $commentsReports = Report::withWhereHas('comment')->get()->map(function ($report) {
            return [
                'id' => $report->id,
                'comment_id' => $report->comment_id,
                'user_id' => $report->user_id,
                'feedback' => $report->feedback,
                'comment' => $report->comment->comment,
            ];
        });
        $postsReports = Report::withWhereHas('post')->get()->map(function ($report) {
            return [
                'id' => $report->id,
                'post_id' => $report->post_id,
                'user_id' => $report->user_id,
                'feedback' => $report->feedback,
                'content' => $report->post->content,
                'post_image' => $report->post->image,
            ];
        });
        $reviewsReports = Report::withWhereHas('review')->get()->map(function ($report) {
            return [
                'id' => $report->id,
                'review_id' => $report->review_id,
                'user_id' => $report->user_id,
                'feedback' => $report->feedback,
                'review' => $report->review->review,
                'stars' => $report->review->stars,
            ];
        });
        return response()->json([
            'status' => 200,
            'comments' => $commentsReports,
            'posts' => $postsReports,
            'reviews' => $reviewsReports,
        ]);
    }

    public function delReport(Request $request)
    {
        Report::find($request->id)->delete();
        return  $this->allReports();
    }
    public function delComment(Request $request)
    {
        Report::find($request->report_id)->delete();
        Comment::find($request->comment_id)->delete();
        return  $this->allReports();
    }
    public function delReview(Request $request)
    {
        Report::find($request->report_id)->delete();
        Review::find($request->review_id)->delete();
        return  $this->allReports();
    }
    public function delrPost(Request $request)
    {
        Report::find($request->report_id)->delete();
        Review::find($request->post_id)->delete();

        return  $this->allReports();
    }


    public function unApprovedPosts()
    {
        // get all posts where is_approved = 0
        $posts = Post::with(['comments.user', 'user'])->where('is_approved', 0)->oldest()->get();
        // $posts = Post::where('is_approved', 0)->get();

        return response()->json([
            'status' => 200,
            'posts' => $posts,
        ]);
    }
    public function approvePosts(Request $request)
    {
        // is_approved => 1
        $post = Post::find($request->id);

        $post->is_approved = 1;
        $post->save();


        $unApprovedPosts = Post::with(['comments.user', 'user'])->where('is_approved', 0)->oldest()->get();
        $posts = Post::with(['comments.user', 'user'])->where('is_approved', 1)->oldest()->get();

        return response()->json([
            'status' => 200,
            'posts' => $posts,
            'unApprovedPosts' => $unApprovedPosts
        ]);
    }

    public function rejectPosts(Request $request)
    {
        // delete
        $post = Post::find($request->id);

        $post->delete();

        $posts = Post::with(['comments.user', 'user'])->where('is_approved', 0)->get();


        return response()->json([
            'status' => 200,
            'posts' => $posts,

        ]);
    }
    public function getAllUsers()
    {
        $users = User::all();

        return response()->json([
            'status' => 200,
            'users' => $users,
        ]);
    }
    public function editUser(Request $request)
    {
        // this doesn't work
        // User::find($request->id)->update([$request->column => $request->data]);

        // this works but gotta do the col name before
        $col = $request->column;
        $user = User::find($request->id);
        $user->$col = $request->data;
        $user->save();
        return response()->json([
            'status' => 200,

        ]);
    }

    public function delUser(Request $request)
    {


        $user = User::find($request->id);
        $user->delete();

        return response()->json([
            'status' => 200,
            'users' =>  User::all(),
        ]);
    }

    public function allProducts()
    {
        $products = Product::all();

        return response()->json([
            'status' => 200,
            'products' => $products
        ]);
    }

    public function addProduct(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'price' => 'required|numeric',
            'link' => 'required',
            'image' => 'required',
            'description' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 401, 'errors' => $validator->messages()]);
        }

        $product = Product::create([
            'name' => $request->name,
            'description' => $request->description,
            'image' => $request->image,
            'link' => $request->link,
            'price' => $request->price,
        ]);

        return $this->allProducts();
    }

    public function editProduct(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'price' => 'required',
            'link' => 'required',
            'image' => 'required',
            'description' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 401, 'errors' => $validator->messages()]);
        }

        $product = Product::find($id);

        $product->update([
            'name' => $request->name,
            'description' => $request->description,
            'image' => $request->image,
            'link' => $request->link,
            'price' => $request->price,
        ]);

        return $this->allProducts();
    }

    public function delProduct($id)
    {
        $product = Product::find($id);

        $product->delete();

        return $this->allProducts();
    }
}
