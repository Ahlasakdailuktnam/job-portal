<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\ForgotPasswordRequest;
use App\Http\Requests\Auth\ResetPasswordRequest;
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
            'http://localhost:5173/otp?email=' . $user->email
        );
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
            'role' => 'user'
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

    public function resendOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found'
            ], 404);
        }

        $otp = rand(100000, 999999);

        $user->update([
            'otp' => $otp,
            'otp_expires_at' => Carbon::now()->addMinutes(5)
        ]);

        try {
            Mail::to($user->email)->send(new SendOtpMail($otp));
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::warning('Failed sending OTP mail: ' . $e->getMessage());
        }

        return response()->json([
            'success' => true,
            'message' => 'OTP has been resent to your email.',
            'email' => $user->email,
            'otp' => app()->environment('local') ? $otp : null
        ]);
    }

    public function forgotPassword(ForgotPasswordRequest $request)
    {
        $user = User::where('email', $request->email)->firstOrFail();
        $otp = rand(100000, 999999);

        $user->update([
            'otp' => $otp,
            'otp_expires_at' => Carbon::now()->addMinutes(5),
        ]);

        Mail::to($user->email)->send(new SendOtpMail($otp));

        return response()->json([
            'success' => true,
            'message' => 'Password reset OTP sent to email',
            'email' => $user->email,
        ]);
    }

    public function resetPassword(ResetPasswordRequest $request)
    {
        $user = User::where('email', $request->email)->firstOrFail();

        if ($user->otp != $request->otp) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid OTP',
            ], 400);
        }

        if (
            !$user->otp_expires_at ||
            Carbon::now()->gt($user->otp_expires_at)
        ) {
            return response()->json([
                'success' => false,
                'message' => 'OTP expired',
            ], 400);
        }

        $user->update([
            'password' => Hash::make($request->password),
            'otp' => null,
            'otp_expires_at' => null,
        ]);

        $user->tokens()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Password reset successfully',
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
    public function getUser()
    {
        $data = User::all();
        return response()->json([
            'data' => $data,
            'message' => "get user successfully"
        ]);
    }
    public function me(Request $request)
    {
        return response()->json([
            'user' => $request->user()
        ]);
    }
}
