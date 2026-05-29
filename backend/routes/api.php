<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::get('/auth/google', [AuthController::class, 'google']);

Route::get('/auth/google/callback', [AuthController::class, 'googleCallback']);

Route::post('/auth/register', [AuthController::class, 'register']);
Route::middleware('auth:sanctum')->post('/auth/logout', [AuthController::class, 'logout']);
Route::post('/auth/verify-otp', [AuthController::class, 'verifyOtp']);

// ADMIN ROUTES
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::post('/auth/login', [AuthController::class, 'login']);

    Route::get('/admin/dashboard', function () {
        return response()->json([
            'message' => 'Welcome Admin'
        ]);
    });

}); 