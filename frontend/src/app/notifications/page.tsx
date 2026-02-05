"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Bell, MessageSquare, Ticket, User, Circle } from "lucide-react";

export default function NotificationsPage() {
    return (
        <div className="flex-1 flex flex-col min-w-0">
            <Navbar />
            <main className="flex-1 overflow-y-auto p-8">
                <div className="max-w-4xl mx-auto">
                    <header className="flex items-center justify-between mb-10">
                        <div>
                            <h1 className="text-2xl font-bold text-zinc-900 mb-2">Notifications</h1>
                            <p className="text-zinc-500 font-medium">Stay updated with the latest activity in your workspace.</p>
                        </div>
                        <button className="text-sm font-bold text-primary hover:underline">Mark all as read</button>
                    </header>

                    <div className="space-y-4">
                        {[
                            { icon: MessageSquare, title: "New reply in Ticket #67", desc: "Wade Warren replied: 'I'll look into the battery issue right away.'", time: "2m ago", unread: true },
                            { icon: Ticket, title: "Ticket #42 Resolved", desc: "Esther Howard marked 'Solar panel cleaning' as resolved.", time: "1h ago", unread: true },
                            { icon: User, title: "New Team Member", desc: "Kristin Watson joined the support team.", time: "3h ago", unread: false },
                            { icon: Bell, title: "System Maintenance", desc: "Scheduled maintenance on Jan 30, 02:00 AM UTC.", time: "1d ago", unread: false },
                        ].map((n, i) => (
                            <div key={i} className={`p-6 rounded-2xl border border-border-subtle bg-white flex items-start gap-4 hover:shadow-md transition-all cursor-pointer relative ${n.unread ? 'ring-1 ring-primary/20' : ''}`}>
                                <div className={`p-3 rounded-xl ${n.unread ? 'bg-primary/10 text-primary' : 'bg-zinc-50 text-zinc-400'}`}>
                                    <n.icon className="w-5 h-5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-sm font-bold text-zinc-900 mb-1">{n.title}</h3>
                                    <p className="text-sm text-zinc-500 line-clamp-1">{n.desc}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-bold text-zinc-400 uppercase mb-2">{n.time}</p>
                                    {n.unread && <Circle className="w-2 h-2 fill-primary text-primary ml-auto" />}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
