"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";

interface ProjectCardProps {
    name: string;
    client: string;
    deadline: string;
    progress: number; // 0 to 100
    delay?: number;
}

export default function ProjectCard({ name, client, deadline, progress, delay = 0 }: ProjectCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ y: -4, borderColor: "rgba(16, 185, 129, 0.3)" }}
            className="bg-[#121215]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-6 hover:shadow-[0_8px_30px_-12px_rgba(16,185,129,0.2)] transition-all group"
        >
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">{name}</h3>
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                        <Briefcase size={14} />
                        <span>{client}</span>
                    </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                    <Calendar size={12} />
                    {deadline}
                </div>
            </div>

            <div className="mt-6">
                <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-400">Progress</span>
                    <span className="text-emerald-400 font-medium">{progress}%</span>
                </div>
                <div className="w-full bg-black/50 rounded-full h-2 overflow-hidden border border-white/5">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1, delay: delay + 0.2, ease: "easeOut" }}
                        className="bg-gradient-to-r from-emerald-600 to-teal-400 h-full rounded-full relative"
                    >
                        {/* Shimmer effect inside progress bar */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                    </motion.div>
                </div>
            </div>
        </motion.div >
    );
}
