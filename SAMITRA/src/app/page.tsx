
"use client";

import { useState, useMemo, useEffect } from "react";
import { 
  Search, 
  LogOut, 
  User, 
  Loader2, 
  Ticket,
  Presentation,
  ShoppingBag,
  Megaphone,
  History,
  FileSearch,
  Sparkles,
  Briefcase,
  UserCircle,
  ChevronDown
} from "lucide-react";
import { FORMS_DATA, ServiceForm } from "@/lib/forms-data";
import { ServiceCard } from "@/components/portal/ServiceCard";
import { FloatingWhatsApp } from "@/components/portal/FloatingWhatsApp";
import { StatsOverview } from "@/components/portal/StatsOverview";
import { Logo } from "@/components/portal/Logo";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableRow 
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { LoginView } from "@/components/portal/LoginView";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [showSplash, setShowSplash] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [stats, setStats] = useState({ counts: {} as any, activities: [] as any[] });

  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
      setLoading(false);
    }, 2000);

    const savedStats = localStorage.getItem("samitra_v2_stats");
    const savedName = localStorage.getItem("samitra_user_name");
    
    if (savedStats) {
      try {
        setStats(JSON.parse(savedStats));
      } catch (e) {
        console.error("Failed to parse stats", e);
      }
    }

    if (savedName) {
      setUserName(savedName);
    }

    return () => clearTimeout(splashTimer);
  }, []);

  const handleLogin = (name: string) => {
    setUserName(name);
    localStorage.setItem("samitra_user_name", name);
  };

  const handleLogout = () => {
    setUserName("");
    localStorage.removeItem("samitra_user_name");
  };

  const handleChangeName = () => {
    // We can just log out to trigger the login screen
    handleLogout();
  };

  const handleApply = (form: ServiceForm) => {
    const newCounts = { ...stats.counts, [form.id]: (stats.counts[form.id] || 0) + 1 };
    const newActivity = {
      id: Math.random().toString(36).substr(2, 9),
      serviceName: form.name,
      timestamp: Date.now(),
      status: "Diproses"
    };
    const newActivities = [newActivity, ...stats.activities].slice(0, 5);
    const newStats = { counts: newCounts, activities: newActivities };
    setStats(newStats);
    localStorage.setItem("samitra_v2_stats", JSON.stringify(newStats));
    window.open(form.link, "_blank");
  };

  const filteredForms = useMemo(() => {
    return FORMS_DATA.filter((form) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesCategory = selectedCategory === "Semua" || form.category === selectedCategory;
      const matchesSearch = !query || 
        form.name.toLowerCase().includes(query) || 
        form.description.toLowerCase().includes(query) ||
        form.category.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const handleCategoryClick = (catName: string) => {
    setSelectedCategory(catName);
  };

  const handleKeywordClick = (keyword: string) => {
    setSearchQuery(keyword);
    setSelectedCategory("Semua");
  };

  const resetAll = () => {
    setSearchQuery("");
    setSelectedCategory("Semua");
  };

  const totalSubmissions = Object.values(stats.counts).reduce((a: any, b: any) => a + b, 0);

  if (showSplash) {
    return (
      <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-500">
        <Logo size="xl" showText={false} className="animate-pulse" />
        <div className="text-center space-y-3">
          <h2 className="text-4xl font-headline font-bold tracking-tighter">
            <span className="text-[#29B8D8]">SAMI</span>
            <span className="text-[#C9A227]">TRA</span>
          </h2>
          <div className="space-y-1">
            <p className="text-slate-400 font-bold text-sm tracking-widest uppercase">Portal Layanan Digital</p>
            <p className="text-slate-500 font-medium text-xs">Mitra Samira Travel</p>
          </div>
        </div>
        <div className="absolute bottom-16">
          <Loader2 className="w-8 h-8 text-[#29B8D8] animate-spin opacity-40" />
        </div>
      </div>
    );
  }

  if (!userName) {
    return <LoginView onLogin={handleLogin} />;
  }

  const isFiltering = searchQuery.trim() !== "" || selectedCategory !== "Semua";

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-100 h-[72px] px-4 md:px-8 flex items-center justify-between shadow-sm">
        <Logo size="sm" showTagline={true} />
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-slate-50 transition-colors">
              <div className="flex flex-col items-end hidden sm:flex">
                <span className="text-xs font-bold text-slate-700 truncate max-w-[120px]">{userName}</span>
                <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider">Online</span>
              </div>
              <div className="w-9 h-9 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center">
                 <User className="w-4 h-4 text-slate-400" />
              </div>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2 border-slate-100 shadow-xl">
            <DropdownMenuLabel className="px-3 py-2">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Akun Mitra</p>
              <p className="text-sm font-bold text-slate-700 truncate">{userName}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleChangeName} className="rounded-xl p-3 cursor-pointer">
              <UserCircle className="w-4 h-4 mr-2 text-slate-400" />
              <span className="font-bold text-slate-600">Ganti Nama</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout} className="rounded-xl p-3 cursor-pointer text-rose-500 focus:text-rose-500">
              <LogOut className="w-4 h-4 mr-2" />
              <span className="font-bold">Keluar</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>

      <main className="container mx-auto px-4 md:px-8 pt-6 pb-24 space-y-8 max-w-5xl">
        <section className="space-y-1">
          <h1 className="text-2xl font-headline font-bold text-slate-900">
            Assalamu’alaikum, <span className="text-[#29B8D8]">{userName} 👋</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium">Mau mengajukan layanan apa hari ini? Silakan pilih layanan di bawah ini.</p>
        </section>

        <section className="space-y-3">
          <div className="relative group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-[#29B8D8]/40 group-focus-within:text-[#29B8D8] transition-colors" />
            </div>
            <Input 
              placeholder="Cari layanan, passport, cuti, seminar, marketing..." 
              className="w-full h-14 pl-14 pr-6 rounded-2xl bg-white shadow-lg shadow-[#29B8D8]/5 border-none focus-visible:ring-4 focus-visible:ring-[#29B8D8]/10 transition-all text-base font-medium placeholder:text-slate-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 ml-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Klik cepat:</span>
            {["passport", "cuti", "landing page", "seminar", "marketing"].map((kw) => (
              <button
                key={kw}
                onClick={() => handleKeywordClick(kw)}
                className="text-xs text-[#29B8D8] font-bold hover:underline underline-offset-4"
              >
                {kw}
              </button>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {[
            { id: "Semua", label: "Semua", icon: Sparkles },
            { id: "Dokumen", label: "Dokumen", icon: Ticket },
            { id: "Marketing", label: "Marketing", icon: Megaphone },
            { id: "Event", label: "Seminar", icon: Presentation },
            { id: "Kemitraan", label: "Kemitraan", icon: Briefcase },
            { id: "Merchandise", label: "Merch", icon: ShoppingBag }
          ].map((cat) => (
            <button
              key={cat.label}
              onClick={() => handleCategoryClick(cat.id)}
              className={cn(
                "flex flex-col items-center gap-2 transition-all active:scale-95 group",
                selectedCategory === cat.id && "scale-105"
              )}
            >
              <div className={cn(
                "w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all shadow-sm border border-transparent",
                selectedCategory === cat.id ? "border-[#29B8D8] bg-[#29B8D8]/5" : "bg-white hover:bg-slate-50"
              )}>
                <cat.icon className={cn("w-6 h-6", selectedCategory === cat.id ? "text-[#29B8D8]" : "text-slate-400")} />
              </div>
              <span className={cn(
                "text-[10px] md:text-xs font-bold transition-colors",
                selectedCategory === cat.id ? "text-[#29B8D8]" : "text-slate-600"
              )}>{cat.label}</span>
            </button>
          ))}
        </section>

        <section className="space-y-6 pt-4 min-h-[400px]">
          {isFiltering ? (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h2 className="text-lg font-headline font-bold text-slate-800">
                    {searchQuery ? "Hasil Pencarian" : `Kategori ${selectedCategory}`}
                  </h2>
                  <Badge variant="outline" className="px-3 py-1 rounded-full border-[#29B8D8]/20 text-[#29B8D8] font-bold text-[10px]">
                     {filteredForms.length} Layanan
                  </Badge>
               </div>
               {filteredForms.length > 0 ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                 <div className="py-20 text-center flex flex-col items-center gap-4">
                    <FileSearch className="w-16 h-16 text-slate-200" />
                    <div className="space-y-1">
                       <h3 className="text-xl font-headline font-bold text-slate-800">Maaf, layanan tidak ditemukan</h3>
                       <p className="text-slate-400 text-xs font-medium">Coba gunakan kata kunci lain.</p>
                    </div>
                    <Button variant="ghost" onClick={resetAll} className="text-[#29B8D8] text-xs font-bold">Kembali ke Beranda</Button>
                 </div>
               )}
            </div>
          ) : (
            <>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-headline font-bold text-slate-800">Layanan Populer</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {FORMS_DATA.slice(0, 3).map((form) => (
                    <ServiceCard 
                      key={form.id} 
                      form={form} 
                      isPopular
                      usageCount={stats.counts[form.id] || 0}
                      onApply={handleApply}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <h2 className="text-lg font-headline font-bold text-slate-800">Katalog Layanan</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {FORMS_DATA.map((form) => (
                    <ServiceCard 
                      key={form.id} 
                      form={form} 
                      usageCount={stats.counts[form.id] || 0}
                      onApply={handleApply}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </section>

        <section className="space-y-8 pt-12 border-t border-slate-100 mt-12">
          <div className="text-center space-y-1">
            <h2 className="text-xl font-headline font-bold text-slate-900">Aktivitas Portal</h2>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Data Real-time Penggunaan SAMITRA</p>
          </div>
          
          <StatsOverview 
            totalServices={FORMS_DATA.length}
            totalSubmissions={totalSubmissions}
            activeMitra={5000}
            responseTime="< 15 Menit"
          />

          <div className="max-w-xl mx-auto space-y-4">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-xs font-bold text-slate-700 flex items-center gap-2">
                <History className="w-4 h-4 text-[#29B8D8]" />
                Riwayat Pengajuan Terakhir
              </h3>
            </div>
            <div className="bg-white rounded-2xl border border-slate-50 shadow-sm overflow-hidden">
              <Table>
                <TableBody>
                  {stats.activities.length > 0 ? (
                    stats.activities.map((activity) => (
                      <TableRow key={activity.id} className="border-slate-50 hover:bg-slate-50/50 transition-colors">
                        <TableCell className="font-bold text-slate-700 py-4 px-6 text-xs">{activity.serviceName}</TableCell>
                        <TableCell className="text-slate-400 text-[10px] whitespace-nowrap">
                          {new Date(activity.timestamp).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                        </TableCell>
                        <TableCell className="text-right px-6">
                          <Badge className={cn(
                            "px-3 py-1 rounded-full border-none font-bold text-[9px] uppercase tracking-widest",
                            activity.status === "Selesai" ? "bg-emerald-500 text-white" :
                            activity.status === "Diproses" ? "bg-blue-500 text-white" :
                            activity.status === "Menunggu" ? "bg-amber-500 text-white" :
                            "bg-rose-500 text-white"
                          )}>
                            {activity.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-10 text-slate-300 text-xs font-medium italic">Belum ada riwayat.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </section>
      </main>

      <FloatingWhatsApp />

      <footer className="bg-white border-t border-slate-100 py-10">
        <div className="container mx-auto px-8 text-center space-y-6">
          <Logo size="sm" className="mx-auto" showTagline={false} />
          <div className="space-y-1">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] font-headline">SAMITRA</p>
            <p className="text-[9px] text-slate-300 font-medium">Portal Layanan Digital Mitra Samira Travel</p>
          </div>
          <div className="pt-6 border-t border-slate-50">
            <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-slate-300">
              &copy; 2026 SAMITRA | PT SAMIRA ALI WISATA
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
