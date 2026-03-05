"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    UserPlus,
    Filter,
    Download,
    Upload,
    MoreHorizontal,
    Edit2,
    Trash2,
    Shield,
    Ban,
    Mail,
    Phone,
    MapPin,
    History
} from "lucide-react";
import TopNavbar from "@/components/superadmin/TopNavbar";

const usersData = [
    { id: 1, name: "Amit Sharma", email: "amit.argenix@gmail.com", role: "Super Admin", status: "Active", department: "Leadership", lastLogin: "2 mins ago", avatar: "https://ui-avatars.com/api/?name=Amit+Sharma&background=3b82f6&color=fff" },
    { id: 2, name: "Vinay Kumar", email: "vinay.argenixaisolutions@gmail.com", role: "Employee", status: "Active", department: "Engineering", lastLogin: "1 hour ago", avatar: "https://ui-avatars.com/api/?name=Vinay+Kumar&background=10b981&color=fff" },
    { id: 3, name: "Sarah Jenkins", email: "sarah.j@argenix.com", role: "Manager", status: "Active", department: "Product", lastLogin: "5 hours ago", avatar: "https://ui-avatars.com/api/?name=Sarah+Jenkins&background=8b5cf6&color=fff" },
    { id: 4, name: "Michael Chen", email: "m.chen@argenix.com", role: "Employee", status: "Suspended", department: "Sales", lastLogin: "2 days ago", avatar: "https://ui-avatars.com/api/?name=Michael+Chen&background=f59e0b&color=fff" },
    { id: 5, name: "Priya Rao", email: "priya.rao@argenix.com", role: "Employee", status: "Active", department: "HR", lastLogin: "3 hours ago", avatar: "https://ui-avatars.com/api/?name=Priya+Rao&background=ec4899&color=fff" },
];

export default function UserManagementPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRole, setSelectedRole] = useState("All Roles");
    const [showFilters, setShowFilters] = useState(false);

    const filteredUsers = usersData.filter(user =>
        (user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedRole === "All Roles" || user.role === selectedRole)
    );

    return (
        <div className="space-y-6 pb-10">
            <TopNavbar title="User Management" />

            {/* Actions Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-center gap-2 flex-1 max-w-2xl">
                    <div className="relative flex-1 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-[#121215]/80 backdrop-blur-md border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 transition-all shadow-lg text-sm"
                        />
                    </div>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`p-3 rounded-2xl border transition-all ${showFilters ? "bg-blue-500 text-white border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]" : "bg-[#121215]/80 border-white/5 text-slate-400 hover:text-white"}`}
                    >
                        <Filter size={18} />
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/5 rounded-2xl text-slate-300 hover:text-white hover:bg-white/10 transition-all text-sm font-medium">
                        <Download size={18} />
                        <span>Export</span>
                    </button>
                    <button className="flex items-center gap-2 px-5 py-3 bg-blue-500 hover:bg-blue-400 text-white rounded-2xl shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all text-sm font-bold">
                        <UserPlus size={18} />
                        <span>Add New User</span>
                    </button>
                </div>
            </div>

            {/* Advanced Filters */}
            <AnimatePresence>
                {showFilters && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-[#121215]/50 border border-white/5 rounded-3xl p-6 overflow-hidden"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Select Role</label>
                                <select
                                    value={selectedRole}
                                    onChange={(e) => setSelectedRole(e.target.value)}
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500/50"
                                >
                                    <option>All Roles</option>
                                    <option>Super Admin</option>
                                    <option>Manager</option>
                                    <option>Employee</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Department</label>
                                <select className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500/50">
                                    <option>All Departments</option>
                                    <option>Engineering</option>
                                    <option>Sales</option>
                                    <option>HR</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Status</label>
                                <div className="flex gap-2">
                                    <button className="px-4 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl text-xs font-medium">Active</button>
                                    <button className="px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl text-xs font-medium">Suspended</button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Users Table */}
            <div className="bg-[#121215]/80 backdrop-blur-md border border-white/5 rounded-3xl shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-black/20 text-slate-500 text-xs font-bold uppercase tracking-widest border-b border-white/5">
                                <th className="px-6 py-5 font-medium">User Profile</th>
                                <th className="px-6 py-5 font-medium">Role & Department</th>
                                <th className="px-6 py-5 font-medium">Status</th>
                                <th className="px-6 py-5 font-medium">Last Activity</th>
                                <th className="px-6 py-5 font-medium text-right font-sans">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredUsers.map((user, i) => (
                                <motion.tr
                                    key={user.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="hover:bg-white/[0.02] group transition-colors"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500/20 to-indigo-500/20 p-[1px] group-hover:from-blue-500 group-hover:to-indigo-500 transition-all">
                                                <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full border-2 border-[#121215] object-cover" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{user.name}</h4>
                                                <p className="text-xs text-slate-500">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-sm font-medium text-slate-300">{user.role}</span>
                                            <span className="text-xs text-slate-500">{user.department}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${user.status === "Active"
                                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                            : "bg-red-500/10 text-red-400 border-red-500/20"
                                            }`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-xs text-slate-500">
                                        {user.lastLogin}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 hover:bg-blue-500/10 text-slate-400 hover:text-blue-400 rounded-lg transition-all" title="Edit User">
                                                <Edit2 size={16} />
                                            </button>
                                            <button className="p-2 hover:bg-red-500/10 text-slate-400 hover:text-red-400 rounded-lg transition-all" title="Suspend User">
                                                <Ban size={16} />
                                            </button>
                                            <button className="p-2 hover:bg-white/5 text-slate-400 hover:text-white rounded-lg transition-all" title="Activity Logs">
                                                <History size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-6 border-t border-white/5 flex items-center justify-between text-sm text-slate-500">
                    <p>Showing <span className="text-white font-medium">{filteredUsers.length}</span> of <span className="text-white font-medium">{usersData.length}</span> users</p>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed">Previous</button>
                        <button className="px-4 py-2 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-400 transition-all shadow-lg">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
