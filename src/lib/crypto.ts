import { Btc, Ethereum, CircleDollarSign } from 'lucide-react';
import { CryptoIconProps, BtcIcon, EthIcon, UsdtIcon } from '@/components/icons';

export const CRYPTO_CURRENCIES = {
  BTC: { name: 'Bitcoin', Icon: BtcIcon, symbol: 'BTC' },
  ETH: { name: 'Ethereum', Icon: EthIcon, symbol: 'ETH' },
  USDT: { name: 'Tether', Icon: UsdtIcon, symbol: 'USDT' },
} as const;

export type CryptoType = keyof typeof CRYPTO_CURRENCIES;

// In a real app, this would be fetched from a live API (e.g., CoinGecko, CryptoCompare)
export const MOCK_CONVERSION_RATES: Record<CryptoType, number> = {
  BTC: 65000.34,
  ETH: 3500.81,
  USDT: 1.00,
};

export function convertUSDtoCrypto(usdAmount: number, crypto: CryptoType): number {
  if (!MOCK_CONVERSION_RATES[crypto]) {
    throw new Error('Invalid cryptocurrency type');
  }
  return usdAmount / MOCK_CONVERSION_RATES[crypto];
}

export function formatCryptoAmount(amount: number): string {
    // Show more precision for cryptocurrencies
    return amount.toFixed(6);
}

export function formatUsdAmount(amount: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}
