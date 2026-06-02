"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FloatingWhatsApp() {
  const handleWhatsApp = () => {
    window.open("https://wa.me/628123456789?text=Halo%20Admin%20Portal%20Mitra,%20saya%20butuh%20bantuan.", "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={handleWhatsApp}
        className="h-12 w-12 rounded-full shadow-lg bg-[#25D366] hover:bg-[#128C7E] border-none text-white p-0 flex items-center justify-center transition-all hover:scale-110 active:scale-95"
        size="icon"
      >
        <MessageCircle className="h-6 w-6 fill-current" />
      </Button>
    </div>
  );
}
