<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CompanyExistsMiddleware
{
    public function handle(
        Request $request,
        Closure $next
    ): Response {

        if (!$request->user()->company) {
            return response()->json([
                'success' => false,
                'message' => 'Please create company first'
            ], 403);
        }

        return $next($request);
    }
}