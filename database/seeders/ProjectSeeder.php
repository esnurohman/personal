<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::first();

        if (! $user) {
            $this->command->error('User belum ada. Jalankan UserSeeder dulu.');
            return;
        }

        Project::factory()
            ->count(6)
            ->create([
                'user_id' => $user->id,
            ]);
    }
}