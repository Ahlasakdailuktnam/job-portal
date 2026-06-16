<?php

use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminJobController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Company\CompanyController;
use App\Http\Controllers\Company\PlanController;
use App\Http\Controllers\Cv\CvController;
use App\Http\Controllers\Cv\EducationController;
use App\Http\Controllers\Cv\ExperienceController;
use App\Http\Controllers\Cv\SkillController;
use App\Http\Controllers\Dashboard\CompanyDashboardController;
use App\Http\Controllers\Job\JobApplicationController;
use App\Http\Controllers\Job\JobController;
use App\Http\Controllers\Job\SavedJobController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\Payment\PaymentController;
use App\Http\Controllers\Subscription\SubscriptionController;
use Illuminate\Support\Facades\Route;

Route::get('/auth/google', [AuthController::class, 'google']);
Route::get('/auth/google/callback', [AuthController::class, 'googleCallback']);
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/verify-otp', [AuthController::class, 'verifyOtp']);

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
    // Jobs
    Route::get('/jobs', [JobController::class, 'index']);
    Route::get('/jobs/{id}', [JobController::class, 'show']);

    Route::post('/jobs', [JobController::class, 'store'])
        ->middleware(['company.exists', 'active.subscription']);
    Route::put('/jobs/{id}', [JobController::class, 'update'])
        ->middleware('company.exists');
    Route::delete('/jobs/{id}', [JobController::class, 'destroy'])
        ->middleware('company.exists');

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
    Route::post('/jobs/{jobId}/apply', [JobApplicationController::class, 'apply']);
    //view all candidate apply to our job
    Route::get('/my-applications', [JobApplicationController::class, 'myApplications']);
    Route::get('/company/applications', [JobApplicationController::class, 'companyApplications'])
        ->middleware('company.exists');
    Route::get('/applications/{id}', [JobApplicationController::class, 'show'])
        ->middleware('company.exists');
    Route::put('/applications/{id}', [JobApplicationController::class, 'updateStatus'])
        ->middleware('company.exists');


    Route::get(
        '/company/dashboard',
        [CompanyDashboardController::class, 'dashboard']
    )->middleware('company.exists');


    //save job
    Route::post('/jobs/{id}/save', [SavedJobController::class, 'saveJob']);
    Route::delete('/jobs/{id}/save', [SavedJobController::class, 'unsaveJob']);
    Route::get('/saved-jobs', [SavedJobController::class, 'mySavedJobs']);

    //download cv
    Route::get(
        '/cvs/{id}/download',
        [CvController::class, 'download']
    );
    Route::get(
        '/notifications',
        [NotificationController::class, 'index']
    );

    Route::put(
        '/notifications/{id}/read',
        [NotificationController::class, 'markAsRead']
    );

    Route::get(
        '/notifications/unread-count',
        [NotificationController::class, 'unreadCount']
    );
});

Route::middleware(['auth:sanctum', 'admin'])->group(function () {

    Route::get('/auth/getuser', [AuthController::class, 'getUser']);
    Route::get(
        '/admin/jobs/pending',
        [AdminJobController::class, 'pendingJobs']
    );

    Route::put(
        '/admin/jobs/{id}/approve',
        [AdminJobController::class, 'approveJob']
    );

    Route::put(
        '/admin/jobs/{id}/reject',
        [AdminJobController::class, 'rejectJob']
    );
    Route::get(
        '/admin/dashboard',
        [AdminDashboardController::class, 'dashboard']
    );
});
