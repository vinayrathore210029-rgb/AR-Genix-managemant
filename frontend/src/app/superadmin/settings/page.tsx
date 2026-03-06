"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Building2,
    BellRing,
    Palette,
    Link,
    Database,
    ShieldCheck,
    Mail,
    Globe,
    Phone,
    CloudUpload,
    History,
    Key,
    Save,
    Settings
} from "lucide-react";
import TopNavbar from "@/components/superadmin/TopNavbar";

const settingTabs = [
    { id: "company", label: "Company Info", icon: Building2 },
    { id: "notifications", label: "Notifications", icon: BellRing },
    { id: "appearance", label: "UI & Theme", icon: Palette },
    { id: "integrations", label: "API & Keys", icon: Link },
    { id: "backup", label: "Backup & Restore", icon: Database },
];

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("company");

    return (
        <div className="space-y-6 pb-10">
            <TopNavbar title="System Settings" />

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Tabs Sidebar */}
                <div className="lg:w-64 space-y-2">
                    {settingTabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl transition-all ${activeTab === tab.id
                                ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20"
                                : "text-slate-400 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            <tab.icon size={20} />
                            <span className="text-sm font-medium">{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Settings Content */}
                <div className="flex-1">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-[#121215]/80 backdrop-blur-md border border-white/5 rounded-[40px] p-8 lg:p-10 shadow-xl"
                    >
                        {activeTab === "company" && (
                            <div className="space-y-8">
                                <div className="border-b border-white/5 pb-6">
                                    <h3 className="text-2xl font-bold text-white mb-2">Company Information</h3>
                                    <p className="text-slate-500">Update your company presence and public profile</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest pl-1">Company Name</label>
                                        <input type="text" defaultValue="AR-Genix Solutions" className="w-full bg-black/20 border border-white/10 rounded-2xl px-5 py-3 text-white focus:outline-none focus:border-blue-500/50" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest pl-1">Tagline</label>
                                        <input type="text" defaultValue="Next-gen ERP Management" className="w-full bg-black/20 border border-white/10 rounded-2xl px-5 py-3 text-white focus:outline-none focus:border-blue-500/50" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest pl-1">Support Email</label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                            <input type="email" defaultValue="support@argenix.com" className="w-full bg-black/20 border border-white/10 rounded-2xl px-5 py-3 pl-12 text-white focus:outline-none focus:border-blue-500/50" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest pl-1">Website URL</label>
                                        <div className="relative">
                                            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                            <input type="text" defaultValue="https://argenix-solutions.com" className="w-full bg-black/20 border border-white/10 rounded-2xl px-5 py-3 pl-12 text-white focus:outline-none focus:border-blue-500/50" />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest pl-1">Company Logo</label>
                                    <div className="flex items-center gap-6">
                                        <div className="w-24 h-24 rounded-3xl bg-black/40 border border-white/10 flex items-center justify-center p-4">
                                            <img src="/logo.png" alt="Current Logo" className="w-full h-full object-contain" />
                                        </div>
                                        <button className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-slate-300 hover:text-white transition-all text-sm font-bold">
                                            <CloudUpload size={18} />
                                            Change Logo
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "notifications" && (
                            <div className="space-y-10">
                                <div className="border-b border-white/5 pb-6">
                                    <h3 className="text-2xl font-bold text-white mb-2">Notification Preferences</h3>
                                    <p className="text-slate-500">Manage how the system alerts users and admins</p>
                                </div>

                                <div className="space-y-6">
                                    {[
                                        { title: "Email Notifications", desc: "Send automated emails for task updates and reports", active: true },
                                        { title: "Push Notifications", desc: "Browser-based alerts for real-time system events", active: true },
                                        { title: "Critical Error Alerts", desc: "Notify super admins of server/database failures immediately", active: true },
                                        { title: "SMS Alerts", desc: "Used for emergency 2FA and sensitive security changes", active: false },
                                    ].map((s, i) => (
                                        <div key={i} className="flex items-center justify-between p-6 bg-white/5 rounded-3xl border border-white/5 group">
                                            <div className="flex items-center gap-4">
                                                <div className={`p-3 rounded-2xl transition-colors ${s.active ? "bg-blue-500/10 text-blue-400" : "bg-slate-700/20 text-slate-600"}`}>
                                                    <BellRing size={20} />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-white">{s.title}</h4>
                                                    <p className="text-xs text-slate-500">{s.desc}</p>
                                                </div>
                                            </div>
                                            <div className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${s.active ? "bg-blue-500" : "bg-slate-700"}`}>
                                                <motion.div animate={{ x: s.active ? 24 : 0 }} className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow-md" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === "integrations" && (
                            <div className="space-y-10">
                                <div className="border-b border-white/5 pb-6">
                                    <h3 className="text-2xl font-bold text-white mb-2">Integrations & API</h3>
                                    <p className="text-slate-500">Connect third-party services and manage keys</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="p-6 bg-white/5 rounded-3xl border border-white/5 relative group overflow-hidden">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center">
                                                <Key size={20} />
                                            </div>
                                            <h4 className="font-bold text-white">Public API Key</h4>
                                        </div>
                                        <div className="bg-black/40 p-3 rounded-xl border border-white/5 flex items-center justify-between mb-2">
                                            <code className="text-xs text-blue-400 truncate pr-4">pk_live_51Msz...G9Xv</code>
                                            <button className="text-[10px] font-bold text-slate-500 hover:text-white transition-colors">COPY</button>
                                        </div>
                                        <p className="text-[10px] text-slate-500 italic">Last regenerated: 14 days ago</p>
                                    </div>

                                    <div className="p-6 bg-white/5 rounded-3xl border border-white/5 flex items-center justify-between hover:bg-white/10 transition-all cursor-pointer">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-[#00A4EF] text-white flex items-center justify-center">
                                                <CloudUpload size={20} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white">Azure S3</h4>
                                                <p className="text-xs text-emerald-400 font-medium">Connected</p>
                                            </div>
                                        </div>
                                        <Settings className="text-slate-600" size={18} />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex justify-end mt-12 pt-8 border-t border-white/5">
                            <button className="flex items-center gap-2 px-8 py-4 bg-blue-500 hover:bg-blue-400 text-white rounded-2xl shadow-xl shadow-blue-500/20 transition-all font-bold">
                                <Save size={20} />
                                <span>Save System Settings</span>
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
