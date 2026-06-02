"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function FloatingWhatsApp() {
  const handleWhatsApp = () => {
    window.open("https://wa.me/628123456789?text=Halo%20Admin%20SAMITRA,%20saya%20butuh%20bantuan.", "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={handleWhatsApp}
              className="h-14 w-14 rounded-full shadow-2xl bg-[#25D366] hover:bg-[#128C7E] border-none text-white p-0 flex items-center justify-center transition-all hover:scale-110 active:scale-95 animate-bounce-subtle"
              size="icon"
            >
              <MessageCircle className="h-7 w-7 fill-current" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left" className="bg-white text-slate-800 font-bold border-slate-100 shadow-xl mb-2">
            Butuh Bantuan?
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}