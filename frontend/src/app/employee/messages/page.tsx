"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Send, Paperclip, Smile, MoreVertical } from "lucide-react";
import TopNavbar from "@/components/employee/TopNavbar";

const conversations = [
    { id: 1, name: "General Team", msg: "Can someone check the latest PR?", time: "10:24 AM", unread: 2, isGroup: true, img: "https://ui-avatars.com/api/?name=GT&background=10b981&color=fff" },
    { id: 2, name: "Sarah Jenkins", msg: "The designs are ready for review.", time: "09:15 AM", unread: 0, isGroup: false, img: "/employees/employee-1.jpg" },
    { id: 3, name: "Project Alpha", msg: "Meeting at 3 PM today.", time: "Yesterday", unread: 5, isGroup: true, img: "https://ui-avatars.com/api/?name=PA&background=3b82f6&color=fff" },
    { id: 4, name: "Michael Chen", msg: "Thanks for the help!", time: "Oct 23", unread: 0, isGroup: false, img: "/employees/employee-2.jpg" },
    { id: 5, name: "Design System", msg: "Updated the primary button colors.", time: "Oct 21", unread: 0, isGroup: true, img: "https://ui-avatars.com/api/?name=DS&background=8b5cf6&color=fff" },
];

const chatHistory = [
    { id: 1, sender: "Sarah Jenkins", text: "Hey! Did you get a chance to look at the new dashboard UI?", time: "09:45 AM", isMe: false, img: "/employees/employee-1.jpg" },
    { id: 2, sender: "Me", text: "Yes, it looks amazing! Just a few tweaks on the sidebar padding.", time: "09:50 AM", isMe: true },
    { id: 3, sender: "Sarah Jenkins", text: "Got it. I'll push those changes in about an hour. Are we still on for the 2 PM sync?", time: "09:55 AM", isMe: false, img: "/employees/employee-1.jpg" },
    { id: 4, sender: "Me", text: "Yep, see you then!", time: "10:00 AM", isMe: true },
    { id: 5, sender: "Sarah Jenkins", text: "The designs are ready for review.", time: "09:15 AM", isMe: false, img: "/employees/employee-1.jpg" }, // Latest
];

export default function MessagesPage() {
    const [activeChat, setActiveChat] = useState(conversations[1]);

    return (
        <div className="space-y-6 pb-6 h-[calc(100vh-2rem)] flex flex-col">
            <TopNavbar title="Messages" />

            <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Panel: Conversations */}
                <div className="bg-[#121215]/80 backdrop-blur-md border border-white/5 rounded-3xl flex flex-col shadow-xl overflow-hidden lg:col-span-1">
                    <div className="p-4 border-b border-white/5">
                        <div className="relative w-full group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors" size={16} />
                            <input
                                type="text"
                                placeholder="Search messages..."
                                className="w-full bg-black/20 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/30 text-sm transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto no-scrollbar">
                        {conversations.map((chat) => (
                            <div
                                key={chat.id}
                                onClick={() => setActiveChat(chat)}
                                className={`p-4 border-b border-white/5 flex items-start gap-4 cursor-pointer transition-colors ${activeChat.id === chat.id ? 'bg-emerald-500/10 border-l-2 border-l-emerald-500' : 'hover:bg-white/[0.02]'}`}
                            >
                                <div className="relative">
                                    <img src={chat.img} alt={chat.name} className="w-12 h-12 rounded-full object-cover border-2 border-[#121215]" />
                                    {!chat.isGroup && <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#121215]"></span>}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h4 className={`font-medium truncate ${activeChat.id === chat.id ? 'text-white' : 'text-slate-200'}`}>{chat.name}</h4>
                                        <span className={`text-xs ${chat.unread > 0 ? 'text-emerald-400 font-medium' : 'text-slate-500'}`}>{chat.time}</span>
                                    </div>
                                    <p className={`text-sm truncate ${chat.unread > 0 ? 'text-slate-300 font-medium' : 'text-slate-500'}`}>{chat.msg}</p>
                                </div>
                                {chat.unread > 0 && (
                                    <div className="mt-2 w-5 h-5 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                                        {chat.unread}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Panel: Chat Window */}
                <div className="hidden lg:flex flex-col bg-[#121215]/80 backdrop-blur-md border border-white/5 rounded-3xl shadow-xl lg:col-span-2 overflow-hidden relative">
                    {/* Header */}
                    <div className="p-4 px-6 border-b border-white/5 flex justify-between items-center bg-black/10">
                        <div className="flex items-center gap-4">
                            <img src={activeChat.img} alt={activeChat.name} className="w-10 h-10 rounded-full object-cover" />
                            <div>
                                <h3 className="text-white font-medium">{activeChat.name}</h3>
                                <p className="text-xs text-emerald-400">{activeChat.isGroup ? "3 members online" : "Online"}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-slate-400">
                            <button className="p-2 hover:bg-white/5 rounded-lg transition-colors"><Search size={18} /></button>
                            <button className="p-2 hover:bg-white/5 rounded-lg transition-colors"><MoreVertical size={18} /></button>
                        </div>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {chatHistory.map((msg) => (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                key={msg.id}
                                className={`flex max-w-[80%] ${msg.isMe ? 'ml-auto justify-end' : 'mr-auto justify-start'}`}
                            >
                                {!msg.isMe && (
                                    <img src={msg.img} alt="Avatar" className="w-8 h-8 rounded-full object-cover mr-3 self-end" />
                                )}
                                <div className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
                                    <div className={`px-5 py-3 rounded-2xl shadow-sm ${msg.isMe ? 'bg-gradient-to-tr from-emerald-600 to-teal-500 text-white rounded-br-sm' : 'bg-white/5 text-slate-200 border border-white/5 rounded-bl-sm'}`}>
                                        <p className="text-sm leading-relaxed">{msg.text}</p>
                                    </div>
                                    <span className="text-[10px] text-slate-500 mt-1">{msg.time}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-black/20 border-t border-white/5">
                        <div className="flex items-end gap-2 bg-[#1a1a1e] border border-white/10 rounded-2xl p-2 focus-within:border-emerald-500/30 transition-colors">
                            <button className="p-2 text-slate-400 hover:text-white transition-colors"><Paperclip size={20} /></button>
                            <textarea
                                placeholder="Type your message..."
                                className="flex-1 bg-transparent text-white placeholder:text-slate-500 focus:outline-none resize-none max-h-32 min-h-[40px] py-2 text-sm"
                                rows={1}
                            />
                            <button className="p-2 text-slate-400 hover:text-white transition-colors"><Smile size={20} /></button>
                            <button className="p-2 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all">
                                <Send size={18} className="translate-x-[-1px] translate-y-[1px]" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
