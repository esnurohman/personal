import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';

interface IProject {
    id: number;
    title: string;
    description: string;
    type: string;
    development_type: string;
    is_published: boolean;
    skills: ISkill[];
}

interface ISkill {
    id: number;
    name: string;
}

export default function Edit({ project }: { project: IProject }) {
    const { data, setData, put, processing, errors } = useForm({
        title: project.title || '',
        description: project.description || '',
        type: project.type || 'web',
        development_type: project.development_type || 'fullstack',
        is_published: project.is_published ?? false,
        skills: project.skills.map((s: ISkill) => s.id),
    });
    const skills = project.skills;

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('projects.update', project.id));
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Projects', href: '/admin/projects' },
                { title: 'Edit', href: '#' },
            ]}
        >
            <Head title="Edit Project" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <form onSubmit={submit} className="max-w-3xl space-y-6">
                    {/* HEADER */}
                    <Head title="Edit Project" />
                    <h1 className="text-2xl font-bold">Edit Project</h1>

                    {/* TITLE */}
                    <div>
                        <Input
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            placeholder="Judul project"
                        />
                        {errors.title && (
                            <p className="text-sm text-red-500">
                                {errors.title}
                            </p>
                        )}
                    </div>

                    {/* DESCRIPTION */}
                    <div>
                        <Textarea
                            value={data.description}
                            onChange={(e) =>
                                setData('description', e.target.value)
                            }
                            placeholder="Deskripsi project"
                        />
                    </div>

                    {/* TYPE */}
                    <select
                        value={data.type}
                        onChange={(e) => setData('type', e.target.value)}
                        className="w-full rounded border p-2"
                    >
                        <option value="web">Web</option>
                        <option value="mobile">Mobile</option>
                        <option value="desktop">Desktop</option>
                    </select>

                    {/* DEVELOPMENT TYPE */}
                    <select
                        value={data.development_type}
                        onChange={(e) =>
                            setData('development_type', e.target.value)
                        }
                        className="w-full rounded border p-2"
                    >
                        <option value="frontend">Frontend</option>
                        <option value="backend">Backend</option>
                        <option value="fullstack">Fullstack</option>
                    </select>

                    {/* SKILLS */}
                    <div>
                        <p className="mb-2 font-medium">Skills</p>
                        <div className="grid grid-cols-2 gap-3">
                            {skills.map((skill) => (
                                <label
                                    key={skill.id}
                                    className="flex items-center gap-2"
                                >
                                    <Checkbox
                                        checked={data.skills.includes(skill.id)}
                                        onCheckedChange={(checked) => {
                                            if (checked) {
                                                setData('skills', [
                                                    ...data.skills,
                                                    skill.id,
                                                ]);
                                            } else {
                                                setData(
                                                    'skills',
                                                    data.skills.filter(
                                                        (id: number) =>
                                                            id !== skill.id,
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

                    {/* PUBLISHED */}
                    <label className="flex items-center gap-2">
                        <Checkbox
                            checked={data.is_published}
                            onCheckedChange={(val) =>
                                setData('is_published', Boolean(val))
                            }
                        />
                        Publish project
                    </label>

                    <Button type="submit" disabled={processing}>
                        {processing ? 'Menyimpan...' : 'Update Project'}
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
