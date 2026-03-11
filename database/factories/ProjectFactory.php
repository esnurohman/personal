<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = $this->faker->sentence(3);
        return [
            'user_id' => User::first()?->id ?? User::factory(),
            'title' => $title,
            // 'slug' => Str::slug($title) . '-' . $this->faker->unique()->numberBetween(100, 999),
            'description' => $this->faker->paragraphs(3, true),
            'image' => 'storage/projects/' . $this->faker->image . '.png',
            'type' => $this->faker->randomElement(['web', 'mobile', 'desktop']),
            'development_type' => $this->faker->randomElement(['frontend', 'backend', 'fullstack']),
            'is_published' => true,
            // 'published_at' => now()->subDays(rand(1, 180)),
            'project_url' => $this->faker->url,
            'repository_url' => $this->faker->url
        ];
    }
}