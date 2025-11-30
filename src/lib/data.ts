import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';

export type Amenity = 'Pool' | 'Gym' | 'Parking' | 'Balcony' | 'Pet Friendly' | 'Security';

export type Property = {
  id: string;
  title: string;
  description: string;
  location: string;
  priceUSD: number;
  bedrooms: number;
  bathrooms: number;
  squareFootage: number;
  amenities: Amenity[];
  imageIds: string[];
  availability: 'Available' | 'Sold' | 'Pending';
  dateListed: string;
  propertyType: 'Apartment' | 'Penthouse' | 'Studio';
  virtualTourUrl?: string;
  featured: boolean;
};

export const properties: Property[] = [
  {
    id: 'prop1',
    title: 'Modern Downtown Apartment',
    description: 'A beautifully designed apartment in the heart of the city. Perfect for young professionals. Enjoy the vibrant city life with cafes, restaurants, and parks just a walk away. This unit boasts high ceilings and a state-of-the-art kitchen.',
    location: 'New York, NY',
    priceUSD: 850000,
    bedrooms: 2,
    bathrooms: 2,
    squareFootage: 1200,
    amenities: ['Gym', 'Security', 'Balcony'],
    imageIds: ['prop1_img1', 'prop1_img2', 'prop1_img3'],
    availability: 'Available',
    dateListed: '2024-07-15T10:00:00Z',
    propertyType: 'Apartment',
    virtualTourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    featured: true,
  },
  {
    id: 'prop2',
    title: 'Luxury Skyline Penthouse',
    description: 'Experience luxury living with breathtaking panoramic views of the city. This penthouse features a private rooftop terrace, floor-to-ceiling windows, and premium finishes throughout. An entertainer\'s dream.',
    location: 'Miami, FL',
    priceUSD: 3200000,
    bedrooms: 4,
    bathrooms: 5,
    squareFootage: 3500,
    amenities: ['Pool', 'Gym', 'Parking', 'Security'],
    imageIds: ['prop2_img1', 'prop2_img2', 'prop2_img3'],
    availability: 'Available',
    dateListed: '2024-07-20T14:30:00Z',
    propertyType: 'Penthouse',
    featured: true,
  },
  {
    id: 'prop3',
    title: 'Chic Urban Studio',
    description: 'A compact and stylish studio apartment in a trendy neighborhood. Cleverly designed to maximize space, it features modern furniture and a fully equipped kitchenette. Ideal for a single person or as a city pied-à-terre.',
    location: 'San Francisco, CA',
    priceUSD: 550000,
    bedrooms: 1,
    bathrooms: 1,
    squareFootage: 500,
    amenities: ['Gym', 'Pet Friendly'],
    imageIds: ['prop3_img1', 'prop3_img2'],
    availability: 'Pending',
    dateListed: '2024-06-28T09:00:00Z',
    propertyType: 'Studio',
    featured: true,
  },
  {
    id: 'prop4',
    title: 'Spacious Family Apartment',
    description: 'A large and welcoming apartment perfect for families. Located in a quiet, residential area with excellent schools and parks nearby. Features a large living area and a modern, child-safe kitchen.',
    location: 'Chicago, IL',
    priceUSD: 680000,
    bedrooms: 3,
    bathrooms: 2,
    squareFootage: 1800,
    amenities: ['Parking', 'Pet Friendly'],
    imageIds: ['prop4_img1'],
    availability: 'Available',
    dateListed: '2024-07-18T11:00:00Z',
    propertyType: 'Apartment',
    featured: false,
  },
  {
    id: 'prop5',
    title: 'Exclusive Waterfront Condo',
    description: 'Stunning waterfront views from every room. This luxury condo offers a serene escape from the city bustle, with high-end amenities including a private dock and infinity pool.',
    location: 'Seattle, WA',
    priceUSD: 1500000,
    bedrooms: 2,
    bathrooms: 3,
    squareFootage: 2000,
    amenities: ['Pool', 'Parking', 'Security', 'Balcony'],
    imageIds: ['prop5_img1'],
    availability: 'Sold',
    dateListed: '2024-05-10T16:00:00Z',
    propertyType: 'Apartment',
    featured: false,
  },
  {
    id: 'prop6',
    title: 'Quiet Suburban Retreat',
    description: 'A comfortable apartment in a peaceful suburban setting. Close to nature trails and local shops, offering a great balance between city access and quiet living. Perfect for those looking to downsize or escape the urban core.',
    location: 'Austin, TX',
    priceUSD: 450000,
    bedrooms: 2,
    bathrooms: 1,
    squareFootage: 950,
    amenities: ['Parking', 'Pet Friendly', 'Balcony'],
    imageIds: ['prop6_img1'],
    availability: 'Available',
    dateListed: '2024-07-22T10:00:00Z',
    propertyType: 'Apartment',
    featured: false,
  },
];

export function getProperties() {
  return properties.map(p => ({
    ...p,
    images: p.imageIds.map(id => PlaceHolderImages.find(img => img.id === id) as ImagePlaceholder).filter(Boolean),
  }));
}

export function getPropertyById(id: string) {
  const property = properties.find(p => p.id === id);
  if (!property) return null;

  return {
    ...property,
    images: property.imageIds.map(id => PlaceHolderImages.find(img => img.id === id) as ImagePlaceholder).filter(Boolean),
  }
}

export function getFeaturedProperties() {
  return properties.filter(p => p.featured).map(p => ({
    ...p,
    images: p.imageIds.map(id => PlaceHolderImages.find(img => img.id === id) as ImagePlaceholder).filter(Boolean),
  }));
}

export const transactionHistory = [
    {
        id: 'txn_1',
        property: getPropertyById('prop5'),
        date: '2024-05-15T10:00:00Z',
        amountCrypto: 23.07,
        cryptoType: 'ETH',
        amountUSD: 1500000,
        status: 'Completed',
    },
];

export const savedProperties = [
    getPropertyById('prop2'),
    getPropertyById('prop4'),
];
