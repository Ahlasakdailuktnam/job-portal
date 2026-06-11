<?php

namespace App\Http\Controllers\Cv;

use App\Http\Controllers\Controller;
use App\Models\Cv;
use App\Models\Education;
use Illuminate\Http\Request;

class EducationController extends Controller
{
    // GET EDUCATIONS OF CV
    public function index($cvId)
    {
        $educations = Education::where(
            'cv_id',
            $cvId
        )->latest()->get();

        return response()->json([
            'success' => true,
            'data' => $educations
        ]);
    }

    // CREATE EDUCATION
    public function store(Request $request, $cvId)
    {
        $cv = Cv::findOrFail($cvId);

        $validated = $request->validate([
            'school_name' => 'required|string|max:255',
            'degree' => 'required|string|max:255',
            'start_year' => 'required|integer',
            'end_year' => 'nullable|integer',
        ]);

        $education = $cv->educations()->create(
            $validated
        );

        return response()->json([
            'success' => true,
            'message' => 'Education created successfully',
            'data' => $education
        ], 201);
    }

    // UPDATE EDUCATION
    public function update(
        Request $request,
        $id
    ) {
        $education = Education::findOrFail($id);

        $validated = $request->validate([
            'school_name' => 'sometimes|string|max:255',
            'degree' => 'sometimes|string|max:255',
            'start_year' => 'sometimes|integer',
            'end_year' => 'nullable|integer',
        ]);

        $education->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Education updated successfully',
            'data' => $education
        ]);
    }

    // DELETE EDUCATION
    public function destroy($id)
    {
        $education = Education::findOrFail($id);

        $education->delete();

        return response()->json([
            'success' => true,
            'message' => 'Education deleted successfully'
        ]);
    }
}