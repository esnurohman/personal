<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use App\Models\Project;
use App\Models\Skill;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        // dd(Profile::all()->first());
        return Inertia::render('home/index', [
            'imgProjects' => Project::where('image')->get()->take(3),
            'projects' => Project::with('skills')->latest()->take(3)->get(),
            'skills' => Skill::all(),
            'profil' => Profile::all()->first(),
        ]);
    }
    public function aboutPage()
    {
        // dd(Profile::first());
        return Inertia::render('home/profile/index', [
            'profil' => Profile::first(),
        ]);
    }

    public function portfolioPage()
    {
        $projects = Project::with('skills')->latest()->paginate(9);
        return Inertia::render('home/portfolio/index', [
            'projects' => $projects
        ]);
    }
    public function portfolioDetailPage(Project $project)
    {
        $project->load('skills');
        // dd($project);
        return Inertia::render('home/portfolio/show', [
            'project' => $project
        ]);
    }
}