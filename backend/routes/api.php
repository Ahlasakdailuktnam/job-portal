<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Company\CompanyController;
use App\Http\Controllers\Company\PlanController;
use App\Http\Controllers\Cv\CvController;
use App\Http\Controllers\Cv\EducationController;
use App\Http\Controllers\Cv\ExperienceController;
use App\Http\Controllers\Cv\SkillController;
use App\Http\Controllers\Job\JobApplicationController;
use App\Http\Controllers\Payment\PaymentController;
use App\Http\Controllers\Subscription\SubscriptionController;
use Illuminate\Support\Facades\Route;

Route::get('/auth/google', [AuthController::class, 'google']);
Route::get('/auth/google/callback', [AuthController::class, 'googleCallback']);
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/verify-otp ', [AuthController::class, 'verifyOtp']);

Route::middleware('auth:sanctum')->group(function () {

    Route::post('/auth/logout', [AuthController::class, 'logout']);
    //company
    Route::post('/companies', [CompanyController::class, 'store']);
    Route::get('/companies/{id}', [CompanyController::class, 'show']);
    Route::put('/companies/{id}', [CompanyController::class, 'update']);
    Route::delete('/companies/{id}', [CompanyController::class, 'destroy']);

    //plans
    Route::get('/plans', [PlanController::class, 'index']);
    Route::post('/plans', [PlanController::class, 'store']);
    Route::get('/plans/{id}', [PlanController::class, 'show']);
    Route::put('/plans/{id}', [PlanController::class, 'update']);
    Route::delete('/plans/{id}', [PlanController::class, 'destroy']);

    //subscription
    Route::get('/subscriptions', [SubscriptionController::class, 'index']);
    Route::post('/subscriptions', [SubscriptionController::class, 'store']);
    Route::get('/subscriptions/{id}', [SubscriptionController::class, 'show']);
    Route::put('/subscriptions/{id}', [SubscriptionController::class, 'update']);
    Route::delete('/subscriptions/{id}', [SubscriptionController::class, 'destroy']);

    //payment
    Route::get('/payments/{id}', [PaymentController::class, 'show']);
    Route::post('/payments', [PaymentController::class, 'store']);
    Route::post('/payments/check/{id}', [PaymentController::class, 'checkPayment']);

    // CV
    Route::get('/cvs', [CvController::class, 'index']);
    Route::post('/cvs', [CvController::class, 'store']);
    Route::get('/cvs/{id}', [CvController::class, 'show']);
    Route::put('/cvs/{id}', [CvController::class, 'update']);
    Route::delete('/cvs/{id}', [CvController::class, 'destroy']);

    //skills 
    Route::get('/cvs/{cvId}/skills', [SkillController::class, 'index']);
    Route::post('/cvs/{cvId}/skills', [SkillController::class, 'store']);
    Route::put('/skills/{id}', [SkillController::class, 'update']);
    Route::delete('/skills/{id}', [SkillController::class, 'destroy']);

    //exerpience
    Route::get('/cvs/{cvId}/experiences', [ExperienceController::class, 'index']);
    Route::post('/cvs/{cvId}/experiences', [ExperienceController::class, 'store']);
    Route::put('/experiences/{id}', [ExperienceController::class, 'update']);
    Route::delete('/experiences/{id}', [ExperienceController::class, 'destroy']);
    
    //educations
    Route::get('/cvs/{cvId}/educations', [EducationController::class, 'index']);
    Route::post('/cvs/{cvId}/educations', [EducationController::class, 'store']);
    Route::put('/educations/{id}', [EducationController::class, 'update']);
    Route::delete('/educations/{id}', [EducationController::class, 'destroy']);

    //apply job
    Route::post('/jobs/{jobId}/apply',[JobApplicationController::class, 'apply']);
    //view all candidate apply to our job
    Route::get('/my-applications', [JobApplicationController::class, 'myApplications']);
});

Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::get('/admin/dashboard', function () {
        return response()->json([
            'message' => 'Welcome Admin'
        ]);
    });
});
