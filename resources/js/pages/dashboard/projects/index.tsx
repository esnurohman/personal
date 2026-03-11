import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from '@/components/ui/empty';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import {
    FolderCodeIcon,
    LucideSquarePlus,
    MoreHorizontalIcon,
} from 'lucide-react';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Projects / Portfolio',
        href: '/admin/projects',
    },
];

type ProjectType = {
    id: number;
    title: string;
    description: string;
    image: string;
    project_url: string;
    repository_url: string;
    type: string;
    development_type: string;
    is_published: boolean;
    skills: { id: number; name: string }[];
};
export default function Project({ projects }: { projects: ProjectType[] }) {
    const deleteProject = (id: number) => {
        if (confirm('Are you sure?')) {
            router.delete(route('projects.destroy', { id }));
            // Alert sudah ditangani oleh Inertia/Laravel flash messages
        }
    };

    if (!projects || (Array.isArray(projects) && projects.length === 0)) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Project" />
                <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                    <Empty>
                        <EmptyHeader>
                            <EmptyMedia variant="icon">
                                <FolderCodeIcon />
                            </EmptyMedia>
                            <EmptyTitle>Belum ada data</EmptyTitle>
                            <EmptyDescription>
                                Kamu belum membuat data projects atau portfolio,
                                silahkan mulai tambahkan data portfoliomu.
                            </EmptyDescription>
                        </EmptyHeader>
                        <EmptyContent>
                            <div className="flex gap-2">
                                <Link href="/admin/projects/create">
                                    <Button variant="outline">
                                        <LucideSquarePlus />
                                        Tambah data
                                    </Button>
                                </Link>
                            </div>
                        </EmptyContent>
                    </Empty>
                </div>
            </AppLayout>
        );
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Projects" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* HEADER */}
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Projects / Portfolio
                    </h1>
                    <p className="text-muted-foreground">
                        Daftar projects / portfolio
                    </p>
                </div>
                <Link href="/admin/projects/create">
                    <Button variant="outline">
                        <LucideSquarePlus />
                        Tambah data
                    </Button>
                </Link>

                <div className="w-full p-4">
                    {/* ['full_name', 'job_title', 'bio', 'photo', 'location', 'cv_url'] */}

                    <Table>
                        <TableCaption>
                            A list of your recent projects.
                        </TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">
                                    Project title
                                </TableHead>
                                <TableHead>Skills</TableHead>
                                <TableHead className="text-right">
                                    Action
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {projects.map((project) => (
                                <TableRow key={project.id}>
                                    <TableCell className="font-medium">
                                        {project.title}
                                    </TableCell>
                                    <TableCell>
                                        {project.skills.map((skill) => (
                                            <div key={skill.id}>
                                                {skill.name}
                                            </div>
                                        ))}
                                    </TableCell>

                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="size-8"
                                                >
                                                    <MoreHorizontalIcon />
                                                    <span className="sr-only">
                                                        Open menu
                                                    </span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <Link
                                                    href={`/portfolio/${project.id}`}
                                                >
                                                    <DropdownMenuItem>
                                                        Show
                                                    </DropdownMenuItem>
                                                </Link>
                                                <Link
                                                    href={`/admin/projects/${project.id}/edit`}
                                                >
                                                    <DropdownMenuItem>
                                                        Edit
                                                    </DropdownMenuItem>
                                                </Link>

                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                    variant="destructive"
                                                    onClick={() =>
                                                        deleteProject(
                                                            project.id,
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
