<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use App\Models\Company;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
   public function index()
    {
        $companies = Company::with('user')->latest()->get();

        return response()->json([
            'success' => true,
            'data' => $companies
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'company_name' => 'required|string|max:255',
            'logo' => 'nullable|string',
            'description' => 'nullable|string',
            'social' => 'nullable|string',
            'contact_tlg' => 'nullable|string',
            'address' => 'nullable|string',
        ]);

        $company = Company::create([
            'user_id' => auth()->id(),
            ...$validated
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Company created successfully',
            'data' => $company
        ], 201);
    }

    public function show($id)
    {
        $company = Company::with('user')->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $company
        ]);
    }

    public function update(Request $request, $id)
    {
        $company = Company::findOrFail($id);

        $validated = $request->validate([
            'company_name' => 'sometimes|string|max:255',
            'logo' => 'nullable|string',
            'description' => 'nullable|string',
            'social' => 'nullable|string',
            'contact_tlg' => 'nullable|string',
            'address' => 'nullable|string',
        ]);

        $company->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Company updated successfully',
            'data' => $company
        ]);
    }

    public function destroy($id)
    {
        $company = Company::findOrFail($id);

        $company->delete();

        return response()->json([
            'success' => true,
            'message' => 'Company deleted successfully'
        ]);
    }
}
