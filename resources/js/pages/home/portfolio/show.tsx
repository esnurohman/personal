import FloatingButton from '@/components/floating-button';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';

interface ISkill {
    id: number;
    name: string;
    icon?: string;
    level: number;
}

interface IProject {
    id: number;
    title: string;
    short_description: string;
    description: string;
    image: string;
    project_url: string;
    repository_url: string;
    type: string;
    development_type: string;
    skills: ISkill[];
    //     skills: {
    //         name: string;
    //         icon?: string;
    //         level: number;
    //     } | null;
}

export default function ProjectShow({ project }: { project: IProject }) {
    return (
        <div className="bg-white font-ubuntu">
            {/* HERO IMAGE */}
            <section className="relative h-[70vh]">
                {project.image && (
                    <img
                        src={`/storage/projects/${project.image}`}
                        alt={project.title}
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                )}

                <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30" />

                <div className="relative z-10 flex h-full items-end">
                    <div className="container mx-auto px-6 pb-16 text-white">
                        <h1 className="text-4xl font-bold md:text-5xl">
                            {project.title}
                        </h1>

                        <p className="mt-4 max-w-2xl text-gray-200">
                            {project.short_description}
                        </p>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <span className="rounded-full bg-green-600 px-3 py-1 text-sm uppercase">
                                {project.development_type}
                            </span>
                            <span className="rounded-full bg-white/20 px-3 py-1 text-sm uppercase">
                                {project.type}
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* CONTENT */}
            <section className="container mx-auto max-w-4xl px-6 py-20">
                {/* Description */}
                <div className="mb-14">
                    <h2 className="mb-4 text-2xl font-semibold">
                        Tentang Project
                    </h2>
                    <p className="leading-relaxed whitespace-pre-line text-gray-600">
                        {project.description}
                    </p>
                </div>

                {/* Tech Stack */}
                {Array.isArray(project.skills) && (
                    <div className="mb-14">
                        <h3 className="mb-3 font-semibold">Tech Stack</h3>
                        <div className="flex flex-wrap gap-2">
                            {project.skills.map((skill: ISkill) => (
                                <span
                                    key={skill.id}
                                    className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700"
                                >
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* CTA */}
                <div className="flex flex-wrap gap-4">
                    {project.project_url && (
                        <Button asChild className="bg-green-600">
                            <a href={project.project_url} target="_blank">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Live Demo
                            </a>
                        </Button>
                    )}

                    {project.repository_url && (
                        <Button variant="outline" asChild>
                            <a href={project.repository_url} target="_blank">
                                <Github className="mr-2 h-4 w-4" />
                                Source Code
                            </a>
                        </Button>
                    )}
                </div>

                {/* BACK */}
                <div className="mt-16">
                    <Button
                        variant="ghost"
                        onClick={() => window.history.back()}
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Kembali
                    </Button>
                </div>
            </section>
            <FloatingButton />
        </div>
    );
}
