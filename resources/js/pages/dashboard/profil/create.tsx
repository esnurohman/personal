import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Profil',
        href: '/admin/profil',
    },
    {
        title: 'Tambah',
        href: '/admin/profil/create',
    },
];

// type ProfileTypeForm = {
//     full_name: string;
//     job_title: string;
//     bio: string;
//     photo: string;
//     location: string;
//     cv_url: string;
// };

export default function ProfilCreate() {
    // const profilName = useRef<HTMLInputElement>(null);

    const { data, setData, errors, post, reset, processing } = useForm({
        full_name: '',
        job_title: '',
        bio: '',
        photo: null as File | null,
        location: '',
        cv_url: '',
    });

    const createProfil: FormEventHandler = (e) => {
        e.preventDefault();
        console.log(data);

        post(route('profil.store'), {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                reset();
            },
            // onError: (errors) => {
            //     console.log(errors);
            // },
        });
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah data profil" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <form
                    onSubmit={createProfil}
                    className="space-y-6"
                    encType="multipart/form-data"
                >
                    <Card>
                        <CardContent className="space-y-6 pt-6">
                            <div className="grid gap-2">
                                <Label htmlFor="full_name">Full Name *</Label>
                                <Input
                                    id="full_name"
                                    // ref={profilName}
                                    value={data.full_name}
                                    onChange={(e) =>
                                        setData('full_name', e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                />

                                <InputError message={errors.full_name} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="photo">Photo</Label>

                                <Input
                                    id="photo"
                                    accept="image/*"
                                    // value={data.photo ? data.photo.name : ''}
                                    onChange={(e) =>
                                        setData(
                                            'photo',
                                            e.target.files?.[0] ?? null,
                                        )
                                    }
                                    className="mt-1 block w-full"
                                    type="file"
                                />

                                <InputError message={errors.photo} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="job_title">
                                    Job Title Name *
                                </Label>

                                <Input
                                    id="job_title"
                                    // ref={profilName}
                                    value={data.job_title}
                                    onChange={(e) =>
                                        setData('job_title', e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                />

                                <InputError message={errors.job_title} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="bio">Bio *</Label>

                                <Textarea
                                    id="bio"
                                    // ref={profilName}
                                    value={data.bio}
                                    onChange={(e) =>
                                        setData('bio', e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                />

                                <InputError message={errors.bio} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="bio">Location *</Label>

                                <Input
                                    id="location"
                                    // ref={profilName}
                                    value={data.location}
                                    onChange={(e) =>
                                        setData('location', e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                />

                                <InputError message={errors.location} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="cv_url">CV Url*</Label>

                                <Input
                                    id="cv_url"
                                    // ref={profilName}
                                    value={data.cv_url}
                                    onChange={(e) =>
                                        setData('cv_url', e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                />

                                <InputError message={errors.cv_url} />
                            </div>
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
