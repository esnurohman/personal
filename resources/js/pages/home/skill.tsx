import { Progress } from '@/components/ui/progress';
interface ISkill {
    id: number;
    name: string;
    icon?: string;
    level: number;
}
function Skills({ skills }: { skills: ISkill[] }) {
    if (!skills || skills.length === 0) {
        return (
            <section className="py-24 text-center text-muted-foreground">
                Belum ada skill yang ditampilkan
            </section>
        );
    }
    return (
        <section id="skills" className="bg-white py-24">
            <div className="container mx-auto px-6">
                {/* HEADER */}
                <div className="mb-12 max-w-xl">
                    <h2 className="text-3xl font-bold">Skills</h2>
                    <p className="mt-2 text-muted-foreground">
                        Teknologi yang sering saya gunakan
                    </p>
                </div>

                {/* GRID */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {skills.map((skill) => (
                        <div
                            key={skill.id}
                            className="rounded-xl border p-6 shadow-sm transition hover:shadow-md"
                        >
                            {/* ICON & NAME */}
                            <div className="mb-4 flex items-center gap-4">
                                {skill.icon ? (
                                    <img
                                        src={`/storage/skills/${skill.icon}`}
                                        alt={skill.name}
                                        className="h-10 w-10"
                                    />
                                ) : (
                                    <div className="flex h-10 w-10 items-center justify-center rounded bg-emerald-100 font-bold text-emerald-700">
                                        {skill.name[0]}
                                    </div>
                                )}

                                <h3 className="text-lg font-semibold">
                                    {skill.name}
                                </h3>
                            </div>

                            {/* LEVEL */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Level</span>
                                    <span>{skill.level}%</span>
                                </div>

                                <Progress
                                    value={skill.level}
                                    className="transition-all duration-700"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Skills;
