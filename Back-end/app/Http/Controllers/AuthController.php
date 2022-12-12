<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // $request->validated($request->all());
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'string', 'max:255', 'email'],
            'password' => ['required', 'min:8']
        ]);
        if ($validator->fails()) {
            return response()->json(['status' => 401, 'errors' => $validator->messages()]);
        }
        $user = User::where('email', $request->email)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            // if (!Auth::attempt($request->only(['email', 'password']))) {
            // return $this->error('', 'user do not exist!', 401);
            return response()->json(['status' => 402, 'errors' => 'user do not exist!']);
        }
        return response()->json([
            'status' => 200,
            'user' => $user,
            'token' => $user->createToken('API Token Of ' . $user->name)->plainTextToken
        ]);
    }

    public function register(Request $request)
    {
        // $val =    $request->validated($request->all());
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'min:4', 'max:255'],
            'email' => ['required', 'string', 'max:255', 'unique:users', "email"],
            'password' => ['required', 'confirmed', Password::defaults(), 'min:8']
        ]);
        if ($validator->fails()) {
            return response()->json(['status' => 401, 'errors' => $validator->messages()]);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),

        ]);
        return response()->json([
            'status' => 200,
            'user' => $user,
            'token' => $user->createToken('API Token Of ' . $user->name)->plainTextToken
        ]);
    }
    public function logout()
    {
        // Auth::guard('web')->logout();
        Auth::user()->currentAccessToken()->delete();
        // Auth::user()->tokens()->where('id', Auth::user()->currentAccessToken()->id)->delete();
        return response()->json([
            'status' => 200,
            'message' => "see ya bish"
        ]);
    }
    public function user()
    {
        $user = Auth::user();
        $user->favorites;
        return response()->json([
            'status' => 200,
            'user' => $user,

        ]);
    }
    public function googleLogin(Request $request)
    {
        $finduser = User::where('google_id', $request->google_id)->first();

        if ($finduser) {
            return response()->json([
                'user' => $finduser,
                'token' => $finduser->createToken('API token of ' . $finduser->name)->plainTextToken
            ]);
        } else {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'image' => $request->image,
                'google_id' => $request->google_id
            ]);
            return response()->json([
                'user' => $user,
                'token' => $user->createToken('API Token of ' . $user->name)->plainTextToken
            ]);
        }
    }
    public function facebookLogin(Request $request)
    {
        $finduser = User::where('facebook_id', $request->facebook_id)->first();

        if ($finduser) {
            return response()->json([
                'user' => $finduser,
                'token' => $finduser->createToken('API token of ' . $finduser->name)->plainTextToken
            ]);
        } else {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'image' => $request->image,
                'facebook_id' => $request->facebook_id
            ]);
            return response()->json([
                'user' => $user,
                'token' => $user->createToken('API Token of ' . $user->name)->plainTextToken
            ]);
        }
    }

    public function updateData(Request $request)
    {
        User::where('id', Auth::user()->id)->update($request->all());
        $user = Auth::user();
        return response()->json([
            'status' => 200,
            'user' => $user,
        ]);
    }
}
