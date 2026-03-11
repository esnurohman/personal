<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use App\Models\Profil;
use App\Models\Profile;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProfilController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $user = User::with('profil')->first();

        return Inertia::render('dashboard/profil/index', [
            'profil' => $user?->profil,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('dashboard/profil/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated =$request->validate([
            'full_name' => 'nullable',
            'job_title' => 'required',
            'bio' => 'required',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'location' => 'required',
            'cv_url' => 'nullable',
        ]);
        $data = $validated;
        // $request['user_id'] = Auth::user()->id;
        $data['user_id'] = Auth::user()->id;

        //upload image
        $image = $request->file('photo');
        $image->storeAs('profils', $image->hashName());
        
        Profile::create([
            'full_name' => $request->full_name,
            'user_id' => Auth::user()->id,
            'job_title' => $request->job_title,
            'bio' => $request->bio,
            'photo' => $image->hashName(),
            'location' => $request->location,
            'cv_url' => $request->cv_url,
        ]);

        return redirect()->route('profil.index')->with('success', 'Profil created successfully.');
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
    public function edit(Profile $profil)
    {
        // dd($profil);
        return Inertia::render('dashboard/profil/edit', [
            'profil' => $profil,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'full_name' => 'required',
            'job_title' => 'required',
            'bio' => 'required',
            'photo' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'location' => 'required',
            'cv_url' => 'required',
        ]);

        $profil = Profile::find($id);

        if ($request->hasFile('photo')) {
            // Hapus gambar lama jika ada
        if ($profil->photo) {
            Storage::delete('profils/'.$profil->photo);
        }
            $image = $request->file('photo');
            $image->storeAs('profils', $image->hashName());

            $profil->update([
                'full_name' => $request->full_name,
                'job_title' => $request->job_title,
                'bio' => $request->bio,
                'photo' => $image->hashName(),
                'location' => $request->location,
                'cv_url' => $request->cv_url,
            ]);
            } else {
            $profil->update([
                'full_name' => $request->full_name,
                'job_title' => $request->job_title,
                'bio' => $request->bio,
                'location' => $request->location,
                'cv_url' => $request->cv_url,
            ]);
        }

        return redirect()->route('profil.index')->with('success', 'Profil updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $profil = Profile::find($id);
        Storage::delete('profils/'.$profil->photo);
        $profil->delete();

        return redirect()->route('profil.index')->with('success', 'Profil deleted successfully.');
    }
}