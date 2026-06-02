import React from 'react';
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
  showTagline?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon-only';
}

export function Logo({ className, showText = true, showTagline = false, size = 'md', variant = 'full' }: LogoProps) {
  const sizes = {
    xs: "h-6 w-6",
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-20 w-20",
    xl: "h-32 w-32"
  };

  const textSizes = {
    xs: "text-sm",
    sm: "text-base",
    md: "text-xl",
    lg: "text-4xl",
    xl: "text-6xl"
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn("relative flex-shrink-0", sizes[size])}>
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Circular Swooshes (Branding) */}
          <path 
            d="M20 70C15 60 15 40 25 25" 
            stroke="#29B8D8" 
            strokeWidth="6" 
            strokeLinecap="round" 
            className="opacity-80"
          />
          <path 
            d="M80 30C85 40 85 60 75 75" 
            stroke="#C9A227" 
            strokeWidth="6" 
            strokeLinecap="round" 
            className="opacity-80"
          />

          {/* Document Background */}
          <rect x="30" y="20" width="40" height="55" rx="6" fill="white" stroke="#29B8D8" strokeWidth="3" />
          <rect x="36" y="28" width="8" height="8" rx="1" fill="#29B8D8" fillOpacity="0.1" />
          <path d="M50 30H62M36 42H62M36 50H62M36 58H50" stroke="#29B8D8" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          
          {/* Handshake Overlay (Main Subject) */}
          {/* Left Hand - Blue (#29B8D8) */}
          <path 
            d="M25 65L42 55C44 54 47 54 49 55L55 60L40 75L25 65Z" 
            fill="#29B8D8" 
            stroke="white" 
            strokeWidth="1.5"
          />
          {/* Right Hand - Gold (#C9A227) */}
          <path 
            d="M75 65L58 55C56 54 53 54 51 55L45 60L60 75L75 65Z" 
            fill="#C9A227" 
            stroke="white" 
            strokeWidth="1.5"
          />
          {/* Thumb/Detail Detail */}
          <path d="M48 58C50 57 52 57 54 58" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      
      {showText && variant === 'full' && (
        <div className="flex flex-col -space-y-0.5">
          <div className={cn("font-headline font-bold leading-none tracking-tight", textSizes[size])}>
            <span className="text-[#29B8D8]">SAMI</span>
            <span className="text-[#C9A227]">TRA</span>
          </div>
          {showTagline && (
            <span className="text-[9px] md:text-[10px] text-slate-400 font-medium tracking-tight uppercase">
              Portal Layanan Digital
            </span>
          )}
        </div>
      )}
    </div>
  );
}
