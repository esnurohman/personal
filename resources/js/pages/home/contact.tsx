import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm, usePage } from '@inertiajs/react';
import { MailIcon, MapPin, Send } from 'lucide-react';
import { FormEventHandler, useEffect } from 'react';
import { toast } from 'sonner';
import { route } from 'ziggy-js';
function Contact() {
    const { data, setData, post, processing, reset } = useForm({
        name: '',
        email: '',
        message: '',
        honeypot: '',
    });

    const createContactMessage: FormEventHandler = (e) => {
        e.preventDefault();
        console.log(data);

        post(route('contact.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
            // onError: (errors) => {
            //     console.log(errors);
            // },
        });
    };
    const { flash } = usePage().props as any;

    useEffect(() => {
        if (flash?.success) {
            toast.success('Berhasil', {
                description: flash.success,
            });
        }

        if (flash?.error) {
            toast.error('Gagal', {
                description: flash.error,
            });
        }
    }, [flash]);

    return (
        <section id="contact" className="bg-white py-24">
            <div className="container mx-auto px-6">
                {/* HEADER */}
                <div className="mb-12 max-w-xl">
                    <h2 className="text-3xl font-bold">Contact</h2>
                    <p className="mt-2 text-muted-foreground">
                        Tertarik bekerja sama atau sekadar say hello?
                    </p>
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                    {/* Left Info */}
                    <div className="space-y-8">
                        <div className="flex items-start gap-4">
                            <MailIcon className="mt-1 h-6 w-6 text-green-600" />
                            <div>
                                <h4 className="font-semibold text-gray-900">
                                    Email
                                </h4>
                                <p className="text-gray-600">
                                    Es.nurohman.5@gmail.com
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <MapPin className="mt-1 h-6 w-6 text-green-600" />
                            <div>
                                <h4 className="font-semibold text-gray-900">
                                    Location
                                </h4>
                                <p className="text-gray-600">Indonesia</p>
                            </div>
                        </div>

                        <div className="rounded-xl border border-green-200 bg-green-100/60 p-6">
                            <p className="font-medium text-green-800">
                                💡 Saya terbuka untuk freelance, kolaborasi, dan
                                project jangka panjang.
                            </p>
                        </div>
                    </div>

                    {/* FORM */}
                    <form className="space-y-4" onSubmit={createContactMessage}>
                        <Input type="text" className="hidden" name="honeypot" />
                        <Input
                            placeholder="Nama"
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        <Input
                            type="email"
                            placeholder="Email"
                            id="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        <Textarea
                            placeholder="Pesan"
                            rows={5}
                            id="message"
                            value={data.message}
                            onChange={(e) => setData('message', e.target.value)}
                        />

                        <Button
                            type="submit"
                            disabled={processing}
                            className="bg-emerald-600 hover:bg-emerald-700"
                        >
                            {processing ? (
                                'Mengirim...'
                            ) : (
                                <>
                                    <Send className="mr-2 h-4 w-4" />
                                    Kirim Pesan
                                </>
                            )}
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Contact;
