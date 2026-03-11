import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { route } from 'ziggy-js';

interface Skill {
    id: number;
    name: string;
}

interface IProject {
    id: number;
    title: string;
    slug: string;
    description: string;
    image?: string;
    type: string;
    development_type: string;
    skills: Skill[];
}
function Projects({ projects }: { projects: IProject[] }) {
    if (!projects || projects.length === 0) {
        return (
            <section className="py-24 text-center text-muted-foreground">
                Belum ada project yang ditampilkan
            </section>
        );
    }

    return (
        <section id="projects" className="bg-gray-50 py-24">
            <div className="container mx-auto px-6">
                {/* HEADER */}
                <div className="mb-12 max-w-xl">
                    <h2 className="text-3xl font-bold">Projects</h2>
                    <p className="mt-2 text-muted-foreground">
                        Beberapa project yang pernah saya kerjakan
                    </p>
                    <Link
                        href={route('portfolio.index')}
                        className="text-green-600 hover:text-green-500 hover:underline"
                    >
                        Lebih banyak {`>>`}
                    </Link>
                </div>

                {/* GRID */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-md"
                        >
                            {/* THUMBNAIL */}
                            {project.image ? (
                                <img
                                    src={`/storage/projects/${project.image}`}
                                    alt={project.title}
                                    className="h-48 w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-48 items-center justify-center bg-emerald-100 font-semibold text-emerald-700">
                                    No Image
                                </div>
                            )}

                            {/* CONTENT */}
                            <div className="space-y-4 p-6">
                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="secondary">
                                        {project.type.toUpperCase()}
                                    </Badge>
                                    <Badge variant="outline">
                                        {project.development_type}
                                    </Badge>
                                </div>

                                <h3 className="text-lg font-semibold">
                                    {project.title}
                                </h3>

                                <p className="line-clamp-3 text-sm text-muted-foreground">
                                    {project.description}
                                </p>

                                {/* TECH STACK */}
                                <div className="flex flex-wrap gap-2">
                                    {project.skills.map((skill) => (
                                        <Badge key={skill.id} variant="outline">
                                            {skill.name}
                                        </Badge>
                                    ))}
                                </div>

                                {/* ACTION */}
                                <div className="pt-4">
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={`/portfolio/${project.id}`}>
                                            Lihat Detail
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
export default Projects;
