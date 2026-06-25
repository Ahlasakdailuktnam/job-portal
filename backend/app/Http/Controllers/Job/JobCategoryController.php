<?php

namespace App\Http\Controllers\Job;

use App\Http\Controllers\Controller;
use App\Models\JobCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class JobCategoryController extends Controller
{
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => JobCategory::latest()->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:job_categories,name',
            'icon' => 'required|file|mimes:svg|max:2048',
        ]);

        $iconPath = $request->file('icon')->store('categories', 'public');

        $category = JobCategory::create([
            'name' => $validated['name'],
            'icon' => $iconPath,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Category created successfully',
            'data' => $category
        ], 201);
    }

    public function show($id)
    {
        $category = JobCategory::findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $category
        ]);
    }

    public function update(Request $request, $id)
    {
        $category = JobCategory::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255|unique:job_categories,name,' . $id,
            'icon' => 'nullable|file|mimes:svg|max:2048',
        ]);

        $data = [];

        if ($request->filled('name')) {
            $data['name'] = $request->name;
        }

        if ($request->hasFile('icon')) {

            // delete old icon
            if ($category->icon) {
                Storage::disk('public')->delete($category->icon);
            }

            $data['icon'] = $request->file('icon')
                ->store('categories', 'public');
        }

        $category->update($data);
        $category->refresh();
        return response()->json([
            'success' => true,
            'message' => 'Category updated successfully',
            'data' => $category
        ]);
    }
    public function destroy($id)
    {
        $category = JobCategory::findOrFail($id);

        if ($category->icon) {
            Storage::disk('public')->delete($category->icon);
        }

        $category->delete();

        return response()->json([
            'success' => true,
            'message' => 'Category deleted successfully'
        ]);
    }
}
