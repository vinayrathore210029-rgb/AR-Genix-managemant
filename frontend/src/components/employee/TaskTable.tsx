"use client";

import { motion } from "framer-motion";
import { Eye, Edit, CheckCircle } from "lucide-react";
import Link from "next/link";

export type TaskStatus = "Pending" | "In Progress" | "Completed";
export type TaskPriority = "Low" | "Medium" | "High" | "Urgent";

export interface Task {
    id: string;
    name: string;
    project: string;
    deadline: string;
    priority: TaskPriority;
    status: TaskStatus;
}

interface TaskTableProps {
    tasks: Task[];
}

export default function TaskTable({ tasks }: TaskTableProps) {
    const statusConfig = {
        "Pending": { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20" },
        "In Progress": { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20" },
        "Completed": { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20" },
    };

    const priorityConfig = {
        "Low": "text-slate-400",
        "Medium": "text-blue-400",
        "High": "text-amber-400 font-medium",
        "Urgent": "text-red-400 font-bold",
    };

    return (
        <div className="w-full overflow-x-auto rounded-2xl border border-white/5 bg-[#121215]/50 backdrop-blur-sm shadow-xl">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-white/5 bg-black/20 text-slate-400 text-sm tracking-wider uppercase">
                        <th className="px-6 py-4 font-medium">Task Name</th>
                        <th className="px-6 py-4 font-medium">Project</th>
                        <th className="px-6 py-4 font-medium">Deadline</th>
                        <th className="px-6 py-4 font-medium">Priority</th>
                        <th className="px-6 py-4 font-medium">Status</th>
                        <th className="px-6 py-4 font-medium text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                    {tasks.map((task, idx) => (
                        <motion.tr
                            key={task.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="hover:bg-white/[0.02] transition-colors group"
                        >
                            <td className="px-6 py-4 font-medium text-white">{task.name}</td>
                            <td className="px-6 py-4 text-slate-400">{task.project}</td>
                            <td className="px-6 py-4 text-slate-400">{task.deadline}</td>
                            <td className={`px-6 py-4 ${priorityConfig[task.priority]}`}>{task.priority}</td>
                            <td className="px-6 py-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusConfig[task.status].bg} ${statusConfig[task.status].text} ${statusConfig[task.status].border}`}>
                                    {task.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Link href={`/employee/task/${task.id}`}>
                                        <button className="p-2 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white rounded-lg transition-colors border border-white/5 hover:border-white/10" title="View Details">
                                            <Eye size={16} />
                                        </button>
                                    </Link>
                                    <button className="p-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 hover:text-blue-300 rounded-lg transition-colors border border-blue-500/20" title="Update Status">
                                        <Edit size={16} />
                                    </button>
                                    {task.status !== "Completed" && (
                                        <button className="p-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 hover:text-emerald-300 rounded-lg transition-colors border border-emerald-500/20" title="Mark Complete">
                                            <CheckCircle size={16} />
                                        </button>
                                    )}
                                </div>
                            </td>
                        </motion.tr>
                    ))}
                    {tasks.length === 0 && (
                        <tr>
                            <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                                No tasks found matching your criteria.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
