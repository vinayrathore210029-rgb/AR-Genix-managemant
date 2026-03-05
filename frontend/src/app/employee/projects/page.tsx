"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import TopNavbar from "@/components/employee/TopNavbar";
import ProjectCard from "@/components/employee/ProjectCard";

const projects = [
    { name: "AR-Genix ERP System", client: "Internal", deadline: "Dec 15, 2026", progress: 68 },
    { name: "Client Portal Redesign", client: "Acme Corp", deadline: "Oct 30, 2026", progress: 85 },
    { name: "Mobile App V2.0", client: "TechFlow", deadline: "Nov 20, 2026", progress: 42 },
    { name: "Marketing Website", client: "GlobalTech", deadline: "Oct 15, 2026", progress: 95 },
    { name: "Security Audit Fixes", client: "Internal", deadline: "Sep 30, 2026", progress: 100 },
    { name: "Payment Gateway Integration", client: "ShopPay", deadline: "Jan 10, 2027", progress: 15 },
];

export default function ProjectsPage() {
    return (
        <div className="space-y-6 pb-10 min-h-screen">
            <TopNavbar title="Projects Overview" />

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button className="px-5 py-2 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 text-sm font-medium transition-colors">Active Projects</button>
                    <button className="px-5 py-2 rounded-full bg-white/5 text-slate-400 hover:text-white border border-white/5 hover:border-white/10 text-sm font-medium transition-colors">Completed</button>
                </div>

                <button className="flex items-center gap-2 px-5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all text-sm font-medium border border-white/10">
                    <Plus size={18} />
                    New Project
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {projects.map((proj, i) => (
                    <motion.div key={i} className="group relative">
                        <ProjectCard {...proj} delay={i * 0.1} />
                        <div className="absolute top-4 right-4 flex -space-x-2 opacity-80 group-hover:opacity-100 transition-opacity">
                            <img className="w-8 h-8 rounded-full border-2 border-[#121215]" src="/employees/employee-1.jpg" alt="Team" />
                            <img className="w-8 h-8 rounded-full border-2 border-[#121215]" src="/employees/employee-2.jpg" alt="Team" />
                            <div className="w-8 h-8 rounded-full border-2 border-[#121215] bg-white/10 flex items-center justify-center text-xs text-white">+3</div>
                        </div>
                        <div className="mt-2 w-full flex justify-end">
                            <span className="text-emerald-500/0 group-hover:text-emerald-400 text-sm font-medium transition-colors cursor-pointer flex items-center gap-1">
                                View Project Details <span className="text-lg">→</span>
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
