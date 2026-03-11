import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const menuItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '/#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);

            const sections = menuItems.map((item) =>
                document.querySelector(item.href),
            );

            const scrollPos = window.scrollY + 120;

            sections.forEach((section) => {
                if (!section) return;

                const top = section.offsetTop;
                const height = section.clientHeight;
                const id = section.getAttribute('id');

                if (scrollPos >= top && scrollPos < top + height) {
                    setActiveSection(id || 'home');
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const linkClass = (href: string) => {
        const id = href.replace('#', '');
        return id === activeSection
            ? 'text-green-400 font-semibold relative after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-green-600'
            : 'text-gray-700 hover:text-green-600 transition';
    };

    return (
        <header
            className={`fixed top-0 left-0 z-50 w-full transition-all ${
                scrolled
                    ? 'bg-white/80 shadow-sm backdrop-blur'
                    : 'bg-transparent'
            }`}
        >
            <div className="container mx-auto px-6">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <a
                        href="/"
                        className="text-xl font-bold text-green-400"
                    >
                        Eep.<span className="text-gray-900">dev</span>
                    </a>

                    {/* Desktop Menu */}
                    <nav className="hidden items-center gap-8 md:flex">
                        {menuItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className={linkClass(item.href)}
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>

                    {/* Mobile Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden"
                    >
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="border-t bg-white shadow-lg transition-all duration-300 ease-in-out md:hidden">
                    <nav className="flex flex-col space-y-4 px-6 py-4">
                        {menuItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={linkClass(item.href)}
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
}
