import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin } from 'lucide-react';

export const metadata = {
    title: 'Contact Us - Crypto Estates',
    description: 'Get in touch with the Crypto Estates team for support or inquiries.',
};

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold font-headline">Contact Us</h1>
                <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">Have questions? We'd love to hear from you. Reach out and we'll get back to you shortly.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-12">
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Send us a Message</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-4">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="name">Name</Label>
                                        <Input id="name" placeholder="Your Name" />
                                    </div>
                                    <div>
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" type="email" placeholder="Your Email" />
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="subject">Subject</Label>
                                    <Input id="subject" placeholder="Question about a property" />
                                </div>
                                <div>
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea id="message" placeholder="Your message..." />
                                </div>
                                <Button type="submit" className="w-full">Send Message</Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
                <div className="space-y-8">
                    <h2 className="text-2xl font-bold font-headline">Contact Information</h2>
                    <div className="space-y-4 text-muted-foreground">
                        <div className="flex items-start gap-4">
                            <Mail className="w-6 h-6 text-primary mt-1" />
                            <div>
                                <h3 className="font-semibold text-foreground">Email</h3>
                                <p>support@cryptoestates.com</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Phone className="w-6 h-6 text-primary mt-1" />
                            <div>
                                <h3 className="font-semibold text-foreground">Phone</h3>
                                <p>+1 (555) 123-4567</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <MapPin className="w-6 h-6 text-primary mt-1" />
                            <div>
                                <h3 className="font-semibold text-foreground">Office</h3>
                                <p>123 Crypto Lane, Metaverse</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
