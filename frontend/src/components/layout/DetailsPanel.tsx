"use client";

import { ChevronDown, MapPin, Mail, Phone, Ticket, AlertCircle, Users } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface DetailsPanelProps {
    status?: string;
    priority?: string;
    assignee?: string;
    onStatusChange?: (status: string) => void;
    onPriorityChange?: (priority: string) => void;
    onAssigneeChange?: (assignee: string) => void;
}

export function DetailsPanel({
    status = "Open",
    priority = "High",
    assignee = "Unassigned",
    onStatusChange,
    onPriorityChange,
    onAssigneeChange
}: DetailsPanelProps) {
    const statuses = ["Open", "Pending", "Solved", "Closed"];
    const priorities = ["Low", "Medium", "High", "Critical"];
    const members = ["Unassigned", "Moses", "Sarah Njeri", "David Otieno", "Faith Wambui"];

    return (
        <aside className="w-80 border-l border-border-subtle bg-white flex flex-col overflow-y-auto">
            {/* User Info Section */}
            <div className="p-6 border-b border-border-subtle">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm transition-transform cursor-pointer">
                            <img src="https://i.pravatar.cc/40?u=alice" alt="Alice Awuor" />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-zinc-900">Alice Awuor</h3>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 text-xs font-medium text-zinc-500">
                    <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 opacity-70" />
                        <span>alice.awuor@safari.co.ke</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 opacity-70" />
                        <span>+254 712 345 678</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 opacity-70" />
                        <span>Thika, Kiambu</span>
                    </div>
                </div>
            </div>

            {/* Ticket Management Section */}
            <div className="p-6 border-b border-border-subtle bg-zinc-50/30 space-y-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                        <Ticket className="w-3 h-3" /> Status
                    </label>
                    <div className="relative">
                        <select
                            value={status}
                            onChange={(e) => onStatusChange?.(e.target.value)}
                            className="w-full pl-4 pr-10 py-2.5 bg-white border border-zinc-200 rounded-xl text-xs font-bold text-zinc-700 appearance-none focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all cursor-pointer"
                        >
                            {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                        <AlertCircle className="w-3 h-3" /> Priority
                    </label>
                    <div className="relative">
                        <select
                            value={priority}
                            onChange={(e) => onPriorityChange?.(e.target.value)}
                            className="w-full pl-4 pr-10 py-2.5 bg-white border border-zinc-200 rounded-xl text-xs font-bold text-zinc-700 appearance-none focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all cursor-pointer"
                        >
                            {priorities.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                        <Users className="w-3 h-3" /> Assignee
                    </label>
                    <div className="relative">
                        <select
                            value={assignee}
                            onChange={(e) => onAssigneeChange?.(e.target.value)}
                            className="w-full pl-4 pr-10 py-2.5 bg-white border border-zinc-200 rounded-xl text-xs font-bold text-zinc-700 appearance-none focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all cursor-pointer"
                        >
                            {members.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Interaction History */}
            <div className="flex-1 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Interactions history</h3>
                    <button className="text-zinc-400 hover:text-zinc-600">
                        <ChevronDown className="w-4 h-4" />
                    </button>
                </div>

                <div className="space-y-6 relative before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-px before:bg-zinc-100">
                    {[
                        { id: "67", title: "AWS S3 latency in Upper Hill", date: "2m ago", status: "open" },
                        { id: "66", title: "Thika Branch: SSL Renewal", date: "15m ago", status: "solved" },
                        { id: "65", title: "Ruiru Site: SQL Deadlock", date: "1h ago", status: "pending" },
                    ].map((item) => (
                        <Link
                            key={item.id}
                            href={`/tickets/${item.id}`}
                            className="relative pl-8 group block hover:bg-zinc-50 transition-colors py-1 rounded-lg"
                        >
                            <div className="absolute left-0 top-1.5 w-5 h-5 rounded-full bg-zinc-100 border-2 border-white flex items-center justify-center text-[8px] font-bold text-zinc-500 z-10 group-hover:bg-primary group-hover:text-white transition-colors">
                                {item.id}
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-zinc-800 mb-0.5 line-clamp-1">{item.title}</h4>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] text-zinc-400 font-medium">{item.date}</span>
                                    <span className={`text-[10px] font-bold uppercase tracking-widest ${item.status === 'open' ? 'text-primary' : 'text-zinc-300'
                                        }`}>{item.status}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </aside>
    );
}
