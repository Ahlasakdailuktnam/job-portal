<?php

namespace App\Http\Controllers\Cv;

use Barryvdh\DomPDF\Facade\Pdf;
use App\Http\Controllers\Controller;
use App\Models\Cv;
use Illuminate\Http\Request;

class CvController extends Controller
{
    // GET MY CVS
    public function index()
    {
        $cvs = auth()->user()
            ->cvs()
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'data' => $cvs
        ]);
    }

    // CREATE CV
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',

            'phone' => 'required|string|max:50',
            'address' => 'nullable|string',
            'linkedin' => 'nullable|string',
            'telegram' => 'nullable|string',
            'summary' => 'nullable|string',
            'profile_image' => 'nullable|string',
            'cv_file' => 'nullable|string',
            'source' => 'nullable|in:generated,uploaded',
        ]);

        $cv = Cv::create([
            'user_id' => auth()->id(),
            ...$validated
        ]);

        return response()->json([
            'success' => true,
            'message' => 'CV created successfully',
            'data' => $cv
        ], 201);
    }

    // GET all cv data
    public function show($id)
    {
        $cv = Cv::with([
            'user',
            'educations',
            'experiences',
            'skills'
        ])
            ->where('id', $id)
            ->where('user_id', auth()->id())
            ->firstOrFail();

        return response()->json([
            'success' => true,
            'data' => $cv
        ]);
    }

    // UPDATE CV
    public function update(Request $request, $id)
    {
        $cv = Cv::where('id', $id)
            ->where('user_id', auth()->id())
            ->firstOrFail();

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'phone' => 'sometimes|string|max:50',
            'address' => 'nullable|string',
            'linkedin' => 'nullable|string',
            'telegram' => 'nullable|string',
            'summary' => 'nullable|string',
            'profile_image' => 'nullable|string',
            'cv_file' => 'nullable|string',
            'source' => 'nullable|in:generated,uploaded',
        ]);

        $cv->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'CV updated successfully',
            'data' => $cv
        ]);
    }

    // DELETE CV
    public function destroy($id)
    {
        $cv = Cv::where('id', $id)
            ->where('user_id', auth()->id())
            ->firstOrFail();

        $cv->delete();

        return response()->json([
            'success' => true,
            'message' => 'CV deleted successfully'
        ]);
    }
    public function download($id)
    {
        $company = auth()->user()->company;

        $cv = Cv::with([
            'user',
            'educations',
            'experiences',
            'skills'
        ])
            ->whereHas('applications.job', function ($query) use ($company) {
                $query->where('company_id', $company->id);
            })
            ->findOrFail($id);

        $pdf = Pdf::loadView(
            'pdf.cv',
            compact('cv')
        );

        return $pdf->download(
            'cv-' . $cv->id . '.pdf'
        );
    }
}
