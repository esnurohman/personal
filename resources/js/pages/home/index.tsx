import HomeLayout from '@/layouts/home/home-layout';
import { Head } from '@inertiajs/react';
import { Toaster } from 'sonner';
import Contact from './contact';
import Hero from './hero';
import Projects from './project';
import Skills from './skill';

export default function Home({ profil, skills, projects }: any) {
    return (
        <>
            <Head title="Home" />
            <HomeLayout>
                <Hero profil={profil} />
                {/* <About /> */}
                <Skills skills={skills} />
                <Projects projects={projects} />
                <Contact />
                <Toaster richColors position="top-right" />
            </HomeLayout>
        </>
    );
}
