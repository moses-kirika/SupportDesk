"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Building2, Search, Filter, Plus, MoreVertical, ExternalLink, Users, Ticket, Globe, MapPin, CheckCircle2, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useOrganisations } from "@/context/OrganisationContext";

export default function OrganisationsPage() {
    const { organisations, addOrganisation } = useOrganisations();
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [newOrg, setNewOrg] = useState({ name: "", industry: "Finance", website: "", location: "Nairobi" });

    const industries = ["All", "Finance", "Telecommunications", "E-commerce", "Government / Tech"];

    const filteredOrgs = organisations.filter(org => {
        const matchesSearch = org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            org.industry.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = activeFilter === "All" || org.industry.includes(activeFilter);
        return matchesSearch && matchesFilter;
    });

    const handleAddOrg = (e: React.FormEvent) => {
        e.preventDefault();
        addOrganisation(newOrg);
        setShowSuccess(true);
        setTimeout(() => {
            setIsModalOpen(false);
            setShowSuccess(false);
            setNewOrg({ name: "", industry: "Finance", website: "", location: "Nairobi" });
        }, 1500);
    };

    return (
        <div className="flex-1 flex flex-col min-w-0 bg-zinc-50/30">
            <Navbar />
            <main className="flex-1 overflow-y-auto p-8">
                <div className="max-w-7xl mx-auto">
                    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-2xl font-bold text-zinc-900 mb-1">Organisations</h1>
                            <p className="text-zinc-500 font-medium text-sm">Manage corporate clients and monitor their support health.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                                <input
                                    type="text"
                                    placeholder="Search organisations..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 pr-4 py-2 bg-white border border-border-subtle rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 w-64 shadow-sm transition-all"
                                />
                            </div>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="bg-primary text-white px-4 py-2 rounded-xl font-bold hover:bg-blue-600 active:scale-95 transition-all flex items-center gap-2 text-sm shadow-lg shadow-primary/20"
                            >
                                <Plus className="w-4 h-4" /> Add Organisation
                            </button>
                        </div>
                    </header>

                    <div className="flex items-center gap-6 mb-8 border-b border-border-subtle overflow-x-auto no-scrollbar">
                        {industries.map(industry => (
                            <button
                                key={industry}
                                onClick={() => setActiveFilter(industry)}
                                className={`pb-4 text-sm font-bold transition-all relative whitespace-nowrap ${activeFilter === industry ? "text-primary" : "text-zinc-400 hover:text-zinc-600"
                                    }`}
                            >
                                {industry}
                                {activeFilter === industry && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredOrgs.map((org) => (
                            <div key={org.id} className="bg-white border border-border-subtle rounded-[24px] p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
                                <div className="flex items-start justify-between mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 ${org.color} rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-inner`}>
                                            {org.logo}
                                        </div>
                                        <div className="text-left">
                                            <h3 className="font-bold text-zinc-900 group-hover:text-primary transition-colors">{org.name}</h3>
                                            <p className="text-xs font-medium text-zinc-400 flex items-center gap-1">
                                                <MapPin className="w-3 h-3" /> {org.location}
                                            </p>
                                        </div>
                                    </div>
                                    <button className="text-zinc-300 hover:text-zinc-600 transition-colors">
                                        <MoreVertical className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-3 gap-4 mb-6">
                                    <div className="text-left">
                                        <div className="flex items-center gap-1 text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">
                                            <Users className="w-3 h-3" /> Users
                                        </div>
                                        <p className="font-bold text-zinc-900">{org.users}</p>
                                    </div>
                                    <div className="text-left">
                                        <div className="flex items-center gap-1 text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">
                                            <Ticket className="w-3 h-3" /> Tickets
                                        </div>
                                        <p className="font-bold text-zinc-900">{org.tickets}</p>
                                    </div>
                                    <div className="text-left">
                                        <div className="flex items-center gap-1 text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">
                                            <CheckCircle2 className="w-3 h-3" /> SLA
                                        </div>
                                        <p className={`font-bold ${parseFloat(org.sla) > 98 ? 'text-emerald-500' : 'text-orange-500'}`}>{org.sla}</p>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-zinc-50 flex items-center justify-between">
                                    <span className="px-3 py-1 bg-zinc-50 text-zinc-500 rounded-full text-[10px] font-bold uppercase tracking-widest">
                                        {org.industry}
                                    </span>
                                    <Link
                                        href={`/organisations/${org.id}`}
                                        className="flex items-center gap-2 text-xs font-bold text-primary hover:underline hover:gap-3 transition-all"
                                    >
                                        View Details <ExternalLink className="w-3 h-3" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Add Organisation Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white w-full max-w-md rounded-[32px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                        {showSuccess ? (
                            <div className="p-12 text-center flex flex-col items-center justify-center gap-4">
                                <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center animate-bounce">
                                    <CheckCircle2 className="w-12 h-12" />
                                </div>
                                <h3 className="text-2xl font-bold text-zinc-900 text-left">Organisation Registered!</h3>
                                <p className="text-zinc-500 text-left">Successfully onboarded to SupportDesk KE.</p>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center justify-between p-8 border-b border-zinc-50">
                                    <div className="text-left">
                                        <h3 className="text-xl font-bold text-zinc-900">New Organisation</h3>
                                        <p className="text-xs font-medium text-zinc-400">Onboard a corporate client.</p>
                                    </div>
                                    <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
                                        <X className="w-5 h-5 text-zinc-400" />
                                    </button>
                                </div>
                                <form onSubmit={handleAddOrg} className="p-8 space-y-6">
                                    <div className="space-y-2 text-left">
                                        <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Company Name</label>
                                        <div className="relative group">
                                            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-primary transition-colors" />
                                            <input
                                                required
                                                type="text"
                                                value={newOrg.name}
                                                onChange={(e) => setNewOrg({ ...newOrg, name: e.target.value })}
                                                placeholder="Enter company name"
                                                className="w-full pl-12 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all font-medium text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2 text-left">
                                        <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Industry</label>
                                        <select
                                            value={newOrg.industry}
                                            onChange={(e) => setNewOrg({ ...newOrg, industry: e.target.value })}
                                            className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all font-medium text-sm outline-none appearance-none cursor-pointer"
                                        >
                                            <option>Finance</option>
                                            <option>Telecommunications</option>
                                            <option>E-commerce</option>
                                            <option>Government / Tech</option>
                                            <option>Healthcare</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2 text-left">
                                        <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Website</label>
                                        <div className="relative group">
                                            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-primary transition-colors" />
                                            <input
                                                type="text"
                                                value={newOrg.website}
                                                onChange={(e) => setNewOrg({ ...newOrg, website: e.target.value })}
                                                placeholder="www.company.co.ke"
                                                className="w-full pl-12 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all font-medium text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-4 flex gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setIsModalOpen(false)}
                                            className="flex-1 px-4 py-3 border border-zinc-200 rounded-2xl font-bold text-zinc-600 hover:bg-zinc-50 transition-all text-sm"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex-1 px-4 py-3 bg-primary text-white rounded-2xl font-bold hover:bg-blue-600 active:scale-95 transition-all shadow-lg shadow-primary/20 text-sm"
                                        >
                                            Create Organisation
                                        </button>
                                    </div>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
