"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import React from "react";

export interface NotificationItemProps {
    title: string;
    description: string;
    time: string;
    icon: React.ReactNode;
    isUnread?: boolean;
    delay?: number;
}

export default function NotificationItem({ title, description, time, icon, isUnread = false, delay = 0 }: NotificationItemProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay, duration: 0.3 }}
            className={`p-4 rounded-2xl border ${isUnread ? "bg-emerald-500/5 border-emerald-500/20" : "bg-[#121215]/60 border-white/5"} backdrop-blur-sm flex items-start gap-4 hover:bg-white/[0.03] transition-colors`}
        >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isUnread ? "bg-emerald-500/20 text-emerald-400" : "bg-white/10 text-slate-400"}`}>
                {icon}
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-0.5">
                    <h4 className={`text-base font-medium ${isUnread ? "text-emerald-50" : "text-white"}`}>{title}</h4>
                    <span className="text-xs text-slate-500 shrink-0 ml-2 mt-1">{time}</span>
                </div>
                <p className="text-sm text-slate-400 line-clamp-2">{description}</p>
            </div>

            {isUnread && (
                <button className="shrink-0 p-2 text-emerald-400/50 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-all" title="Mark as read">
                    <Check size={18} />
                </button>
            )}
        </motion.div>
    );
}
