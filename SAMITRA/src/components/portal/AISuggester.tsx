"use client";

import { useState } from "react";
import { Sparkles, Send, Loader2, ArrowRight, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { partnerFormSuggester, type PartnerFormSuggesterOutput } from "@/ai/flows/partner-form-suggester";
import { Badge } from "@/components/ui/badge";

export function AISuggester() {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PartnerFormSuggesterOutput | null>(null);

  const handleSuggest = async () => {
    if (!description.trim()) return;
    setLoading(true);
    try {
      const output = await partnerFormSuggester({ partnerDescription: description });
      setResult(output);
    } catch (error) {
      console.error("AI Suggester Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-none shadow-lg bg-white rounded-[2.5rem] overflow-hidden">
      <CardHeader className="pt-8 px-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-primary/10 text-primary">
            <Sparkles className="w-5 h-5 fill-current" />
          </div>
          <div>
            <CardTitle className="text-xl font-headline text-slate-800">Asisten Pintar</CardTitle>
            <CardDescription className="text-sm font-medium">
              Cari layanan yang tepat dengan bantuan AI.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-8 pb-8 space-y-6">
        <div className="relative">
          <Textarea
            placeholder="Contoh: 'Mau bikin website untuk promo paket Ramadhan'"
            className="min-h-[120px] p-5 pr-14 resize-none bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-primary/20 transition-all text-base rounded-[1.5rem] placeholder:text-slate-300"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button
            size="icon"
            className="absolute bottom-3 right-3 h-10 w-10 rounded-xl bg-primary hover:bg-primary/90 shadow-md shadow-primary/20 transition-all active:scale-90"
            disabled={loading || !description.trim()}
            onClick={handleSuggest}
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </Button>
        </div>

        {result && (
          <div className="p-6 rounded-[1.5rem] bg-slate-50 border border-slate-100 animate-in fade-in slide-in-from-top-4 duration-500 relative overflow-hidden">
            <div className="absolute -top-4 -right-4 opacity-5">
              <Lightbulb className="w-24 h-24 text-secondary" />
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="space-y-1">
                <Badge variant="secondary" className="bg-secondary/10 text-secondary text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full border-none mb-2">
                  {result.recommendedForm.category}
                </Badge>
                <h4 className="text-lg font-headline text-slate-800">
                  {result.recommendedForm.name}
                </h4>
              </div>

              <div className="p-4 rounded-xl bg-white/60 text-sm text-slate-600 leading-relaxed italic border-l-2 border-secondary/40">
                "{result.recommendedForm.reason}"
              </div>

              <Button 
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-11 rounded-xl shadow-md shadow-primary/10 transition-all"
                onClick={() => window.open(result.recommendedForm.link, "_blank")}
              >
                Buka Layanan Rekomendasi
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
