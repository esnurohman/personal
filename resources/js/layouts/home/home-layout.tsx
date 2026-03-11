'use client';

import FloatingButton from '@/components/floating-button';
import Navbar from './navigasi-layout';
export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col font-ubuntu">
            {/* NAVBAR */}
            <Navbar />

            {/* CONTENT */}
            <main className="flex-1 px-2">{children}</main>

            {/* FOOTER */}
            <footer className="border-t py-6 text-center text-sm text-muted-foreground">
                © {new Date().getFullYear()} Eep Syaiful Nurohman
            </footer>
            <FloatingButton />
        </div>
    );
}
