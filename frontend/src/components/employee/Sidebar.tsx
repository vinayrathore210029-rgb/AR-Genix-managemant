"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
    LayoutDashboard,
    ClipboardList,
    FolderKanban,
    Clock,
    MessageSquare,
    Bell,
    User,
    LogOut
} from "lucide-react";

const navItems = [
    { name: "Dashboard", href: "/employee/dashboard", icon: LayoutDashboard },
    { name: "My Tasks", href: "/employee/tasks", icon: ClipboardList },
    { name: "Projects", href: "/employee/projects", icon: FolderKanban },
    { name: "Timesheet", href: "/employee/timesheet", icon: Clock },
    { name: "Messages", href: "/employee/messages", icon: MessageSquare },
    { name: "Notifications", href: "/employee/notifications", icon: Bell },
    { name: "Profile", href: "/employee/profile", icon: User },
];

export default function EmployeeSidebar() {
    const pathname = usePathname();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/auth";
    };

    return (
        <motion.aside
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="w-64 border-r border-white/5 bg-[#0a0a0c] p-6 flex flex-col h-screen sticky top-0 z-40 shrink-0"
        >
            {/* Brand Logo */}
            <div className="flex items-center gap-3 mb-10 pl-2">
                <div className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-2xl p-1.5 shadow-lg border border-white/5">
                    <img src="/logo.png" alt="AR-Genix Logo" className="w-full h-full object-contain drop-shadow" />
                </div>
                <h1 className="text-xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
                    AR-Genix
                </h1>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 space-y-1.5">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link key={item.name} href={item.href}>
                            <motion.div
                                whileHover={{ x: 4, backgroundColor: "rgba(16, 185, 129, 0.05)" }}
                                whileTap={{ scale: 0.98 }}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative group overflow-hidden ${isActive
                                        ? "bg-emerald-500/10 text-emerald-400 font-medium"
                                        : "text-slate-400 hover:text-emerald-300"
                                    }`}
                            >
                                {/* Active indicator strip */}
                                {isActive && (
                                    <motion.div
                                        layoutId="active-nav-indicator"
                                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-emerald-500 rounded-r-full"
                                    />
                                )}

                                <item.icon size={20} className={isActive ? "drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "group-hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]"} />
                                <span>{item.name}</span>
                            </motion.div>
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Actions */}
            <div className="pt-6 mt-4 border-t border-white/5">
                <motion.button
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(239, 68, 68, 0.1)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400/80 hover:text-red-400 transition-colors font-medium border border-transparent hover:border-red-500/20"
                >
                    <LogOut size={20} />
                    Logout
                </motion.button>
            </div>
        </motion.aside>
    );
}
