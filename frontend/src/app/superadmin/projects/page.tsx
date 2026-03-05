"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    FolderKanban,
    Plus,
    Search,
    Filter,
    User,
    Clock,
    CheckCircle2,
    AlertTriangle,
    Users,
    TrendingUp,
    MoreHorizontal,
    ExternalLink,
    ChevronRight,
    Milestone
} from "lucide-react";
import TopNavbar from "@/components/superadmin/TopNavbar";

const projectsData = [
    {
        id: 1,
        name: "AR-Genix ERP System",
        client: "Internal Product",
        lead: "Amit Sharma",
        progress: 68,
        status: "Active",
        team: 8,
        tasks: 124,
        deadline: "Dec 30, 2026",
        budget: "$45,000",
        health: "Healthy"
    },
    {
        id: 2,
        name: "Alpha CRM Client Portal",
        client: "Alpha Corp",
        lead: "Sarah Jenkins",
        progress: 85,
        status: "Review",
        team: 4,
        tasks: 42,
        deadline: "Nov 15, 2026",
        budget: "$12,500",
        health: "Healthy"
    },
    {
        id: 3,
        name: "SupplyChain AI",
        client: "LogiTech Solutions",
        lead: "Vinay Kumar",
        progress: 32,
        status: "Delayed",
        team: 6,
        tasks: 210,
        deadline: "Mar 10, 2027",
        budget: "$85,000",
        health: "At Risk"
    },
    {
        id: 4,
        name: "FinTrack Mobile",
        client: "Fintex Bank",
        lead: "Priya Rao",
        progress: 95,
        status: "Finalizing",
        team: 3,
        tasks: 12,
        deadline: "Oct 30, 2026",
        budget: "$18,000",
        health: "Healthy"
    },
];

export default function ProjectOversightPage() {
    return (
        <div className="space-y-6 pb-10">
            <TopNavbar title="Project Oversight" />

            {/* Stats Header */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#121215]/80 backdrop-blur-md border border-white/5 p-6 rounded-3xl shadow-xl flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                        <FolderKanban size={24} />
                    </div>
                    <div>
                        <p className="text-slate-400 text-sm">Active Projects</p>
                        <h2 className="text-2xl font-bold text-white">42</h2>
                    </div>
                </div>
                <div className="bg-[#121215]/80 backdrop-blur-md border border-white/5 p-6 rounded-3xl shadow-xl flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                        <AlertTriangle size={24} />
                    </div>
                    <div>
                        <p className="text-slate-400 text-sm">At Risk</p>
                        <h2 className="text-2xl font-bold text-white">3 <span className="text-sm font-normal text-slate-500">Milestones delayed</span></h2>
                    </div>
                </div>
                <div className="bg-gradient-to-tr from-blue-600 to-indigo-500 p-6 rounded-3xl shadow-xl flex items-center justify-between group cursor-pointer">
                    <div>
                        <p className="text-blue-100 text-sm mb-1">New Initiative</p>
                        <h2 className="text-xl font-bold text-white">Create New Project</h2>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-white/20 text-white flex items-center justify-center group-hover:rotate-90 transition-transform">
                        <Plus size={24} />
                    </div>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search projects, clients..."
                        className="w-full bg-[#121215]/80 backdrop-blur-md border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 transition-all shadow-lg text-sm"
                    />
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-[#121215]/80 border border-white/5 rounded-xl text-slate-400 hover:text-white transition-all text-sm">
                        <Filter size={18} />
                        <span>Filter</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-[#121215]/80 border border-white/5 rounded-xl text-slate-400 hover:text-white transition-all text-sm font-medium">
                        <TrendingUp size={18} />
                        <span>Sort</span>
                    </button>
                </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {projectsData.map((project, i) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-[#121215]/80 backdrop-blur-md border border-white/5 rounded-[40px] p-8 shadow-xl relative group hover:border-blue-500/30 transition-all overflow-hidden"
                    >
                        {/* Status Badge */}
                        <div className="absolute top-8 right-8 flex items-center gap-2">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${project.status === "Delayed" ? "bg-red-500/10 text-red-400 border-red-500/20" : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                }`}>
                                {project.status}
                            </span>
                            <button className="p-2 hover:bg-white/5 rounded-full text-slate-500 hover:text-white transition-colors">
                                <MoreHorizontal size={18} />
                            </button>
                        </div>

                        {/* Project Header */}
                        <div className="mb-6">
                            <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">{project.client}</p>
                            <h3 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors cursor-pointer flex items-center gap-2">
                                {project.name}
                                <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </h3>
                        </div>

                        {/* Progress Section */}
                        <div className="mb-8">
                            <div className="flex justify-between items-end mb-3">
                                <span className="text-sm text-slate-500">Overall Progress</span>
                                <span className="text-xl font-bold text-white">{project.progress}%</span>
                            </div>
                            <div className="w-full h-3 bg-black/40 rounded-full overflow-hidden border border-white/5">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${project.progress}%` }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className={`h-full rounded-full bg-gradient-to-r ${project.progress > 80 ? "from-emerald-600 to-teal-400" : project.progress < 40 ? "from-red-600 to-amber-500" : "from-blue-600 to-indigo-400"} shadow-[0_0_15px_rgba(59,130,246,0.3)]`}
                                />
                            </div>
                        </div>

                        {/* Info Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8 pt-6 border-t border-white/5">
                            <div>
                                <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Project Lead</p>
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                                        <User size={12} />
                                    </div>
                                    <span className="text-sm font-medium text-white">{project.lead.split(" ")[0]}</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Team Size</p>
                                <div className="flex items-center gap-2">
                                    <Users size={14} className="text-slate-500" />
                                    <span className="text-sm font-medium text-white">{project.team} members</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Budget</p>
                                <div className="flex items-center gap-2">
                                    <Wallet size={14} className="text-emerald-400" />
                                    <span className="text-sm font-medium text-white">{project.budget}</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Deadline</p>
                                <div className="flex items-center gap-2">
                                    <Clock size={14} className="text-slate-500" />
                                    <span className="text-sm font-medium text-white">{project.deadline.split(",")[0]}</span>
                                </div>
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${project.health === "Healthy" ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"}`} />
                                <span className="text-xs text-slate-400">{project.health} Health</span>
                            </div>
                            <button className="flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors group">
                                Manage Milestones
                                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>

                        {/* Abstract Background Curve */}
                        <svg className="absolute -bottom-10 -left-10 w-40 h-40 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity pointer-events-none" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="0.5" fill="none" />
                            <circle cx="50" cy="50" r="30" stroke="white" strokeWidth="0.5" fill="none" />
                        </svg>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

// Importing Wallet for icons
import { Wallet } from "lucide-react";
