import { convertUSDtoCrypto, formatCryptoAmount, formatUsdAmount } from "@/lib/crypto";
import { BtcIcon } from "./icons";

type PriceProps = {
    priceUSD: number;
    className?: string;
};

export function Price({ priceUSD, className }: PriceProps) {
    const btcAmount = convertUSDtoCrypto(priceUSD, 'BTC');

    return (
        <div className={className}>
            <p className="text-lg font-bold font-headline">{formatUsdAmount(priceUSD)}</p>
            <p className="flex items-center gap-1 text-sm text-muted-foreground">
                <BtcIcon className="w-4 h-4"/>
                {formatCryptoAmount(btcAmount)} BTC
            </p>
        </div>
    );
}
