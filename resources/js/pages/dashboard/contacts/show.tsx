import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { route } from 'ziggy-js';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pesan Masuk',
        href: '/admin/contacts',
    },
];

interface MessageProps {
    message: {
        id: number;
        name: string;
        email: string;
        message: string;
        created_at_human: string;
    };
}

export default function ShowMessage({ message }: MessageProps) {
    const deleteMessage = (id: number) => {
        if (confirm('Are you sure?')) {
            router.delete(route('contacts.destroy', { id }));
            // Alert sudah ditangani oleh Inertia/Laravel flash messages
        }
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pesan Masuk" />
            <div className="flex justify-center p-8">
                <Head title="Detail Pesan" />

                <Card className="w-full max-w-2xl shadow-lg">
                    <CardHeader>
                        <div className="flex items-start justify-between">
                            <div>
                                <CardTitle className="text-2xl font-bold">
                                    Detail Pesan
                                </CardTitle>
                                <CardDescription>
                                    Dikirim {message.created_at_human}
                                </CardDescription>
                            </div>
                            <Link href="/admin/contacts">
                                <Button variant="outline" size="sm">
                                    Kembali
                                </Button>
                            </Link>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {/* Bagian Nama */}
                        <div className="space-y-1">
                            <Label className="text-muted-foreground">
                                Pengirim
                            </Label>
                            <p className="text-lg font-medium">
                                {message.name}
                            </p>
                        </div>

                        <Separator />

                        {/* Bagian Email */}
                        <div className="space-y-1">
                            <Label className="text-muted-foreground">
                                Alamat Email
                            </Label>
                            <p className="text-md text-blue-600 underline">
                                {message.email}
                            </p>
                        </div>

                        <Separator />

                        {/* Bagian Isi Pesan */}
                        <div className="space-y-1">
                            <Label className="text-muted-foreground">
                                Isi Pesan
                            </Label>
                            <div className="rounded-lg border bg-muted/50 p-4">
                                <p className="leading-relaxed whitespace-pre-wrap text-foreground">
                                    {message.message}
                                </p>
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter className="flex justify-end gap-2 bg-muted/20 py-4">
                        <Button
                            variant="destructive"
                            onClick={() => deleteMessage(message.id)}
                        >
                            Hapus Pesan
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </AppLayout>
    );
}
