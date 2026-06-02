"use client";

import { LayoutGrid, CheckCircle2, Users, Clock } from "lucide-react";

interface StatsOverviewProps {
  totalServices: number;
  totalSubmissions: number;
  activeMitra: number;
  responseTime: string;
}

export function StatsOverview({ totalServices, totalSubmissions, activeMitra, responseTime }: StatsOverviewProps) {
  const stats = [
    {
      label: "Layanan Tersedia",
      value: totalServices,
      icon: LayoutGrid,
      color: "text-primary",
      bg: "bg-primary/5"
    },
    {
      label: "Total Pengajuan",
      value: totalSubmissions.toLocaleString(),
      icon: CheckCircle2,
      color: "text-primary",
      bg: "bg-primary/5"
    },
    {
      label: "Mitra Aktif",
      value: `${(activeMitra / 1000).toFixed(0)}rb+`,
      icon: Users,
      color: "text-primary",
      bg: "bg-primary/5"
    },
    {
      label: "Respon Cepat",
      value: responseTime,
      icon: Clock,
      color: "text-[#C9A227]",
      bg: "bg-[#C9A227]/5"
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col items-center text-center gap-3 transition-all hover:shadow-lg hover:-translate-y-1">
          <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
            <stat.icon className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h4 className="text-2xl font-headline font-bold text-slate-800 leading-none">{stat.value}</h4>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
