<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Skill;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProjectsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // dd(Project::with('skills')->get());
        // return Project::with('skills')->get();
        return Inertia::render('dashboard/projects/index', [
            'projects' => Project::with('skills')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // return Skill::select('id', 'name')->get();
        return Inertia::render('dashboard/projects/create', [
        'skills' => Skill::select('id', 'name')->get(),
    ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    // $table->string('title');
    //         $table->text('description');
    //         $table->string('image')->nullable();
    //         $table->string('project_url')->nullable();
    //         $table->string('repository_url')->nullable();
    //         $table->enum('type', ['web', 'mobile', 'desktop'])->default('web');
    //         $table->enum('development_type', ['frontend', 'Backend', 'fullstack'])->default('fullstack');
    //         $table->boolean('is_published')->default(true);
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required',
            'description' => 'required',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'project_url' => 'nullable',
            'repository_url' => 'nullable',
            'type' => 'required|in:web,mobile,desktop',
            'development_type' => 'required|in:frontend,backend,fullstack',
            'is_published' => 'boolean',
            'skills' => 'required|array|min:1',
            'skills.*' => 'exists:skills,id',
        ]);
        $data = $validated;
        // $skillsProjects = new 
        $data['user_id'] = Auth::user()->id;
        
        //upload image
        $image = $request->file('image');
        $image->storeAs('projects', $image->hashName());
        $data['image'] = $image->hashName();

        

        $data = Project::create($data);
        $data->skills()->sync($validated['skills']);
        
        return redirect()->route('projects.index')->with('success', 'Project created successfully.');
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
    public function edit(Project $project)
    {
        return Inertia::render('dashboard/projects/edit', [
            'project' => $project->load('skills'),
            'skills' => Skill::orderBy('name')->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title' => 'required',
            'description' => 'required',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'project_url' => 'nullable',
            'repository_url' => 'nullable',
            'type' => 'required|in:web,mobile,desktop',
            'development_type' => 'required|in:frontend,backend,fullstack',
            'is_published' => 'boolean',
            'skills' => 'required|array|min:1',
            'skills.*' => 'exists:skills,id',
        ]);

    if ($request->hasFile('image')) {
        // Hapus gambar lama jika ada
        if ($project->image) {
            Storage::delete('projects/'.$project->image);
        }
        // Upload gambar baru
        $image = $request->file('image');
        $image->storeAs('projects', $image->hashName());
        $validated['image'] = $image->hashName();

        $project->update([
        'title' => $validated['title'],
        'description' => $validated['description'],
        'type' => $validated['type'],
        'development_type' => $validated['development_type'],
        'is_published' => $validated['is_published'] ?? false,
        'image' => $validated['image'],
        'project_url' => $validated['project_url'] ?? null,
        'repository_url' => $validated['repository_url'] ?? null,

    ]);
    } else {
        $project->update([
        'title' => $validated['title'],
        'description' => $validated['description'],
        'type' => $validated['type'],
        'development_type' => $validated['development_type'],
        'is_published' => $validated['is_published'] ?? false,
        'project_url' => $validated['project_url'] ?? null,
        'repository_url' => $validated['repository_url'] ?? null,
    ]);
    }

    // sync pivot
    $project->skills()->sync($validated['skills'] ?? []);

    return redirect()
        ->route('projects.index')
        ->with('success', 'Project berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $project = Project::findorfail($id);
        Storage::delete('projects/'.$project->image);
        $project->delete();
        return redirect()->route('projects.index')->with('success', 'Project deleted successfully.');
    }
}