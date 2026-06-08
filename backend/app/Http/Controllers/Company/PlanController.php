<?php

namespace App\Http\Controllers\Company;
use App\Http\Controllers\Controller;
use App\Models\Plan;
use Illuminate\Http\Request;

class PlanController extends Controller
{
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => Plan::latest()->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'job_limit' => 'required|integer',
            'featured_job' => 'required|integer',
            'cv_access' => 'required|integer',
            'duration_days' => 'required|integer',
        ]);

        $plan = Plan::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Plan created successfully',
            'data' => $plan
        ], 201);
    }

    public function show($id)
    {
        $plan = Plan::findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $plan
        ]);
    }

    public function update(Request $request, $id)
    {
        $plan = Plan::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'price' => 'sometimes|numeric',
            'job_limit' => 'sometimes|integer',
            'featured_job' => 'sometimes|integer',
            'cv_access' => 'sometimes|integer',
            'duration_days' => 'sometimes|integer',
            'status' => 'sometimes|boolean',
        ]);

        $plan->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Plan updated successfully',
            'data' => $plan
        ]);
    }

    public function destroy($id)
    {
        $plan = Plan::findOrFail($id);

        $plan->delete();

        return response()->json([
            'success' => true,
            'message' => 'Plan deleted successfully'
        ]);
    }
}