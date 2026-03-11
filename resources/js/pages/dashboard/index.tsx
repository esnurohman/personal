import StatCard from '@/components/stat-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

import {
    Bar,
    BarChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];
export default function Dashboard({ stats, projectsChart }: any) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold">Dashboard</h1>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <Link href="/admin/projects">
                        <StatCard
                            title="📦 Total Projects"
                            value={stats.projects}
                        />
                    </Link>
                    <Link href="/admin/skills">
                        <StatCard
                            title="⚙️ Total Skills"
                            value={stats.skills}
                        />
                    </Link>
                    <Link href="/admin/contacts">
                        <StatCard
                            title="📧 Pesan Masuk"
                            value={stats.contacts}
                        />
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Project Dibuat per Bulan</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={projectsChart}>
                                <XAxis dataKey="month" />
                                <YAxis allowDecimals={false} />
                                <Tooltip />
                                <Bar dataKey="total" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
