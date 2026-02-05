"use client";

import { Navbar } from "@/components/layout/Navbar";
import { User, Mail, Building2, Shield, Camera, Save, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function ProfilePage() {
    const { user, updateUser } = useAuth();
    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        company: user?.company || "",
        role: user?.role || ""
    });
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name,
                email: user.email,
                company: user.company,
                role: user.role
            });
        }
    }, [user]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateUser(formData);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    return (
        <div className="flex-1 flex flex-col min-w-0">
            <Navbar />
            <main className="flex-1 overflow-y-auto p-8 bg-zinc-50/50">
                <div className="max-w-4xl mx-auto">
                    <header className="mb-8 flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2 text-zinc-400 mb-2">
                                <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1 text-xs font-bold">
                                    <ArrowLeft className="w-3 h-3" /> Dashboard
                                </Link>
                                <span className="text-[10px]">/</span>
                                <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest">My Profile</span>
                            </div>
                            <h1 className="text-2xl font-bold text-zinc-900 mb-1">My Profile</h1>
                            <p className="text-zinc-500 font-medium text-sm">Manage your personal information and identity across the workspace.</p>
                        </div>
                    </header>

                    <div className="bg-white border border-border-subtle rounded-[32px] shadow-sm overflow-hidden">
                        <div className="h-32 bg-gradient-to-r from-primary/10 to-blue-500/10 relative">
                            <div className="absolute -bottom-12 left-8">
                                <div className="relative group">
                                    <div className="w-24 h-24 rounded-3xl bg-white p-1 hover:scale-[1.02] transition-transform duration-300">
                                        <div className="w-full h-full rounded-2xl overflow-hidden border-4 border-white shadow-xl relative">
                                            <img
                                                src={`https://i.pravatar.cc/100?u=${user?.name || 'user'}`}
                                                alt={user?.name}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                                                <Camera className="w-6 h-6 text-white" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-4 border-white shadow-sm" />
                                </div>
                            </div>
                        </div>

                        <div className="pt-16 pb-12 px-8 md:px-12">
                            <form onSubmit={handleSubmit} className="space-y-8">
                                {showSuccess && (
                                    <div className="bg-emerald-50 border border-emerald-100 text-emerald-600 px-6 py-4 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                                        <CheckCircle2 className="w-5 h-5" />
                                        <span className="text-sm font-bold uppercase tracking-wider">Profile updated successfully!</span>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                                            <User className="w-3 h-3" /> Full Name
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all font-medium"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                                            <Mail className="w-3 h-3" /> Email Address
                                        </label>
                                        <input
                                            required
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all font-medium"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                                            <Building2 className="w-3 h-3" /> Company / Organisation
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.company}
                                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                            className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all font-medium"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                                            <Shield className="w-3 h-3" /> Workspace Role
                                        </label>
                                        <select
                                            value={formData.role}
                                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                            className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all font-medium appearance-none"
                                        >
                                            <option>CTO</option>
                                            <option>Admin</option>
                                            <option>Lead Agent</option>
                                            <option>Support Staff</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-zinc-50 flex justify-end">
                                    <button
                                        type="submit"
                                        className="flex items-center gap-2 px-10 py-4 bg-primary text-white rounded-2xl font-bold hover:bg-blue-600 active:scale-95 transition-all shadow-xl shadow-primary/20"
                                    >
                                        <Save className="w-4 h-4" /> Save Profile Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
