"use client";

import { motion } from "framer-motion";
import { Plus, Clock, Calendar, Save } from "lucide-react";
import TopNavbar from "@/components/employee/TopNavbar";

const timesheetEntries = [
    { id: 1, date: "Oct 24, 2026", project: "AR-Genix ERP System", task: "Login Screen Development", hours: 4.5, status: "Submitted" },
    { id: 2, date: "Oct 24, 2026", project: "Client Portal Redesign", task: "UI Mockups", hours: 3.5, status: "Submitted" },
    { id: 3, date: "Oct 23, 2026", project: "AR-Genix ERP System", task: "Dashboard API Integration", hours: 8.0, status: "Approved" },
    { id: 4, date: "Oct 22, 2026", project: "Internal Meeting", task: "Weekly Sync", hours: 1.0, status: "Approved" },
    { id: 5, date: "Oct 22, 2026", project: "Mobile App V2.0", task: "Bug Fixing #342", hours: 7.0, status: "Approved" },
];

export default function TimesheetPage() {
    return (
        <div className="space-y-6 pb-10 min-h-screen">
            <TopNavbar title="Timesheet" />

            {/* Top Summaries */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#121215]/80 backdrop-blur-md border border-white/5 p-6 rounded-3xl shadow-xl flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex flex-col items-center justify-center">
                        <Clock size={20} />
                    </div>
                    <div>
                        <p className="text-slate-400 text-sm">Today's Hours</p>
                        <h2 className="text-2xl font-bold text-white">8.0 <span className="text-sm font-normal text-slate-500">/ 8h</span></h2>
                    </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="bg-[#121215]/80 backdrop-blur-md border border-white/5 p-6 rounded-3xl shadow-xl flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 flex flex-col items-center justify-center">
                        <Calendar size={20} />
                    </div>
                    <div>
                        <p className="text-slate-400 text-sm">This Week</p>
                        <h2 className="text-2xl font-bold text-white">24.0 <span className="text-sm font-normal text-slate-500">/ 40h</span></h2>
                    </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="bg-gradient-to-r from-emerald-600 to-teal-500 p-6 rounded-3xl shadow-lg border border-emerald-400/20 flex items-center justify-between group cursor-pointer hover:shadow-emerald-500/20 transition-all">
                    <div>
                        <p className="text-emerald-100 text-sm mb-1">Add Time Entry</p>
                        <h2 className="text-xl font-bold text-white">Log Work Hours</h2>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-white/20 text-white flex items-center justify-center group-hover:rotate-90 transition-transform duration-300">
                        <Plus size={24} />
                    </div>
                </motion.div>
            </div>

            {/* Timesheet Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="bg-[#121215]/80 backdrop-blur-md border border-white/5 rounded-3xl shadow-xl overflow-hidden"
            >
                <div className="px-6 py-5 border-b border-white/5 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-white">Recent Entries</h3>
                    <button className="text-slate-400 hover:text-emerald-400 text-sm transition-colors flex items-center gap-2">
                        <Save size={16} /> Submit Week
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-black/20 text-slate-400 text-sm tracking-wider uppercase border-b border-white/5">
                                <th className="px-6 py-4 font-medium">Date</th>
                                <th className="px-6 py-4 font-medium">Project</th>
                                <th className="px-6 py-4 font-medium">Task</th>
                                <th className="px-6 py-4 font-medium">Hours</th>
                                <th className="px-6 py-4 font-medium text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-slate-300">
                            {timesheetEntries.map((entry, idx) => (
                                <tr key={entry.id} className="hover:bg-white/[0.02] transition-colors">
                                    <td className="px-6 py-4 text-white whitespace-nowrap">{entry.date}</td>
                                    <td className="px-6 py-4">{entry.project}</td>
                                    <td className="px-6 py-4 text-slate-400">{entry.task}</td>
                                    <td className="px-6 py-4 font-medium text-emerald-400">{entry.hours}h</td>
                                    <td className="px-6 py-4 text-right">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${entry.status === "Approved"
                                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                            : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                            }`}>
                                            {entry.status}
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
