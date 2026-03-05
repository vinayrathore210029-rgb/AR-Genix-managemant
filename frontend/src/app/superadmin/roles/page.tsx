"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Shield,
    Plus,
    Save,
    Search,
    Settings,
    Layout,
    Users,
    FolderKanban,
    Wallet,
    Activity,
    Info,
    CheckCircle2,
    Lock
} from "lucide-react";
import TopNavbar from "@/components/superadmin/TopNavbar";

const initialRoles = [
    { id: 1, name: "Super Admin", color: "blue", description: "Full system access with all administrative privileges", permissions: 45 },
    { id: 2, name: "Manager", color: "purple", description: "Can manage projects, tasks and team reports", permissions: 28 },
    { id: 3, name: "Employee", color: "emerald", description: "Standard access to workspace, tasks and own profile", permissions: 12 },
    { id: 4, name: "Finance Admin", color: "amber", description: "Access to payroll, incentives and budget modules", permissions: 18 },
];

const modules = [
    { name: "Dashboard", icon: Layout, actions: ["View Statistics", "Export Reports", "System Logs"] },
    { name: "User Management", icon: Users, actions: ["Create Users", "Edit Users", "Delete Users", "Manage Roles"] },
    { name: "Project Management", icon: FolderKanban, actions: ["Create Projects", "Assign Teams", "Approve Milestones", "Delete Projects"] },
    { name: "Financials", icon: Wallet, actions: ["View Payroll", "Approve Bonuses", "Budget Analysis"] },
];

export default function RolesPermissionsPage() {
    const [selectedRole, setSelectedRole] = useState(initialRoles[0]);
    const [permissions, setPermissions] = useState<Record<string, boolean>>({
        "Dashboard_View Statistics": true,
        "Dashboard_Export Reports": true,
        "Dashboard_System Logs": true,
        "User Management_Create Users": true,
        "User Management_Edit Users": true,
        "User Management_Delete Users": true,
        "User Management_Manage Roles": true,
    });

    const togglePermission = (key: string) => {
        setPermissions(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="space-y-6 pb-10">
            <TopNavbar title="Roles & Permissions" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Panel: Role List */}
                <div className="lg:col-span-1 space-y-4">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-white">System Roles</h3>
                        <button className="p-2 bg-blue-500 hover:bg-blue-400 text-white rounded-xl shadow-lg transition-all">
                            <Plus size={20} />
                        </button>
                    </div>

                    <div className="space-y-3">
                        {initialRoles.map((role) => (
                            <motion.div
                                key={role.id}
                                onClick={() => setSelectedRole(role)}
                                whileHover={{ x: 4 }}
                                className={`p-5 rounded-3xl border cursor-pointer transition-all ${selectedRole.id === role.id
                                    ? `bg-${role.color}-500/10 border-${role.color}-500/30 shadow-lg`
                                    : "bg-[#121215]/80 border-white/5 hover:border-white/10"
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center bg-${role.color}-500/20 text-${role.color}-400`}>
                                        <Shield size={20} />
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{role.permissions} active perms</span>
                                </div>
                                <h4 className={`text-lg font-bold mb-1 ${selectedRole.id === role.id ? "text-white" : "text-slate-300"}`}>{role.name}</h4>
                                <p className="text-xs text-slate-500 leading-relaxed">{role.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Right Panel: Permission Matrix */}
                <div className="lg:col-span-2 space-y-6">
                    <motion.div
                        key={selectedRole.id}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#121215]/80 backdrop-blur-md border border-white/5 rounded-[40px] shadow-xl overflow-hidden"
                    >
                        <div className="p-8 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-tr from-white/[0.02] to-transparent">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-1">Permissions Matrix</h3>
                                <p className="text-sm text-slate-500">Configuring access for <span className={`text-${selectedRole.color}-400 font-bold capitalize`}>{selectedRole.name}</span></p>
                            </div>
                            <button className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-400 text-white rounded-2xl shadow-xl transition-all font-bold text-sm">
                                <Save size={18} />
                                <span>Save Changes</span>
                            </button>
                        </div>

                        <div className="p-8 space-y-10">
                            {modules.map((module) => (
                                <div key={module.name} className="space-y-4">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 border border-white/10">
                                            <module.icon size={20} />
                                        </div>
                                        <h4 className="text-lg font-bold text-white tracking-tight">{module.name} Module</h4>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {module.actions.map((action) => {
                                            const permKey = `${module.name}_${action}`;
                                            const isActive = permissions[permKey];
                                            return (
                                                <div
                                                    key={action}
                                                    onClick={() => togglePermission(permKey)}
                                                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between group ${isActive
                                                        ? "bg-blue-500/5 border-blue-500/20"
                                                        : "bg-black/20 border-white/5 opacity-60 grayscale-[0.5]"
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className={`p-2 rounded-lg transition-colors ${isActive ? "bg-blue-500 text-white" : "bg-white/10 text-slate-500 group-hover:bg-white/20"}`}>
                                                            {isActive ? <CheckCircle2 size={14} /> : <Lock size={14} />}
                                                        </div>
                                                        <span className={`text-sm font-medium ${isActive ? "text-white" : "text-slate-500"}`}>{action}</span>
                                                    </div>

                                                    {/* Animated Toggle */}
                                                    <div className={`w-10 h-5 rounded-full relative transition-colors ${isActive ? "bg-blue-500" : "bg-slate-700"}`}>
                                                        <motion.div
                                                            animate={{ x: isActive ? 20 : 0 }}
                                                            className="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5 shadow-sm"
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-8 bg-black/40 border-t border-white/5 flex items-center gap-4">
                            <Info className="text-blue-400 shrink-0" size={20} />
                            <p className="text-xs text-slate-500 leading-relaxed">Changes made to role permissions will take effect immediately for all users assigned to this role. Audit logs will track this session.</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
