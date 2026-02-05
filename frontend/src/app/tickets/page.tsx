"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Search, Filter, MoreVertical, Ticket, Clock, CheckCircle2, UserPlus, Trash2, X } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useTickets } from "@/context/TicketContext";
import { useAuth } from "@/context/AuthContext";

export default function TicketsPage() {
    const { tickets, updateTicketStatus, updateTicketAssignee, deleteTicket } = useTickets();
    const { user } = useAuth();
    const [searchQuery, setSearchQuery] = useState("");
    const [activeStatus, setActiveStatus] = useState("All");
    const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpenDropdownId(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredTickets = tickets.filter(t => {
        const matchesSearch = t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.id.toString().includes(searchQuery);
        const matchesStatus = activeStatus === "All" || t.status === activeStatus;
        return matchesSearch && matchesStatus;
    });

    const statuses = ["All", "Open", "Pending", "Solved"];

    const handleQuickSolve = (id: number) => {
        updateTicketStatus(id, "Solved");
        setOpenDropdownId(null);
    };

    const handleAssignToMe = (id: number) => {
        updateTicketAssignee(id, user?.name || "Moses");
        setOpenDropdownId(null);
    };

    const handleDelete = (id: number) => {
        if (confirm("Jambo! Are you sure you want to delete this ticket?")) {
            deleteTicket(id);
            setOpenDropdownId(null);
        }
    };

    return (
        <div className="flex-1 flex flex-col min-w-0">
            <Navbar />
            <main className="flex-1 overflow-y-auto p-8 bg-zinc-50/50">
                <div className="max-w-6xl mx-auto">
                    <header className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-2xl font-bold text-zinc-900 mb-1">Tickets</h1>
                            <p className="text-zinc-500 font-medium text-sm">Manage and respond to customer queries.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search tickets..."
                                    className="pl-10 pr-4 py-2 bg-white border border-border-subtle rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 w-64 shadow-sm transition-all"
                                />
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-border-subtle rounded-lg text-sm font-semibold text-zinc-600 hover:text-zinc-900 shadow-sm transition-all">
                                <Filter className="w-4 h-4" />
                                Filters
                            </button>
                            <button className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 active:scale-95 transition-all text-sm shadow-md shadow-primary/20">
                                New Ticket
                            </button>
                        </div>
                    </header>

                    <div className="flex items-center gap-6 mb-6 border-b border-border-subtle">
                        {statuses.map(status => (
                            <button
                                key={status}
                                onClick={() => setActiveStatus(status)}
                                className={`pb-3 text-sm font-bold transition-all relative ${activeStatus === status ? "text-primary" : "text-zinc-400 hover:text-zinc-600"
                                    }`}
                            >
                                {status}
                                {activeStatus === status && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="bg-white border border-border-subtle rounded-2xl shadow-sm overflow-visible">
                        <table className="w-full text-left">
                            <thead className="bg-zinc-50/50 border-b border-border-subtle">
                                <tr>
                                    <th className="px-6 py-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Ticket</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Customer</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Assignee</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Status</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Priority</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Updated</th>
                                    <th className="px-6 py-4"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border-subtle">
                                {filteredTickets.length > 0 ? (
                                    filteredTickets.map((ticket) => (
                                        <tr key={ticket.id} className="hover:bg-zinc-50/80 transition-colors group">
                                            <td className="px-6 py-4">
                                                <Link href={`/tickets/${ticket.id}`} className="block">
                                                    <div className="flex flex-col">
                                                        <span className="text-xs font-bold text-primary mb-1">#{ticket.id}</span>
                                                        <span className="text-sm font-semibold text-zinc-900 group-hover:text-primary transition-colors">{ticket.subject}</span>
                                                    </div>
                                                </Link>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-zinc-700">
                                                {ticket.customer}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-xs font-semibold text-zinc-600">
                                                    {ticket.assignee}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${ticket.status === 'Open' ? 'bg-blue-50 text-blue-600' :
                                                    ticket.status === 'Solved' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'
                                                    }`}>
                                                    {ticket.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-600">
                                                    <div className={`w-1.5 h-1.5 rounded-full ${ticket.priority === 'Critical' ? 'bg-rose-500' :
                                                        ticket.priority === 'High' ? 'bg-orange-500' : 'bg-blue-500'
                                                        }`} />
                                                    {ticket.priority}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-xs text-zinc-400 font-medium">
                                                {ticket.time}
                                            </td>
                                            <td className="px-6 py-4 text-right relative">
                                                <button
                                                    onClick={() => setOpenDropdownId(openDropdownId === ticket.id ? null : ticket.id)}
                                                    className={`p-2 rounded-lg transition-all ${openDropdownId === ticket.id ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100'}`}
                                                >
                                                    <MoreVertical className="w-4 h-4" />
                                                </button>

                                                {openDropdownId === ticket.id && (
                                                    <div
                                                        ref={dropdownRef}
                                                        className="absolute right-6 top-10 w-48 bg-white border border-border-subtle rounded-xl shadow-xl z-50 py-2 animate-in fade-in zoom-in-95 duration-200"
                                                    >
                                                        <div className="px-3 py-2 border-b border-border-subtle mb-1">
                                                            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Quick Actions</p>
                                                        </div>
                                                        <button
                                                            onClick={() => handleQuickSolve(ticket.id)}
                                                            className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-bold text-zinc-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors text-left"
                                                        >
                                                            <CheckCircle2 className="w-4 h-4" />
                                                            Quick Solve
                                                        </button>
                                                        <button
                                                            onClick={() => handleAssignToMe(ticket.id)}
                                                            className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-bold text-zinc-600 hover:bg-blue-50 hover:text-blue-700 transition-colors text-left"
                                                        >
                                                            <UserPlus className="w-4 h-4" />
                                                            Assign to Me
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(ticket.id)}
                                                            className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-bold text-rose-500 hover:bg-rose-50 transition-colors text-left"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                            Delete Ticket
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-20 text-center text-sm text-zinc-400">
                                            No tickets found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
