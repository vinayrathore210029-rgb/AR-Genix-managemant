"use client";

import { motion } from "framer-motion";
import {
    Wallet,
    TrendingUp,
    TrendingDown,
    DollarSign,
    Download,
    ClipboardList,
    CheckCircle2,
    XCircle,
    ArrowUpRight,
    ArrowDownRight,
    Filter,
    FileText
} from "lucide-react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell
} from "recharts";
import TopNavbar from "@/components/superadmin/TopNavbar";

const financeStats = [
    { title: "Monthly Payroll", value: "$124,500", change: "+2.4%", icon: DollarSign, color: "blue", trend: "up" },
    { title: "Total Incentives", value: "$18,200", change: "+15%", icon: TrendingUp, color: "emerald", trend: "up" },
    { title: "Project Budgets", value: "$840,000", change: "-4.2%", icon: Wallet, color: "indigo", trend: "down" },
    { title: "Pending Claims", value: "12", change: "5 New", icon: ClipboardList, color: "amber", trend: "up" },
];

const budgetData = [
    { name: "ERP System", budget: 50000, actual: 38000 },
    { name: "CRM Portal", budget: 15000, actual: 12500 },
    { name: "Supply AI", budget: 85000, actual: 92000 },
    { name: "Mobile App", budget: 20000, actual: 18500 },
    { name: "Design Sys", budget: 10000, actual: 4000 },
];

const payrollHistory = [
    { id: 1, month: "October 2026", status: "Paid", amount: "$124,500", employees: 154, date: "Oct 01, 2026" },
    { id: 2, month: "September 2026", status: "Paid", amount: "$122,800", employees: 152, date: "Sep 01, 2026" },
    { id: 3, month: "August 2026", status: "Paid", amount: "$120,400", employees: 148, date: "Aug 01, 2026" },
];

const pendingBonuses = [
    { id: 1, name: "Vinay Kumar", reason: "Project Supply AI On-time delivery", amount: "$800", date: "Today" },
    { id: 2, name: "Sarah Jenkins", reason: "Team Leadership Excellence", amount: "$1,200", date: "Yesterday" },
];

export default function FinancePage() {
    return (
        <div className="space-y-6 pb-10">
            <TopNavbar title="Finance & Incentives" />

            {/* Finance Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {financeStats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-[#121215]/80 backdrop-blur-md border border-white/5 p-6 rounded-3xl shadow-xl group"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-2xl bg-${stat.color}-500/10 text-${stat.color}-400 group-hover:bg-${stat.color}-500/20 transition-colors`}>
                                <stat.icon size={24} />
                            </div>
                            <span className={`text-xs font-bold ${stat.trend === "up" ? (stat.color === "emerald" ? "text-emerald-400" : "text-blue-400") : "text-red-400"} flex items-center gap-1`}>
                                {stat.trend === "up" ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                {stat.change}
                            </span>
                        </div>
                        <h3 className="text-slate-500 text-sm font-medium mb-1">{stat.title}</h3>
                        <p className="text-2xl font-bold text-white tracking-tight">{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Budget vs Actuals Chart */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="xl:col-span-2 bg-[#121215]/80 backdrop-blur-md border border-white/5 p-8 rounded-3xl shadow-xl"
                >
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-1">Project Budgets</h3>
                            <p className="text-sm text-slate-500">Comparing estimated budget vs actual spend</p>
                        </div>
                        <button className="p-2.5 bg-white/5 border border-white/5 rounded-xl text-slate-400 hover:text-white transition-colors">
                            <Filter size={18} />
                        </button>
                    </div>

                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={budgetData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
                                    cursor={{ fill: "rgba(255,255,255,0.05)" }}
                                    contentStyle={{ backgroundColor: "#1a1a1e", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }}
                                />
                                <Legend wrapperStyle={{ paddingTop: "20px" }} />
                                <Bar dataKey="budget" name="Allocated Budget" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                                <Bar dataKey="actual" name="Actual Spend" fill="#f59e0b" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Pending Bonus Approvals */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="xl:col-span-1 bg-[#121215]/80 backdrop-blur-md border border-white/5 p-8 rounded-3xl shadow-xl flex flex-col"
                >
                    <h3 className="text-xl font-bold text-white mb-6">Bonus Approvals</h3>
                    <div className="space-y-4 flex-1">
                        {pendingBonuses.map((bonus) => (
                            <div key={bonus.id} className="p-5 bg-white/5 border border-white/5 rounded-2xl group hover:border-blue-500/30 transition-all">
                                <div className="flex justify-between items-start mb-3">
                                    <h4 className="font-bold text-white">{bonus.name}</h4>
                                    <span className="text-emerald-400 font-bold">{bonus.amount}</span>
                                </div>
                                <p className="text-xs text-slate-500 mb-4 h-8 overflow-hidden line-clamp-2">{bonus.reason}</p>
                                <div className="flex gap-2">
                                    <button className="flex-1 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl text-xs font-bold hover:bg-emerald-500 hover:text-white transition-all">Approve</button>
                                    <button className="px-3 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl hover:bg-red-500 hover:text-white transition-all"><XCircle size={16} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <TrendingUp className="text-blue-400" size={20} />
                            <span className="text-sm font-medium text-blue-100">Projected Savings</span>
                        </div>
                        <span className="text-lg font-bold text-white">$14.2k</span>
                    </div>
                </motion.div>
            </div>

            {/* Payroll History Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-[#121215]/80 backdrop-blur-md border border-white/5 rounded-[40px] shadow-xl overflow-hidden"
            >
                <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">Payroll History</h3>
                    <button className="flex items-center gap-2 px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl text-slate-300 hover:text-white transition-all text-sm font-bold">
                        <Download size={18} />
                        <span>Download All Reports</span>
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-black/20 text-slate-500 text-xs font-bold uppercase tracking-widest border-b border-white/5">
                                <th className="px-8 py-5 font-medium">Month Period</th>
                                <th className="px-8 py-5 font-medium">Headcount</th>
                                <th className="px-8 py-5 font-medium">Total Amount</th>
                                <th className="px-8 py-5 font-medium">Payment Date</th>
                                <th className="px-8 py-5 font-medium text-right">Report</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {payrollHistory.map((item) => (
                                <tr key={item.id} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                                                <CheckCircle2 size={16} />
                                            </div>
                                            <span className="font-bold text-white">{item.month}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-slate-400">{item.employees} Employees</td>
                                    <td className="px-8 py-5 font-bold text-white">{item.amount}</td>
                                    <td className="px-8 py-5 text-slate-500">{item.date}</td>
                                    <td className="px-8 py-5 text-right">
                                        <button className="p-2 hover:bg-blue-500/10 text-blue-400 rounded-lg transition-all" title="View PDF">
                                            <FileText size={18} />
                                        </button>
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
