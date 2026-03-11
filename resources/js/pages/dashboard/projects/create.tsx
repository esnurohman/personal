import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Projects',
        href: '/admin/projects',
    },
    {
        title: 'Tambah',
        href: '/admin/projects/create',
    },
];

type Skill = {
    id: number;
    name: string;
};

export default function ProjectsCreate({ skills }: { skills: Skill[] }) {
    // const profilName = useRef<HTMLInputElement>(null);
    // console.log(skills);
    const { data, setData, errors, post, reset, processing } = useForm({
        title: '',
        description: '',
        image: null as File | null,
        project_url: '',
        repository_url: '',
        type: 'web',
        development_type: 'fullstack',
        is_published: false,
        skills: [] as number[],
    });

    const createProject: FormEventHandler = (e) => {
        e.preventDefault();
        console.log(data);

        post(route('projects.store'), {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                reset();
            },
            onError: (errors) => {
                console.log(errors);
            },
        });
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create data Project" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <form
                    onSubmit={createProject}
                    className="space-y-6"
                    encType="multipart/form-data"
                >
                    <Card>
                        <CardContent className="space-y-6 pt-6">
                            <div className="grid gap-2">
                                <Label htmlFor="title">Title Name *</Label>
                                <Input
                                    id="title"
                                    // ref={profiltitle}
                                    value={data.title}
                                    onChange={(e) =>
                                        setData('title', e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                />

                                <InputError message={errors.title} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="image">Photo</Label>

                                <Input
                                    id="image"
                                    accept="image/*"
                                    // value={data.photo ? data.photo.name : ''}
                                    onChange={(e) =>
                                        setData(
                                            'image',
                                            e.target.files?.[0] ?? null,
                                        )
                                    }
                                    className="mt-1 block w-full"
                                    type="file"
                                />

                                <InputError message={errors.image} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="description">
                                    Description *
                                </Label>

                                <Textarea
                                    id="description"
                                    // ref={profilName}
                                    value={data.description}
                                    onChange={(e) =>
                                        setData('description', e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                />

                                <InputError message={errors.description} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="project_url">
                                    project_url *
                                </Label>

                                <Input
                                    id="project_url"
                                    // ref={profilName}
                                    value={data.project_url}
                                    onChange={(e) =>
                                        setData('project_url', e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                />

                                <InputError message={errors.project_url} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="repository_url">
                                    repository_url *
                                </Label>

                                <Input
                                    id="repository_url"
                                    // ref={profilName}
                                    value={data.repository_url}
                                    onChange={(e) =>
                                        setData(
                                            'repository_url',
                                            e.target.value,
                                        )
                                    }
                                    className="mt-1 block w-full"
                                />

                                <InputError message={errors.repository_url} />
                            </div>
                            <div className="grid gap-2">
                                <Label>Type</Label>

                                <Select
                                    value={data.type}
                                    onValueChange={(value) =>
                                        setData('type', value)
                                    }
                                >
                                    <SelectTrigger
                                        className={
                                            errors.type ? 'border-red-500' : ''
                                        }
                                    >
                                        <SelectValue placeholder="Pilih type" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value="web">Web</SelectItem>
                                        <SelectItem value="mobile">
                                            Mobile
                                        </SelectItem>
                                        <SelectItem value="desktop">
                                            Desktop
                                        </SelectItem>
                                    </SelectContent>
                                </Select>

                                {errors.type && (
                                    <p className="text-sm text-red-500">
                                        {errors.type}
                                    </p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label>Development Type</Label>

                                <Select
                                    value={data.development_type}
                                    onValueChange={(value) =>
                                        setData('development_type', value)
                                    }
                                >
                                    <SelectTrigger
                                        className={
                                            errors.development_type
                                                ? 'border-red-500'
                                                : ''
                                        }
                                    >
                                        <SelectValue placeholder="Pilih role" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value="frontend">
                                            Frontend
                                        </SelectItem>
                                        <SelectItem value="backend">
                                            Backend
                                        </SelectItem>
                                        <SelectItem value="fullstack">
                                            Fullstack
                                        </SelectItem>
                                    </SelectContent>
                                </Select>

                                {errors.development_type && (
                                    <p className="text-sm text-red-500">
                                        {errors.development_type}
                                    </p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label>Publish</Label>

                                <Switch
                                    checked={data.is_published}
                                    onCheckedChange={(checked) =>
                                        setData('is_published', checked)
                                    }
                                />

                                {errors.is_published && (
                                    <p className="text-sm text-red-500">
                                        {errors.is_published}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="font-medium">Skills</label>

                                <div className="flex flex-wrap gap-3">
                                    {skills.map((skill) => (
                                        <label
                                            key={skill.id}
                                            className="flex items-center gap-2"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={data.skills.includes(
                                                    skill.id,
                                                )}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setData('skills', [
                                                            ...data.skills,
                                                            skill.id,
                                                        ]);
                                                    } else {
                                                        setData(
                                                            'skills',
                                                            data.skills.filter(
                                                                (id) =>
                                                                    id !==
                                                                    skill.id,
                                                            ),
                                                        );
                                                    }
                                                }}
                                            />
                                            {skill.name}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {errors.skills && (
                                <p className="text-sm text-red-500">
                                    {errors.skills}
                                </p>
                            )}
                        </CardContent>

                        <CardFooter>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Menyimpan...' : 'Simpan'}
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
