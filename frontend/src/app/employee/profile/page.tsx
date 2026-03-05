"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Mail, Building, Briefcase, Calendar, Edit3, Key, ShieldCheck, CheckCircle, FolderKanban, TrendingUp } from "lucide-react";
import TopNavbar from "@/components/employee/TopNavbar";

export default function ProfilePage() {
    const [userName, setUserName] = useState("Employee");
    const [userEmail, setUserEmail] = useState("employee@argenix.com");
    const [avatarUrl, setAvatarUrl] = useState("https://ui-avatars.com/api/?name=Employee&background=0d9488&color=fff");

    useEffect(() => {
        const storedUserstr = localStorage.getItem("user");
        if (storedUserstr) {
            const user = JSON.parse(storedUserstr);
            setUserEmail(user.email);
            const namePart = user.email.split("@")[0];
            const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1).replace(".", " ");
            setUserName(formattedName);
            setAvatarUrl(`https://ui-avatars.com/api/?name=${encodeURIComponent(formattedName)}&background=0d9488&color=fff`);
        }
    }, []);

    return (
        <div className="space-y-6 pb-10 min-h-screen">
            <TopNavbar title="My Profile" />

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-8">

                {/* Left Column: User Card & Stats */}
                <div className="xl:col-span-1 space-y-6">
                    {/* ID Card */}
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#121215]/80 backdrop-blur-md border border-white/5 rounded-3xl p-8 shadow-xl text-center relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full" />

                        <div className="relative w-32 h-32 mx-auto mb-6">
                            <div className="w-full h-full rounded-full border-4 border-[#1a1a1e] shadow-xl overflow-hidden bg-white/5 p-1 relative z-10">
                                <img src={avatarUrl} alt="Profile" className="w-full h-full rounded-full object-cover" />
                            </div>
                            <button className="absolute bottom-0 right-0 bg-emerald-500 hover:bg-emerald-400 text-white p-2 rounded-full shadow-lg transition-colors z-20 border-2 border-[#121215]">
                                <Edit3 size={16} />
                            </button>
                        </div>

                        <h2 className="text-2xl font-bold text-white mb-1">{userName}</h2>
                        <span className="inline-block px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-semibold mb-4 tracking-wide uppercase">Employee</span>

                        <p className="text-slate-400 text-sm flex items-center justify-center gap-2 mb-2">
                            <Briefcase size={16} /> Software Engineer
                        </p>
                        <p className="text-slate-400 text-sm flex items-center justify-center gap-2">
                            <Building size={16} /> Product Development
                        </p>
                    </motion.div>

                    {/* Quick Stats */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#121215]/80 backdrop-blur-md border border-white/5 rounded-3xl p-6 shadow-xl grid grid-cols-2 gap-4">
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                            <CheckCircle className="text-emerald-400 mb-2" size={20} />
                            <p className="text-3xl font-bold text-white">48</p>
                            <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">Tasks Done</p>
                        </div>
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                            <FolderKanban className="text-blue-400 mb-2" size={20} />
                            <p className="text-3xl font-bold text-white">12</p>
                            <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">Projects</p>
                        </div>
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5 col-span-2 flex items-center justify-between">
                            <div>
                                <TrendingUp className="text-purple-400 mb-2" size={20} />
                                <p className="text-3xl font-bold text-white">98%</p>
                                <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">Performance Score</p>
                            </div>
                            <div className="w-16 h-16 rounded-full border-4 border-purple-500/30 flex items-center justify-center border-t-purple-500">
                                <span className="font-bold text-white">A+</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Right Column: Edit Forms */}
                <div className="xl:col-span-2 space-y-6">
                    {/* Personal Info Form */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#121215]/80 backdrop-blur-md border border-white/5 rounded-3xl shadow-xl overflow-hidden">
                        <div className="p-6 border-b border-white/5 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                                <User size={18} />
                            </div>
                            <h3 className="text-lg font-bold text-white">Personal Information</h3>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Full Name</label>
                                    <input type="text" defaultValue={userName} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 focus:bg-white/5 transition-colors" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                                        <input type="email" defaultValue={userEmail} disabled className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 pl-11 text-slate-400 cursor-not-allowed" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Department</label>
                                    <input type="text" defaultValue="Product Development" disabled className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-slate-400 cursor-not-allowed" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Date Joined</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                                        <input type="text" defaultValue="Jan 15, 2024" disabled className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 pl-11 text-slate-400 cursor-not-allowed" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end pt-4 border-t border-white/5 mt-4">
                                <button className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl font-medium shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all">
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Security Form */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-[#121215]/80 backdrop-blur-md border border-white/5 rounded-3xl shadow-xl overflow-hidden">
                        <div className="p-6 border-b border-white/5 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                                <ShieldCheck size={18} />
                            </div>
                            <h3 className="text-lg font-bold text-white">Security & Password</h3>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Current Password</label>
                                    <div className="relative">
                                        <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                                        <input type="password" placeholder="••••••••" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 pl-11 text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/5 transition-colors" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">New Password</label>
                                    <div className="relative">
                                        <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                                        <input type="password" placeholder="••••••••" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 pl-11 text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/5 transition-colors" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end pt-4 border-t border-white/5 mt-4">
                                <button className="px-6 py-2.5 bg-blue-500 hover:bg-blue-400 text-white rounded-xl font-medium shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all">
                                    Update Password
                                </button>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
}
