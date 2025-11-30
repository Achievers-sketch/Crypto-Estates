'use client';

import { useState, useMemo, useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import Image from 'next/image';
import { Loader2, AlertCircle, CheckCircle2, ShieldCheck, Copy, ArrowLeft } from 'lucide-react';

import type { Property } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import {
  CRYPTO_CURRENCIES,
  convertUSDtoCrypto,
  formatCryptoAmount,
  formatUsdAmount,
  type CryptoType,
} from '@/lib/crypto';
import { confirmPayment, State } from '@/app/actions';

const initialState: State = { message: null, errors: {} };
const RECIPIENT_WALLET_ADDRESS = '0x1A2b3c4d5E6f7a8B9c0D1e2F3a4B5c6d7E8f9A0B';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Confirm Payment
    </Button>
  );
}

export default function PaymentClient({
  property,
}: {
  property: Property & { images: any[] };
}) {
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoType>('ETH');
  const [state, dispatch] = useFormState(confirmPayment, initialState);
  const { toast } = useToast();

  const cryptoAmount = useMemo(
    () => convertUSDtoCrypto(property.priceUSD, selectedCrypto),
    [property.priceUSD, selectedCrypto]
  );
    
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: 'Copied to clipboard!' });
  };

  useEffect(() => {
    if (state.message && !state.confirmation) {
        toast({
            title: 'Error',
            description: state.message,
            variant: 'destructive',
        });
    }
  }, [state, toast]);

  if (state.confirmation) {
    return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
                <div className="mx-auto bg-muted rounded-full p-3 w-fit mb-4">
                    {state.confirmation.isConfirmed ? (
                        <CheckCircle2 className="w-12 h-12 text-green-500"/>
                    ) : (
                        <AlertCircle className="w-12 h-12 text-red-500"/>
                    )}
                </div>
                <CardTitle className="text-2xl">{state.confirmation.isConfirmed ? 'Payment Confirmed!' : 'Confirmation Pending'}</CardTitle>
                <CardDescription>
                    {state.confirmation.confirmationMessage}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-center">
                     <Button variant="outline" onClick={() => window.location.reload()}>
                        <ArrowLeft className="mr-2 h-4 w-4"/>
                        Start a New Transaction
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      {/* Payment Details */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold font-headline">1. Review and Send Payment</h2>
        <Card>
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Send exactly</Label>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-2xl font-bold font-mono tracking-tight">{formatCryptoAmount(cryptoAmount)} {selectedCrypto}</p>
                <Button variant="ghost" size="icon" onClick={() => copyToClipboard(formatCryptoAmount(cryptoAmount))}><Copy className="w-4 h-4"/></Button>
              </div>
              <p className="text-sm text-muted-foreground">{formatUsdAmount(property.priceUSD)}</p>
            </div>
             <div>
              <Label>To this {selectedCrypto} address</Label>
               <div className="flex items-center gap-2 mt-1">
                <p className="text-sm font-mono break-all">{RECIPIENT_WALLET_ADDRESS}</p>
                 <Button variant="ghost" size="icon" onClick={() => copyToClipboard(RECIPIENT_WALLET_ADDRESS)}><Copy className="w-4 h-4"/></Button>
              </div>
            </div>
             <Alert>
                <ShieldCheck className="h-4 w-4" />
                <AlertTitle>Important!</AlertTitle>
                <AlertDescription>
                    Only send {selectedCrypto} to this address. Sending any other coins may result in permanent loss.
                </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
        
        <div className="space-y-2">
            <Label>Choose Currency</Label>
            <div className="grid grid-cols-3 gap-2">
                {Object.entries(CRYPTO_CURRENCIES).map(([key, { name, Icon }]) => (
                    <Button 
                        key={key} 
                        variant={selectedCrypto === key ? 'default' : 'outline'}
                        onClick={() => setSelectedCrypto(key as CryptoType)}
                    >
                        <Icon className="mr-2 w-5 h-5"/>
                        {name}
                    </Button>
                ))}
            </div>
        </div>
      </div>

      {/* Confirmation Form */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold font-headline">2. Confirm Your Transaction</h2>
        <Card>
          <CardHeader>
            <CardTitle>Confirmation</CardTitle>
            <CardDescription>
              After sending the funds from your wallet, paste the transaction ID below to confirm.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={dispatch} className="space-y-4">
               <input type="hidden" name="cryptoType" value={selectedCrypto} />
               <input type="hidden" name="amount" value={cryptoAmount} />
               <input type="hidden" name="usdValue" value={property.priceUSD} />
               <input type="hidden" name="walletAddress" value={RECIPIENT_WALLET_ADDRESS} />
              
               <div>
                <Label htmlFor="transactionId">Transaction ID (TxID)</Label>
                <Input id="transactionId" name="transactionId" placeholder="0x..." required />
                {state.errors?.transactionId && <p className="text-sm text-red-500 mt-1">{state.errors.transactionId[0]}</p>}
               </div>
               
              <SubmitButton />
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
