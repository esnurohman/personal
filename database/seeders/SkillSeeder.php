<?php

namespace Database\Seeders;

use App\Models\Skill;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;

class SkillSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // $faker = Faker::create('id_ID');
 
    	// for($i = 1; $i <= 50; $i++){
 
    	//       // insert data ke table pegawai menggunakan Faker
    	// 	DB::table('skills')->insert([
    	// 		'user_id' => $faker->number(1),
    	// 		'name' => $faker->name,
    	// 		'icon' => $faker->icon,
    	// 		'level' => $faker->address
    	// 	]);
        // }
        // Ambil user pertama (admin)
        $user = User::first();

        if (! $user) {
            $this->command->error('User belum ada. Jalankan UserSeeder dulu.');
            return;
        }

        $skills = [
            [
                'name' => 'Laravel',
                'icon' => 'laravel',
                'level' => 90,
            ],
            [
                'name' => 'React',
                'icon' => 'react',
                'level' => 85,
            ],
            [
                'name' => 'Tailwind CSS',
                'icon' => 'tailwind',
                'level' => 88,
            ],
            [
                'name' => 'MySQL',
                'icon' => 'database',
                'level' => 80,
            ],
        ];

        foreach ($skills as $skill) {
            Skill::updateOrCreate(
                [
                    'user_id' => $user->id,
                    'name' => $skill['name'],
                ],
                [
                    'icon' => $skill['icon'],
                    'level' => $skill['level'],
                ]
            );
        }
    
    }
}