<?php
namespace App\Http\Controllers\Cv;
use App\Http\Controllers\Controller;
use App\Models\Cv;
use App\Models\Experience;
use Illuminate\Http\Request;

class ExperienceController extends Controller
{
    public function index($cvId)
    {
        $experiences = Experience::where(
            'cv_id',
            $cvId
        )->latest()->get();

        return response()->json([
            'success' => true,
            'data' => $experiences
        ]);
    }

    public function store(Request $request, $cvId)
    {
        $cv = Cv::findOrFail($cvId);

        $validated = $request->validate([
            'company_name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date',
            'description' => 'nullable|string',
        ]);

        $experience = $cv->experiences()->create(
            $validated
        );

        return response()->json([
            'success' => true,
            'message' => 'Experience created successfully',
            'data' => $experience
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $experience = Experience::findOrFail($id);

        $validated = $request->validate([
            'company_name' => 'sometimes|string|max:255',
            'position' => 'sometimes|string|max:255',
            'start_date' => 'sometimes|date',
            'end_date' => 'nullable|date',
            'description' => 'nullable|string',
        ]);

        $experience->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Experience updated successfully',
            'data' => $experience
        ]);
    }

    public function destroy($id)
    {
        $experience = Experience::findOrFail($id);

        $experience->delete();

        return response()->json([
            'success' => true,
            'message' => 'Experience deleted successfully'
        ]);
    }
}