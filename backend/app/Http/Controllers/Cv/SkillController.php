<?php

namespace App\Http\Controllers\Cv;

use App\Http\Controllers\Controller;
use App\Models\Cv;
use App\Models\Skill;
use Illuminate\Http\Request;

class SkillController extends Controller
{
    public function index($cvId)
    {
        $skills = Skill::where(
            'cv_id',
            $cvId
        )->latest()->get();

        return response()->json([
            'success' => true,
            'data' => $skills
        ]);
    }

    public function store(Request $request, $cvId)
    {
        $cv = Cv::findOrFail($cvId);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $skill = $cv->skills()->create(
            $validated
        );

        return response()->json([
            'success' => true,
            'message' => 'Skill created successfully',
            'data' => $skill
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $skill = Skill::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $skill->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Skill updated successfully',
            'data' => $skill
        ]);
    }

    public function destroy($id)
    {
        $skill = Skill::findOrFail($id);

        $skill->delete();

        return response()->json([
            'success' => true,
            'message' => 'Skill deleted successfully'
        ]);
    }
}