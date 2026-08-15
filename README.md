# ?? JobPortal — Full-Stack Job Portal Platform

A modern, full-stack job portal built with **Laravel 10** (REST API) and **React + Vite** (SPA frontend), supporting job seekers, recruiters, and administrators.

---

## ?? Table of Contents

- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Features](#-features)
- [Database Schema](#-database-schema)
- [API Reference](#-api-reference)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [User Roles](#-user-roles)
- [Authentication Flow](#-authentication-flow)

---

## ?? Overview

JobPortal is a full-featured job marketplace platform where:
- **Job Seekers** can browse jobs, apply, build CVs, and save favorite listings
- **Recruiters** can create companies, post jobs (via subscription plans), and manage applications
- **Admins** can manage users, categories, plans, subscriptions, and approve/reject job postings

---

## ?? Tech Stack

### Backend
| Technology | Version | Purpose |
|---|---|---|
| PHP | ^8.1 | Server-side language |
| Laravel | ^10.0 | REST API framework |
| Laravel Sanctum | ^3.3 | API token authentication |
| Laravel Socialite | ^5.27 | Google OAuth login |
| Laravel DomPDF | ^3.1 | CV PDF generation |
| MySQL | Latest | Relational database |

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | ^19.2 | UI framework |
| Vite | ^8.0 | Build tool & dev server |
| React Router DOM | ^7.15 | Client-side routing |
| Axios | ^1.16 | HTTP client |
| Zustand | ^5.0 | Global state management |
| TanStack Query | ^5.101 | Server state & caching |
| Tailwind CSS | ^4.3 | Utility-first styling |
| Lucide React | ^1.16 | Icon library |
| Recharts | ^3.8 | Dashboard charts |
| React Hot Toast | ^2.6 | Notifications |
| SweetAlert2 | ^11.26 | Confirmation dialogs |

---

## ?? Project Structure

```
jobPortal/
+-- backend/                    # Laravel REST API
¦   +-- app/
¦   ¦   +-- Http/
¦   ¦   ¦   +-- Controllers/
¦   ¦   ¦   ¦   +-- AuthController.php
¦   ¦   ¦   ¦   +-- Admin/
¦   ¦   ¦   ¦   +-- Company/
¦   ¦   ¦   ¦   +-- Cv/
¦   ¦   ¦   ¦   +-- Dashboard/
¦   ¦   ¦   ¦   +-- Job/
¦   ¦   ¦   ¦   +-- Notification/
¦   ¦   ¦   ¦   +-- Payment/
¦   ¦   ¦   ¦   +-- Recruiter/
¦   ¦   ¦   ¦   +-- Subscription/
¦   ¦   ¦   +-- Middleware/
¦   ¦   +-- Models/
¦   ¦   +-- Services/
¦   +-- database/migrations/
¦   +-- routes/api.php
¦
+-- frontend/                   # React + Vite SPA
    +-- src/
        +-- api/                # Axios instance & API calls
        ¦   +-- axios.js        # Axios + request/response interceptors
        +-- components/         # Reusable UI components
        +-- page/               # Page-level components
        ¦   +-- auth/           # Login, Register, OTP
        ¦   +-- user/           # Job Seeker pages
        ¦   +-- recruiter/      # Recruiter pages
        ¦   +-- admin/          # Admin pages
        +-- store/authStore.js  # Zustand auth state (persisted)
        +-- routes/             # React Router definitions
        +-- services/           # Business logic helpers
        +-- util/               # Config, formatters, helpers
```

---

## ? Features

### ????? Job Seeker
- Register / Login with email & OTP verification
- Google OAuth login
- Browse and search job listings by category
- View job details and apply with CV
- Save / unsave favorite jobs
- Build, edit, and download CV as PDF
- CV sections: Personal Info, Education, Experience, Skills
- Track submitted applications
- In-app notifications

### ?? Recruiter
- Register as recruiter role
- Create and manage company profile
- Subscribe to a posting plan (required to post jobs)
- Post, edit, close, and reopen job listings
- View and manage candidate applications
- Update application status (accept / reject)
- Recruiter settings / profile update
- Company dashboard with analytics

### ??? Admin
- Admin dashboard with platform-wide statistics
- Manage all users and recruiters
- Manage companies
- Create, edit, delete job categories
- Manage subscription plans (pricing, limits)
- Manage all subscriptions
- Approve or reject job postings
- View pending jobs queue

### ?? Authentication & Security
- OTP-based email verification on register & login
- Google OAuth via Laravel Socialite
- Laravel Sanctum token-based authentication
- Role-based middleware: `admin`, `recruiter`, `company.exists`, `active.subscription`
- Auto-clear token + redirect to login on 401

---

## ?? Database Schema

| Table | Description |
|---|---|
| `users` | All users (job seekers, recruiters, admins) |
| `companies` | Recruiter company profiles |
| `plans` | Subscription plan tiers |
| `subscriptions` | User plan subscriptions |
| `payments` | Payment records |
| `job_categories` | Job classification categories |
| `jobs` | Job listings with status (pending/approved/rejected) |
| `job_applications` | Applications made by job seekers |
| `saved_jobs` | Bookmarked jobs |
| `cvs` | CV documents per user |
| `education` | CV education entries |
| `experiences` | CV work experience entries |
| `skills` | CV skills entries |
| `notifications` | In-app notification records |
| `recruiter_cv_views` | Tracks recruiter CV views |
| `personal_access_tokens` | Sanctum API tokens |

---

## ?? API Reference

**Base URL:** `http://127.0.0.1:8000/api`

### Public Routes

| Method | Endpoint | Description |
|---|---|---|
| GET | `/auth/google` | Redirect to Google OAuth |
| GET | `/auth/google/callback` | Google OAuth callback |
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login with email & password |
| POST | `/auth/verify-otp` | Verify OTP & receive token |
| POST | `/auth/resend-otp` | Resend OTP to email |
| POST | `/auth/forgot-password` | Request password reset OTP |
| POST | `/auth/reset-password` | Reset password with OTP |
| GET | `/plans` | List all subscription plans |
| GET | `/plans/{id}` | Get plan by ID |
| GET | `/job-categories` | List all job categories |
| GET | `/jobs` | List all approved jobs |
| GET | `/jobs/{id}` | Get job details |

### Authenticated Routes (Bearer Token required)

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/logout` | Logout (revoke token) |
| GET | `/auth/me` | Get current authenticated user |
| GET/POST | `/cvs` | List / create CVs |
| GET/PUT/DELETE | `/cvs/{id}` | Get / update / delete CV |
| GET | `/cvs/{id}/download` | Download CV as PDF |
| GET/POST/PUT/DELETE | `/cvs/{cvId}/skills` | Manage CV skills |
| GET/POST/PUT/DELETE | `/cvs/{cvId}/experiences` | Manage CV experiences |
| GET/POST/PUT/DELETE | `/cvs/{cvId}/educations` | Manage CV education |
| POST | `/jobs/{jobId}/apply` | Apply for a job |
| GET | `/my-applications` | List my applications |
| POST/DELETE | `/jobs/{id}/save` | Save / unsave a job |
| GET | `/saved-jobs` | List saved jobs |
| GET | `/notifications` | List notifications |
| PUT | `/notifications/{id}/read` | Mark notification as read |
| GET | `/notifications/unread-count` | Unread notification count |
| POST/GET | `/subscriptions` | Create / get subscription |
| POST/GET | `/payments` | Create / get payment |
| POST | `/payments/check/{id}` | Check payment status |

### Recruiter Routes (auth + recruiter middleware)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/my-company` | Get recruiter's company |
| POST | `/companies` | Create company |
| GET/PUT/DELETE | `/companies/{id}` | Manage company |
| PUT/DELETE | `/jobs/{id}` | Update / delete job |
| POST | `/jobs/{id}/close` | Close job listing |
| POST | `/jobs/{id}/reopen` | Reopen job listing |
| GET | `/company/applications` | List company applications |
| GET/PUT | `/applications/{id}` | View / update application status |
| GET | `/company/dashboard` | Company analytics dashboard |
| GET/PUT | `/recruiter/settings` | Recruiter profile settings |

### Premium Recruiter Routes (requires active subscription)

| Method | Endpoint | Description |
|---|---|---|
| POST | `/jobs` | Create new job posting |
| GET | `/my-jobs` | List recruiter's jobs |
| GET | `/my-jobs/{id}` | Get specific job |

### Admin Routes (auth + admin middleware)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/auth/getuser` | Get all users |
| CRUD | `/job-categories` | Manage job categories |
| CRUD | `/plans` | Manage subscription plans |
| CRUD | `/subscriptions` | Manage all subscriptions |
| GET | `/admin/users` | List all users |
| GET | `/admin/recruiters` | List all recruiters |
| GET | `/admin/companies` | List all companies |
| GET | `/admin/jobs/pending` | Pending jobs queue |
| PUT | `/admin/jobs/{id}/approve` | Approve job |
| PUT | `/admin/jobs/{id}/reject` | Reject job |
| GET | `/admin/dashboard` | Admin dashboard stats |

---

## ?? Getting Started

### Prerequisites

- PHP >= 8.1
- Composer
- Node.js >= 18
- MySQL
- Git

### Backend Setup

```bash
# 1. Navigate to backend
cd backend

# 2. Install PHP dependencies
composer install

# 3. Copy environment file
cp .env.example .env

# 4. Generate application key
php artisan key:generate

# 5. Configure your .env (database, mail, Google OAuth)

# 6. Run migrations
php artisan migrate

# 7. (Optional) Seed the database
php artisan db:seed

# 8. Start the dev server
php artisan serve
# ? API available at http://127.0.0.1:8000/api
```

### Frontend Setup

```bash
# 1. Navigate to frontend
cd frontend

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
# ? App available at http://localhost:5173
```

---

## ?? Environment Variables

### Backend (`backend/.env`)

```env
APP_NAME=JobPortal
APP_ENV=local
APP_KEY=                          # Generated by: php artisan key:generate
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=job_portal
DB_USERNAME=root
DB_PASSWORD=

MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your@email.com      # Used for OTP emails
MAIL_PASSWORD=your_app_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=your@email.com
MAIL_FROM_NAME="JobPortal"

GOOGLE_CLIENT_ID=                 # From Google Cloud Console
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=http://localhost:8000/api/auth/google/callback
```

### Frontend (`frontend/src/util/config.js`)

```js
export const Config = {
  base_url: "http://127.0.0.1:8000/api",
};
```

---

## ?? User Roles

| Role | Access Level |
|---|---|
| `user` | Job browsing, applying, CV builder, saved jobs, notifications |
| `recruiter` | All user features + company & job management (subscription required to post) |
| `admin` | Full platform management access |

---

## ?? Authentication Flow

```
Register --? OTP Email --? Verify OTP --? Token Issued --? Authenticated
   ¦
Login --? (if unverified) --? OTP Email --? Verify OTP --? Token Issued
   ¦
Google OAuth --? OTP Email --? Verify OTP --? Token Issued
```

- Tokens are persisted in `localStorage` via Zustand (`auth-storage` key)
- Every request attaches `Authorization: Bearer <token>` via Axios **request interceptor**
- Any **401 Unauthenticated** response clears auth state and redirects to `/login` via Axios **response interceptor**

---

## ?? License

This project is open-source and available under the [MIT License](LICENSE).
