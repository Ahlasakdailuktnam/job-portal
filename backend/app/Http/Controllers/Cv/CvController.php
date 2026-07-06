<?php

namespace App\Http\Controllers\Cv;

use Barryvdh\DomPDF\Facade\Pdf;
use App\Http\Controllers\Controller;
use App\Models\Cv;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CvController extends Controller
{
    public function index()
    {
        $cvs = auth()->user()
            ->cvs()
            ->with(['educations', 'experiences', 'skills'])
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'data' => $cvs
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'phone' => 'required|string|max:50',
            'address' => 'nullable|string',
            'linkedin' => 'nullable|string',
            'telegram' => 'nullable|string',
            'summary' => 'nullable|string',
            'profile_image' => 'nullable|image|mimes:jpeg,jpg,png|max:2048',
            'cv_file' => 'nullable|string',
            'template' => 'nullable|in:modern,classic,minimal',
            'source' => 'nullable|in:generated,uploaded',
        ]);

        if ($request->hasFile('profile_image')) {
            $image = $request->file('profile_image');
            $filename = 'profile_' . time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
            $path = $image->storeAs('cv/profile-images', $filename, 'public');
            $validated['profile_image'] = $path;
        }

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
            'profile_image' => 'nullable|image|mimes:jpeg,jpg,png|max:2048',
            'cv_file' => 'nullable|string',
            'template' => 'sometimes|in:modern,classic,minimal',
            'source' => 'nullable|in:generated,uploaded',
        ]);

        if ($request->hasFile('profile_image')) {
            if ($cv->profile_image && Storage::disk('public')->exists($cv->profile_image)) {
                Storage::disk('public')->delete($cv->profile_image);
            }

            $image = $request->file('profile_image');
            $filename = 'profile_' . time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
            $path = $image->storeAs('cv/profile-images', $filename, 'public');
            $validated['profile_image'] = $path;
        }

        $cv->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'CV updated successfully',
            'data' => $cv
        ]);
    }

    public function destroy($id)
    {
        $cv = Cv::where('id', $id)
            ->where('user_id', auth()->id())
            ->firstOrFail();

        if ($cv->profile_image && Storage::disk('public')->exists($cv->profile_image)) {
            Storage::disk('public')->delete($cv->profile_image);
        }

        $cv->delete();

        return response()->json([
            'success' => true,
            'message' => 'CV deleted successfully'
        ]);
    }

    public function download($id)
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

        $template = $cv->template ?? 'classic';
        $view = "pdf." . $template;

        $pdf = Pdf::loadView($view, compact('cv'));

        $filename = $cv->title 
            ? str_replace(' ', '_', $cv->title) . '_' . $cv->id . '.pdf'
            : 'cv-' . $cv->id . '.pdf';

        return $pdf->download($filename);
    }
}