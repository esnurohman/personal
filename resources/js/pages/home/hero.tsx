import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import {
    Code,
    CodeXml,
    FileCode,
    GithubIcon,
    IdCard,
    LinkedinIcon,
} from 'lucide-react';
import { route } from 'ziggy-js';

interface HeroSectionProps {
    profil: {
        full_name: string;
        job_title: string;
        bio: string;
    } | null;
}

function Hero({ profil }: HeroSectionProps) {
    return (
        <section
            id="about"
            className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-green-600 to-emerald-700"
        >
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
                <svg
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                    className="relative block h-[80px] w-[calc(100%+1.3px)]"
                >
                    <path
                        d="M0,0V46.29c47.79,22,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                        className="fill-white"
                    />
                </svg>
            </div>

            {/* Background accent */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,white,transparent_40%)] opacity-20" />

            {/* BLUR BLOBS */}
            <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-emerald-400/30 blur-3xl" />
            <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-lime-300/20 blur-3xl" />
            {/* ABSTRACT BACKGROUND */}
            <div className="absolute inset-0">
                <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-emerald-400/30 blur-3xl" />
                <div className="absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-green-300/30 blur-3xl" />
                <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-lime-300/20 blur-3xl" />
            </div>

            {/* CONTENT */}
            <div className="relative container mx-auto px-6 py-32 text-white">
                <div className="flex flex-col-reverse items-center justify-between gap-2 lg:flex-row">
                    <div className="max-w-3xl space-y-6">
                        <h1 className="text-4xl leading-tight font-bold text-emerald-300 md:text-6xl">
                            {profil?.full_name ?? 'ESNUROHMAN'}
                        </h1>

                        <h2 className="text-xl text-emerald-100 md:text-2xl">
                            <Code />
                            {profil?.job_title ?? 'Web Developer'}
                            <CodeXml />
                        </h2>

                        <p className="max-w-xl text-emerald-100/90">
                            {profil?.bio ??
                                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.'}
                        </p>

                        {/* CTA */}
                        <div className="flex flex-wrap gap-4 pt-6">
                            <Link href="#contact">
                                <Button
                                    size="lg"
                                    className="bg-white text-emerald-700 hover:bg-emerald-100"
                                >
                                    <IdCard /> Hubungi saya
                                </Button>
                            </Link>
                            <Link href={route('portfolio.index')}>
                                <Button
                                    size="lg"
                                    variant="ghost"
                                    className="border-white text-white hover:bg-white/10"
                                >
                                    <FileCode /> Lihat Portfolio
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <img
                            src="/assets/icon/esn.jpg"
                            alt=""
                            className="hidden w-64 rounded-lg opacity-55 shadow-2xl shadow-cyan-300 md:block"
                        />
                        <div className="mt-2 flex items-center justify-center gap-2">
                            <Link href="https://github.com/esnurohman">
                                <GithubIcon className="text-white hover:text-green-700" />
                            </Link>
                            <Link href="#">
                                <LinkedinIcon className="text-white hover:text-green-700" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* <svg
                className="absolute bottom-0 w-full"
                viewBox="0 0 1440 100"
                preserveAspectRatio="none"
            >
                <path fill="#ffffff" d="M0,64L1440,0L1440,320L0,320Z" />
            </svg> */}

            <div className="absolute bottom-0 h-24 w-full bg-gradient-to-b from-transparent to-white" />
            <div className="absolute bottom-0 h-24 w-full bg-gradient-to-b from-transparent to-white backdrop-blur-sm" />
        </section>
    );
}

export default Hero;
