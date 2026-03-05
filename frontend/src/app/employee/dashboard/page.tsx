"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Search,
    Bell,
    MessageSquare,
    CheckSquare,
    FolderKanban,
    Clock,
    TrendingUp
} from "lucide-react";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from "recharts";
import StatsCard from "@/components/employee/StatsCard";

// Mock Data for Line Chart
const performanceData = [
    { name: 'Jan', tasks: 40, hours: 160, project: 30 },
    { name: 'Feb', tasks: 30, hours: 150, project: 45 },
    { name: 'Mar', tasks: 50, hours: 170, project: 60 },
    { name: 'Apr', tasks: 45, hours: 165, project: 50 },
    { name: 'May', tasks: 60, hours: 180, project: 70 },
    { name: 'Jun', tasks: 55, hours: 175, project: 80 },
    { name: 'Jul', tasks: 70, hours: 190, project: 90 },
    { name: 'Aug', tasks: 65, hours: 185, project: 85 },
    { name: 'Sep', tasks: 80, hours: 200, project: 100 },
    { name: 'Oct', tasks: 75, hours: 195, project: 95 },
    { name: 'Nov', tasks: 85, hours: 210, project: 110 },
    { name: 'Dec', tasks: 90, hours: 215, project: 100 },
];

// Mock Data for Donut Chart
const attendanceData = [
    { name: 'Present', value: 85 },
    { name: 'Late', value: 10 },
    { name: 'Leave', value: 5 },
];
const COLORS = ['#10b981', '#f59e0b', '#ef4444']; // Emerald, Amber, Red

// Mock Data for Employees Table
const employeesList = [
    { id: 1, name: "Sarah Jenkins", dept: "Engineering", role: "Senior Developer", project: "AR-Genix ERP", status: "Active", img: "/employees/employee-1.jpg" },
    { id: 2, name: "Michael Chen", dept: "Design", role: "UX Designer", project: "Client Portal UI", status: "Active", img: "/employees/employee-2.jpg" },
    { id: 3, name: "Emma Wilson", dept: "Marketing", role: "Campaign Manager", project: "Q3 Launch", status: "On Leave", img: "/employees/employee-3.jpg" },
];

export default function EmployeeDashboard() {
    const [userName, setUserName] = useState("Employee");
    const [avatarUrl, setAvatarUrl] = useState("https://ui-avatars.com/api/?name=Employee&background=0d9488&color=fff");

    useEffect(() => {
        const storedUserstr = localStorage.getItem("user");
        if (storedUserstr) {
            const user = JSON.parse(storedUserstr);
            // Derive name from email for demo purposes
            const namePart = user.email.split("@")[0];
            const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1).replace(".", " ");
            setUserName(formattedName);
            setAvatarUrl(`https://ui-avatars.com/api/?name=${encodeURIComponent(formattedName)}&background=0d9488&color=fff`);
        }
    }, []);

    const statusConfig: Record<string, string> = {
        "Active": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        "On Leave": "bg-amber-500/10 text-amber-400 border-amber-500/20",
    };

    return (
        <div className="space-y-8 pb-10">
            {/* 1. Top Navigation Bar */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative w-full md:w-96 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="Search tasks, projects, or people..."
                        className="w-full bg-[#121215]/80 backdrop-blur-md border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all shadow-lg"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative p-3 bg-[#121215]/80 border border-white/5 rounded-2xl hover:bg-white/5 transition-colors group shadow-lg">
                        <MessageSquare size={20} className="text-slate-400 group-hover:text-white transition-colors" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                    </motion.button>

                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative p-3 bg-[#121215]/80 border border-white/5 rounded-2xl hover:bg-white/5 transition-colors group shadow-lg">
                        <Bell size={20} className="text-slate-400 group-hover:text-white transition-colors" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                    </motion.button>

                    <div className="h-10 w-px bg-white/10 mx-2" />

                    <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-3 cursor-pointer bg-[#121215]/80 border border-white/5 py-1.5 px-2 pr-5 rounded-full hover:bg-white/5 transition-all shadow-lg">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 p-[2px]">
                            <img src={avatarUrl} alt="Avatar" className="w-full h-full rounded-full object-cover border-2 border-black" />
                        </div>
                        <div className="hidden sm:block">
                            <p className="text-sm font-medium text-white">{userName}</p>
                            <p className="text-xs text-emerald-400">Workspace</p>
                        </div>
                    </motion.div>
                </div>
            </header>

            {/* Welcome Banner */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-900/40 to-[#121215] border border-emerald-500/20 p-8 shadow-2xl"
            >
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-emerald-500/20 blur-3xl rounded-full" />
                <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {userName} 🚀</h1>
                <p className="text-emerald-100/70 max-w-xl">
                    Here's what's happening with your projects today. You have 3 pending tasks that need your attention before the end of the day.
                </p>
            </motion.div>

            {/* 2. Stats Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard title="Total Tasks" value={124} icon={CheckSquare} color="emerald" delay={0.1} />
                <StatsCard title="Active Projects" value={12} icon={FolderKanban} color="blue" delay={0.2} />
                <StatsCard title="Working Hours" value="164h" icon={Clock} color="amber" delay={0.3} />
                <StatsCard title="Performance" value={98} suffix="%" icon={TrendingUp} color="purple" delay={0.4} />
            </div>

            {/* Layout Grid for Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* 3. Graph Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="lg:col-span-2 bg-[#121215]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-xl"
                >
                    <h2 className="text-xl font-bold text-white mb-6">Performance Metrics</h2>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={performanceData} margin={{ top: 5, right: 30, left: -20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                <XAxis dataKey="name" stroke="#ffffff50" axisLine={false} tickLine={false} />
                                <YAxis stroke="#ffffff50" axisLine={false} tickLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0a0a0c', borderColor: '#ffffff20', borderRadius: '12px' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                                <Line type="monotone" dataKey="tasks" name="Tasks Completed" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#0a0a0c' }} activeDot={{ r: 6 }} />
                                <Line type="monotone" dataKey="hours" name="Working hours" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4, fill: '#f59e0b', strokeWidth: 2, stroke: '#0a0a0c' }} activeDot={{ r: 6 }} />
                                <Line type="monotone" dataKey="project" name="Project Progress" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#0a0a0c' }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* 4. Circular Progress Chart */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="bg-[#121215]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-xl flex flex-col items-center justify-center relative"
                >
                    <h2 className="text-xl font-bold text-white w-full text-left mb-2">Attendance Overview</h2>
                    <div className="h-[250px] w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={attendanceData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={90}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {attendanceData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0a0a0c', borderColor: '#ffffff20', borderRadius: '12px', color: '#fff' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        {/* Center Text */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-3xl font-extrabold text-white">85%</span>
                            <span className="text-xs text-slate-400">Present Rate</span>
                        </div>
                    </div>
                    {/* Compact Custom Legend */}
                    <div className="flex gap-4 mt-2">
                        {attendanceData.map((entry, idx) => (
                            <div key={entry.name} className="flex items-center gap-2 text-sm text-slate-300">
                                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx] }} />
                                {entry.name}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* 5. Employee Table Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-[#121215]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-xl overflow-hidden"
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white">Team Directory</h2>
                    <button className="text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors bg-white/5 px-4 py-2 rounded-lg border border-white/5 hover:border-emerald-500/30">View All Directory</button>
                </div>

                <div className="overflow-x-auto rounded-xl border border-white/5">
                    <table className="w-full text-left border-collapse bg-black/20">
                        <thead>
                            <tr className="border-b border-white/5 text-slate-400 text-sm tracking-wider uppercase">
                                <th className="px-6 py-4 font-medium">Employee</th>
                                <th className="px-6 py-4 font-medium">Department</th>
                                <th className="px-6 py-4 font-medium">Role</th>
                                <th className="px-6 py-4 font-medium">Project</th>
                                <th className="px-6 py-4 font-medium text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 bg-transparent">
                            {employeesList.map((emp) => (
                                <tr key={emp.id} className="hover:bg-white/[0.04] transition-colors group">
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-white/10 p-[2px] border border-white/10 group-hover:border-emerald-500/50 transition-colors">
                                                <img src={emp.img} alt={emp.name} className="w-full h-full rounded-full object-cover" />
                                            </div>
                                            <div>
                                                <span className="font-medium text-white block">{emp.name}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-slate-400">{emp.dept}</td>
                                    <td className="px-6 py-5 text-slate-300 font-medium">{emp.role}</td>
                                    <td className="px-6 py-5 text-emerald-400/80">{emp.project}</td>
                                    <td className="px-6 py-5 text-right">
                                        <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${statusConfig[emp.status]}`}>
                                            {emp.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
}
