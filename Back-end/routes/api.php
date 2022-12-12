<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ContactController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\SingleProfileController;






/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('/admin/deluser', [AdminController::class, 'delUser']);
Route::post('/admin/edituser', [AdminController::class, 'editUser']);
Route::get('/admin/userall', [AdminController::class, 'getAllUsers']);
Route::get('/admin/reports', [AdminController::class, 'allReports']);
Route::post('/del/reports', [AdminController::class, 'delReport']);
Route::post('/del/rcomment', [AdminController::class, 'delComment']);
Route::post('/del/rreview', [AdminController::class, 'delReview']);
Route::post('/del/rpost', [AdminController::class, 'delrPost']);
Route::get('/admin/info', [AdminController::class, 'mainData']);
// Endpoint to get user posts
Route::get('/userposts/{id}', [SingleProfileController::class, 'getUserPosts']);
// Endpoint to get user comments
Route::get('/usercomments/{id}', [SingleProfileController::class, 'getUserComments']);
// Endpoint to get user data
Route::get('/user/{id}', [SingleProfileController::class, 'user']);

Route::get('/reviews/{guid}', [ReviewController::class, 'getReviews']);
Route::get('/toprated', [ReviewController::class, 'topRatedGames']);
Route::resource('/products', ProductController::class);

Route::resource('/posts', PostController::class);
Route::post('/googleLogin', [AuthController::class, 'googleLogin']);
Route::post('/facebookLogin', [AuthController::class, 'facebookLogin']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::resource('/contact', ContactController::class);
Route::get('/unapprovedposts', [AdminController::class, 'unApprovedPosts']);
Route::post('/approvepost', [AdminController::class, 'approvePosts']);
Route::post('/rejectpost', [AdminController::class, 'rejectPosts']);

Route::get('/allProducts', [AdminController::class, 'allProducts']);
Route::post('/addProduct', [AdminController::class, 'addProduct']);
Route::put('/editProduct/{id}', [AdminController::class, 'editProduct']);
Route::post('/delProduct/{id}', [AdminController::class, 'delProduct']);



// Protected routes---------------------------------------
Route::group(['middleware' => ['auth:sanctum']], function () {
    // Endpoint for logout api
    Route::get('/logout', [AuthController::class, 'logout']);
    // Endpoint for getting user
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/posts', [PostController::class, 'store']);
    Route::post('/comments', [CommentController::class, 'store']);

    // Endpoint for editing the user info
    Route::put('/user/update', [AuthController::class, 'updateData']);
    // Endpoints for reviews
    Route::resource('/reviews', ReviewController::class);
    // Endpoints for reports
    Route::resource('/reports', ReportController::class);
    // Endpoints for favorites
    Route::resource('/favorites', FavoriteController::class);
    // Endpoint to upload image for user
    Route::post('/profileimage', [ProfileController::class, 'uploadImage']);
    Route::post('/profilebanner', [ProfileController::class, 'uploadBanner']);
    // Endpoint to get user reviews
    Route::get('/userreviews', [ReviewController::class, 'getReviewsUser']);
    // Endpoint to get user posts
    Route::get('/userposts', [ProfileController::class, 'getUserPosts']);
    // Endpoint to get user comments
    Route::get('/usercomments', [ProfileController::class, 'getUserComments']);
    //Endpoint to delete user post
    Route::delete('/posts/{post}', [PostController::class, 'destroy']);

    Route::post('/delete/post', [AdminController::class, 'delPost']);
});
