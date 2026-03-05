"use client";

import { motion } from "framer-motion";
import {
    Bell,
    CheckCircle2,
    AlertCircle,
    MessageSquare,
    Clock,
    Filter,
    Settings,
    MoreHorizontal,
    Shield,
    X
} from "lucide-react";
import TopNavbar from "@/components/superadmin/TopNavbar";

const notifications = [
    {
        id: 1,
        title: "New User Registration",
        desc: "A new employee 'Rohan Das' has registered and is awaiting department assignment.",
        time: "Just now",
        type: "info",
        icon: Shield,
        read: false
    },
    {
        id: 2,
        title: "Critical System Alert",
        desc: "Failed backup attempt detected for 'Project-Storage-A'. Please check Azure settings.",
        time: "15 mins ago",
        type: "error",
        icon: AlertCircle,
        read: false
    },
    {
        id: 3,
        title: "Milestone Approval Required",
        desc: "Sarah Jenkins submitted 'Phase 1 - Frontend' of Alpha CRM for review.",
        time: "2 hours ago",
        type: "warning",
        icon: Clock,
        read: true
    },
    {
        id: 4,
        title: "Salary Disbursement Complete",
        desc: "Monthly payroll for October 2026 has been successfully processed for 154 employees.",
        time: "5 hours ago",
        type: "success",
        icon: CheckCircle2,
        read: true
    },
];

export default function NotificationsPage() {
    return (
        <div className="space-y-6 pb-10">
            <TopNavbar title="Notifications" />

            <div className="max-w-5xl mx-auto space-y-6">
                {/* Header Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#121215]/50 backdrop-blur-md border border-white/5 p-6 rounded-[32px] shadow-lg">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                            <Bell size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">System Notifications</h3>
                            <p className="text-sm text-slate-500">You have 2 unread alerts today</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/5 rounded-2xl text-slate-400 hover:text-white transition-all text-sm font-medium">
                            <Settings size={18} />
                            <span>Preferences</span>
                        </button>
                        <button className="px-6 py-2.5 bg-blue-500 hover:bg-blue-400 text-white rounded-2xl shadow-xl transition-all text-sm font-bold">
                            Mark All Read
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
                    {["All", "Unread", "Critical", "System", "Finance"].map((f, i) => (
                        <button key={i} className={`px-5 py-2 rounded-full border text-xs font-bold transition-all whitespace-nowrap ${i === 0 ? "bg-blue-500/10 border-blue-500/30 text-blue-400" : "bg-[#121215]/80 border-white/5 text-slate-500 hover:text-white"}`}>
                            {f}
                        </button>
                    ))}
                </div>

                {/* Notifications List */}
                <div className="space-y-3">
                    {notifications.map((n, i) => (
                        <motion.div
                            key={n.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ scale: 1.01 }}
                            className={`p-6 rounded-[32px] border transition-all flex items-start justify-between group relative overflow-hidden ${n.read ? "bg-[#121215]/40 border-white/5" : "bg-[#121215]/80 border-blue-500/20 shadow-xl shadow-blue-500/5 ring-1 ring-blue-500/10"
                                }`}
                        >
                            {!n.read && (
                                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
                            )}

                            <div className="flex items-start gap-4">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border transition-colors ${n.type === "error" ? "bg-red-500/10 text-red-400 border-red-500/20" :
                                        n.type === "warning" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                                            n.type === "success" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                                                "bg-blue-500/10 text-blue-400 border-blue-500/20"
                                    }`}>
                                    <n.icon size={24} />
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <h4 className={`font-bold transition-colors ${n.read ? "text-slate-300" : "text-white"}`}>{n.title}</h4>
                                        {!n.read && <span className="w-2 h-2 bg-blue-500 rounded-full" />}
                                    </div>
                                    <p className="text-sm text-slate-500 leading-relaxed max-w-2xl">{n.desc}</p>
                                    <div className="flex items-center gap-3 pt-2">
                                        <div className="flex items-center gap-1.5 text-[10px] text-slate-600 font-bold uppercase tracking-widest">
                                            <Clock size={12} />
                                            {n.time}
                                        </div>
                                        {n.type === "error" && (
                                            <span className="px-2 py-0.5 bg-red-500/20 text-red-500 text-[10px] font-bold rounded-md uppercase tracking-wider">Priority 1</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-end gap-2 shrink-0">
                                <button className="p-2 text-slate-600 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                                    <MoreHorizontal size={20} />
                                </button>
                                <button className="p-2 text-slate-700 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <X size={18} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center pt-8">
                    <button className="text-sm font-bold text-slate-600 hover:text-blue-400 transition-colors uppercase tracking-widest">Load Older Notifications</button>
                </div>
            </div>
        </div>
    );
}
