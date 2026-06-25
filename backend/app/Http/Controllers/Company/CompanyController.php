<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CompanyController extends Controller
{
    public function index()
    {
        $companies = Company::with('user')
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'data' => $companies
        ]);
    }

    public function store(Request $request)
    {
        $existingCompany = Company::where(
            'user_id',
            auth()->id()
        )->exists();

        if ($existingCompany) {
            return response()->json([
                'success' => false,
                'message' => 'You already have a company profile'
            ], 400);
        }

        $validated = $request->validate([
            'company_name' => 'required|string|max:255',
            'logo' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'description' => 'nullable|string',
            'social' => 'nullable|string',
            'contact_tlg' => 'nullable|string',
            'address' => 'nullable|string',
        ]);

        if ($request->hasFile('logo')) {
            $validated['logo'] = $request
                ->file('logo')
                ->store('companies', 'public');
        }

        $validated['user_id'] = auth()->id();

        $company = Company::create($validated);
        $company->load('user');
        return response()->json([
            'success' => true,
            'message' => 'Company created successfully',
            'data' => $company
        ], 201);
    }

    public function show($id)
    {
        $company = Company::with('user')
            ->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $company
        ]);
    }

    public function update(Request $request, $id)
    {
        $company = Company::where(
            'id',
            $id
        )
            ->where(
                'user_id',
                auth()->id()
            )
            ->firstOrFail();
        
        $validated = $request->validate([
            'company_name' => 'sometimes|string|max:255',
            'logo' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'description' => 'nullable|string',
            'social' => 'nullable|string',
            'contact_tlg' => 'nullable|string',
            'address' => 'nullable|string',
        ]);
        if ($request->hasFile('logo')) {

            if ($company->logo) {
                Storage::disk('public')->delete($company->logo);
            }

            $validated['logo'] = $request
                ->file('logo')
                ->store('companies', 'public');
        }
        $company->update($validated);
        $company->refresh()->load('user');
        return response()->json([
            'success' => true,
            'message' => 'Company updated successfully',
            'data' => $company
        ]);
    }

    public function destroy($id)
    {
        $company = Company::where(
            'id',
            $id
        )
            ->where(
                'user_id',
                auth()->id()
            )
            ->firstOrFail();
        if ($company->logo) {
            Storage::disk('public')->delete($company->logo);
        }
        $company->delete();

        return response()->json([
            'success' => true,
            'message' => 'Company deleted successfully'
        ]);
    }
    public function myCompany()
    {
        $company = Company::with([
            'user:id,name,email'
        ])
            ->where('user_id', auth()->id())
            ->first();

        return response()->json([
            'success' => true,
            'has_company' => !!$company,
            'data' => $company
        ]);
    }
}
