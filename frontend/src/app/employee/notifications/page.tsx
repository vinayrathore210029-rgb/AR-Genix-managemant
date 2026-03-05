"use client";

import { motion } from "framer-motion";
import { ClipboardList, CalendarClock, MessageSquare, AlertTriangle, ShieldCheck } from "lucide-react";
import TopNavbar from "@/components/employee/TopNavbar";
import NotificationItem from "@/components/employee/NotificationItem";

export default function NotificationsPage() {
    return (
        <div className="space-y-6 pb-10 min-h-screen max-w-4xl mx-auto">
            <TopNavbar title="Notifications" />

            <div className="flex justify-between items-center mb-6 mt-4 px-2">
                <h2 className="text-xl font-medium text-white">Recent Activity</h2>
                <button className="text-emerald-400 text-sm hover:text-emerald-300 transition-colors">Mark all as read</button>
            </div>

            <div className="space-y-4">
                <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2 mt-6 px-2">Today</div>

                <NotificationItem
                    title="New Task Assigned"
                    description="You have been assigned to 'Fix API Authentication Bug' by the Super Admin."
                    time="10:30 AM"
                    icon={<ClipboardList size={20} />}
                    isUnread={true}
                    delay={0.1}
                />

                <NotificationItem
                    title="Meeting Reminder"
                    description="Project requirements sync in 15 minutes."
                    time="09:45 AM"
                    icon={<CalendarClock size={20} />}
                    isUnread={true}
                    delay={0.2}
                />

                <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2 mt-8 px-2">Yesterday</div>

                <NotificationItem
                    title="New Message"
                    description="Sarah Jenkins sent you a message regarding the UI Mockups."
                    time="04:20 PM"
                    icon={<MessageSquare size={20} />}
                    delay={0.3}
                />

                <NotificationItem
                    title="Deadline Approaching"
                    description="The deadline for 'Marketing Website' is approaching rapidly. Please ensure completion by Oct 15."
                    time="01:15 PM"
                    icon={<AlertTriangle size={20} />}
                    delay={0.4}
                />

                <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2 mt-8 px-2">Earlier this week</div>

                <NotificationItem
                    title="Security Update"
                    description="Your system password was updated successfully."
                    time="Mon, 11:00 AM"
                    icon={<ShieldCheck size={20} />}
                    delay={0.5}
                />
            </div>
        </div>
    );
}
