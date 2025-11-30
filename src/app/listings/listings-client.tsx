'use client';

import { useState, useMemo } from 'react';
import type { Property } from '@/lib/data';
import { PropertyCard } from '@/components/property-card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { formatUsdAmount } from '@/lib/crypto';

type ListingsClientProps = {
  initialProperties: (Property & { images: any[] })[];
};

type SortKey = 'price-asc' | 'price-desc' | 'date-desc' | 'size-desc';

const propertyTypes = ['Apartment', 'Penthouse', 'Studio'];
const bedroomOptions = ['1', '2', '3', '4+'];

export default function ListingsClient({ initialProperties }: ListingsClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedBedrooms, setSelectedBedrooms] = useState('all');
  const [sortKey, setSortKey] = useState<SortKey>('date-desc');

  const filteredAndSortedProperties = useMemo(() => {
    let properties = initialProperties.filter((p) => {
      const searchMatch =
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const priceMatch = p.priceUSD >= priceRange[0] && p.priceUSD <= priceRange[1];
      const typeMatch = selectedType === 'all' || p.propertyType === selectedType;
      
      const bedroomMatch = selectedBedrooms === 'all' || 
        (selectedBedrooms === '4+' ? p.bedrooms >= 4 : p.bedrooms === parseInt(selectedBedrooms));

      return searchMatch && priceMatch && typeMatch && bedroomMatch;
    });

    return properties.sort((a, b) => {
        switch (sortKey) {
            case 'price-asc': return a.priceUSD - b.priceUSD;
            case 'price-desc': return b.priceUSD - a.priceUSD;
            case 'size-desc': return b.squareFootage - a.squareFootage;
            case 'date-desc':
            default: return new Date(b.dateListed).getTime() - new Date(a.dateListed).getTime();
        }
    });

  }, [initialProperties, searchTerm, priceRange, selectedType, selectedBedrooms, sortKey]);
  
  const resetFilters = () => {
    setSearchTerm('');
    setPriceRange([0, 5000000]);
    setSelectedType('all');
    setSelectedBedrooms('all');
    setSortKey('date-desc');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Filters Sidebar */}
      <aside className="lg:col-span-1 bg-card p-6 rounded-lg self-start sticky top-24">
        <h2 className="text-2xl font-semibold mb-6">Filters</h2>
        <div className="space-y-6">
          <div>
            <label htmlFor="search" className="text-sm font-medium">Search Location or Title</label>
            <Input 
                id="search" 
                placeholder="e.g. Miami or Penthouse"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div>
            <label className="text-sm font-medium">Price Range</label>
            <p className="text-sm text-muted-foreground mb-2">
                {formatUsdAmount(priceRange[0])} - {formatUsdAmount(priceRange[1])}
            </p>
            <Slider
              min={0}
              max={5000000}
              step={100000}
              value={priceRange}
              onValueChange={(value) => setPriceRange(value)}
            />
          </div>

          <div>
            <label htmlFor="property-type" className="text-sm font-medium">Property Type</label>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger id="property-type"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {propertyTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="bedrooms" className="text-sm font-medium">Bedrooms</label>
            <Select value={selectedBedrooms} onValueChange={setSelectedBedrooms}>
              <SelectTrigger id="bedrooms"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any</SelectItem>
                {bedroomOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}{opt.includes('+') ? '' : ' Beds'}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          
          <Button onClick={resetFilters} variant="outline" className="w-full">Reset Filters</Button>
        </div>
      </aside>

      {/* Listings */}
      <main className="lg:col-span-3">
        <div className="flex justify-between items-center mb-6">
          <p className="text-muted-foreground">{filteredAndSortedProperties.length} results found</p>
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm font-medium">Sort by</label>
            <Select value={sortKey} onValueChange={(value) => setSortKey(value as SortKey)}>
              <SelectTrigger id="sort" className="w-[180px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="date-desc">Newest</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="size-desc">Size: Largest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {filteredAndSortedProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredAndSortedProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-card rounded-lg">
            <h3 className="text-xl font-semibold">No Properties Found</h3>
            <p className="text-muted-foreground mt-2">Try adjusting your filters.</p>
          </div>
        )}
      </main>
    </div>
  );
}
