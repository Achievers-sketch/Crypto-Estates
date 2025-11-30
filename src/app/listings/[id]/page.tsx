import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getPropertyById } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  BedDouble,
  Bath,
  Square,
  MapPin,
  CheckCircle,
  PlayCircle,
  ShieldCheck,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Price } from '@/components/price';
import { MOCK_CONVERSION_RATES, CRYPTO_CURRENCIES, convertUSDtoCrypto, formatCryptoAmount, formatUsdAmount } from '@/lib/crypto';

export async function generateMetadata({ params }: { params: { id: string } }) {
    const property = getPropertyById(params.id);
    if (!property) {
        return { title: 'Not Found' };
    }
    return {
        title: `${property.title} - Crypto Estates`,
        description: property.description.substring(0, 160),
    };
}

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const property = getPropertyById(params.id);
  const mapImage = PlaceHolderImages.find(p => p.id === 'map');

  if (!property) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Image Carousel */}
          <Carousel className="w-full mb-8 rounded-lg overflow-hidden">
            <CarouselContent>
              {property.images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="aspect-video relative">
                    <Image
                      src={image.imageUrl}
                      alt={image.description}
                      data-ai-hint={image.imageHint}
                      fill
                      className="object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="ml-16" />
            <CarouselNext className="mr-16" />
          </Carousel>
          
          {/* Property Info */}
          <h1 className="text-4xl font-bold font-headline">{property.title}</h1>
          <div className="flex items-center gap-2 text-muted-foreground mt-2">
            <MapPin className="w-5 h-5" />
            <span>{property.location}</span>
          </div>

          <div className="my-6 flex flex-wrap gap-x-6 gap-y-3 text-lg">
            <span className="flex items-center gap-2"><BedDouble className="w-6 h-6 text-primary" /> {property.bedrooms} Bedrooms</span>
            <span className="flex items-center gap-2"><Bath className="w-6 h-6 text-primary" /> {property.bathrooms} Bathrooms</span>
            <span className="flex items-center gap-2"><Square className="w-6 h-6 text-primary" /> {property.squareFootage.toLocaleString()} sqft</span>
          </div>

          <Separator className="my-6" />

          <h2 className="text-2xl font-semibold font-headline mb-4">About this property</h2>
          <p className="text-muted-foreground leading-relaxed">{property.description}</p>
          
          <Separator className="my-6" />
          
          <h2 className="text-2xl font-semibold font-headline mb-4">Amenities</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {property.amenities.map(amenity => (
                  <div key={amenity} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-muted-foreground">{amenity}</span>
                  </div>
              ))}
          </div>

           {property.virtualTourUrl && (
            <>
              <Separator className="my-6" />
              <h2 className="text-2xl font-semibold font-headline mb-4">Virtual Tour</h2>
              <div className="aspect-video">
                <iframe
                  className="w-full h-full rounded-lg"
                  src={property.virtualTourUrl}
                  title="Virtual Tour"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </>
          )}

        </div>
        
        {/* Purchase Card */}
        <div className="lg:col-span-1">
            <Card className="sticky top-24">
                <CardContent className="p-6">
                    <Badge className="mb-4">{property.availability}</Badge>
                    <Price priceUSD={property.priceUSD} className="mb-6"/>
                    
                    <div className="space-y-2 mb-6">
                        <h4 className="text-sm font-medium">Price in Crypto</h4>
                        {Object.entries(CRYPTO_CURRENCIES).map(([key, { name, Icon, symbol }]) => (
                            <div key={key} className="flex justify-between items-center text-sm text-muted-foreground">
                                <span className="flex items-center gap-2"><Icon className="w-4 h-4" />{name}</span>
                                <span>{formatCryptoAmount(convertUSDtoCrypto(property.priceUSD, key as keyof typeof CRYPTO_CURRENCIES))} {symbol}</span>
                            </div>
                        ))}
                    </div>

                    <Button asChild size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={property.availability !== 'Available'}>
                        <Link href={`/listings/${property.id}/buy`}>
                            Buy with Crypto
                        </Link>
                    </Button>
                    <Button variant="outline" size="lg" className="w-full mt-2">
                        Schedule Viewing
                    </Button>
                    <div className="flex items-center justify-center mt-4 text-xs text-muted-foreground">
                        <ShieldCheck className="w-4 h-4 mr-1 text-green-600"/>
                        <span>Secure transaction via Escrow</span>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
      
       {/* Map Section */}
        <div className="mt-12">
            <h2 className="text-2xl font-semibold font-headline mb-4">Location</h2>
            {mapImage && (
                <div className="aspect-[16/5] relative rounded-lg overflow-hidden">
                    <Image src={mapImage.imageUrl} alt="Map" data-ai-hint={mapImage.imageHint} fill className="object-cover"/>
                </div>
            )}
        </div>
    </div>
  );
}
