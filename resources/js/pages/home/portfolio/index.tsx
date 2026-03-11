import FloatingButton from '@/components/floating-button';
import { Link } from '@inertiajs/react';
import { ArrowRight, Menu, MoveLeft, X } from 'lucide-react';
import { useState } from 'react';
import { route } from 'ziggy-js';
interface ISkill {
    id: number;
    name: string;
    icon?: string;
    level: number;
}

interface IPortfolio {
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
    links: LinkType[];
}
interface LinkType {
    url: string;
    label: string;
    active: boolean;
}
export default function ProjectsIndex({
    projects,
}: {
    projects: IPortfolio[];
}) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="bg-white">
            {/* navbar */}
            <div className="container mx-auto px-6">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <a href="/" className="text-xl font-bold text-green-400">
                        Eep.<span className="text-gray-900">dev</span>
                    </a>

                    {/* Desktop Menu */}
                    <nav className="hidden items-center gap-8 md:flex">
                        <Link
                            href={route('home')}
                            className="flex items-center gap-1 hover:text-green-600"
                        >
                            <MoveLeft /> Back to Home
                        </Link>
                    </nav>

                    {/* Mobile Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden"
                    >
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="border-t bg-white shadow-lg transition-all duration-300 ease-in-out md:hidden">
                    <nav className="flex flex-col space-y-4 px-6 py-4">
                        <Link
                            href={route('home')}
                            className="flex items-center gap-1 hover:text-green-600"
                        >
                            <MoveLeft /> Back to Home
                        </Link>
                    </nav>
                </div>
            )}

            {/* HERO */}
            <section className="relative bg-gradient-to-br from-green-600 via-green-500 to-emerald-600 py-28 text-white">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,white,transparent_40%)] opacity-20" />

                <div className="relative container mx-auto px-6 text-center">
                    <h1 className="text-4xl font-bold md:text-5xl">
                        My Projects
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-green-100">
                        Kumpulan project dan portfolio yang pernah saya
                        kerjakan, mulai dari frontend, backend, hingga
                        fullstack.
                    </p>
                </div>
            </section>

            {/* CONTENT */}
            <section className="container mx-auto px-6 py-20">
                {projects && projects.length === 0 ? (
                    <p className="text-center text-gray-500">
                        Belum ada project yang dipublikasikan.
                    </p>
                ) : (
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {projects.data.map((project: IPortfolio) => (
                            <Link
                                key={project.id}
                                href={route('portfolio.show', project.id)}
                                className="group overflow-hidden rounded-2xl bg-white shadow-md transition hover:shadow-xl"
                            >
                                {/* Thumbnail */}
                                {project.image && (
                                    <img
                                        src={`/storage/projects/${project.image}`}
                                        alt={project.title}
                                        className="h-48 w-full object-cover transition duration-300 group-hover:scale-105"
                                    />
                                )}

                                {/* Content */}
                                <div className="space-y-4 p-6">
                                    <h3 className="text-xl font-semibold text-gray-900">
                                        {project.title}
                                    </h3>

                                    <p className="line-clamp-3 text-sm text-gray-600">
                                        {project.short_description}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2">
                                        {project.skills
                                            ?.slice(0, 4)
                                            .map((skill: ISkill) => (
                                                <span
                                                    key={skill.id}
                                                    className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-700"
                                                >
                                                    {skill.name}
                                                </span>
                                            ))}
                                    </div>

                                    <div className="flex items-center pt-2 text-sm font-medium text-green-600">
                                        Lihat Detail
                                        <ArrowRight className="ml-1 h-4 w-4 transition group-hover:translate-x-1" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {/* PAGINATION */}
                {/* {projects.links?.length > 3 && (
                    <div className="mt-16 flex justify-center gap-2">
                        {projects.links.map((link: any, index: number) => (
                            <Link
                                key={index}
                                href={link.url ?? '#'}
                                preserveScroll
                                className={`rounded-lg px-4 py-2 text-sm ${
                                    link.active
                                        ? 'bg-green-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                } ${!link.url && 'pointer-events-none opacity-50'}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )} */}
            </section>
            {/* FOOTER */}
            <footer className="border-t py-6 text-center text-sm text-muted-foreground">
                © {new Date().getFullYear()} Eep Syaiful Nurohman
            </footer>
            <FloatingButton />
        </div>
    );
}
