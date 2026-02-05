"use client";

import { Navbar } from "@/components/layout/Navbar";
import {
    Building2, MapPin, Globe, Mail, Phone, Ticket, Users,
    ArrowUpRight, ArrowDownRight, Clock, ShieldCheck,
    ExternalLink, MoreVertical, Search, Filter, Plus, ChevronRight
} from "lucide-react";
import { useState, use } from "react";
import Link from "next/link";
import { useOrganisations } from "@/context/OrganisationContext";

export default function OrganisationDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { getOrganisationById } = useOrganisations();
    const [activeTab, setActiveTab] = useState("Activity");

    const org = getOrganisationById(parseInt(id));

    if (!org) {
        return (
            <div className="flex-1 flex flex-col min-w-0 bg-zinc-50/30 h-screen">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center p-8">
                    <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mb-4">
                        <Building2 className="w-8 h-8 text-zinc-400" />
                    </div>
                    <h2 className="text-xl font-bold text-zinc-900 mb-2">Organisation Not Found</h2>
                    <p className="text-zinc-500 mb-6 text-center max-w-md">We couldn't find the organisation you're looking for. It might have been deleted or the ID is incorrect.</p>
                    <Link href="/organisations" className="text-primary font-bold hover:underline flex items-center gap-2">
                        Back to Organisations
                    </Link>
                </div>
            </div>
        );
    }

    const tabs = ["Activity", "Tickets", "Users", "Contract"];

    return (
        <div className="flex-1 flex flex-col min-w-0 bg-zinc-50/30">
            <Navbar />
            <main className="flex-1 overflow-y-auto p-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header Section */}
                    <div className="bg-white border border-border-subtle rounded-[32px] p-8 shadow-sm mb-8 relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="flex items-center gap-6">
                                    <div className={`w-20 h-20 ${org.color} rounded-3xl flex items-center justify-center text-white font-bold text-3xl shadow-xl shadow-emerald-500/20`}>
                                        {org.logo}
                                    </div>
                                    <div className="text-left">
                                        <div className="flex items-center gap-3 mb-1">
                                            <h1 className="text-3xl font-bold text-zinc-900">{org.name}</h1>
                                            <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                                                <ShieldCheck className="w-3 h-3" /> Preferred Vendor
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-zinc-500">
                                            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {org.location}</span>
                                            <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4" /> {org.industry}</span>
                                            <span className="flex items-center gap-1.5 text-primary hover:underline cursor-pointer"><Globe className="w-4 h-4" /> {org.website}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button className="px-5 py-2.5 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 rounded-xl font-bold text-zinc-600 transition-all text-sm">
                                        Edit Details
                                    </button>
                                    <button className="px-5 py-2.5 bg-primary text-white rounded-xl font-bold hover:bg-blue-600 active:scale-95 transition-all text-sm shadow-lg shadow-primary/20">
                                        Message Support
                                    </button>
                                    <button className="p-2.5 hover:bg-zinc-50 rounded-xl border border-zinc-200 text-zinc-400 transition-colors">
                                        <MoreVertical className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[80px] -mr-32 -mt-32" />
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                        {[
                            { label: "Total Managed Users", value: org.users.toLocaleString(), icon: Users, trend: "+120", up: true },
                            { label: "Active Tickets", value: org.tickets, icon: Ticket, trend: "+4", up: false },
                            { label: "SLA Compliant Rate", value: org.sla, icon: ShieldCheck, trend: "+0.2%", up: true },
                            { label: "Uptime (Infrastructure)", value: org.uptime, icon: Globe, trend: "Stable", up: true },
                        ].map((stat) => (
                            <div key={stat.label} className="bg-white p-6 rounded-[24px] border border-border-subtle shadow-sm hover:shadow-md transition-all group">
                                <div className="flex items-center justify-between mb-4 text-left">
                                    <div className="p-2 bg-zinc-50 rounded-lg group-hover:bg-primary/10 transition-colors">
                                        <stat.icon className="w-5 h-5 text-zinc-400 group-hover:text-primary transition-colors" />
                                    </div>
                                    <div className={`flex items-center gap-1 text-[10px] font-bold ${stat.up ? 'text-emerald-500' : 'text-rose-500'}`}>
                                        {stat.trend}
                                        {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                    </div>
                                </div>
                                <div className="text-left">
                                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">{stat.label}</p>
                                    <p className="text-2xl font-bold text-zinc-900 uppercase">{stat.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Tabs Section */}
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Tab Content */}
                        <div className="flex-1 space-y-8">
                            <div className="flex items-center gap-8 border-b border-zinc-100 overflow-x-auto no-scrollbar">
                                {tabs.map(tab => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`pb-4 text-sm font-bold transition-all relative ${activeTab === tab ? "text-primary border-b-2 border-primary" : "text-zinc-400 hover:text-zinc-600"
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            {activeTab === "Activity" && (
                                <div className="bg-white border border-border-subtle rounded-[32px] overflow-hidden">
                                    <div className="p-6 border-b border-border-subtle flex items-center justify-between">
                                        <h3 className="font-bold text-zinc-900">Recent System Activity</h3>
                                        <button className="text-xs font-bold text-primary hover:underline">Download Report</button>
                                    </div>
                                    <div className="divide-y divide-zinc-50">
                                        {[
                                            { action: "SLA Milestone Reached", desc: "Successfully maintained 99.9% uptime for Fiber core in Westlands", time: "2 hours ago", icon: ShieldCheck, color: "text-emerald-500" },
                                            { action: "High Volume Alert", desc: "Spike in tickets related to 'M-Pesa API' in the last 6 hours", time: "5 hours ago", icon: Ticket, color: "text-rose-500" },
                                            { action: "Contract Auto-Renewed", desc: "Enterprise Platinum plan extended to March 2027", time: "1 day ago", icon: Plus, color: "text-primary" },
                                        ].map((activity, i) => (
                                            <div key={i} className="p-6 flex gap-4 text-left hover:bg-zinc-50/50 transition-colors">
                                                <div className={`mt-1 ${activity.color}`}>
                                                    <activity.icon className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-zinc-900">{activity.action}</p>
                                                    <p className="text-sm text-zinc-500 font-medium">{activity.desc}</p>
                                                    <div className="flex items-center gap-3 mt-2">
                                                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{activity.time}</span>
                                                        <span className="w-1 h-1 bg-zinc-200 rounded-full" />
                                                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Global Ops</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === "Tickets" && (
                                <div className="bg-white border border-border-subtle rounded-[32px] p-8 text-center py-20 opacity-40">
                                    <div className="flex flex-col items-center">
                                        <Ticket className="w-12 h-12 text-zinc-300 mb-4" />
                                        <h3 className="text-lg font-bold text-zinc-900">Organisation Tickets</h3>
                                        <p className="text-sm text-zinc-500 max-w-xs mx-auto">This list will be populated with all tickets associated with {org.name}.</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar Info */}
                        <aside className="w-full md:w-80 space-y-6">
                            <div className="bg-white border border-border-subtle rounded-[32px] p-6 shadow-sm">
                                <h3 className="font-bold text-zinc-900 mb-6 text-left">Contact Information</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-left">
                                        <div className="p-2 bg-zinc-50 rounded-lg text-zinc-400">
                                            <Mail className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Official Email</p>
                                            <p className="text-sm font-medium text-zinc-800">{org.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-left">
                                        <div className="p-2 bg-zinc-50 rounded-lg text-zinc-400">
                                            <Phone className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Hotline</p>
                                            <p className="text-sm font-medium text-zinc-800">{org.phone}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-left">
                                        <div className="p-2 bg-zinc-50 rounded-lg text-zinc-400">
                                            <Clock className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Joined Support</p>
                                            <p className="text-sm font-medium text-zinc-800">{org.joined}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-zinc-900 text-white rounded-[32px] p-6 shadow-xl relative overflow-hidden">
                                <div className="relative z-10 text-left">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="px-2 py-0.5 bg-white/10 rounded text-[10px] font-bold uppercase tracking-widest line-clamp-1">Account Tier</span>
                                        <ShieldCheck className="w-4 h-4 text-primary" />
                                    </div>
                                    <h4 className="text-lg font-bold mb-1">{org.plan}</h4>
                                    <p className="text-sm text-white/50 mb-6">{org.billing}</p>
                                    <button className="w-full py-3 bg-white text-zinc-900 rounded-xl font-bold text-xs hover:bg-zinc-100 transition-colors">
                                        Upgrade Plan
                                    </button>
                                </div>
                                <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/20 blur-[50px] -mb-16 -mr-16" />
                            </div>
                        </aside>
                    </div>
                </div>
            </main>
        </div>
    );
}
