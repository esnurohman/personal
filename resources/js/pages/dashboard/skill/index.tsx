import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import {
    FolderCodeIcon,
    LucideSquarePlus,
    MoreHorizontalIcon,
} from 'lucide-react';

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
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Skills',
        href: '/admin/skills',
    },
];

type SkillType = {
    id: number;
    name: string;
    icon: string;
    level: number;
};
export default function Skill({ skills }: { skills: SkillType[] }) {
    if (!skills || (Array.isArray(skills) && skills.length === 0)) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Skills" />
                <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                    <Empty>
                        <EmptyHeader>
                            <EmptyMedia variant="icon">
                                <FolderCodeIcon />
                            </EmptyMedia>
                            <EmptyTitle>Belum ada data</EmptyTitle>
                            <EmptyDescription>
                                Kamu belum menambah data keahlian, silahkan
                                mulai isi data keahlianmu.
                            </EmptyDescription>
                        </EmptyHeader>
                        <EmptyContent>
                            <div className="flex gap-2">
                                <Link href="/admin/skills/create">
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
    const deleteTask = (id: number) => {
        if (confirm('Are you sure?')) {
            router.delete(route('skills.destroy', { id }));
            // Alert sudah ditangani oleh Inertia/Laravel flash messages
        }
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Skill" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* HEADER */}
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Skill</h1>
                    <p className="text-muted-foreground">Daftar Keahlian</p>
                </div>
                <Link href="/admin/skills/create">
                    <Button variant="outline">
                        <LucideSquarePlus />
                        Tambah data
                    </Button>
                </Link>
                <div className="w-full p-4">
                    {/* ['full_name', 'job_title', 'bio', 'photo', 'location', 'cv_url'] */}

                    <Table>
                        <TableCaption>A list of your skills.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Icon</TableHead>
                                <TableHead className="w-[100px]">
                                    SkillName
                                </TableHead>
                                <TableHead>level</TableHead>
                                <TableHead className="text-right">
                                    Action
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {skills.map((skill) => (
                                <TableRow key={skill.id}>
                                    <TableCell className="font-medium">
                                        <img
                                            src={`/storage/skills/${skill.icon}`}
                                            alt={skill.name}
                                            className="h-8 w-8"
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {skill.name}
                                    </TableCell>
                                    <TableCell>{skill.level}</TableCell>
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
                                                    href={`/admin/skills/${skill.id}/edit`}
                                                >
                                                    <DropdownMenuItem>
                                                        Edit
                                                    </DropdownMenuItem>
                                                </Link>

                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                    variant="destructive"
                                                    onClick={() =>
                                                        deleteTask(skill.id)
                                                    }
                                                >
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {/* <TableRow>
                                <TableCell className="font-medium">
                                    abc
                                </TableCell>
                                <TableCell>123</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="outline">Edit</Button>
                                </TableCell>
                            </TableRow> */}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
