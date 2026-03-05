"use client";

import Link from 'next/link';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import {
    ShieldCheck,
    Users,
    Briefcase,
    CheckCircle2,
    BarChart3,
    FolderKanban,
    Mail
} from 'lucide-react';
import { useEffect, useRef } from 'react';

// Counter component for animated statistics
const Counter = ({ from, to, duration = 2 }: { from: number, to: number, duration?: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const count = useMotionValue(from);
    const rounded = useTransform(count, (latest) => Math.round(latest));

    useEffect(() => {
        if (isInView) {
            const controls = animate(count, to, { duration: duration, ease: "easeOut" });
            return controls.stop;
        }
    }, [count, isInView, to, duration]);

    return <motion.span ref={ref}>{rounded}</motion.span>;
};

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900 overflow-hidden relative">

            {/* --- Advanced Background Animations --- */}
            {/* 8. Moving Background Gradient */}
            <motion.div
                animate={{
                    backgroundPosition: ['0% 0%', '100% 100%', '0% 100%', '100% 0%', '0% 0%'],
                }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 z-0 opacity-30 pointer-events-none"
                style={{
                    backgroundSize: '400% 400%',
                    backgroundImage: 'radial-gradient(circle at center, #eff6ff 0%, #ffffff 50%, #f8fafc 100%)'
                }}
            />

            {/* 2. Floating Background Elements */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        y: [0, -50, 0],
                        x: [0, 30, 0],
                        rotate: [0, 90, 0]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[10%] left-[5%] w-64 h-64 bg-blue-400/10 rounded-full blur-3xl mix-blend-multiply"
                />
                <motion.div
                    animate={{
                        y: [0, 60, 0],
                        x: [0, -40, 0],
                        rotate: [0, -90, 0]
                    }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute top-[40%] right-[10%] w-96 h-96 bg-purple-400/10 rounded-full blur-3xl mix-blend-multiply"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        y: [0, -30, 0]
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
                    className="absolute bottom-[20%] left-[20%] w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl mix-blend-multiply"
                />
            </div>
            {/* ------------------------------------- */}


            {/* Main Content Wrapper (z-10 to stay above background) */}
            <div className="relative z-10 w-full">

                {/* 1. Header Section */}
                <header className="pt-24 pb-16 px-4 text-center">
                    <div className="flex flex-col items-center">
                        {/* 1. Logo Animation */}
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20, duration: 0.8 }}
                            className="relative mb-8 group"
                        >
                            {/* Glowing Gradient Effect behind logo */}
                            <motion.div
                                animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.1, 1] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute inset-0 bg-blue-500/30 blur-2xl rounded-full z-0 group-hover:bg-blue-500/50 transition-colors"
                            />
                            <img src="/logo.png" alt="AR-Genix Logo" className="relative z-10 h-28 w-auto drop-shadow-xl" />
                        </motion.div>

                        {/* 3. Hero Section Entrance Animation */}
                        <motion.h1
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6"
                        >
                            AR-Genix Management System
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.6 }}
                            className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto font-medium"
                        >
                            Smart platform to manage projects, teams and clients from one place.
                        </motion.p>
                    </div>
                </header>

                {/* 2. Role Selection Login Section */}
                <section className="max-w-6xl mx-auto px-4 pb-24">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.2, delayChildren: 0.8 }
                            }
                        }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {/* Super Admin Card */}
                        <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
                            <Link href="/auth/login?role=SUPER_ADMIN" className="block h-full outline-none">
                                {/* 4. Role Card Hover Animation & Micro Interactions */}
                                <motion.div
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100/50 hover:shadow-[0_20px_40px_-12px_rgba(59,130,246,0.15)] hover:border-blue-500/30 transition-all duration-300 flex flex-col items-center text-center h-full group"
                                >
                                    <motion.div
                                        whileHover={{ rotate: 10, scale: 1.1 }}
                                        className="w-20 h-20 bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:from-blue-600 group-hover:to-blue-700 group-hover:text-white transition-all duration-500 shadow-inner"
                                    >
                                        <ShieldCheck size={40} className="transition-transform duration-500" />
                                    </motion.div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-700 transition-colors">Super Admin</h3>
                                    <p className="text-slate-500 text-lg leading-relaxed">
                                        Full system control and platform management.
                                    </p>
                                </motion.div>
                            </Link>
                        </motion.div>

                        {/* Employee Card */}
                        <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
                            <Link href="/auth/login?role=EMPLOYEE" className="block h-full outline-none">
                                <motion.div
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100/50 hover:shadow-[0_20px_40px_-12px_rgba(16,185,129,0.15)] hover:border-emerald-500/30 transition-all duration-300 flex flex-col items-center text-center h-full group"
                                >
                                    <motion.div
                                        whileHover={{ rotate: -10, scale: 1.1 }}
                                        className="w-20 h-20 bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:from-emerald-600 group-hover:to-emerald-700 group-hover:text-white transition-all duration-500 shadow-inner"
                                    >
                                        <Users size={40} className="transition-transform duration-500" />
                                    </motion.div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-emerald-700 transition-colors">Employee</h3>
                                    <p className="text-slate-500 text-lg leading-relaxed">
                                        Manage tasks, projects and internal operations.
                                    </p>
                                </motion.div>
                            </Link>
                        </motion.div>

                        {/* Client Card */}
                        <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
                            <Link href="/auth/login?role=CLIENT" className="block h-full outline-none">
                                <motion.div
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100/50 hover:shadow-[0_20px_40px_-12px_rgba(168,85,247,0.15)] hover:border-purple-500/30 transition-all duration-300 flex flex-col items-center text-center h-full group"
                                >
                                    <motion.div
                                        whileHover={{ rotate: 10, scale: 1.1 }}
                                        className="w-20 h-20 bg-gradient-to-br from-purple-50 to-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:from-purple-600 group-hover:to-purple-700 group-hover:text-white transition-all duration-500 shadow-inner"
                                    >
                                        <Briefcase size={40} className="transition-transform duration-500" />
                                    </motion.div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-purple-700 transition-colors">Client</h3>
                                    <p className="text-slate-500 text-lg leading-relaxed">
                                        Track project updates and communicate with the team.
                                    </p>
                                </motion.div>
                            </Link>
                        </motion.div>
                    </motion.div>
                </section>

                {/* Gray Background Split for Information Sections */}
                <div className="bg-slate-100/80 backdrop-blur-md border-t border-slate-200/60 pt-24 pb-20 relative overflow-hidden">

                    {/* Background decoration for bottom section */}
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-b from-blue-50/50 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

                    <div className="max-w-6xl mx-auto px-4 relative z-10">

                        {/* 3. About Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.7 }}
                            className="text-center mb-24 max-w-4xl mx-auto"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 inline-block relative border-b-2 border-blue-500 pb-2">About AR-Genix</h2>
                            <p className="text-xl text-slate-600 leading-relaxed font-light">
                                AR-Genix is a modern business management platform designed to help organizations manage projects, teams and client operations efficiently. The system improves workflow transparency and simplifies daily business processes.
                            </p>
                        </motion.div>

                        {/* 4 & 5. Platform Capabilities Section (Staggered Scroll Animation) */}
                        <div className="mb-32">
                            <motion.h2
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center"
                            >
                                Platform Capabilities
                            </motion.h2>

                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-50px" }}
                                variants={{
                                    hidden: {},
                                    visible: { transition: { staggerChildren: 0.15 } }
                                }}
                                className="grid grid-cols-2 md:grid-cols-5 gap-6"
                            >
                                {[
                                    { name: "Project Management", icon: FolderKanban },
                                    { name: "Team Management", icon: Users },
                                    { name: "Client Management", icon: Briefcase },
                                    { name: "Task Tracking", icon: CheckCircle2 },
                                    { name: "Reports & Analytics", icon: BarChart3 }
                                ].map((feature, idx) => (
                                    <motion.div
                                        key={idx}
                                        variants={{
                                            hidden: { opacity: 0, y: 40 },
                                            visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
                                        }}
                                        whileHover={{ y: -5, scale: 1.05 }}
                                        className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60 flex flex-col items-center text-center group cursor-default"
                                    >
                                        <div className="w-14 h-14 bg-gradient-to-br from-slate-50 to-slate-100 text-slate-600 rounded-full flex items-center justify-center mb-5 group-hover:from-blue-500 group-hover:to-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                                            <feature.icon size={26} className="group-hover:scale-110 transition-transform duration-300" />
                                        </div>
                                        <h4 className="font-semibold text-slate-800 text-lg">{feature.name}</h4>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Highlights and Statistics Row */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">

                            {/* Platform Highlights */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.7 }}
                            >
                                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-10 border-l-4 border-blue-500 pl-4">Platform Highlights</h2>
                                <ul className="space-y-6">
                                    {[
                                        "Role-based secure access",
                                        "Real-time activity tracking",
                                        "Centralized management platform",
                                        "Smart reporting system",
                                        "Scalable architecture"
                                    ].map((item, idx) => (
                                        <motion.li
                                            key={idx}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: idx * 0.1 + 0.3 }}
                                            className="flex items-center text-slate-700 text-lg bg-white/50 p-4 rounded-xl border border-slate-100 hover:bg-white hover:shadow-sm transition-all"
                                        >
                                            <span className="bg-emerald-100 text-emerald-600 rounded-full p-1 mr-4 shrink-0">
                                                <CheckCircle2 size={20} />
                                            </span>
                                            {item}
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>

                            {/* 6. Statistics Section (Counting Animation) */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.7 }}
                            >
                                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-10 border-l-4 border-purple-500 pl-4">System Overview</h2>
                                <div className="grid grid-cols-2 gap-6">
                                    {[
                                        { label: "Projects Managed", value: 40, suffix: "+", color: "blue" },
                                        { label: "Active Clients", value: 25, suffix: "+", color: "purple" },
                                        { label: "Team Members", value: 100, suffix: "+", color: "emerald" },
                                        { label: "Tasks Managed", value: 5000, suffix: "+", color: "indigo" }
                                    ].map((stat, idx) => (
                                        <motion.div
                                            key={idx}
                                            whileHover={{ y: -5 }}
                                            className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200/60 flex flex-col justify-center items-center text-center relative overflow-hidden group"
                                        >
                                            <div className={`absolute top-0 right-0 w-24 h-24 bg-${stat.color}-500/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-125`} />

                                            <div className={`text-4xl font-extrabold text-${stat.color}-600 mb-3 flex items-center justify-center`}>
                                                <Counter from={0} to={stat.value} duration={2.5} />
                                                <span>{stat.suffix}</span>
                                            </div>
                                            <div className="text-sm font-semibold text-slate-500 uppercase tracking-widest leading-tight">{stat.label}</div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        {/* 7. Support Section (Button Animation & Glowing) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[2.5rem] p-12 text-center text-white shadow-2xl"
                        >
                            {/* Decorative background circles inside support banner */}
                            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                            <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

                            <div className="relative z-10">
                                <h3 className="text-3xl md:text-4xl font-bold mb-6">Need help accessing the system?</h3>
                                <p className="text-blue-100 mb-10 text-xl font-light max-w-2xl mx-auto">
                                    Our support team is available to assist you with any login or platform issues.
                                </p>

                                <motion.a
                                    href="mailto:support@argenix.com"
                                    whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(255,255,255,0.4)" }}
                                    whileTap={{ scale: 0.95 }}
                                    className="inline-flex items-center justify-center bg-white text-blue-600 font-bold px-10 py-4 rounded-full transition-all text-lg"
                                >
                                    <Mail className="mr-3" size={24} />
                                    Contact Support
                                </motion.a>
                            </div>
                        </motion.div>

                    </div>
                </div>

                {/* 8. Footer */}
                <footer className="bg-slate-900 text-slate-400 py-10 text-center border-t border-slate-800 relative z-10">
                    <div className="max-w-6xl mx-auto px-4 flex flex-col items-center">
                        <img src="/logo.png" alt="AR-Genix Logo" className="h-10 w-auto mb-6 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
                        <p className="font-medium text-slate-300">© 2026 AR-Genix Technologies</p>
                        <p className="text-sm mt-2 opacity-60">All Rights Reserved</p>
                    </div>
                </footer>

            </div>
        </div>
    );
}
