"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    ShieldCheck,
    UserCircle,
    Loader2,
    Briefcase,
    CheckCircle,
    Activity,
    LineChart,
    Database,
    Network
} from "lucide-react";
import axios from "axios";

export default function AdvancedLoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const role = searchParams.get("role") || "EMPLOYEE";

    const [mounted, setMounted] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
        if (error) setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        if (!formData.email || !formData.password) {
            setError("Please fill in all required fields.");
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", {
                email: formData.email,
                password: formData.password,
                role: role,
            });

            const { token, user } = response.data;

            if (token) {
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));

                if (role === "SUPER_ADMIN" || user?.role === "SUPER_ADMIN") {
                    router.push("/superadmin/dashboard");
                } else if (role === "CLIENT" || user?.role === "CLIENT") {
                    router.push("/client/dashboard");
                } else {
                    router.push("/employee/dashboard");
                }
            }
        } catch (err: any) {
            setError(
                err.response?.data?.message || err.response?.data?.error || "Invalid credentials. Please attempt again."
            );
        } finally {
            setIsLoading(false);
        }
    };

    if (!mounted) return null;

    // Determine config based on role for dynamic branding
    const roleConfig = {
        SUPER_ADMIN: {
            title: "Super Admin Login",
            badge: "System Administrator",
            icon: ShieldCheck,
            color: "blue",
            gradient: "from-blue-600 to-indigo-600",
            glow: "bg-blue-500/20"
        },
        EMPLOYEE: {
            title: "Employee Login",
            badge: "Internal Staff",
            icon: UserCircle,
            color: "emerald",
            gradient: "from-emerald-600 to-teal-600",
            glow: "bg-emerald-500/20"
        },
        CLIENT: {
            title: "Client Login",
            badge: "External Partner",
            icon: Briefcase,
            color: "purple",
            gradient: "from-purple-600 to-fuchsia-600",
            glow: "bg-purple-500/20"
        }
    }[role as 'SUPER_ADMIN' | 'EMPLOYEE' | 'CLIENT'] || {
        title: "Login", badge: "User", icon: UserCircle, color: "blue", gradient: "from-blue-600 to-indigo-600", glow: "bg-blue-500/20"
    };

    const RoleIcon = roleConfig.icon;

    return (
        <div className="flex min-h-screen bg-[#09090b] text-slate-200 font-sans selection:bg-blue-500/30 selection:text-white overflow-hidden">

            {/* === LEFT SECTION: Animated Illustration (Hidden on Mobile) === */}
            <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-center items-center overflow-hidden border-r border-white/5 bg-[#050505]">

                {/* Background Ambient Gradients */}
                <motion.div
                    animate={{
                        opacity: [0.3, 0.5, 0.3],
                        scale: [1, 1.1, 1],
                        rotate: [0, 90, 0]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className={`absolute w-[800px] h-[800px] rounded-full blur-[120px] mix-blend-screen opacity-30 ${roleConfig.glow}`}
                />

                {/* 2D/3D Abstract Illustration Scene */}
                <div className="relative w-full max-w-lg aspect-square flex items-center justify-center z-10">

                    {/* Central Node */}
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1, type: "spring", stiffness: 100 }}
                        className="absolute w-32 h-32 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.05)] z-20"
                    >
                        <img src="/logo.png" alt="AR-Genix Logo" className="w-16 h-16 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] brightness-125" />
                    </motion.div>

                    {/* Orbiting Elements representing Data/Workflow */}
                    {[
                        { icon: Activity, delay: 0, radius: 120, size: "w-12 h-12", color: "text-blue-400" },
                        { icon: LineChart, delay: 2, radius: 160, size: "w-14 h-14", color: "text-emerald-400" },
                        { icon: Database, delay: 4, radius: 200, size: "w-10 h-10", color: "text-purple-400" },
                        { icon: Network, delay: 1, radius: 240, size: "w-16 h-16", color: "text-indigo-400" },
                    ].map((item, idx) => (
                        <motion.div
                            key={idx}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 30 + idx * 5, repeat: Infinity, ease: "linear" }}
                            className="absolute z-10"
                            style={{ width: item.radius * 2, height: item.radius * 2 }}
                        >
                            <motion.div
                                animate={{ rotate: -360, y: [0, -10, 0] }} // Counter-rotate so icon stays upright, plus floating
                                transition={{
                                    rotate: { duration: 30 + idx * 5, repeat: Infinity, ease: "linear" },
                                    y: { duration: 3 + idx, repeat: Infinity, ease: "easeInOut" }
                                }}
                                className={`absolute -top-[${item.radius}px] left-1/2 -translate-x-1/2 -translate-y-1/2 ${item.size} bg-[#121215] border border-white/10 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)]`}
                            >
                                <item.icon className={item.color} size={item.size === "w-16 h-16" ? 28 : 20} />
                            </motion.div>
                        </motion.div>
                    ))}

                    {/* Grid Lines Background */}
                    <div
                        className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage: `linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)`,
                            backgroundSize: '40px 40px',
                            maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
                            WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)'
                        }}
                    />
                </div>

                <div className="absolute bottom-12 left-12 right-12 text-center z-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-2xl font-bold text-white mb-2 tracking-tight"
                    >
                        Enterprise Grade Management
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="text-slate-400 max-w-md mx-auto"
                    >
                        Streamline your workflow, manage teams securely, and track analytics in real-time.
                    </motion.p>
                </div>
            </div>


            {/* === RIGHT SECTION: Login Interaction === */}
            <div className="flex-1 flex flex-col relative justify-between overflow-y-auto">

                {/* Mobile ambient background */}
                <div className="absolute inset-0 z-0 lg:hidden pointer-events-none">
                    <motion.div animate={{ opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 10, repeat: Infinity }} className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[100px] mix-blend-screen ${roleConfig.glow}`} />
                </div>

                {/* Top spacer for alignment */}
                <div className="h-12 lg:h-24 shrink-0" />

                <div className="w-full max-w-md mx-auto px-6 relative z-10 flex flex-col justify-center flex-1">

                    {/* 2. Logo and Branding */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="text-center mb-8"
                    >
                        <motion.img
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, type: "spring" }}
                            src="/logo.png"
                            alt="AR-Genix Logo"
                            className="h-14 w-auto mx-auto mb-6 brightness-150 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] lg:hidden"
                        />
                        <h1 className="text-3xl font-extrabold text-white tracking-tight mb-3 flex items-center justify-center gap-3">
                            {roleConfig.title}
                        </h1>
                        <div className={`inline-flex items-center gap-2 px-3 py-1 bg-${roleConfig.color}-500/10 border border-${roleConfig.color}-500/20 text-${roleConfig.color}-400 rounded-full text-xs uppercase tracking-widest font-semibold`}>
                            <RoleIcon size={14} />
                            {roleConfig.badge}
                        </div>
                    </motion.div>

                    {/* 3. Glassmorphism Login Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="bg-[#121215]/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-[0_8px_40px_-12px_rgba(0,0,0,1)] relative overflow-hidden group"
                    >
                        {/* Subtle interactive glow on card hover */}
                        <div className="absolute -inset-0.5 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10 rounded-[1.5rem]" />

                        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">

                            <AnimatePresence>
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm font-medium flex items-center justify-center text-center overflow-hidden"
                                    >
                                        {error}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Email Input */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400 ml-1">Email Address</label>
                                <div className="relative group/input">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within/input:text-white transition-colors">
                                        <Mail size={18} />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        className="w-full bg-black/40 border border-white/5 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20 transition-all font-medium"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between ml-1">
                                    <label className="text-sm font-medium text-slate-400">Password</label>
                                    <a href="#" className="text-xs font-medium text-slate-500 hover:text-white transition-colors">Forgot Password?</a>
                                </div>
                                <div className="relative group/input">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within/input:text-white transition-colors">
                                        <Lock size={18} />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className="w-full bg-black/40 border border-white/5 rounded-xl py-3.5 pl-11 pr-12 text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20 transition-all font-medium"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-white transition-colors focus:outline-none"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            {/* Remember Me */}
                            <div className="flex items-center ml-1">
                                <input
                                    type="checkbox"
                                    id="rememberMe"
                                    name="rememberMe"
                                    checked={formData.rememberMe}
                                    onChange={handleChange}
                                    className="w-4 h-4 rounded border-white/10 bg-black/40 text-blue-600 focus:ring-1 focus:ring-offset-0 focus:ring-blue-500 focus:ring-offset-[#09090b] transition-colors cursor-pointer"
                                />
                                <label htmlFor="rememberMe" className="ml-2.5 block text-sm text-slate-400 cursor-pointer select-none">
                                    Remember my device
                                </label>
                            </div>

                            {/* 4. Login Button */}
                            <motion.button
                                whileHover={{ scale: 1.01, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={isLoading}
                                className={`w-full py-4 rounded-xl text-white font-semibold flex items-center justify-center transition-all overflow-hidden relative group/btn shadow-[0_0_20px_rgba(0,0,0,0.5)]`}
                            >
                                {/* Animated Gradient Background */}
                                <div className={`absolute inset-0 w-[200%] h-full bg-gradient-to-r ${roleConfig.gradient} from-0% via-50% to-100% group-hover/btn:-translate-x-1/2 transition-transform duration-700 ease-out`}
                                    style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-from) 0%, var(--tw-gradient-to) 50%, var(--tw-gradient-from) 100%)` }}
                                />

                                <span className="relative z-10 flex items-center justify-center gap-2 drop-shadow-md">
                                    {isLoading ? (
                                        <Loader2 className="animate-spin" size={20} />
                                    ) : (
                                        <>
                                            Sign In to Workspace <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </span>
                            </motion.button>
                        </form>
                    </motion.div>

                    {/* 5. Security Information */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mt-6 flex flex-col items-center justify-center text-center text-slate-500 gap-1"
                    >
                        <div className="flex items-center gap-1.5 text-xs text-emerald-500/80 font-medium">
                            <CheckCircle size={14} />
                            Secure Encrypted Login
                        </div>
                        <p className="text-[11px] opacity-70 max-w-xs">
                            Your data is globally protected with enterprise-level AES-256 security.
                        </p>
                    </motion.div>

                    {/* 6. Navigation Link */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="mt-8 text-center"
                    >
                        <Link
                            href="/auth"
                            className="text-sm font-medium text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-1.5"
                        >
                            <span className="text-lg leading-none mb-0.5">←</span> Back to Role Selection
                        </Link>
                    </motion.div>

                </div>

                {/* 7. Footer Section */}
                <footer className="mt-8 w-full p-6 text-center lg:text-left flex flex-col lg:flex-row justify-between items-center text-[11px] font-medium text-slate-600 border-t border-white/5 bg-[#050505]/50 backdrop-blur-sm shrink-0">
                    <div className="flex items-center gap-4 mb-2 lg:mb-0">
                        <span className="flex items-center gap-1.5">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            System Status: Online
                        </span>
                        <span>Version: v1.0.0</span>
                    </div>
                    <div>
                        © 2026 AR-Genix Technologies
                    </div>
                </footer>

            </div>
        </div>
    );
}
