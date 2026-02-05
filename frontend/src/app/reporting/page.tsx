"use client";

import { Navbar } from "@/components/layout/Navbar";
import { BarChart3, TrendingUp, TrendingDown, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { useTickets } from "@/context/TicketContext";

export default function ReportingPage() {
    const { tickets } = useTickets();

    // Calculate dynamic stats
    const resolvedCount = tickets.filter(t => t.status === "Solved").length;
    const criticalCount = tickets.filter(t => t.priority === "Critical").length;
    const highCount = tickets.filter(t => t.priority === "High").length;
    const mediumCount = tickets.filter(t => t.priority === "Medium").length;
    const lowCount = tickets.filter(t => t.priority === "Low").length;

    const volumeStats = [
        { label: "Critical", count: criticalCount, color: "bg-rose-500" },
        { label: "High Priority", count: highCount, color: "bg-orange-500" },
        { label: "Medium", count: mediumCount, color: "bg-blue-500" },
        { label: "Low", count: lowCount, color: "bg-emerald-500" },
    ];

    const maxVolume = Math.max(...volumeStats.map(s => s.count), 1);

    const summaryCards = [
        { icon: Clock, label: "Response Time", value: "12m 45s", trend: "-5%", up: true }, // Response time doesn't have a field yet
        { icon: AlertCircle, label: "Escalated", value: criticalCount.toString(), trend: "+2", up: false },
        { icon: CheckCircle2, label: "Resolved", value: resolvedCount.toString(), trend: "+14%", up: true },
    ];

    return (
        <div className="flex-1 flex flex-col min-w-0">
            <Navbar />
            <main className="flex-1 overflow-y-auto p-8 text-zinc-900">
                <div className="max-w-6xl mx-auto">
                    <header className="mb-10">
                        <h1 className="text-2xl font-bold mb-2">Reporting & Analytics</h1>
                        <p className="text-zinc-500 font-medium font-sans">Deep dive into your team's performance metrics.</p>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                        <div className="bg-white p-8 rounded-3xl border border-border-subtle shadow-sm">
                            <h3 className="text-lg font-bold mb-6 font-sans flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Resolution Time (Weekly)
                            </h3>
                            <div className="h-64 flex items-end justify-between gap-4">
                                {[45, 60, 35, 80, 55, 90, 70].map((h, i) => (
                                    <div key={i} className="flex-1 bg-primary/10 rounded-t-lg relative group transition-all hover:bg-primary/20">
                                        <div className="absolute inset-x-0 bottom-0 bg-primary rounded-t-lg transition-all" style={{ height: `${h}%` }} />
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-zinc-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                            {h}m avg
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between mt-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                                <span>Mon</span>
                                <span>Tue</span>
                                <span>Wed</span>
                                <span>Thu</span>
                                <span>Fri</span>
                                <span>Sat</span>
                                <span>Sun</span>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-3xl border border-border-subtle shadow-sm">
                            <h3 className="text-lg font-bold mb-6 font-sans flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-primary" /> Live Ticket Volume
                            </h3>
                            <div className="space-y-6">
                                {volumeStats.map((item) => (
                                    <div key={item.label}>
                                        <div className="flex justify-between text-sm font-bold mb-2">
                                            <span>{item.label}</span>
                                            <span className="text-zinc-400">{item.count} tickets</span>
                                        </div>
                                        <div className="h-2 w-full bg-zinc-50 rounded-full overflow-hidden">
                                            <div className={`h-full ${item.color} rounded-full transition-all duration-1000`} style={{ width: `${(item.count / maxVolume) * 100}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {summaryCards.map((card) => (
                            <div key={card.label} className="bg-white p-6 rounded-2xl border border-border-subtle shadow-sm hover:border-primary/20 transition-all">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 bg-zinc-50 rounded-xl">
                                        <card.icon className="w-5 h-5 text-zinc-600" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">{card.label}</p>
                                        <p className="text-2xl font-bold font-sans">{card.value}</p>
                                    </div>
                                </div>
                                <div className={`text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${card.up ? 'text-emerald-600' : 'text-rose-600'}`}>
                                    <TrendingUp className={`w-3 h-3 ${!card.up && 'rotate-180'}`} />
                                    {card.trend} vs last week
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
