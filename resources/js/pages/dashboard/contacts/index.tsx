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
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from '@/components/ui/empty';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { MessageSquareOff, MoreHorizontalIcon } from 'lucide-react';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pesan Masuk',
        href: '/admin/contacts',
    },
];
type ContactType = {
    id: number;
    name: string;
    email: string;
    message: string;
};

export default function pesanMasuk({ contacts }: { contacts: ContactType[] }) {
    const deleteMessage = (id: number) => {
        if (confirm('Are you sure?')) {
            router.delete(route('contacts.destroy', { id }));
            // Alert sudah ditangani oleh Inertia/Laravel flash messages
        }
    };

    if (!contacts || (Array.isArray(contacts) && contacts.length === 0)) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Pesan Masuk Kosong" />
                <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                    <Empty>
                        <EmptyHeader>
                            <EmptyMedia variant="icon">
                                <MessageSquareOff />
                            </EmptyMedia>
                            <EmptyTitle>Kosong</EmptyTitle>
                            <EmptyDescription>
                                Belum ada pesan.
                            </EmptyDescription>
                        </EmptyHeader>
                        {/* <EmptyContent>
                            <div className="flex gap-2">
                                <Link href="/admin/profil/create">
                                    <Button variant="outline">
                                        <LucideSquarePlus />
                                        Tambah data
                                    </Button>
                                </Link>
                            </div>
                        </EmptyContent> */}
                    </Empty>
                </div>
            </AppLayout>
        );
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pesan Masuk" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* HEADER */}
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Pesan Masuk
                    </h1>
                    <p className="text-muted-foreground">
                        Daftar pesan yang masuk melalui formulir kontak. Klik
                        "Show" untuk melihat detail pesan.
                    </p>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-1/6">Nama</TableHead>
                            <TableHead className="w-1/6">Email</TableHead>
                            <TableHead className="w-3/6">Pesan</TableHead>
                            <TableHead className="w-1/6 text-right">
                                Aksi
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {contacts.map((contact) => (
                            <TableRow key={contact.id}>
                                <TableCell className="font-medium">
                                    {contact.name}
                                </TableCell>
                                <TableCell>{contact.email}</TableCell>
                                <TableCell>{contact.message}</TableCell>
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
                                                href={`/admin/contacts/${contact.id}`}
                                            >
                                                <DropdownMenuItem>
                                                    Show
                                                </DropdownMenuItem>
                                            </Link>

                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem
                                                variant="destructive"
                                                onClick={() =>
                                                    deleteMessage(contact.id)
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
        </AppLayout>
    );
}
