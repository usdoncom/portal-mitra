import { 
  FileCheck, 
  CalendarCheck, 
  BadgeCheck, 
  Globe, 
  Megaphone, 
  Presentation, 
  ClipboardCheck, 
  UserPlus, 
  ShoppingBag, 
  CalendarDays, 
  ExternalLink,
  MousePointer2, 
  Sparkles,
  ArrowRight
} from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ServiceForm } from "@/lib/forms-data";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, any> = {
  "umroh-jamaah": FileCheck,
  "cuti-jamaah": CalendarCheck,
  "rekomendasi-passport": BadgeCheck,
  "landing-page": Globe,
  "ads-sosmed": Megaphone,
  "daftar-seminar": Presentation,
  "report-seminar": ClipboardCheck,
  "mitra-baru": UserPlus,
  "pre-order-amitra": ShoppingBag,
  "kalender-2025": CalendarDays,
};

interface ServiceCardProps {
  form: ServiceForm;
  isPopular?: boolean;
  usageCount: number;
  onApply: (form: ServiceForm) => void;
}

export function ServiceCard({ form, isPopular = false, usageCount = 0, onApply }: ServiceCardProps) {
  const Icon = ICON_MAP[form.id] || FileCheck;

  return (
    <Card className={cn(
      "group flex flex-col overflow-hidden transition-all duration-500 rounded-[2.5rem] border border-slate-100 bg-white shadow-sm hover:shadow-2xl hover:-translate-y-2 relative h-full",
      isPopular && "border-primary/20 ring-1 ring-primary/10"
    )}>
      {isPopular && (
        <div className="absolute top-5 right-5 z-10">
          <Badge className="bg-primary text-white border-none text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg shadow-primary/20">
            <Sparkles className="w-3.5 h-3.5 fill-current" /> Populer
          </Badge>
        </div>
      )}
      
      <CardHeader className="p-8 pb-4">
        <div className="flex items-start justify-between mb-6">
          <div className="p-5 rounded-[1.5rem] bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
            <Icon className="w-10 h-10" />
          </div>
          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100/50">
            <MousePointer2 className="w-3.5 h-3.5" />
            {usageCount.toLocaleString()} Pengajuan
          </div>
        </div>
        <div className="space-y-3">
          <Badge variant="outline" className="text-[11px] font-bold border-primary/20 text-primary bg-primary/5 rounded-full px-3 py-1">
            {form.category}
          </Badge>
          <CardTitle className="text-2xl font-headline font-bold text-slate-800 leading-tight group-hover:text-primary transition-colors">
            {form.name}
          </CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className="px-8 pb-8 pt-2 flex-grow">
        <p className="text-slate-500 text-base leading-relaxed font-medium line-clamp-3">
          {form.description}
        </p>
      </CardContent>
      
      <CardFooter className="px-8 pb-8 pt-0">
        <Button 
          className="w-full bg-[#C9A227] hover:bg-[#B38F20] text-white font-bold h-14 rounded-2xl shadow-xl shadow-secondary/20 transition-all active:scale-95 text-base group/btn flex items-center justify-between px-8"
          onClick={() => onApply(form)}
        >
          <span>Ajukan Sekarang</span>
          <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-2" />
        </Button>
      </CardFooter>
    </Card>
  );
}
