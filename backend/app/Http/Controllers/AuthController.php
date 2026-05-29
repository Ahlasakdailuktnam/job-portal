<?php

namespace App\Http\Controllers;

use App\Mail\SendOtpMail;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller
{
    // GOOGLE LOGIN

   public function google()
{
    return Socialite::driver('google')
        ->stateless()
        ->with([
            'prompt' => 'select_account'
        ])
        ->redirect();
}

    public function googleCallback()
    {
        $googleUser = Socialite::driver('google')
            ->stateless()
            ->user();

        // Create or find user
        $user = User::firstOrCreate(
            [
                'email' => $googleUser->email
            ],
            [
                'name' => $googleUser->name,
                'google_id' => $googleUser->id,
                'password' => Hash::make(Str::random(24)),
                'is_verified' => false
            ]
        );

        // Update google_id if needed
        $user->update([
            'google_id' => $googleUser->id
        ]);

        // Generate OTP
        $otp = rand(100000, 999999);

        $user->update([
            'otp' => $otp,
            'otp_expires_at' => Carbon::now()->addMinutes(5)
        ]);

        // Send OTP Email
        Mail::to($user->email)->send(new SendOtpMail($otp));

       return redirect(
        'http://localhost:5173/otp?email=' . $user->email);
    }

    // REGISTER

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6'
        ]);

        // Generate OTP
        $otp = rand(100000, 999999);

        // Create user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'otp' => $otp,
            'otp_expires_at' => Carbon::now()->addMinutes(5),
            'is_verified' => false,
            'role' => $request->role === 'recruiter'
                ? 'recruiter'
                : 'user'
        ]);

        // Send OTP
        Mail::to($user->email)->send(new SendOtpMail($otp));

        return response()->json([
            'message' => 'Registration successful. OTP sent to email.',
            'email' => $user->email
        ]);
    }

    // VERIFY OTP

    public function verifyOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'otp' => 'required'
        ]);

        $user = User::where('email', $request->email)->first();

        // Check user
        if (!$user) {
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }

        // Check OTP
        if ($user->otp != $request->otp) {
            return response()->json([
                'message' => 'Invalid OTP'
            ], 400);
        }

        // Check expiration
        if (Carbon::now()->gt($user->otp_expires_at)) {
            return response()->json([
                'message' => 'OTP expired'
            ], 400);
        }

        // Clear OTP + verify user
        $user->update([
            'otp' => null,
            'otp_expires_at' => null,
            'is_verified' => true
        ]);

        // Generate Sanctum token
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'token' => $token,
            'user' => $user
        ]);
    }
    public function login(Request $request)
{
    $request->validate([
        'email' => 'required|email',
        'password' => 'required'
    ]);

    // Find user
    $user = User::where('email', $request->email)->first();

    // Check user exists
    if (!$user) {
        return response()->json([
            'success' => false,
            'message' => 'Email not found'
        ], 404);
    }

    // Check password
    if (!Hash::check($request->password, $user->password)) {
        return response()->json([
            'success' => false,
            'message' => 'Wrong password'
        ], 401);
    }

    // Check verified
    if (!$user->is_verified) {

        // Generate new OTP
        $otp = rand(100000, 999999);

        $user->update([
            'otp' => $otp,
            'otp_expires_at' => Carbon::now()->addMinutes(5)
        ]);

        // Send OTP email
        Mail::to($user->email)->send(new SendOtpMail($otp));

        return response()->json([
            'success' => true,
            'requires_otp' => true,
            'message' => 'OTP sent to email',
            'email' => $user->email
        ]);
    }

    // Create token
    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
        'success' => true,
        'message' => 'Login successful',
        'token' => $token,
        'user' => $user
    ]);
}
public function logout(Request $request)
{
    $request->user()->currentAccessToken()->delete();

    return response()->json([
        'success' => true,
        'message' => 'Logout successful'
    ]);
}
}
