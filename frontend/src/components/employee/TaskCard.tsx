"use client";

import { motion } from "framer-motion";
import { Clock, MessageCircle, Paperclip } from "lucide-react";

export interface TaskCardProps {
    title: string;
    project: string;
    deadline: string;
    priority: "Low" | "Medium" | "High" | "Urgent";
    comments: number;
    attachments: number;
    delay?: number;
}

export default function TaskCard({ title, project, deadline, priority, comments, attachments, delay = 0 }: TaskCardProps) {
    const priorityColors = {
        "Low": "bg-slate-500/10 text-slate-400 border-slate-500/20",
        "Medium": "bg-blue-500/10 text-blue-400 border-blue-500/20",
        "High": "bg-amber-500/10 text-amber-400 border-amber-500/20",
        "Urgent": "bg-red-500/10 text-red-400 border-red-500/20",
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.3 }}
            whileHover={{ y: -4, borderColor: "rgba(255,255,255,0.15)" }}
            className="p-5 bg-[#121215]/80 backdrop-blur-md border border-white/5 rounded-2xl shadow-lg group cursor-grab active:cursor-grabbing transition-all hover:bg-white/[0.03]"
        >
            <div className="flex justify-between items-start mb-3">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${priorityColors[priority]}`}>
                    {priority}
                </span>
                <span className="text-slate-500 hover:text-white transition-colors cursor-pointer">•••</span>
            </div>

            <h4 className="text-white font-medium text-lg leading-tight mb-1 group-hover:text-emerald-400 transition-colors">
                {title}
            </h4>
            <p className="text-slate-400 text-sm mb-4">{project}</p>

            <div className="flex items-center justify-between text-slate-500 text-sm mt-4 pt-4 border-t border-white/5">
                <div className="flex items-center gap-1.5 text-slate-400 bg-white/5 px-2 py-1 rounded-md">
                    <Clock size={14} />
                    <span>{deadline}</span>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
                        <MessageCircle size={14} />
                        <span>{comments}</span>
                    </div>
                    <div className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
                        <Paperclip size={14} />
                        <span>{attachments}</span>
                    </div>
                </div>
            </div>
        </motion.div >
    );
}
