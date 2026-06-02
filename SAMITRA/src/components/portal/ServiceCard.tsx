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
  ArrowRight,
  MousePointer2, 
  Sparkles,
  Info
} from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ServiceForm } from "@/lib/forms-data";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

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
    <Dialog>
      <DialogTrigger asChild>
        <Card className={cn(
          "group flex flex-col overflow-hidden transition-all duration-300 rounded-[2rem] border-none bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 relative h-full cursor-pointer",
          isPopular && "ring-1 ring-[#29B8D8]/10"
        )}>
          {isPopular && (
            <div className="absolute top-4 right-4 z-10">
              <Badge className="bg-[#29B8D8] text-white border-none text-[8px] font-bold uppercase tracking-widest px-2 py-1 rounded-full flex items-center gap-1 shadow-md shadow-[#29B8D8]/10">
                <Sparkles className="w-3 h-3 fill-current" /> Populer
              </Badge>
            </div>
          )}
          
          <CardHeader className="p-6 pb-2">
            <div className="flex items-start justify-between mb-4">
              <div className="p-4 rounded-2xl bg-slate-50 text-slate-400 group-hover:bg-[#29B8D8] group-hover:text-white transition-all duration-500 shadow-sm border border-slate-100/50">
                <Icon className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-300 bg-slate-50/50 px-2 py-1 rounded-full">
                <MousePointer2 className="w-3 h-3" />
                {usageCount.toLocaleString()}
              </div>
            </div>
            <div className="space-y-1.5">
              <Badge variant="outline" className="text-[9px] font-bold border-[#29B8D8]/20 text-[#29B8D8] bg-[#29B8D8]/5 rounded-full px-2 py-0.5 tracking-wider uppercase">
                {form.category}
              </Badge>
              <CardTitle className="text-base font-headline font-bold text-slate-800 leading-tight group-hover:text-[#29B8D8] transition-colors">
                {form.name}
              </CardTitle>
            </div>
          </CardHeader>
          
          <CardContent className="px-6 pb-4 pt-1 flex-grow">
            <p className="text-slate-500 text-xs leading-relaxed font-medium line-clamp-2">
              {form.description}
            </p>
          </CardContent>
          
          <CardFooter className="px-6 pb-6 pt-0">
            <Button 
              className="w-full bg-[#C9A227] hover:bg-[#B38F20] text-white font-bold h-11 rounded-xl shadow-lg shadow-[#C9A227]/10 transition-all active:scale-95 text-xs group/btn flex items-center justify-between px-4"
              onClick={(e) => {
                e.stopPropagation();
                onApply(form);
              }}
            >
              <span>Ajukan Sekarang</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </CardFooter>
        </Card>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md rounded-[2.5rem] p-8">
        <DialogHeader className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#29B8D8]/10 text-[#29B8D8]">
              <Icon className="w-6 h-6" />
            </div>
            <Badge variant="outline" className="text-[10px] font-bold border-[#29B8D8]/20 text-[#29B8D8] bg-[#29B8D8]/5 px-3 py-1 rounded-full">
              {form.category}
            </Badge>
          </div>
          <DialogTitle className="text-2xl font-headline font-bold text-slate-900 leading-tight">
            {form.name}
          </DialogTitle>
          <DialogDescription className="text-slate-500 text-sm font-medium leading-relaxed">
            {form.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-2">
          {form.requirements && form.requirements.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <Info className="w-4 h-4" /> Persyaratan:
              </h4>
              <ul className="space-y-2">
                {form.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-600 text-xs font-medium">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#29B8D8] shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-slate-50 p-4 rounded-2xl flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Digunakan oleh</p>
              <p className="text-sm font-bold text-slate-800">{usageCount.toLocaleString()} Mitra</p>
            </div>
            <MousePointer2 className="w-5 h-5 text-slate-200" />
          </div>
        </div>

        <DialogFooter className="sm:justify-start pt-4">
          <Button 
            className="w-full bg-[#C9A227] hover:bg-[#B38F20] text-white font-bold h-14 rounded-2xl shadow-xl shadow-[#C9A227]/20 transition-all active:scale-95 text-base flex items-center justify-center gap-2"
            onClick={() => onApply(form)}
          >
            Mulai Pengajuan Sekarang
            <ArrowRight className="w-5 h-5" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
