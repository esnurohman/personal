<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (User::count() === 0) {
            User::create([
                'name' => 'Eep Syaiful Nurohman',
                'email' => 'es.nurohman.5@gmail.com',
                'password' => Hash::make('Websiteku0102.'),
            ]);
        }
    }
}