<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Models\Project;
use App\Models\Skill;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
    //     $projectsPerMonth = Project::selectRaw('COUNT(*) as total, MONTH(created_at) as month')
    //     ->whereYear('created_at', now()->year)
    //     ->groupBy('month')
    //     ->orderBy('month')
    //     ->get()
    //     ->map(fn ($item) => [
    //         'month' => Carbon::create()->month($item->month)->format('M'),
    //         'total' => $item->total,
    //     ]);

    // return Inertia::render('dashboard/index', [
    //     'stats' => [
    //         'projects' => Project::count(),
    //         'skills' => Skill::count(),
    //         'contacts' => Contact::count(),
    //     ],
    //     'projectsChart' => $projectsPerMonth,
    // ]);
     $year = now()->year;

    // Ambil data dari database
    $rawData = Project::selectRaw('
            MONTH(created_at) as month,
            COUNT(*) as total,
            SUM(CASE WHEN is_published = 1 THEN 1 ELSE 0 END) as published
        ')
        ->whereYear('created_at', $year)
        ->groupBy('month')
        ->orderBy('month')
        ->get()
        ->keyBy('month');

    // Generate 12 bulan lengkap
    $projectsPerMonth = collect(range(1, 12))->map(function ($month) use ($rawData) {

        $data = $rawData->get($month);

        return [
            'month' => Carbon::create()->month($month)->translatedFormat('M'),
            'total' => $data->total ?? 0,
            'published' => $data->published ?? 0,
        ];
    });

    return Inertia::render('dashboard/index', [
        'stats' => [
            'projects' => Project::count(),
            'skills' => Skill::count(),
            'contacts' => Contact::count(),
        ],
        'projectsChart' => $projectsPerMonth,
    ]);
    }

    public function pesanMasuk()
    {
        return Inertia::render('dashboard/contacts/index', [
            'contacts' => Contact::latest()->take(10)->get(),
        ]);
    }
}