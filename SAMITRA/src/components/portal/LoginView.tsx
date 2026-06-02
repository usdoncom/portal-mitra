
"use client";

import { useState } from "react";
import { User, CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import { Logo } from "@/components/portal/Logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface LoginViewProps {
  onLogin: (name: string) => void;
}

export function LoginView({ onLogin }: LoginViewProps) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    setLoading(true);
    setTimeout(() => {
      onLogin(name.trim());
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Desktop Banner Side */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[#29B8D8] to-[#0E8FA3] p-20 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-islamic-pattern" />
        </div>
        <div className="relative z-10 space-y-10">
          <Logo size="lg" className="brightness-0 invert" showText={false} />
          <div className="space-y-6">
            <h1 className="text-6xl font-headline font-bold text-white leading-[1.1]">
              Selamat Datang di <br /> <span className="text-[#C9A227]">SAMITRA</span>
            </h1>
            <p className="text-white/80 text-xl font-medium max-w-lg">
              Satu-satunya portal layanan digital terpadu untuk memudahkan operasional bisnis Anda bersama Samira Travel.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6 pt-10">
            {["Mudah Digunakan", "Cepat & Efisien", "Aman & Terpercaya", "Layanan Lengkap"].map((item) => (
              <div key={item} className="flex items-center gap-3 text-white font-bold">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A227]" />
                </div>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Login Form Side */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-8 bg-[#F8FAFC]">
        <Card className="w-full max-w-md border-none shadow-2xl rounded-[2.5rem] bg-white overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
          <CardContent className="p-8 md:p-12 space-y-10">
            <div className="text-center space-y-4">
              <Logo size="md" className="mx-auto" showTagline={false} />
              <div className="space-y-1">
                <h2 className="text-3xl font-headline font-bold text-slate-900">Selamat Datang</h2>
                <p className="text-slate-400 font-medium">Silakan masukkan nama Anda untuk melanjutkan</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Nama Mitra</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                    <Input 
                      placeholder="Contoh: Doni Darmawan" 
                      className="pl-12 h-14 rounded-2xl bg-slate-50 border-none text-base focus-visible:ring-[#29B8D8]/20 font-medium"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      autoFocus
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Button 
                  type="submit" 
                  className="w-full h-14 rounded-2xl bg-[#29B8D8] hover:bg-[#29B8D8]/90 text-white font-bold text-lg shadow-xl shadow-[#29B8D8]/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                  disabled={loading || !name.trim()}
                >
                  {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                    <>
                      Masuk Ke Dashboard
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </Button>
                
                <p className="text-center text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                  Portal Digital Mitra Samira Travel
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
        
        {/* Mobile Illustration (Optional/Subtle) */}
        <div className="mt-8 lg:hidden opacity-20 pointer-events-none">
          <div className="w-20 h-20 bg-islamic-pattern bg-center bg-no-repeat mx-auto" />
        </div>
      </div>
    </div>
  );
}
