'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Wallet } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from '../icons';

const navLinks = [
  { href: '/listings', label: 'Listings' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/faq', label: 'FAQ' },
  { href: '/dashboard', label: 'Dashboard' },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo className="h-6 w-6 text-primary"/>
            <span className="hidden font-bold sm:inline-block font-headline">
              Crypto Estates
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'transition-colors hover:text-foreground/80',
                  pathname === href ? 'text-foreground' : 'text-foreground/60'
                )}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Nav */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <Link href="/" className="mb-8 flex items-center space-x-2">
                <Logo className="h-6 w-6 text-primary"/>
                <span className="font-bold font-headline">Crypto Estates</span>
            </Link>
            <nav className="flex flex-col space-y-4">
                {navLinks.map(({ href, label }) => (
                <Link
                    key={href}
                    href={href}
                    className={cn(
                    'text-lg',
                    pathname === href ? 'text-primary font-semibold' : 'text-muted-foreground'
                    )}
                >
                    {label}
                </Link>
                ))}
            </nav>
          </SheetContent>
        </Sheet>
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Can be a search bar */}
          </div>
          <Button>
            <Wallet className="mr-2 h-4 w-4" />
            Connect Wallet
          </Button>
        </div>
      </div>
    </header>
  );
}
