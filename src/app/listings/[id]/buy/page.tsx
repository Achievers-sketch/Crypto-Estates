import { notFound } from 'next/navigation';
import { getPropertyById } from '@/lib/data';
import PaymentClient from './payment-client';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

export async function generateMetadata({ params }: { params: { id: string } }) {
    const property = getPropertyById(params.id);
    if (!property) return { title: 'Not Found' };
    return {
        title: `Purchase ${property.title} - Crypto Estates`,
        description: `Finalize your purchase of ${property.title} using cryptocurrency.`,
    };
}

export default function BuyPage({ params }: { params: { id: string } }) {
    const property = getPropertyById(params.id);

    if (!property || property.availability !== 'Available') {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-8">
             <Breadcrumb className="mb-8">
                <BreadcrumbList>
                    <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                    <BreadcrumbLink href="/listings">Listings</BreadcrumbLink>
                    </BreadcrumbItem>
                     <BreadcrumbSeparator />
                    <BreadcrumbItem>
                    <BreadcrumbLink href={`/listings/${property.id}`}>{property.title}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                    <BreadcrumbPage>Purchase</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold font-headline">Complete Your Purchase</h1>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                    You're one step away from owning your new property. Follow the steps below.
                </p>
            </div>
            
            <PaymentClient property={property} />
        </div>
    );
}
