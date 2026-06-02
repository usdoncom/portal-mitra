"use client";

import { CheckCircle2, Clock, Hourglass, PlayCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsOverviewProps {
  totalServices: number;
  totalSubmissions: number;
  activeMitra: number;
  responseTime: string;
}

export function StatsOverview({ totalServices, totalSubmissions, activeMitra, responseTime }: StatsOverviewProps) {
  const stats = [
    {
      label: "Menunggu",
      value: "12",
      icon: Hourglass,
      color: "text-amber-500",
      bg: "bg-amber-50"
    },
    {
      label: "Diproses",
      value: "8",
      icon: PlayCircle,
      color: "text-blue-500",
      bg: "bg-blue-50"
    },
    {
      label: "Selesai",
      value: totalSubmissions.toLocaleString(),
      icon: CheckCircle2,
      color: "text-emerald-500",
      bg: "bg-emerald-50"
    },
    {
      label: "Ditolak",
      value: "0",
      icon: XCircle,
      color: "text-rose-500",
      bg: "bg-rose-50"
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-white p-4 md:p-5 rounded-[1.5rem] border border-slate-100 shadow-sm flex flex-col items-center text-center gap-3 transition-all hover:shadow-md group">
          <div className={cn("p-3 rounded-xl transition-transform group-hover:scale-105", stat.bg, stat.color)}>
            <stat.icon className="w-5 h-5 md:w-6 md:h-6" />
          </div>
          <div className="space-y-0.5">
            <h4 className="text-xl md:text-2xl font-headline font-bold text-slate-800 leading-none">{stat.value}</h4>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.1em]">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
