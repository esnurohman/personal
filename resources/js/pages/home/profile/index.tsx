// import HomeLayout from '@/layouts/home/home-layout';
// import { Head } from '@inertiajs/react';
// import About from '../about';

// export default function Home() {
//     return (
//         <>
//             <Head title="About" />
//             <HomeLayout>
//                 <About />
//             </HomeLayout>
//         </>
//     );
// }
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import HomeLayout from '@/layouts/home/home-layout';
import { Download, MapPin } from 'lucide-react';

type ProfilType = {
    full_name: string;
    job_title: string;
    bio: string;
    photo: string;
    location: string;
    cv_url: string;
};

export default function About({ profil }: { profil: ProfilType }) {
    if (!profil) {
        return (
            <HomeLayout>
                <div className="container mx-auto py-32 text-center text-muted-foreground">
                    Data profil belum tersedia
                </div>
            </HomeLayout>
        );
    }

    return (
        <HomeLayout>
            <section className="container mx-auto py-24">
                <Card className="mx-auto max-w-4xl">
                    <CardContent className="space-y-8 p-8">
                        {/* HEADER */}
                        <div className="flex flex-col items-center gap-8 md:flex-row">
                            {/* PHOTO */}
                            <img
                                src={`/storage/profils/${profil.photo}`}
                                alt={profil.full_name}
                                className="h-40 w-40 rounded-full border object-cover"
                            />

                            {/* BASIC INFO */}
                            <div className="space-y-2 text-center md:text-left">
                                <h1 className="text-3xl font-bold">
                                    {profil.full_name}
                                </h1>

                                <p className="text-lg text-muted-foreground">
                                    {profil.job_title}
                                </p>

                                {profil.location && (
                                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground md:justify-start">
                                        <MapPin className="h-4 w-4" />
                                        {profil.location}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* BIO */}
                        <div className="space-y-2">
                            <h2 className="text-xl font-semibold">
                                Tentang Saya
                            </h2>
                            <p className="leading-relaxed text-muted-foreground">
                                {profil.bio}
                            </p>
                        </div>

                        {/* ACTION */}
                        {profil.cv_url && (
                            <div>
                                <Button asChild>
                                    <a
                                        href={profil.cv_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2"
                                    >
                                        <Download className="h-4 w-4" />
                                        Download CV
                                    </a>
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </section>
        </HomeLayout>
    );
}
