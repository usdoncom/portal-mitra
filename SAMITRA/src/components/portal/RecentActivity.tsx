"use client";

import { History, Clock, ArrowUpRight } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

export interface Activity {
  id: string;
  serviceName: string;
  timestamp: number;
}

interface RecentActivityProps {
  activities: Activity[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6 h-full">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-50">
        <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
          <History className="w-5 h-5" />
        </div>
        <h3 className="text-base font-headline font-bold text-slate-800">Aktivitas Terkini</h3>
      </div>
      
      <div className="space-y-5">
        {activities.length > 0 ? (
          activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4 group">
              <div className="mt-1 w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-primary transition-colors" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-slate-700 truncate leading-snug group-hover:text-primary transition-colors">{activity.serviceName}</p>
                <div className="flex items-center gap-2 text-slate-400 text-[11px] mt-1 font-medium">
                  <Clock className="w-3 h-3" />
                  {formatDistanceToNow(activity.timestamp, { addSuffix: true, locale: id })}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 space-y-2">
            <p className="text-slate-400 text-sm font-medium italic">Belum ada aktivitas.</p>
            <p className="text-slate-300 text-[10px] uppercase font-bold tracking-widest">Mulai pengajuan pertama Anda</p>
          </div>
        )}
      </div>
    </div>
  );
}
