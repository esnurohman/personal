<?php

use App\Http\Controllers\Admin\PendidikanController;
use App\Http\Controllers\Admin\ProfilController;
use App\Http\Controllers\Admin\ProjectsController;
use App\Http\Controllers\Admin\SkillsController;
use App\Http\Controllers\ContactsController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;


Route::get('test', function () {
    return Inertia::render('dashboard/index');
});

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::resource('admin/profil', ProfilController::class)->except('show');
    Route::resource('admin/skills', SkillsController::class)->except('show');
    Route::resource('admin/projects', ProjectsController::class);
    Route::get('admin/contacts', [DashboardController::class, 'pesanMasuk'])->name('admin.contacts');
    Route::get('admin/contacts/{contact}', [ContactsController::class, 'show'])->name('contacts.show');
    Route::delete('admin/contacts/{contact}', [ContactsController::class, 'destroy'])->name('contacts.destroy');
    // Route::resource('admin/pendidikan', PendidikanController::class)->except('show');
});

Route::group([], function () {
    Route::get('/', [HomeController::class, 'index'])->name('home');
    Route::get('/about', [HomeController::class, 'aboutPage'])->name('about.page');
    Route::get('/portfolio', [HomeController::class, 'portfolioPage'])->name('portfolio.index');
    Route::get('/portfolio/{project}', [HomeController::class, 'portfolioDetailPage'])
    ->name('portfolio.show');

    Route::post('/contact', [ContactsController::class, 'store'])->middleware('throttle:contact')->name('contact.store');
});

// Route::get('/deploy-helper', function () {
//     // Jalankan migrasi database
//     Artisan::call('migrate --force');
    
//     // Buat symbolic link untuk storage
//     Artisan::call('storage:link');
    
//     // Clear cache
//     Artisan::call('config:cache');
//     Artisan::call('route:cache');
//     Artisan::call('view:cache');

//     return "Deploy commands executed successfully!";
// });

require __DIR__.'/settings.php';