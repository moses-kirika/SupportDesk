"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Settings, Shield, Bell, Lock, Palette, Database, ExternalLink, Mail, Globe, Save, CreditCard, Receipt, Key } from "lucide-react";
import { useState } from "react";

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState("General");

    const tabs = [
        { id: "General", icon: Settings },
        { id: "Security", icon: Lock },
        { id: "Notifications", icon: Bell },
        { id: "Appearance", icon: Palette },
        { id: "Billing", icon: CreditCard },
    ];

    const renderGeneral = () => (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Workspace Name</label>
                    <input type="text" defaultValue="SupportDesk KE" placeholder="Enter workspace name" className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all font-medium" />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Support Email</label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                        <input type="email" defaultValue="support@hdesk.ke" placeholder="Enter support email" className="w-full pl-12 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all font-medium" />
                    </div>
                </div>
            </div>
            <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Workspace Domain</label>
                <div className="flex gap-2">
                    <div className="flex-1 relative">
                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                        <input type="text" defaultValue="hdesk.ke" placeholder="Enter domain" className="w-full pl-12 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all font-medium" />
                    </div>
                    <button className="px-6 py-3 bg-white border border-border-subtle rounded-xl font-bold text-zinc-600 hover:bg-zinc-50 transition-all shadow-sm">Change</button>
                </div>
            </div>
            <div className="pt-4 flex justify-end">
                <button className="flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-blue-600 active:scale-95 transition-all shadow-lg shadow-primary/20">
                    <Save className="w-4 h-4" /> Save Changes
                </button>
            </div>
        </div>
    );

    const renderSecurity = () => (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-emerald-50/50 border border-emerald-100 p-6 rounded-2xl flex items-start gap-4">
                <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shrink-0">
                    <Shield className="w-5 h-5" />
                </div>
                <div>
                    <h4 className="font-bold text-emerald-900 mb-1">Two-Factor Authentication is Enabled</h4>
                    <p className="text-sm font-medium text-emerald-700/80">Your workspace is protected with an extra layer of security.</p>
                </div>
            </div>
            <div className="divide-y divide-zinc-100">
                {[
                    { label: "IP Whitelisting", description: "Restrict access to specific IP ranges.", enabled: true },
                    { label: "Single Sign-On (SSO)", description: "Allow users to log in with SAML or Google.", enabled: false },
                    { label: "Session Timeout", description: "Automatically log out inactive users after 30 mins.", enabled: true },
                ].map((item) => (
                    <div key={item.label} className="py-6 flex items-center justify-between">
                        <div>
                            <h4 className="font-bold text-zinc-900 mb-1">{item.label}</h4>
                            <p className="text-sm font-medium text-zinc-500">{item.description}</p>
                        </div>
                        <button className={`w-12 h-6 rounded-full relative transition-colors ${item.enabled ? 'bg-emerald-500' : 'bg-zinc-200'}`}>
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${item.enabled ? 'left-7' : 'left-1'}`} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderBilling = () => (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-zinc-900 text-white p-8 rounded-3xl relative overflow-hidden">
                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-8">
                        <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest">Enterprise Plan</span>
                        <CreditCard className="w-6 h-6 opacity-50" />
                    </div>
                    <h4 className="text-3xl font-bold mb-2">KSh 35,000<span className="text-sm font-medium opacity-50">/ month</span></h4>
                    <p className="text-sm font-medium opacity-70">Next cycle starts on March 12, 2026</p>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] -mr-32 -mt-32" />
            </div>
            <div className="space-y-4">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Recent Invoices</h4>
                <div className="bg-white border border-border-subtle rounded-2xl overflow-hidden">
                    {[
                        { date: "Jan 12, 2026", amount: "KSh 35,000", status: "Paid" },
                        { date: "Dec 12, 2025", amount: "KSh 35,000", status: "Paid" },
                    ].map((inv) => (
                        <div key={inv.date} className="px-6 py-4 flex items-center justify-between border-b last:border-0 border-zinc-50">
                            <div className="flex items-center gap-3">
                                <Receipt className="w-4 h-4 text-zinc-400" />
                                <span className="text-sm font-bold text-zinc-700">{inv.date}</span>
                            </div>
                            <div className="flex items-center gap-6">
                                <span className="text-sm font-medium text-zinc-900">{inv.amount}</span>
                                <span className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded text-[10px] font-bold uppercase tracking-widest">{inv.status}</span>
                                <button className="text-primary hover:text-blue-600 transition-colors">
                                    <ExternalLink className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex-1 flex flex-col min-w-0">
            <Navbar />
            <main className="flex-1 overflow-y-auto p-8 bg-zinc-50/50">
                <div className="max-w-6xl mx-auto">
                    <header className="mb-8">
                        <h1 className="text-2xl font-bold text-zinc-900 mb-1">Workspace Settings</h1>
                        <p className="text-zinc-500 font-medium text-sm">Manage your account, security, and billing preferences.</p>
                    </header>

                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Settings Sidebar */}
                        <aside className="w-full md:w-64 space-y-1">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === tab.id
                                        ? "bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]"
                                        : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
                                        }`}
                                >
                                    <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'opacity-100' : 'opacity-50'}`} />
                                    {tab.id}
                                </button>
                            ))}
                        </aside>

                        {/* Settings Content */}
                        <div className="flex-1 bg-white border border-border-subtle rounded-[32px] p-8 md:p-12 shadow-sm min-h-[600px]">
                            <header className="mb-10 pb-6 border-b border-zinc-50">
                                <h2 className="text-xl font-bold text-zinc-900 mb-1">{activeTab}</h2>
                                <p className="text-sm font-medium text-zinc-400">Configure your {activeTab.toLowerCase()} settings and preferences.</p>
                            </header>

                            {activeTab === "General" && renderGeneral()}
                            {activeTab === "Security" && renderSecurity()}
                            {activeTab === "Billing" && renderBilling()}
                            {(activeTab === "Notifications" || activeTab === "Appearance") && (
                                <div className="flex flex-col items-center justify-center py-20 text-center opacity-40">
                                    <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mb-4">
                                        <Settings className="w-8 h-8 text-zinc-300" />
                                    </div>
                                    <h3 className="text-lg font-bold text-zinc-900 mb-1">{activeTab} Settings</h3>
                                    <p className="text-sm font-medium">Coming soon in the next update.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
