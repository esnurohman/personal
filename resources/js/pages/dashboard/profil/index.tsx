import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { FolderCodeIcon, LucideSquarePlus } from 'lucide-react';

import Info from '@/components/info';
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from '@/components/ui/empty';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Profil',
        href: '/admin/profil',
    },
];

type Profiltype = {
    id: number;
    full_name: string;
    job_title: string;
    bio: string;
    photo: string;
    location: string;
    cv_url: string;
};

export default function Profil({ profil }: { profil: Profiltype }) {
    if (!profil || (Array.isArray(profil) && profil.length === 0)) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Profil" />
                <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                    <Empty>
                        <EmptyHeader>
                            <EmptyMedia variant="icon">
                                <FolderCodeIcon />
                            </EmptyMedia>
                            <EmptyTitle>Belum ada data</EmptyTitle>
                            <EmptyDescription>
                                Kamu belum membuat data profil, silahkan mulai
                                buat data profilmu.
                            </EmptyDescription>
                        </EmptyHeader>
                        <EmptyContent>
                            <div className="flex gap-2">
                                <Link href="/admin/profil/create">
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
            <Head title="Profil" />

            <div className="max-w-5xl space-y-8 p-6">
                {/* HEADER */}
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Profil
                    </h1>
                    <p className="text-muted-foreground">
                        Informasi profil yang ditampilkan di website
                    </p>
                </div>

                {/* TOP SECTION */}
                <div className="grid gap-6 md:grid-cols-3">
                    {/* PHOTO */}
                    <Card className="md:col-span-1">
                        <CardContent className="flex flex-col items-center pt-6 text-center">
                            <img
                                src={`/storage/profils/${profil.photo}`}
                                alt={profil.full_name}
                                className="h-32 w-32 rounded-full object-cover ring-4 ring-primary/20"
                            />

                            <h2 className="mt-4 text-xl font-semibold">
                                {profil.full_name}
                            </h2>

                            <p className="text-sm text-muted-foreground">
                                {profil.job_title}
                            </p>
                            <Link href={`/admin/profil/${profil.id}/edit`}>
                                <Button className="mt-4 w-full">
                                    Edit Profil
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    {/* INFO */}
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Informasi Dasar</CardTitle>
                            <CardDescription>
                                Data utama tentang kamu
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="grid gap-4 sm:grid-cols-2">
                            <Info
                                label="Nama Lengkap"
                                value={profil.full_name}
                            />
                            <Info label="Job Title" value={profil.job_title} />
                            <Info label="Lokasi" value={profil.location} />

                            <div className="sm:col-span-2">
                                <Info
                                    label="CV"
                                    value={
                                        profil.cv_url ? (
                                            <a
                                                href={profil.cv_url}
                                                target="_blank"
                                                className="text-primary underline"
                                            >
                                                Lihat CV
                                            </a>
                                        ) : (
                                            '-'
                                        )
                                    }
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* BIO */}
                <Card>
                    <CardHeader>
                        <CardTitle>Bio</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <p className="leading-relaxed whitespace-pre-line text-muted-foreground">
                            {profil.bio}
                        </p>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
