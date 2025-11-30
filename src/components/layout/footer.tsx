import Link from 'next/link';
import { Logo } from '../icons';

const footerLinks = {
    'Company': [
        { href: '/about', label: 'About Us' },
        { href: '/contact', label: 'Contact' },
    ],
    'Resources': [
        { href: '/how-it-works', label: 'How It Works' },
        { href: '/faq', label: 'FAQ' },
        { href: '#', label: 'Blog' },
    ],
    'Legal': [
        { href: '/terms', label: 'Terms of Service' },
        { href: '#', label: 'Privacy Policy' },
    ],
};

export function Footer() {
    return (
        <footer className="border-t">
            <div className="container py-12">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div className="flex flex-col space-y-4">
                        <Link href="/" className="flex items-center space-x-2">
                            <Logo className="h-7 w-7 text-primary" />
                            <span className="font-bold text-lg font-headline">Crypto Estates</span>
                        </Link>
                        <p className="text-sm text-muted-foreground">The future of real estate, powered by the blockchain.</p>
                    </div>

                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title} className="md:justify-self-center">
                            <h4 className="font-headline font-medium mb-3">{title}</h4>
                            <ul className="space-y-2">
                                {links.map(({ href, label }) => (
                                    <li key={label}>
                                        <Link href={href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} Crypto Estates. All rights reserved.</p>
                    {/* Add social links here if needed */}
                </div>
            </div>
        </footer>
    );
}
