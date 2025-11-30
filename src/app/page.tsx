import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { PropertyCard } from '@/components/property-card';
import { getFeaturedProperties } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const featuredProperties = getFeaturedProperties();
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero');

  return (
    <>
      <section className="relative h-[60vh] md:h-[70vh] w-full">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            data-ai-hint={heroImage.imageHint}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white p-4">
          <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight">
            Find Your Crypto Estate
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-neutral-200">
            The future of real estate is here. Buy and sell properties with cryptocurrency securely and efficiently.
          </p>
          <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/listings">
              View Listings <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
            Featured Properties
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link href="/listings">Explore All Properties</Link>
            </Button>
          </div>
        </div>
      </section>

       <section className="bg-muted py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
            <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
              A simplified and secure process to acquire real estate with your digital assets.
            </p>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground mb-4">
                    <span className="font-headline text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Browse & Select</h3>
                <p className="text-muted-foreground">Explore our curated listings and find your perfect property. Use advanced filters to narrow down your search.</p>
            </div>
            <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground mb-4">
                    <span className="font-headline text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Pay with Crypto</h3>
                <p className="text-muted-foreground">Choose your preferred cryptocurrency, connect your wallet, and complete the transaction through our secure payment gateway.</p>
            </div>
            <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground mb-4">
                     <span className="font-headline text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Own Your Estate</h3>
                <p className="text-muted-foreground">Receive transaction confirmation and all necessary documentation. Welcome to your new crypto-acquired property.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
