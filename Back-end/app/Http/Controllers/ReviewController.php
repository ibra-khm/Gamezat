<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    // Get reviews for a specific game
    public function getReviews($guid)
    {
        $allReviews = Review::where('game_id', $guid)->get();
        $reviewCount = $allReviews->count();
        $averageRating = $allReviews->avg('stars');
        $reviews = Review::where('game_id', $guid)->latest()->with('user')->get();

        return response()->json([
            'status' => 200,
            'reviews' => $reviews,
            'count' =>  $reviewCount,
            'averageRating' => $averageRating
        ]);
    }
    // Get reviews for a specific user
    public function getReviewsUser()
    {
        $allReviews = Review::where('user_id', Auth::user()->id)->get();
        $reviewCount = $allReviews->count();


        return response()->json([
            'status' => 200,
            'reviews' => $allReviews,
            'count' =>  $reviewCount,

        ]);
    }
    // Get top rated games
    public function topRatedGames()
    {
        $topRated = DB::table('reviews')->groupBy('game_id')->selectRaw('avg(stars) as avg_rating, game_id')->orderBy('avg_rating', 'desc')->limit(4)->get();



        return response()->json([
            'status' => 200,
            'top_rated' => $topRated

        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required',
            'game_id' => 'required',
            'stars' => 'required',
            'review' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 500,
                'errors' => $validator->messages(),
            ]);
        }

        $review =  Review::create([
            'user_id' => $request->user_id,
            'game_id' => $request->game_id,
            'stars' => $request->stars,
            'review' => $request->review
        ]);
        $allReviews = Review::where('game_id', $request->game_id)->get();
        $reviewCount = $allReviews->count();
        $averageRating = $allReviews->avg('stars');
        $reviews = Review::where('game_id', $request->game_id)->latest()->with('user')->get();

        return response()->json([
            'status' => 200,
            'reviews' => $reviews,
            'count' =>  $reviewCount,
            'averageRating' => $averageRating
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Review  $review
     * @return \Illuminate\Http\Response
     */
    public function show(Review $review)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Review  $review
     * @return \Illuminate\Http\Response
     */
    public function edit(Review $review)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Review  $review
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Review $review)
    {
        $review->stars = $request->stars;
        $review->review = $request->review;
        $review->save();

        $allReviews = Review::where('game_id', $request->game_id)->get();
        $reviewCount = $allReviews->count();
        $averageRating = $allReviews->avg('stars');
        $reviews = Review::where('game_id', $request->game_id)->with('user')->latest()->get();

        return response()->json([
            'status' => 200,
            'reviews' => $reviews,
            'count' =>  $reviewCount,
            'averageRating' => $averageRating
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Review  $review
     * @return \Illuminate\Http\Response
     */
    public function destroy(Review $review)
    {
        //
    }
}
