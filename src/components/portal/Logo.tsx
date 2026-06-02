import React from 'react';
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Logo({ className, showTagline = false, size = 'md' }: LogoProps) {
  // Enhanced sizes for premium branding, tuned for responsiveness
  const sizes = {
    sm: "h-8 md:h-10",
    md: "h-10 md:h-14",
    lg: "h-14 md:h-20",
    xl: "h-20 md:h-24"
  };

  const textSizes = {
    sm: "text-lg md:text-xl",
    md: "text-xl md:text-2xl",
    lg: "text-2xl md:text-3xl",
    xl: "text-3xl md:text-4xl"
  };

  const taglineSizes = {
    sm: "text-[8px] md:text-[10px]",
    md: "text-[9px] md:text-[11px]",
    lg: "text-[10px] md:text-[12px]",
    xl: "text-[11px] md:text-[13px]"
  };

  return (
    <div className={cn("flex items-center gap-3 md:gap-4", className)}>
      {/* Icon: Document + Handshake SVG based on branding */}
      <div className={cn("relative flex-shrink-0 aspect-square drop-shadow-md", sizes[size])}>
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Document Base (Premium Samira Tosca) */}
          <rect x="22" y="12" width="56" height="76" rx="8" stroke="#19C6D1" strokeWidth="6" />
          <path d="M60 12L78 30V12H60Z" fill="#19C6D1" />
          <path d="M60 12V30H78" stroke="#19C6D1" strokeWidth="4" strokeLinejoin="round" />
          
          {/* Handshake - Symbiotic Partnership */}
          <path 
            d="M30 60C30 60 38 54 45 60L52 68" 
            stroke="#19C6D1" 
            strokeWidth="8" 
            strokeLinecap="round"
          />
          <path 
            d="M70 60C70 60 62 54 55 60L48 68" 
            stroke="#C9A227" 
            strokeWidth="8" 
            strokeLinecap="round"
          />
          <circle cx="50" cy="62" r="6" fill="#19C6D1" fillOpacity="0.2" />
        </svg>
      </div>
      
      {/* Text Branding: Modern SaaS Style */}
      <div className="flex flex-col justify-center">
        <div className={cn("font-headline font-bold leading-none tracking-tight", textSizes[size])}>
          <span className="text-[#C9A227]">Portal</span>{" "}
          <span className="text-[#19C6D1]">Mitra</span>
        </div>
        {showTagline && (
          <span className={cn("text-slate-500 font-medium tracking-tight mt-1 md:mt-1.5 uppercase whitespace-nowrap opacity-80", taglineSizes[size])}>
            Portal Layanan Digital Mitra Samira Travel
          </span>
        )}
      </div>
    </div>
  );
}
