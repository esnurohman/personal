import { router } from '@inertiajs/react';
import { ChevronUp, House } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';

export default function FloatingButton() {
    const [show, setShow] = useState(false);
    const isHome = window.location.pathname === '/';

    useEffect(() => {
        if (isHome) {
            const handleScroll = () => {
                setShow(window.scrollY > 300);
            };

            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }
    }, [isHome]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    if (!isHome) {
        return (
            <Button
                onClick={() => router.visit('/')}
                className="fixed right-6 bottom-6 rounded-md bg-green-600 px-4 py-3 text-white opacity-80 shadow-lg transition hover:scale-105"
            >
                <House />
            </Button>
        );
    }

    if (!show) return null;

    return (
        <Button
            onClick={scrollToTop}
            className="fixed right-6 bottom-6 rounded-md bg-green-600 px-4 py-3 text-white opacity-80 shadow-lg transition hover:scale-105"
        >
            <ChevronUp />
        </Button>
    );
}
