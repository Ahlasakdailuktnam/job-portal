<?php

use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminJobController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Company\CompanyController;
use App\Http\Controllers\Company\PlanController;
use App\Http\Controllers\Cv\CvController;
use App\Http\Controllers\Cv\EducationController;
use App\Http\Controllers\Cv\ExperienceController;
use App\Http\Controllers\Cv\SkillController;
use App\Http\Controllers\Dashboard\CompanyDashboardController;
use App\Http\Controllers\Job\JobApplicationController;
use App\Http\Controllers\Job\JobCategoryController;
use App\Http\Controllers\Job\JobController;
use App\Http\Controllers\Job\SavedJobController;
use App\Http\Controllers\Notification\NotificationController;
use App\Http\Controllers\Payment\PaymentController;
use App\Http\Controllers\Recruiter\RecruiterSettingsController;
use App\Http\Controllers\Subscription\SubscriptionController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public routes
|--------------------------------------------------------------------------
*/

Route::prefix('auth')->controller(AuthController::class)->group(function () {
    Route::get('/google', 'google');
    Route::get('/google/callback', 'googleCallback');
    Route::post('/register', 'register');
    Route::post('/login', 'login');
    Route::post('/verify-otp', 'verifyOtp');
});
Route::match(['get', 'post'], '/payments/callback', [
    PaymentController::class,
    'callback',
]);
Route::controller(PlanController::class)->group(function () {
    Route::get('/plans', 'index');
    Route::get('/plans/{id}', 'show');
});

Route::get('/job-categories', [JobCategoryController::class, 'index']);

 Route::controller(JobController::class)->group(function () {
        Route::get('/jobs', 'index');
        Route::get('/jobs/{id}', 'show');
    });
/*    
|--------------------------------------------------------------------------
| Authenticated user routes
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {
    Route::prefix('auth')->controller(AuthController::class)->group(function () {
        Route::post('/logout', 'logout');
        Route::get('/me', 'me');
    });

    Route::controller(SubscriptionController::class)->group(function () {
        Route::post('/subscriptions', 'store');
        Route::get('/subscriptions/{id}', 'show');
    });

    Route::controller(PaymentController::class)->group(function () {
        Route::get('/payments/{id}', 'show');
        Route::post('/payments', 'store');
        Route::post('/payments/check/{id}', 'checkPayment');
    });

    Route::controller(CvController::class)->group(function () {
        Route::get('/cvs', 'index');
        Route::post('/cvs', 'store');
        Route::get('/cvs/{id}', 'show');
        Route::put('/cvs/{id}', 'update');
        Route::delete('/cvs/{id}', 'destroy');
        Route::get('/cvs/{id}/download', 'download');
    });

    Route::controller(SkillController::class)->group(function () {
        Route::get('/cvs/{cvId}/skills', 'index');
        Route::post('/cvs/{cvId}/skills', 'store');
        Route::put('/skills/{id}', 'update');
        Route::delete('/skills/{id}', 'destroy');
    });

    Route::controller(ExperienceController::class)->group(function () {
        Route::get('/cvs/{cvId}/experiences', 'index');
        Route::post('/cvs/{cvId}/experiences', 'store');
        Route::put('/experiences/{id}', 'update');
        Route::delete('/experiences/{id}', 'destroy');
    });

    Route::controller(EducationController::class)->group(function () {
        Route::get('/cvs/{cvId}/educations', 'index');
        Route::post('/cvs/{cvId}/educations', 'store');
        Route::put('/educations/{id}', 'update');
        Route::delete('/educations/{id}', 'destroy');
    });

   

    Route::controller(JobApplicationController::class)->group(function () {
        Route::post('/jobs/{jobId}/apply', 'apply');
        Route::get('/my-applications', 'myApplications');
    });

    Route::controller(SavedJobController::class)->group(function () {
        Route::post('/jobs/{id}/save', 'saveJob');
        Route::delete('/jobs/{id}/save', 'unsaveJob');
        Route::get('/saved-jobs', 'mySavedJobs');
    });

    Route::controller(NotificationController::class)->group(function () {
        Route::get('/notifications', 'index');
        Route::put('/notifications/{id}/read', 'markAsRead');
        Route::get('/notifications/unread-count', 'unreadCount');
    });
});

/*
|--------------------------------------------------------------------------
| Recruiter routes
|--------------------------------------------------------------------------
*/
Route::middleware([
    'auth:sanctum',
    'recruiter',
])->group(function () {
    Route::controller(CompanyController::class)->group(function () {
        Route::get('/my-company', 'myCompany');
        Route::post('/companies', 'store');
        Route::get('/companies/{id}', 'show');
    });
});

/*
|--------------------------------------------------------------------------
| Recruiter + company routes
|--------------------------------------------------------------------------
*/
Route::middleware([
    'auth:sanctum',
    'recruiter',
    'company.exists',
])->group(function () {
    Route::controller(CompanyController::class)->group(function () {
        Route::put('/companies/{id}', 'update');
        Route::delete('/companies/{id}', 'destroy');
    });

    Route::controller(JobController::class)->group(function () {
        Route::put('/jobs/{id}', 'update');
        Route::delete('/jobs/{id}', 'destroy');
        Route::post('/jobs/{id}/close', 'close');
        Route::post('/jobs/{id}/reopen', 'reopen');
    });

    Route::controller(JobApplicationController::class)->group(function () {
        Route::get('/company/applications', 'companyApplications');
        Route::get('/applications/{id}', 'show');
        Route::put('/applications/{id}', 'updateStatus');
    });

    Route::get('/company/dashboard', [
        CompanyDashboardController::class,
        'dashboard',
    ]);

    Route::controller(RecruiterSettingsController::class)->group(function () {
        Route::get('/recruiter/settings', 'show');
        Route::put('/recruiter/settings', 'update');
    });
});

/*
|--------------------------------------------------------------------------
| Premium recruiter routes
|--------------------------------------------------------------------------
*/
Route::middleware([
    'auth:sanctum',
    'recruiter',
    'company.exists',
    'active.subscription',
])->group(function () {
    Route::controller(JobController::class)->group(function () {
        Route::post('/jobs', 'store');
    });

    Route::get('/my-jobs/{id}', [JobController::class, 'showMyJob']);
    Route::get('/my-jobs', [JobController::class, 'myJobs']);
});

/*
|--------------------------------------------------------------------------
| Admin routesz
|--------------------------------------------------------------------------
*/
Route::middleware([
    'auth:sanctum',
    'admin',
])->group(function () {
    Route::prefix('auth')->controller(AuthController::class)->group(function () {
        Route::get('/getuser', 'getUser');
    });
    Route::controller(JobCategoryController::class)->group(function () {

        Route::post('/job-categories', 'store');

        Route::get('/job-categories/{id}', 'show');
        Route::put('/job-categories/{id}', 'update');
        Route::delete('/job-categories/{id}', 'destroy');
    });
    Route::controller(PlanController::class)->group(function () {
        Route::post('/plans', 'store');
        Route::put('/plans/{id}', 'update');
        Route::delete('/plans/{id}', 'destroy');
    });

    Route::controller(SubscriptionController::class)->group(function () {
        Route::get('/subscriptions', 'index');
        Route::put('/subscriptions/{id}', 'update');
        Route::delete('/subscriptions/{id}', 'destroy');
    });
    
    Route::prefix('admin')->group(function () {
        Route::controller(AdminUserController::class)->group(function () {
            Route::get('/users', 'users');
            Route::get('/recruiters', 'recruiters');
            Route::get('/companies', 'companies');
        });

        Route::prefix('jobs')->controller(AdminJobController::class)->group(function () {
            Route::post('/', 'store');
            Route::get('/pending', 'pendingJobs');
            Route::put('/{id}/approve', 'approveJob');
            Route::put('/{id}/reject', 'rejectJob');
        });

        Route::get('/dashboard', [
            AdminDashboardController::class,
            'dashboard',
        ]);
    });
});
