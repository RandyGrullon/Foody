import type { SVGProps } from "react";

export function IkeaEatsLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="134"
      height="36"
      viewBox="0 0 134 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="134" height="36" rx="8" fill="hsl(var(--primary))" />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontFamily="'PT Sans', sans-serif"
        fontSize="18"
        fontWeight="bold"
        fill="hsl(var(--primary-foreground))"
      >
        IKEA Eats
      </text>
    </svg>
  );
}

export function BarcodeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="180"
      height="80"
      viewBox="0 0 180 80"
      {...props}
    >
      <rect x="10" y="10" width="160" height="60" fill="white" />
      <g stroke="black">
        <path d="M20 20 V60" strokeWidth="2" />
        <path d="M24 20 V60" strokeWidth="1" />
        <path d="M28 20 V60" strokeWidth="3" />
        <path d="M34 20 V60" strokeWidth="1" />
        <path d="M38 20 V60" strokeWidth="2" />
        <path d="M42 20 V60" strokeWidth="1.5" />
        <path d="M46 20 V60" strokeWidth="2.5" />
        <path d="M52 20 V60" strokeWidth="1" />
        <path d="M55 20 V60" strokeWidth="1" />
        <path d="M60 20 V60" strokeWidth="3" />
        <path d="M65 20 V60" strokeWidth="1" />
        <path d="M70 20 V60" strokeWidth="2" />
        <path d="M74 20 V60" strokeWidth="1" />
        <path d="M80 20 V60" strokeWidth="2" />
        <path d="M85 20 V60" strokeWidth="3" />
        <path d="M90 20 V60" strokeWidth="1" />
        <path d="M95 20 V60" strokeWidth="2" />
        <path d="M100 20 V60" strokeWidth="1" />
        <path d="M104 20 V60" strokeWidth="1" />
        <path d="M108 20 V60" strokeWidth="3" />
        <path d="M114 20 V60" strokeWidth="1" />
        <path d="M118 20 V60" strokeWidth="2" />
        <path d="M122 20 V60" strokeWidth="1.5" />
        <path d="M126 20 V60" strokeWidth="2.5" />
        <path d="M132 20 V60" strokeWidth="1" />
        <path d="M135 20 V60" strokeWidth="1" />
        <path d="M140 20 V60" strokeWidth="3" />
        <path d="M145 20 V60" strokeWidth="1" />
        <path d="M150 20 V60" strokeWidth="2" />
        <path d="M154 20 V60" strokeWidth="1" />
        <path d="M160 20 V60" strokeWidth="2" />
      </g>
    </svg>
  );
}

export function QrCodeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="150"
      height="150"
      viewBox="0 0 150 150"
      {...props}
    >
      <rect width="150" height="150" fill="white" />
      <g fill="black">
        <rect x="20" y="20" width="40" height="40" />
        <rect x="90" y="20" width="40" height="40" />
        <rect x="20" y="90" width="40" height="40" />
        <rect x="25" y="25" width="30" height="30" fill="white" />
        <rect x="95" y="25" width="30" height="30" fill="white" />
        <rect x="25" y="95" width="30" height="30" fill="white" />
        <rect x="35" y="35" width="10" height="10" />
        <rect x="105" y="35" width="10" height="10" />
        <rect x="35" y="105" width="10" height="10" />
        <rect x="70" y="20" width="10" height="10" />
        <rect x="60" y="30" width="10" height="10" />
        <rect x="80" y="40" width="10" height="10" />
        <rect x="70" y="50" width="10" height="10" />
        <rect x="60" y="60" width="10" height="10" />
        <rect x="20" y="70" width="10" height="10" />
        <rect x="30" y="60" width="10" height="10" />
        <rect x="40" y="80" width="10" height="10" />
        <rect x="50" y="70" width="10" height="10" />
        <rect x="90" y="70" width="10" height="10" />
        <rect x="110" y="60" width="10" height="10" />
        <rect x="130" y="80" width="10" height="10" />
        <rect x="100" y="90" width="10" height="10" />
        <rect x="70" y="90" width="10" height="10" />
        <rect x="60" y="110" width="10" height="10" />
        <rect x="80" y="120" width="10" height="10" />
        <rect x="90" y="110" width="10" height="10" />
        <rect x="110" y="100" width="10" height="10" />
        <rect x="120" y="90" width="10" height="10" />
        <rect x="105" y="105" width="30" height="30" />
        <rect x="110" y="110" width="20" height="20" fill="white" />
      </g>
    </svg>
  );
}
