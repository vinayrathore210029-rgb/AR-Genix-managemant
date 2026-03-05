"use client";

import { motion } from "framer-motion";
import {
    Users,
    Briefcase,
    Clock,
    ArrowUpRight,
    ArrowDownRight,
    TrendingUp,
    CheckCircle2,
    AlertCircle,
    Calendar,
    Activity
} from "lucide-react";
import {
    LineChart, Line, AreaChart, Area, BarChart, Bar,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    Cell, PieChart, Pie
} from "recharts";
import TopNavbar from "@/components/superadmin/TopNavbar";

const statsData = [
    { title: "Total Employees", value: "154", change: "+12%", icon: Users, color: "blue" },
    { title: "Active Projects", value: "42", change: "+5%", icon: Briefcase, color: "indigo" },
    { title: "Task Completion", value: "88%", change: "+2.4%", icon: CheckCircle2, color: "emerald" },
    { title: "System Uptime", value: "99.9%", change: "0%", icon: Activity, color: "purple" },
];

const performanceData = [
    { name: "Jan", perf: 65, tasks: 400, revenue: 2400 },
    { name: "Feb", perf: 72, tasks: 300, revenue: 1398 },
    { name: "Mar", perf: 68, tasks: 500, revenue: 9800 },
    { name: "Apr", perf: 85, tasks: 280, revenue: 3908 },
    { name: "May", perf: 82, tasks: 590, revenue: 4800 },
    { name: "Jun", perf: 90, tasks: 480, revenue: 3800 },
    { name: "Jul", perf: 88, tasks: 700, revenue: 4300 },
];

const projectStatusData = [
    { name: "Completed", value: 45, color: "#10b981" },
    { name: "In Progress", value: 35, color: "#3b82f6" },
    { name: "Delayed", value: 15, color: "#f59e0b" },
    { name: "On Hold", value: 5, color: "#ef4444" },
];

const approvals = [
    { id: 1, type: "Leave Request", user: "Amit Sharma", date: "Today, 10:30 AM", status: "Pending" },
    { id: 2, type: "Project Milestone", user: "Alpha CRM", date: "Yesterday, 4:15 PM", status: "Urgent" },
    { id: 3, type: "New Inventory", user: "Warehouse-B", date: "Oct 22, 11:00 AM", status: "Review" },
];

export default function SuperAdminDashboard() {
    return (
        <div className="space-y-8 pb-10">
            <TopNavbar title="System Overview" />

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsData.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ y: -5, borderColor: "rgba(59, 130, 246, 0.2)" }}
                        className="bg-[#121215]/80 backdrop-blur-md border border-white/5 p-6 rounded-3xl shadow-xl relative overflow-hidden group"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-2xl bg-${stat.color}-500/10 text-${stat.color}-400 group-hover:bg-${stat.color}-500/20 transition-colors`}>
                                <stat.icon size={24} />
                            </div>
                            <div className={`flex items-center gap-1 text-xs font-medium ${stat.change.startsWith("+") ? "text-emerald-400" : stat.change === "0%" ? "text-slate-400" : "text-red-400"}`}>
                                {stat.change.startsWith("+") ? <ArrowUpRight size={14} /> : stat.change === "0%" ? null : <ArrowDownRight size={14} />}
                                {stat.change}
                            </div>
                        </div>
                        <h3 className="text-slate-400 text-sm font-medium mb-1">{stat.title}</h3>
                        <p className="text-3xl font-bold text-white tracking-tight">{stat.value}</p>

                        {/* Decorative Background Glow */}
                        <div className={`absolute -bottom-8 -right-8 w-24 h-24 bg-${stat.color}-500/5 blur-3xl rounded-full group-hover:bg-${stat.color}-500/10 transition-colors`} />
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Main Graph: System Activity */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="xl:col-span-2 bg-[#121215]/80 backdrop-blur-md border border-white/5 p-6 rounded-3xl shadow-xl"
                >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <div>
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <TrendingUp className="text-blue-400" size={20} />
                                System Performance
                            </h3>
                            <p className="text-sm text-slate-500">Monthly aggregate data</p>
                        </div>
                        <div className="flex items-center gap-2 bg-black/20 p-1 rounded-xl border border-white/5">
                            {["7D", "1M", "1Y"].map((t) => (
                                <button key={t} className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${t === "1M" ? "bg-blue-500 text-white shadow-lg" : "text-slate-400 hover:text-white"}`}>
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={performanceData}>
                                <defs>
                                    <linearGradient id="colorPerf" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "#64748b", fontSize: 12 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "#64748b", fontSize: 12 }}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: "#1a1a1e", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }}
                                    itemStyle={{ color: "#fff" }}
                                />
                                <Area type="monotone" dataKey="perf" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorPerf)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Pie Chart: Project Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="xl:col-span-1 bg-[#121215]/80 backdrop-blur-md border border-white/5 p-6 rounded-3xl shadow-xl"
                >
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <Activity className="text-emerald-400" size={20} />
                        Project Distribution
                    </h3>
                    <div className="h-[250px] w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={projectStatusData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={8}
                                    dataKey="value"
                                >
                                    {projectStatusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} cornerRadius={10} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: "#1a1a1e", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-3xl font-bold text-white">42</span>
                            <span className="text-xs text-slate-500 uppercase tracking-widest">Active</span>
                        </div>
                    </div>
                    <div className="mt-6 space-y-3">
                        {projectStatusData.map((s, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                                    <span className="text-sm text-slate-400">{s.name}</span>
                                </div>
                                <span className="text-sm font-bold text-white">{s.value}%</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Pending Approvals */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-[#121215]/80 backdrop-blur-md border border-white/5 p-6 rounded-3xl shadow-xl"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <AlertCircle className="text-amber-400" size={20} />
                            Pending Approvals
                        </h3>
                        <button className="text-xs text-blue-400 hover:text-blue-300 transition-colors">View All</button>
                    </div>
                    <div className="space-y-4">
                        {approvals.map((item) => (
                            <div key={item.id} className="p-4 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-between hover:bg-white/[0.08] transition-all group">
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-xl bg-black/40 flex items-center justify-center text-blue-400 border border-white/5 group-hover:border-blue-500/30 transition-colors`}>
                                        <Calendar size={18} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-white">{item.type}</h4>
                                        <p className="text-xs text-slate-500">{item.user} • {item.date}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/40 transition-colors"><CheckCircle2 size={16} /></button>
                                    <button className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/40 transition-colors"><AlertCircle size={16} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Audit Log Peek */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="bg-[#121215]/80 backdrop-blur-md border border-white/5 p-6 rounded-3xl shadow-xl"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <Clock className="text-indigo-400" size={20} />
                            System Activity
                        </h3>
                        <span className="px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 text-[10px] font-bold uppercase tracking-wider">Live</span>
                    </div>
                    <div className="space-y-6 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-white/5">
                        <div className="relative pl-8">
                            <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)] border-4 border-[#121215]" />
                            <p className="text-sm text-white font-medium">Super Admin Logged In</p>
                            <p className="text-xs text-slate-500">2 minutes ago • IP: 192.168.1.1</p>
                        </div>
                        <div className="relative pl-8">
                            <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-slate-700 border-4 border-[#121215]" />
                            <p className="text-sm text-slate-300">Backup system triggered</p>
                            <p className="text-xs text-slate-500">1 hour ago • Auto-save</p>
                        </div>
                        <div className="relative pl-8">
                            <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-red-500/50 border-4 border-[#121215]" />
                            <p className="text-sm text-slate-300">Failed login attempt</p>
                            <p className="text-xs text-slate-500">3 hours ago • IP: 45.23.1.2</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
