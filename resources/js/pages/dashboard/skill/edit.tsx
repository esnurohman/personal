import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Skills',
        href: '/admin/skills',
    },
    {
        title: 'Update',
        href: '#',
    },
];

interface ISkill {
    id: number;
    name: string;
    icon: string;
    level: number;
}

export default function SkillUpdate({ skill }: { skill: ISkill }) {
    // const profilName = useRef<HTMLInputElement>(null);

    const { data, setData, errors, put, processing } = useForm({
        name: skill.name || '',
        icon: null as File | null,
        level: skill.level || 0,
    });

    const updateSkill = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('skills.update', skill.id), {
            preserveScroll: true,
            forceFormData: true,
        });
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Update data skills" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* HEADER */}
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Perbarui Skill
                    </h1>
                </div>
                <form
                    onSubmit={updateSkill}
                    className="space-y-6"
                    encType="multipart/form-data"
                >
                    <Card>
                        <CardContent className="space-y-6 pt-6">
                            <div className="grid gap-2">
                                <Label htmlFor="full_name">Skill Name *</Label>
                                <Input
                                    id="name"
                                    // ref={profilName}
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                />

                                <InputError message={errors.name} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="icon">Icon</Label>

                                <Input
                                    id="icon"
                                    accept="image/*"
                                    // value={data.photo ? data.photo.name : ''}
                                    onChange={(e) =>
                                        setData(
                                            'icon',
                                            e.target.files?.[0] ?? null,
                                        )
                                    }
                                    className="mt-1 block w-full"
                                    type="file"
                                />

                                <InputError message={errors.icon} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="level">level *</Label>

                                <Input
                                    id="level"
                                    // ref={profilName}
                                    value={data.level}
                                    onChange={(e) =>
                                        setData('level', Number(e.target.value))
                                    }
                                    className="mt-1 block max-w-sm"
                                    type="number"
                                />

                                <InputError message={errors.level} />
                            </div>
                        </CardContent>

                        <CardFooter>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Memperbarui...' : 'Perbarui'}
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => router.back()}
                            >
                                ← Kembali
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </AppLayout>
    );
}
