import { cn } from "@/lib/utils";

export type CryptoIconProps = React.HTMLAttributes<HTMLOrSVGElement>;

export const Logo = ({ className, ...props }: CryptoIconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("h-6 w-6", className)}
        {...props}
    >
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
    </svg>
);


export const BtcIcon = ({ className, ...props }: CryptoIconProps) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("h-6 w-6", className)}
    {...props}
  >
    <title>Bitcoin</title>
    <path d="M11.31 4.212v15.576H8.166V4.212zm.212-1.805a.87.87 0 01.87.87v.013a.9.9 0 01-.29.655 1.14 1.14 0 01-.58.324V4.21h-2.3V.87a.87.87 0 01.87-.87zm4.215 4.318h-2.31V4.21h2.31c1.29 0 2.3.9 2.3 2.155s-1.01 2.142-2.3 2.142zm0 5.17h-2.31V9.58h2.31c1.55 0 2.8.99 2.8 2.46s-1.25 2.46-2.8 2.46zm0 5.17h-2.31v-2.5h2.31c1.8 0 3.29-1.12 3.29-2.8s-1.48-2.8-3.3-2.8z" fill="currentColor"/>
  </svg>
);

export const EthIcon = ({ className, ...props }: CryptoIconProps) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("h-6 w-6", className)}
    {...props}
  >
    <title>Ethereum</title>
    <path d="M11.944 17.97L4.58 13.62l7.364 4.35zM12 17.97v4.58l7.364-8.72-7.364 4.14zM12 1.45l-7.364 8.72 7.364 4.14L19.364 10.17 12 1.45z" fill="currentColor"/>
  </svg>
);

export const UsdtIcon = ({ className, ...props }: CryptoIconProps) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("h-6 w-6", className)}
    {...props}
  >
    <title>Tether</title>
    <path d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm-3.34-4.835h6.68V6.843h-1.636v2.44h-3.41v-2.44H8.66v12.322zm3.33-10.682h-3.4v2.09h3.4v-2.09z" fill="currentColor"/>
  </svg>
);
