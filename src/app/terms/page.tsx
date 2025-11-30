export const metadata = {
    title: 'Terms of Service - Crypto Estates',
    description: 'Read the terms and conditions for using the Crypto Estates platform.',
};

export default function TermsPage() {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold font-headline mb-8">Terms of Service</h1>
                <div className="space-y-6 text-muted-foreground leading-relaxed">
                    <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    
                    <h2 className="text-2xl font-semibold text-foreground font-headline pt-4">1. Introduction</h2>
                    <p>Welcome to Crypto Estates ("Platform", "we", "us", or "our"). These Terms of Service ("Terms") govern your use of our website and services. By accessing or using our Platform, you agree to be bound by these Terms.</p>
                    
                    <h2 className="text-2xl font-semibold text-foreground font-headline pt-4">2. Services</h2>
                    <p>Crypto Estates provides a platform for listing and purchasing real estate properties using cryptocurrency. We act as an intermediary and utilize secure escrow services to facilitate transactions. We are not a broker, financial institution, or creditor.</p>

                    <h2 className="text-2xl font-semibold text-foreground font-headline pt-4">3. Cryptocurrency Transactions</h2>
                    <p>You acknowledge and agree that cryptocurrency transactions are irreversible. You are solely responsible for the accuracy of the wallet addresses you provide. Crypto Estates is not liable for any losses due to incorrect information provided by you.</p>
                    <p>The value of cryptocurrencies is highly volatile. The USD equivalent price is fixed for a short duration at the point of transaction initiation. We are not responsible for any gains or losses you may incur due to price volatility.</p>

                    <h2 className="text-2xl font-semibold text-foreground font-headline pt-4">4. User Obligations</h2>
                    <p>You agree to provide accurate and complete information for KYC/AML checks as required by law. You are responsible for maintaining the security of your wallet and private keys. Do not share your wallet information with anyone.</p>

                    <h2 className="text-2xl font-semibold text-foreground font-headline pt-4">5. Disclaimers</h2>
                    <p>The information provided on this Platform does not constitute financial or legal advice. You should consult with a qualified professional before making any investment decisions. All property listings are provided "as is" without warranty of any kind.</p>
                    
                    <h2 className="text-2xl font-semibold text-foreground font-headline pt-4">6. Limitation of Liability</h2>
                    <p>To the fullest extent permitted by law, Crypto Estates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.</p>

                    <h2 className="text-2xl font-semibold text-foreground font-headline pt-4">7. Changes to Terms</h2>
                    <p>We reserve the right to modify these Terms at any time. We will provide notice of any changes by posting the new Terms on this page. Your continued use of the Platform after any such change constitutes your acceptance of the new Terms.</p>
                </div>
            </div>
        </div>
    );
}
