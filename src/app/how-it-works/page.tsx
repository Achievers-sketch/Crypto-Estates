import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Wallet, Handshake, KeyRound } from 'lucide-react';

export const metadata = {
    title: 'How It Works - Crypto Estates',
    description: 'Learn the simple, secure process of buying property with cryptocurrency.',
};

const steps = [
    {
        icon: Search,
        title: "1. Discover Your Property",
        description: "Browse our extensive list of properties from around the world. Use our advanced filtering tools to find the perfect home, apartment, or investment property that meets your criteria."
    },
    {
        icon: Wallet,
        title: "2. Initiate Crypto Payment",
        description: "Once you've chosen a property, proceed to our secure payment gateway. Select your preferred cryptocurrency (BTC, ETH, or USDT) and review the real-time conversion rates. Our system provides a clear breakdown of the total cost."
    },
    {
        icon: Handshake,
        title: "3. Secure Escrow Transaction",
        description: "Send your crypto to a secure, audited escrow wallet address. This holds the funds safely until all legal conditions are met, protecting both buyer and seller. You'll then provide the transaction ID to our system for verification."
    },
    {
        icon: KeyRound,
        title: "4. Finalize & Receive Ownership",
        description: "After the transaction is confirmed on the blockchain and legal paperwork is completed, the funds are released to the seller. You will receive the digital keys, deeds, and all necessary documentation, making you the official owner of the property."
    }
]

export default function HowItWorksPage() {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold font-headline">How to Buy with Crypto</h1>
                <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                    Our streamlined process makes purchasing real estate with digital assets simple and secure.
                </p>
            </div>
            <div className="max-w-4xl mx-auto">
                <div className="relative md:p-10">
                    {/* Dashed line connector for desktop */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-10 bottom-10 w-0.5 bg-border border-l-2 border-dashed hidden md:block" aria-hidden="true"></div>
                    
                    <div className="space-y-12">
                        {steps.map((step, index) => (
                             <div key={step.title} className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6">
                                <div className="md:w-1/2 flex justify-center" style={{ order: index % 2 === 1 ? 2 : 1 }}>
                                    <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-primary shadow-lg mb-4 md:mb-0">
                                        <step.icon className="h-10 w-10 text-primary-foreground" />
                                    </div>
                                </div>
                                <div className="md:w-1/2" style={{ order: index % 2 === 1 ? 1 : 2 }}>
                                    <Card className="w-full">
                                        <CardHeader>
                                            <CardTitle className="text-2xl">{step.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-muted-foreground">{step.description}</p>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
