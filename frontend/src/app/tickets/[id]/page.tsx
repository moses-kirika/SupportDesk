"use client";

import { Navbar } from "@/components/layout/Navbar";
import { DetailsPanel } from "@/components/layout/DetailsPanel";
import { MessageBubble } from "@/components/tickets/MessageBubble";
import { Composer } from "@/components/tickets/Composer";
import { ChevronDown, MessageSquare, Clock, Users, ArrowLeft, Ticket } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { useTickets } from "@/context/TicketContext";
import { useAuth } from "@/context/AuthContext";
import { Building2 } from "lucide-react";

export default function TicketDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { getTicketById, updateTicketStatus, updateTicketPriority, updateTicketAssignee, addMessage } = useTickets();
    const { user } = useAuth();
    const id = parseInt(params.id as string);

    const ticket = getTicketById(id);

    if (!ticket) {
        return (
            <div className="flex-1 flex flex-col min-w-0 bg-zinc-50/30 h-screen">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center p-8">
                    <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mb-4">
                        <Ticket className="w-8 h-8 text-zinc-400" />
                    </div>
                    <h2 className="text-xl font-bold text-zinc-900 mb-2">Ticket Not Found</h2>
                    <p className="text-zinc-500 mb-6 text-center max-w-md">The ticket you're looking for doesn't exist or has been archived.</p>
                    <Link href="/tickets" className="text-primary font-bold hover:underline flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" /> Back to Tickets
                    </Link>
                </div>
            </div>
        );
    }

    const handleSend = (content: string) => {
        // 1. Add agent message
        addMessage(id, {
            role: "agent",
            name: user?.name || "Moses",
            message: content,
            time: "Just now"
        });

        // 2. Simulate customer reply for demonstration
        setTimeout(() => {
            const replies = [
                "Asante sana! I'll be waiting for your update.",
                "Thank you, Sarah. Please let me know if you need any logs from our side.",
                "Sawa, I have noted that. Looking forward to the resolution.",
                "Jambo! I just received your message, thank you for the quick response."
            ];
            const randomReply = replies[Math.floor(Math.random() * replies.length)];

            addMessage(id, {
                role: "customer",
                name: ticket.customer,
                message: randomReply,
                time: "Just now"
            });
        }, 2500);
    };

    return (
        <div className="flex-1 flex flex-col min-w-0">
            <Navbar />

            <div className="flex-1 flex min-h-0">
                <div className="flex-1 flex flex-col min-w-0 bg-white">
                    <div className="flex-1 overflow-y-auto px-8 py-8">
                        <header className="mb-10 flex items-start justify-between">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-[10px] font-bold text-primary bg-primary/5 px-2 py-0.5 rounded uppercase tracking-widest">#{ticket.id}</span>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest ${ticket.status === 'Open' ? 'bg-emerald-50 text-emerald-600' :
                                        ticket.status === 'Pending' ? 'bg-orange-50 text-orange-600' : 'bg-zinc-100 text-zinc-500'
                                        }`}>{ticket.status}</span>
                                    <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded uppercase tracking-widest flex items-center gap-1">
                                        <Users className="w-2.5 h-2.5" /> {ticket.assignee}
                                    </span>
                                </div>
                                <h1 className="text-3xl font-bold text-zinc-900 mb-2">{ticket.subject}</h1>
                                <div className="flex items-center gap-4 text-sm text-zinc-400 font-medium">
                                    <div className="flex items-center gap-1.5">
                                        <MessageSquare className="w-4 h-4" />
                                        <span>{ticket.messages.length} messages</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Clock className="w-4 h-4" />
                                        <span>Last active {ticket.time}</span>
                                    </div>
                                </div>
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-600 hover:bg-zinc-100 transition-all">
                                Action <ChevronDown className="w-4 h-4" />
                            </button>
                        </header>

                        <div className="space-y-8">
                            {ticket.messages?.map((msg, idx) => (
                                <MessageBubble
                                    key={idx}
                                    author={msg.name}
                                    timestamp={msg.time}
                                    avatarUrl={msg.avatar || `https://i.pravatar.cc/32?u=${msg.name}`}
                                    isAgent={msg.role === 'agent'}
                                    content={msg.message}
                                />
                            ))}
                            {(!ticket.messages || ticket.messages.length === 0) && (
                                <p className="text-center text-zinc-400 py-10">No messages yet.</p>
                            )}
                        </div>
                    </div>

                    <Composer onSend={handleSend} />
                </div>

                <DetailsPanel
                    status={ticket.status}
                    priority={ticket.priority}
                    assignee={ticket.assignee}
                    onStatusChange={(s) => updateTicketStatus(id, s as any)}
                    onPriorityChange={(p) => updateTicketPriority?.(id, p as any)}
                    onAssigneeChange={(a) => updateTicketAssignee(id, a)}
                />
            </div>
        </div>
    );
}
