"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import EmployeeSidebar from "@/components/employee/Sidebar";

export default function EmployeeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Enforce Authentication
        const token = localStorage.getItem("token");
        const storedUserstr = localStorage.getItem("user");

        if (!token || !storedUserstr) {
            router.push("/auth/login?role=EMPLOYEE");
            return;
        }

        const user = JSON.parse(storedUserstr);
        // Only allow Employee or Super Admins
        if (user.role !== "EMPLOYEE" && user.role !== "SUPER_ADMIN") {
            router.push("/auth/login?role=EMPLOYEE");
            return;
        }

        setIsAuthenticated(true);
    }, [router]);

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center text-emerald-500">
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-t-2 border-emerald-500 animate-spin" />
                    <div className="absolute inset-2 rounded-full border-r-2 border-teal-400 animate-[spin_1.5s_linear_infinite]" />
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-[#0a0a0c] text-slate-200 font-sans selection:bg-emerald-500/30 selection:text-white">
            {/* Sidebar (Fixed on the left) */}
            <EmployeeSidebar />

            {/* Main Content Area */}
            <main className="flex-1 relative overflow-x-hidden">
                {/* Global Background Ambient Effects */}
                <div className="fixed top-0 left-1/4 right-0 h-[500px] pointer-events-none z-0">
                    <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-emerald-500/5 blur-[120px]" />
                    <div className="absolute top-[20%] left-[10%] w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-[100px]" />
                </div>

                {/* Content Container */}
                <div className="relative z-10 p-8 pt-10 min-h-screen">
                    {children}
                </div>
            </main>
        </div>
    );
}
