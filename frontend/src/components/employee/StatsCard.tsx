"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { LucideIcon } from "lucide-react";

// Animated Counter Hook
function Counter({ from, to, duration = 2 }: { from: number; to: number; duration?: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const count = useMotionValue(from);
    const rounded = useTransform(count, (latest) => Math.round(latest));

    useEffect(() => {
        if (isInView) {
            const controls = animate(count, to, { duration: duration, ease: "easeOut" });
            return controls.stop;
        }
    }, [count, isInView, to, duration]);

    return <motion.span ref={ref}>{rounded}</motion.span>;
}

interface StatsCardProps {
    title: string;
    value: number | string;
    icon: LucideIcon;
    color: "emerald" | "blue" | "purple" | "amber";
    suffix?: string;
    delay?: number;
}

export default function StatsCard({ title, value, icon: Icon, color, suffix = "", delay = 0 }: StatsCardProps) {
    const colorStyles = {
        emerald: "from-emerald-500/20 to-teal-500/5 text-emerald-400 border-emerald-500/20",
        blue: "from-blue-500/20 to-indigo-500/5 text-blue-400 border-blue-500/20",
        purple: "from-purple-500/20 to-fuchsia-500/5 text-purple-400 border-purple-500/20",
        amber: "from-amber-500/20 to-orange-500/5 text-amber-400 border-amber-500/20",
    };

    const isNumber = typeof value === "number";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ y: -5, scale: 1.02 }}
            className={`relative overflow-hidden bg-[#121215]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-lg group`}
        >
            {/* Background Glow on Hover */}
            <div className={`absolute -inset-0.5 bg-gradient-to-br ${colorStyles[color]} opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10`} />

            <div className="flex justify-between items-start mb-4 relative z-10">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${colorStyles[color]} flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={24} />
                </div>
                <div className="text-4xl font-extrabold text-white tracking-tight flex items-center drop-shadow-md">
                    {isNumber ? <Counter from={0} to={value as number} duration={1.5} /> : value}
                    {suffix && <span className="ml-1 text-2xl text-slate-500">{suffix}</span>}
                </div>
            </div>

            <h3 className="text-slate-400 font-medium text-lg relative z-10">{title}</h3>

            {/* Decorative abstract shape in background */}
            <div className={`absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-tl ${colorStyles[color]} rounded-full blur-3xl opacity-20 pointer-events-none group-hover:scale-150 transition-transform duration-700`} />
        </motion.div>
    );
}
