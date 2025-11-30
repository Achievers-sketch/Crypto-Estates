import { getProperties } from '@/lib/data';
import ListingsClient from './listings-client';

export const metadata = {
  title: 'Property Listings - Crypto Estates',
  description: 'Browse all available properties and find your next investment.',
};

export default function ListingsPage() {
  const properties = getProperties();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold font-headline">All Properties</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Explore our exclusive collection of properties available for purchase with cryptocurrency.
        </p>
      </div>
      <ListingsClient initialProperties={properties} />
    </div>
  );
}
