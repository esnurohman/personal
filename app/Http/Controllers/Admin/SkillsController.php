<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SkillsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('dashboard/skill/index', [
            'skills' => Skill::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('dashboard/skill/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'icon' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'level' => 'required',
        ]);
        $data = $validated;
        $data['user_id'] = Auth::user()->id;

        $image = $request->file('icon');
        $image->storeAs('skills', $image->hashName());
        $data['icon'] = $image->hashName();
        
        Skill::create($data);
        return redirect()->route('skills.index')->with('success', 'Skill created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return Inertia::render('dashboard/skill/edit', [
            'skill' => Skill::findOrFail($id),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'name' => 'required',
            'icon' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'level' => 'required',
        ]);
        $data = $validated;
        $skill = Skill::findOrFail($id);
        $data['user_id'] = Auth::user()->id;

        if ($request->hasFile('icon')) {
            Storage::delete('skills/'.$skill->icon);
            $image = $request->file('icon');
            $image->storeAs('skills', $image->hashName());
            $data['icon'] = $image->hashName();
        } else {
            unset($data['icon']);
        }
        
        $skill->update($data);
        return redirect()->route('skills.index')->with('success', 'Skill updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $skill = Skill::findorfail($id);
        Storage::delete('skills/'.$skill->icon);
        $skill->delete();
        return redirect()->route('skills.index')->with('success', 'Skill deleted successfully.');
    }
}