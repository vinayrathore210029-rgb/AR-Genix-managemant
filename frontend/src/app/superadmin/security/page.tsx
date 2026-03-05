"use client";

import { motion } from "framer-motion";
import {
    ShieldCheck,
    Lock,
    Eye,
    Smartphone,
    Globe,
    History,
    Download,
    AlertTriangle,
    ShieldAlert,
    UserCheck,
    Search,
    ChevronRight,
    Terminal
} from "lucide-react";
import TopNavbar from "@/components/superadmin/TopNavbar";

const auditLogs = [
    { id: 1, action: "Permission Override", user: "Amit Sharma", module: "Roles", time: "2 mins ago", severity: "High", ip: "192.168.1.45" },
    { id: 2, action: "Bulk User Export", user: "Amit Sharma", module: "Users", time: "15 mins ago", severity: "Medium", ip: "192.168.1.45" },
    { id: 3, action: "API Key Regenerated", user: "System Auto", module: "Settings", time: "1 hour ago", severity: "Low", ip: "internal" },
    { id: 4, action: "Failed Login Attempt", user: "Unknown", module: "Auth", time: "3 hours ago", severity: "Critical", ip: "45.22.1.201" },
];

export default function SecurityPage() {
    return (
        <div className="space-y-6 pb-10">
            <TopNavbar title="Security & Audit" />

            {/* Security Status Header */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-2 bg-gradient-to-br from-[#121215] to-[#1a1a1e] border border-blue-500/20 p-8 rounded-[40px] shadow-2xl relative overflow-hidden"
                >
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-6">
                            <div className="w-20 h-20 rounded-3xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 relative">
                                <ShieldCheck size={40} />
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                    className="absolute inset-0 bg-blue-400/10 rounded-3xl -z-10"
                                />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-1">System Security: Optimal</h3>
                                <p className="text-slate-400 max-w-sm">Your system is protected by 256-bit encryption and real-time threat monitoring.</p>
                            </div>
                        </div>
                        <button className="px-8 py-3 bg-blue-500 hover:bg-blue-400 text-white rounded-2xl shadow-xl shadow-blue-500/20 font-bold transition-all whitespace-nowrap">
                            Run Full Audit
                        </button>
                    </div>

                    {/* Background Abstract Security Grid */}
                    <div className="absolute top-0 right-0 w-64 h-full opacity-[0.05] pointer-events-none">
                        <Terminal size={200} className="text-blue-500 -mr-20" />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-[#121215]/80 border border-white/5 p-8 rounded-[40px] shadow-xl"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <ShieldAlert className="text-amber-400" size={24} />
                        <h4 className="font-bold text-white">Security Checklist</h4>
                    </div>
                    <div className="space-y-4">
                        {[
                            { label: "2FA Enabled", done: true },
                            { label: "IP Restriction", done: false },
                            { label: "SSL Certificate", done: true },
                            { label: "Encrypted Backups", done: true },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between text-sm">
                                <span className="text-slate-400">{item.label}</span>
                                <span className={item.done ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
                                    {item.done ? "COMPLIANT" : "ACTION NEEDED"}
                                </span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Security Modules */}
                <div className="xl:col-span-1 space-y-6">
                    {[
                        { title: "Two-Factor Auth", icon: Smartphone, desc: "Secure admin access via TOTP app or SMS.", color: "blue", status: "Enabled" },
                        { title: "IP Access Control", icon: Globe, desc: "Whitelist specific IPs for system entrance.", color: "emerald", status: "Disabled" },
                        { title: "Sensitive Logs", icon: Eye, desc: "Track every time PII data is viewed.", color: "purple", status: "Continuous" },
                    ].map((m, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            className="p-6 bg-[#121215]/80 border border-white/5 rounded-3xl flex items-center justify-between group cursor-pointer"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-2xl bg-${m.color}-500/10 text-${m.color}-400 flex items-center justify-center group-hover:bg-${m.color}-500/20 transition-colors`}>
                                    <m.icon size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">{m.title}</h4>
                                    <p className="text-xs text-slate-500">{m.desc}</p>
                                </div>
                            </div>
                            <ChevronRight className="text-slate-700 group-hover:text-white transition-colors" size={20} />
                        </motion.div>
                    ))}
                </div>

                {/* Audit Logs Table */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="xl:col-span-2 bg-[#121215]/80 border border-white/5 rounded-[40px] shadow-xl overflow-hidden flex flex-col"
                >
                    <div className="p-8 border-b border-white/5 flex items-center justify-between bg-black/20">
                        <div className="flex items-center gap-3">
                            <History className="text-blue-400" size={20} />
                            <h3 className="text-xl font-bold text-white">System Audit Logs</h3>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="relative group">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-400 transition-colors" size={14} />
                                <input type="text" placeholder="Search logs..." className="bg-black/40 border border-white/5 rounded-xl py-1.5 pl-9 pr-3 text-xs text-white focus:outline-none focus:border-blue-500/50" />
                            </div>
                            <button className="flex items-center gap-2 px-4 py-1.5 bg-white/5 hover:bg-white/10 rounded-xl text-slate-300 text-xs font-bold transition-all border border-white/5">
                                <Download size={14} />
                                <span>Export</span>
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-slate-500 text-[10px] font-bold uppercase tracking-widest border-b border-white/5">
                                    <th className="px-8 py-4 font-medium">Activity</th>
                                    <th className="px-8 py-4 font-medium">Actor</th>
                                    <th className="px-8 py-4 font-medium">Time</th>
                                    <th className="px-8 py-4 font-medium">IP Address</th>
                                    <th className="px-8 py-4 font-medium">Severity</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {auditLogs.map((log) => (
                                    <tr key={log.id} className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="px-8 py-5">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-white">{log.action}</span>
                                                <span className="text-[10px] text-slate-500 uppercase tracking-widest">{log.module}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-[10px] font-bold">
                                                    {log.user.charAt(0)}
                                                </div>
                                                <span className="text-sm text-slate-300">{log.user}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-sm text-slate-500">{log.time}</td>
                                        <td className="px-8 py-5">
                                            <span className="text-xs font-mono text-slate-600 bg-white/5 px-2 py-1 rounded-md">{log.ip}</span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className={`px-2 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest border ${log.severity === "Critical" ? "bg-red-500/20 text-red-400 border-red-500/30" :
                                                    log.severity === "High" ? "bg-amber-500/20 text-amber-400 border-amber-500/30" :
                                                        "bg-blue-500/10 text-blue-400 border-blue-500/20"
                                                }`}>
                                                {log.severity}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
