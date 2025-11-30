import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BedDouble, Bath, Square, MapPin, Heart } from 'lucide-react';
import type { Property } from '@/lib/data';
import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Price } from './price';

type PropertyCardProps = {
  property: Property & { images: { imageUrl: string; description: string; imageHint: string }[] };
};

export function PropertyCard({ property }: PropertyCardProps) {
  const firstImage = property.images[0];

  return (
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-xl">
      <CardHeader className="p-0 relative">
        <Link href={`/listings/${property.id}`}>
          <div className="aspect-[4/3] relative">
            {firstImage ? (
                <Image
                src={firstImage.imageUrl}
                alt={firstImage.description}
                data-ai-hint={firstImage.imageHint}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
            ) : (
                <div className="bg-muted flex items-center justify-center h-full">
                    <p>No Image</p>
                </div>
            )}
            <Badge
              variant={property.availability === 'Available' ? 'default' : 'secondary'}
              className={cn(
                'absolute top-3 right-3',
                property.availability === 'Available' && 'bg-accent text-accent-foreground',
                property.availability === 'Sold' && 'bg-destructive text-destructive-foreground'
              )}
            >
              {property.availability}
            </Badge>
          </div>
        </Link>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <Link href={`/listings/${property.id}`}>
          <CardTitle className="text-xl mb-1 truncate hover:text-primary transition-colors">{property.title}</CardTitle>
        </Link>
        <CardDescription className="flex items-center gap-1 text-sm">
            <MapPin className="w-4 h-4"/>
            {property.location}
        </CardDescription>
        
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5"><BedDouble className="w-4 h-4 text-primary/70" /> {property.bedrooms} Beds</span>
          <span className="flex items-center gap-1.5"><Bath className="w-4 h-4 text-primary/70" /> {property.bathrooms} Baths</span>
          <span className="flex items-center gap-1.5"><Square className="w-4 h-4 text-primary/70" /> {property.squareFootage.toLocaleString()} sqft</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 flex items-center justify-between">
        <Price priceUSD={property.priceUSD} />
        <Button variant="ghost" size="icon" aria-label="Add to wishlist">
            <Heart className="w-5 h-5"/>
        </Button>
      </CardFooter>
    </Card>
  );
}
