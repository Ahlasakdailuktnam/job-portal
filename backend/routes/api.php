<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::get('/auth/google', [AuthController::class, 'google']);
Route::get('/auth/google/callback', [AuthController::class, 'googleCallback']);

Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/verify-otp', [AuthController::class, 'verifyOtp']);

Route::middleware('auth:sanctum')->group(function () {

    Route::post('/auth/logout', [AuthController::class, 'logout']);

});

Route::middleware(['auth:sanctum', 'admin'])->group(function () {

    Route::get('/admin/dashboard', function () {
        return response()->json([
            'message' => 'Welcome Admin'
        ]);
    });

});