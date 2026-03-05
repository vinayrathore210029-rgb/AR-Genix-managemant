"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Bell, MessageSquare, Shield } from "lucide-react";

export default function TopNavbar({ title = "Admin Dashboard" }: { title?: string }) {
    const [userName, setUserName] = useState("Super Admin");
    const [avatarUrl, setAvatarUrl] = useState("https://ui-avatars.com/api/?name=Admin&background=3b82f6&color=fff");

    useEffect(() => {
        const storedUserstr = localStorage.getItem("user");
        if (storedUserstr) {
            const user = JSON.parse(storedUserstr);
            const namePart = user.email.split("@")[0];
            const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1).replace(".", " ");
            setUserName(formattedName);
            setAvatarUrl(`https://ui-avatars.com/api/?name=${encodeURIComponent(formattedName)}&background=3b82f6&color=fff`);
        }
    }, []);

    return (
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold text-white tracking-tight">{title}</h1>
                <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] uppercase tracking-widest font-bold text-blue-400 flex items-center gap-1.5 shadow-sm">
                    <Shield size={10} />
                    <span>System Admin</span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative w-full md:w-64 lg:w-96 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="Search system logs, users, projects..."
                        className="w-full bg-[#121215]/80 backdrop-blur-md border border-white/5 rounded-2xl py-2.5 pl-12 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all shadow-lg text-sm"
                    />
                </div>

                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative p-2.5 bg-[#121215]/80 border border-white/5 rounded-2xl hover:bg-white/5 transition-colors group shadow-lg">
                    <MessageSquare size={20} className="text-slate-400 group-hover:text-white transition-colors" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
                </motion.button>

                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative p-2.5 bg-[#121215]/80 border border-white/5 rounded-2xl hover:bg-white/5 transition-colors group shadow-lg">
                    <Bell size={20} className="text-slate-400 group-hover:text-white transition-colors" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                </motion.button>

                <div className="h-8 w-px bg-white/10 mx-2" />

                <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-3 cursor-pointer bg-[#121215]/80 border border-white/5 py-1.5 px-2 pr-4 rounded-full hover:bg-white/5 transition-all shadow-lg">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-400 p-[2px]">
                        <img src={avatarUrl} alt="Avatar" className="w-full h-full rounded-full object-cover border-2 border-black" />
                    </div>
                    <div className="hidden sm:block">
                        <p className="text-sm font-medium text-white">{userName}</p>
                    </div>
                </motion.div>
            </div>
        </header>
    );
}
