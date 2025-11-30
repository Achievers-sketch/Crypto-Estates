import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export const metadata = {
    title: 'About Crypto Estates',
    description: 'Learn about our mission to revolutionize real estate with blockchain technology.',
};

export default function AboutPage() {
    const aboutImage = PlaceHolderImages.find(p => p.id === 'about-us');

    return (
        <>
            <div className="relative h-64 bg-primary">
                <div className="absolute inset-0 bg-black/30" />
                <div className="container mx-auto px-4 relative h-full flex items-center justify-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white font-headline text-center">About Crypto Estates</h1>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold font-headline mb-4">Our Mission</h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            At Crypto Estates, our mission is to bridge the gap between traditional real estate and the world of digital assets. We believe that cryptocurrency is the future of finance, and we are dedicated to creating a secure, transparent, and user-friendly platform for buying and selling property using blockchain technology.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            We are a team of passionate real estate professionals, blockchain experts, and software engineers committed to building a decentralized future for property ownership. By leveraging the power of smart contracts and digital currencies, we aim to make real estate transactions faster, cheaper, and more accessible to a global audience.
                        </p>
                    </div>
                    <div>
                        {aboutImage && (
                            <Image
                                src={aboutImage.imageUrl}
                                alt={aboutImage.description}
                                data-ai-hint={aboutImage.imageHint}
                                width={600}
                                height={400}
                                className="rounded-lg shadow-xl object-cover"
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
