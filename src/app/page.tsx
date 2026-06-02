"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, Star, FileText, LayoutGrid, Megaphone, GraduationCap, Package, Clock, Sparkles, AlertCircle, BadgeCheck, Handshake, ExternalLink, ChevronRight } from "lucide-react";
import { FORMS_DATA, ServiceForm } from "@/lib/forms-data";
import { ServiceCard } from "@/components/portal/ServiceCard";
import { AISuggester } from "@/components/portal/AISuggester";
import { FloatingWhatsApp } from "@/components/portal/FloatingWhatsApp";
import { StatsOverview } from "@/components/portal/StatsOverview";
import { RecentActivity, Activity } from "@/components/portal/RecentActivity";
import { Logo } from "@/components/portal/Logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

const CATEGORY_ICONS = [
  { name: "Semua", icon: LayoutGrid },
  { name: "Dokumen", icon: FileText },
  { name: "Marketing", icon: Megaphone },
  { name: "Event", icon: GraduationCap },
  { name: "Kemitraan", icon: Handshake },
  { name: "Merchandise", icon: Package },
];

export default function PortalPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [stats, setStats] = useState<{ counts: Record<string, number>; activities: Activity[] }>({ 
    counts: {}, 
    activities: [] 
  });

  const isSearching = searchQuery.trim().length > 0;

  useEffect(() => {
    const savedStats = localStorage.getItem("portal_mitra_samira_v5");
    if (savedStats) {
      try {
        setStats(JSON.parse(savedStats));
      } catch (e) {
        console.error("Failed to parse stats", e);
      }
    }
  }, []);

  const handleApply = (form: ServiceForm) => {
    const newCounts = { ...stats.counts, [form.id]: (stats.counts[form.id] || 0) + 1 };
    const newActivity: Activity = {
      id: Math.random().toString(36).substr(2, 9),
      serviceName: form.name,
      timestamp: Date.now(),
    };
    const newActivities = [newActivity, ...stats.activities].slice(0, 5);
    const newStats = { counts: newCounts, activities: newActivities };
    setStats(newStats);
    localStorage.setItem("portal_mitra_samira_v5", JSON.stringify(newStats));
    window.open(form.link, "_blank");
  };

  const filteredForms = useMemo(() => {
    return FORMS_DATA.filter((form) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        form.name.toLowerCase().includes(query) || 
        form.description.toLowerCase().includes(query) ||
        form.category.toLowerCase().includes(query);
      const matchesCategory = selectedCategory === "Semua" || form.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const popularForms = useMemo(() => {
    const sorted = [...FORMS_DATA].sort((a, b) => (stats.counts[b.id] || 0) - (stats.counts[a.id] || 0));
    const totalUsage = Object.values(stats.counts).reduce((a, b) => a + b, 0);
    if (totalUsage > 0) {
      return sorted.slice(0, 3);
    }
    // Fallback if no usage yet
    const defaults = ["umroh-jamaah", "rekomendasi-passport", "landing-page"];
    return FORMS_DATA.filter(form => defaults.includes(form.id));
  }, [stats.counts]);

  const totalSubmissions = Object.values(stats.counts).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-[#F5FBFC] font-body selection:bg-primary/20 bg-islamic-pattern">
      {/* Optimized Premium Header */}
      <section className="relative pt-6 pb-8 md:pt-20 md:pb-16 px-4 overflow-hidden border-b border-white/40 md:border-none">
        {/* Subtle Watermark Background */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 opacity-[0.04] blur-sm select-none pointer-events-none grayscale">
          <Image 
            src="https://picsum.photos/seed/nabawi-premium/800/800" 
            alt="watermark" 
            width={800} 
            height={800} 
            className="rounded-full"
            data-ai-hint="masjid nabawi"
          />
        </div>

        <div className="container mx-auto max-w-5xl relative z-10 text-left md:text-center space-y-6 md:space-y-12">
          {/* Enhanced Responsive Branding Area */}
          <div className="flex flex-col items-start md:items-center space-y-4 md:space-y-6">
            <div className="md:hidden">
              <Logo size="sm" showTagline className="animate-in fade-in slide-in-from-top-4 duration-700" />
            </div>
            <div className="hidden md:block">
              <Logo size="xl" showTagline className="mb-4 animate-in fade-in slide-in-from-top-4 duration-700" />
            </div>
            
            <div className="space-y-1 md:space-y-2">
              <h1 className="text-2xl md:text-5xl font-headline font-bold text-slate-900 tracking-tight">
                Assalamu’alaikum, <span className="text-primary">Mitra 👋</span>
              </h1>
              <p className="text-slate-500 text-sm md:text-xl font-medium max-w-lg md:mx-auto leading-relaxed">
                Mau mengajukan apa hari ini? Silakan pilih layanan di bawah ini.
              </p>
            </div>
          </div>

          {/* Search Bar - Fixed visual weight on mobile */}
          <div className="relative w-full max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-1000">
            <div className="absolute inset-y-0 left-5 md:left-8 flex items-center pointer-events-none">
              <Search className="w-5 h-5 md:w-6 md:h-6 text-primary/60" />
            </div>
            <Input
              placeholder="Cari layanan, passport, cuti..."
              className="w-full h-12 md:h-16 pl-12 md:pl-16 pr-6 md:pr-8 rounded-full md:rounded-[2rem] bg-white shadow-xl shadow-primary/5 border-none focus-visible:ring-4 focus-visible:ring-primary/10 transition-all text-base md:text-xl placeholder:text-slate-300 font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="mt-3 flex flex-wrap justify-start md:justify-center gap-2 md:gap-3">
              <span className="text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-wider">Contoh:</span>
              {["passport", "cuti", "seminar"].map((term) => (
                <button 
                  key={term}
                  onClick={() => setSearchQuery(term)} 
                  className="text-[10px] md:text-xs text-primary font-bold hover:text-secondary hover:underline transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Modern Circular Categories - More compact on mobile */}
          {!isSearching && (
            <div className="flex flex-wrap justify-start md:justify-center gap-4 md:gap-12 pt-2 md:pt-6 animate-in fade-in duration-1000 delay-300">
              {CATEGORY_ICONS.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={cn(
                    "flex flex-col items-center gap-1.5 md:gap-3 transition-all group outline-none shrink-0",
                    selectedCategory === cat.name ? "scale-105 md:scale-110" : "hover:scale-105 md:hover:scale-110"
                  )}
                >
                  <div className={cn(
                    "w-12 h-12 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all shadow-sm md:shadow-md border",
                    selectedCategory === cat.name 
                      ? "bg-primary text-white border-primary" 
                      : "bg-white text-primary border-slate-100 hover:border-primary/20 hover:shadow-lg"
                  )}>
                    <cat.icon className="w-5 h-5 md:w-9 md:h-9" />
                  </div>
                  <span className={cn(
                    "text-[9px] md:text-[11px] font-bold uppercase tracking-widest",
                    selectedCategory === cat.name ? "text-primary" : "text-slate-400"
                  )}>
                    {cat.name}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <main className="container mx-auto px-4 md:px-6 pb-20 md:pb-32 max-w-6xl">
        
        {isSearching ? (
          <div className="space-y-8 md:space-y-12 animate-in fade-in zoom-in-95 duration-500">
            <div className="flex items-center justify-between border-b border-slate-200 pb-6 md:pb-8">
              <div className="space-y-1">
                <h2 className="text-xl md:text-3xl font-headline font-bold text-slate-900">Hasil Pencarian</h2>
                <p className="text-slate-500 text-xs md:text-base font-medium">
                  Ditemukan <span className="text-primary font-bold">{filteredForms.length}</span> layanan
                </p>
              </div>
              <BadgeCheck className="text-primary w-6 h-6 md:w-8 md:h-8 opacity-50" />
            </div>

            {filteredForms.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {filteredForms.map((form) => (
                  <ServiceCard 
                    key={form.id} 
                    form={form} 
                    usageCount={stats.counts[form.id] || 0}
                    onApply={handleApply}
                  />
                ))}
              </div>
            ) : (
              <div className="py-16 md:py-24 text-center bg-white rounded-3xl md:rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50">
                <div className="w-16 h-16 md:w-24 md:h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8">
                  <AlertCircle className="w-8 h-8 md:w-12 md:h-12 text-slate-200" />
                </div>
                <h3 className="text-lg md:text-2xl font-headline font-bold text-slate-800 mb-2 md:mb-3">Layanan tidak ditemukan</h3>
                <p className="text-slate-400 mb-8 md:mb-10 max-w-xs md:max-w-md mx-auto text-sm md:text-lg font-medium">Maaf, layanan yang Anda cari belum tersedia. Silakan coba kata kunci lain.</p>
                <Button 
                  variant="outline"
                  className="rounded-full px-8 md:px-10 h-12 md:h-14 text-primary border-primary border-2 hover:bg-primary hover:text-white font-bold text-sm md:text-lg transition-all"
                  onClick={() => setSearchQuery("")}
                >
                  Reset Pencarian
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-20 md:space-y-32">
            {/* Catalog Section */}
            <section className="space-y-8 md:space-y-12">
              <div className="flex items-center justify-between">
                <h2 className="text-xl md:text-3xl font-headline font-bold text-slate-900">
                  {selectedCategory !== "Semua" ? `Kategori: ${selectedCategory}` : "Layanan Populer"}
                </h2>
                {selectedCategory !== "Semua" && (
                  <Button 
                    variant="ghost" 
                    className="text-primary font-bold hover:bg-primary/10 rounded-full px-4 md:px-6 text-xs md:text-sm"
                    onClick={() => setSelectedCategory("Semua")}
                  >
                    Lihat Semua <ChevronRight className="ml-1 w-4 h-4" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {/* Always show popular on main view if category is 'Semua' */}
                {(selectedCategory === "Semua" ? popularForms : filteredForms).map((form) => (
                  <ServiceCard 
                    key={form.id} 
                    form={form} 
                    isPopular={selectedCategory === "Semua"}
                    usageCount={stats.counts[form.id] || 0}
                    onApply={handleApply}
                  />
                ))}
              </div>

              {/* All Services section below Popular if 'Semua' selected */}
              {selectedCategory === "Semua" && (
                <div className="pt-16 md:pt-20 space-y-8 md:space-y-12 border-t border-slate-200">
                  <h3 className="text-lg md:text-2xl font-headline font-bold text-slate-800">Semua Layanan Digital</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {FORMS_DATA.map((form) => (
                      <ServiceCard 
                        key={`all-${form.id}`} 
                        form={form} 
                        usageCount={stats.counts[form.id] || 0}
                        onApply={handleApply}
                      />
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* AI Assistant Section */}
            <section className="max-w-3xl mx-auto">
              <AISuggester />
            </section>

            {/* How to Use Section - More vertical on mobile */}
            <section className="bg-white p-8 md:p-16 rounded-3xl md:rounded-[4rem] border border-slate-100 shadow-xl shadow-primary/5 text-center space-y-10 md:space-y-12">
              <div className="space-y-2 md:space-y-3">
                <h3 className="text-xl md:text-3xl font-headline font-bold text-slate-900">Cara Menggunakan Portal</h3>
                <p className="text-slate-500 text-sm md:text-lg font-medium">Langkah mudah untuk pengajuan digital Anda.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                {[
                  { step: 1, title: "Pilih Layanan", desc: "Cari form sesuai kebutuhan Anda." },
                  { step: 2, title: "Klik Ajukan", desc: "Klik tombol emas pengajuan sekarang." },
                  { step: 3, title: "Isi Google Form", desc: "Lengkapi data di formulir resmi kami." },
                  { step: 4, title: "Tunggu Admin", desc: "Tim kami akan memproses segera." },
                ].map((item) => (
                  <div key={item.step} className="flex md:flex-col items-center gap-4 md:gap-5 text-left md:text-center group">
                    <div className="shrink-0 w-12 h-12 md:w-16 md:h-16 bg-primary/10 text-primary rounded-xl md:rounded-2xl flex items-center justify-center font-bold text-lg md:text-2xl group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      {item.step}
                    </div>
                    <div className="space-y-1 md:space-y-2">
                      <h4 className="font-bold text-slate-800 text-base md:text-lg">{item.title}</h4>
                      <p className="text-[11px] md:text-sm text-slate-400 leading-relaxed font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Compact Activity Portal (Statistics) */}
            <section className="pt-16 md:pt-20 border-t border-slate-200 space-y-10 md:space-y-12">
              <div className="flex items-center gap-3 justify-center">
                <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-[#C9A227] fill-current" />
                <h2 className="text-lg md:text-2xl font-headline font-bold text-slate-800">Aktivitas Portal</h2>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
                <div className="lg:col-span-8">
                  <StatsOverview 
                    totalServices={FORMS_DATA.length}
                    totalSubmissions={totalSubmissions}
                    activeMitra={5000}
                    responseTime="< 15 Menit"
                  />
                </div>
                <div className="lg:col-span-4">
                  <RecentActivity activities={stats.activities} />
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      <FloatingWhatsApp />

      <footer className="bg-white border-t border-slate-100 pt-16 md:pt-20 pb-10 md:pb-12">
        <div className="container mx-auto px-6 max-w-5xl text-center space-y-8">
          <div className="flex flex-col items-center space-y-6">
            <Logo size="md" showTagline />
            <p className="text-slate-400 text-xs md:text-sm font-medium max-w-md leading-relaxed">
              Pusat akses formulir dan layanan pengajuan digital mitra terpercaya Samira Travel Indonesia.
            </p>
          </div>
          <div className="pt-8 md:pt-10 border-t border-slate-50 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
            <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-slate-300">
              &copy; 2026 Portal Mitra | Samira Travel
            </span>
            <div className="flex gap-6 md:gap-8 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400">
              <a href="#" className="hover:text-primary transition-colors">Kebijakan Privasi</a>
              <a href="#" className="hover:text-primary transition-colors">Syarat & Ketentuan</a>
              <a href="#" className="hover:text-primary transition-colors">Hubungi Kami</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
