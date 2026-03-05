"use client";

import { motion } from "framer-motion";
import { Plus, Filter } from "lucide-react";
import TopNavbar from "@/components/employee/TopNavbar";
import TaskCard, { TaskCardProps } from "@/components/employee/TaskCard";

const tasks: TaskCardProps[] = [
    { title: "Design Login Screen UI", project: "AR-Genix ERP", deadline: "Today, 5:00 PM", priority: "Urgent", comments: 3, attachments: 2 },
    { title: "Fix API Authentication Bug", project: "Backend Services", deadline: "Tomorrow, 12:00 PM", priority: "High", comments: 5, attachments: 0 },
    { title: "Update Dashboard Charts", project: "AR-Genix ERP", deadline: "Oct 24, 2026", priority: "Medium", comments: 1, attachments: 1 },
    { title: "Client Meeting Preparation", project: "Marketing Site", deadline: "Oct 25, 2026", priority: "Low", comments: 0, attachments: 4 },
    { title: "Code Review: PR #124", project: "Mobile App", deadline: "Oct 26, 2026", priority: "Medium", comments: 2, attachments: 0 },
    { title: "Write API Documentation", project: "Developer Portal", deadline: "Oct 28, 2026", priority: "Low", comments: 0, attachments: 0 },
];

export default function TasksPage() {
    return (
        <div className="space-y-6 pb-10 min-h-screen">
            <TopNavbar title="My Tasks" />

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto hide-scrollbar">
                    <button className="px-5 py-2 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-sm font-medium shrink-0 transition-colors">All Tasks</button>
                    <button className="px-5 py-2 rounded-full bg-white/5 text-slate-400 hover:text-white border border-white/5 hover:border-white/10 text-sm font-medium shrink-0 transition-colors">Pending</button>
                    <button className="px-5 py-2 rounded-full bg-white/5 text-slate-400 hover:text-white border border-white/5 hover:border-white/10 text-sm font-medium shrink-0 transition-colors">In Progress</button>
                    <button className="px-5 py-2 rounded-full bg-white/5 text-slate-400 hover:text-white border border-white/5 hover:border-white/10 text-sm font-medium shrink-0 transition-colors">Completed</button>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-slate-300 hover:text-white border border-white/10 hover:border-white/20 transition-all text-sm font-medium">
                        <Filter size={16} />
                        Filters
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-lg hover:shadow-emerald-500/25 border border-emerald-400/20 transition-all text-sm font-medium group">
                        <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" />
                        Create Task
                    </button>
                </div>
            </div>

            {/* Kanban Style Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {/* Column: To Do */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4 px-1">
                        <h3 className="text-white font-medium flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                            To Do
                        </h3>
                        <span className="bg-white/10 text-slate-400 text-xs px-2.5 py-1 rounded-lg">3</span>
                    </div>
                    {tasks.slice(0, 3).map((task, i) => (
                        <TaskCard key={i} {...task} delay={i * 0.1} />
                    ))}
                </div>

                {/* Column: In Progress */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4 px-1">
                        <h3 className="text-white font-medium flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                            In Progress
                        </h3>
                        <span className="bg-white/10 text-slate-400 text-xs px-2.5 py-1 rounded-lg">2</span>
                    </div>
                    {tasks.slice(3, 5).map((task, i) => (
                        <TaskCard key={i + 3} {...task} delay={(i + 3) * 0.1} />
                    ))}
                </div>

                {/* Column: Completed */}
                <div className="space-y-4 hidden xl:block">
                    <div className="flex items-center justify-between mb-4 px-1">
                        <h3 className="text-white font-medium flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                            Completed
                        </h3>
                        <span className="bg-white/10 text-slate-400 text-xs px-2.5 py-1 rounded-lg">1</span>
                    </div>
                    {tasks.slice(5, 6).map((task, i) => (
                        <TaskCard key={i + 5} {...task} delay={(i + 5) * 0.1} />
                    ))}
                </div>
            </div>
        </div>
    );
}
