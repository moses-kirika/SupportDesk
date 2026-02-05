"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shield, Mail, Lock, ArrowRight, User, Building2, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
    const router = useRouter();
    const { register } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        password: ""
    });
    const [passwordStrength, setPasswordStrength] = useState(0);

    // Dynamic password strength calculation
    useEffect(() => {
        let strength = 0;
        if (formData.password.length > 5) strength += 25;
        if (formData.password.match(/[A-Z]/)) strength += 25;
        if (formData.password.match(/[0-9]/)) strength += 25;
        if (formData.password.match(/[^A-Za-z0-9]/)) strength += 25;
        setPasswordStrength(strength);
    }, [formData.password]);

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            register({
                name: formData.name,
                email: formData.email,
                company: formData.company,
                role: "Administrator"
            });
            router.push("/");
        }, 1500);
    };

    return (
        <div className="min-h-screen w-full flex bg-white font-sans overflow-hidden">
            {/* Left Side: Register Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-24 xl:px-32 relative z-10 bg-white">
                <div className="max-w-[480px] w-full mx-auto py-12">
                    {/* Logo */}
                    <Link href="/login" className="inline-flex items-center gap-2 mb-8 group">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                            <span className="text-white font-black text-xl">H</span>
                        </div>
                        <span className="text-xl font-black text-zinc-900 tracking-tight">SupportDesk <span className="text-primary">KE</span></span>
                    </Link>

                    <header className="mb-8">
                        <h1 className="text-3xl font-black text-zinc-900 mb-3 tracking-tight">Create workspace</h1>
                        <p className="text-zinc-500 font-medium">Join 250+ Kenyan enterprises managing IT services at scale.</p>
                    </header>

                    <form onSubmit={handleRegister} className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Full Name</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300 group-focus-within:text-primary transition-colors" />
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl py-3.5 pl-11 pr-4 text-zinc-900 placeholder:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:bg-white focus:border-primary transition-all font-medium text-sm"
                                        placeholder="Enter your full name"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Company</label>
                                <div className="relative group">
                                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300 group-focus-within:text-primary transition-colors" />
                                    <input
                                        type="text"
                                        required
                                        value={formData.company}
                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                        className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl py-3.5 pl-11 pr-4 text-zinc-900 placeholder:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:bg-white focus:border-primary transition-all font-medium text-sm"
                                        placeholder="Company name"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Work Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl py-3.5 pl-11 pr-4 text-zinc-900 placeholder:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:bg-white focus:border-primary transition-all font-medium text-sm"
                                    placeholder="work@example.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Create Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300 group-focus-within:text-primary transition-colors" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl py-3.5 pl-11 pr-12 text-zinc-900 placeholder:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:bg-white focus:border-primary transition-all font-medium text-sm"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-300 hover:text-zinc-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-4" /> : <Eye className="w-5 h-4" />}
                                </button>
                            </div>

                            {/* Password Strength Meter */}
                            <div className="pt-2 px-1">
                                <div className="flex justify-between text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                                    <span>Security strength</span>
                                    <span className={passwordStrength >= 75 ? 'text-emerald-500' : 'text-orange-500'}>
                                        {passwordStrength === 0 ? 'Too weak' : passwordStrength <= 50 ? 'Medium' : 'Very Strong'}
                                    </span>
                                </div>
                                <div className="h-1 w-full bg-zinc-100 rounded-full overflow-hidden flex gap-1">
                                    {[25, 50, 75, 100].map((step) => (
                                        <div
                                            key={step}
                                            className={`h-full flex-1 transition-all duration-500 ${passwordStrength >= step
                                                ? (passwordStrength >= 75 ? 'bg-emerald-500' : 'bg-orange-500')
                                                : 'bg-zinc-200'
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-zinc-900 hover:bg-zinc-800 disabled:bg-zinc-400 text-white font-bold py-4 rounded-2xl shadow-xl shadow-zinc-200 flex items-center justify-center gap-3 active:scale-[0.98] transition-all group relative mt-6"
                        >
                            {isLoading ? (
                                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <span>Initialize Workspace</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-zinc-100 flex flex-col items-center gap-6">
                        <p className="text-sm text-zinc-500 font-medium font-sans">
                            Already have an account?{" "}
                            <Link href="/login" className="text-primary hover:underline font-extrabold">Sign in</Link>
                        </p>

                        <div className="flex items-center gap-2 py-3 px-5 bg-zinc-50 rounded-2xl border border-zinc-100 w-full">
                            <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
                            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-relaxed">
                                Fully compliant with <span className="text-zinc-900">Kenya Data Protection Act (2019)</span> & local SaaS residency laws.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side: Visual Image (Unified with Login) */}
            <div className="hidden lg:block w-1/2 relative bg-zinc-900">
                <img
                    src="/auth_sidebar_visual_1769527728704.png"
                    alt="IT Infrastructure"
                    className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

                <div className="absolute top-24 left-24 right-24">
                    <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 mb-8">
                        <Shield className="w-6 h-6 text-emerald-400" />
                    </div>
                    <h2 className="text-5xl font-black text-white leading-[1.1] tracking-tight mb-6">
                        The Operating System for <span className="text-primary">Kenyan IT Teams.</span>
                    </h2>
                    <p className="text-xl text-white/50 font-medium max-w-md">
                        Centralize your support operations, automate SLAs, and delight your internal customers with SupportDesk KE.
                    </p>
                </div>

                <div className="absolute bottom-24 left-24 right-24">
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[32px]">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/20 rounded-lg">
                                    <CheckCircle2 className="w-5 h-5 text-primary" />
                                </div>
                                <span className="text-xs font-bold text-white uppercase tracking-widest">Enterprise Ready</span>
                            </div>
                            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Active Nodes: 1,402</span>
                        </div>
                        <div className="space-y-4">
                            {[
                                { label: "SLA Management", val: "100%" },
                                { label: "Security Encryption", val: "AES-256" },
                                { label: "Region", val: "Nairobi (ke-central-1)" }
                            ].map((stat) => (
                                <div key={stat.label} className="flex justify-between items-center">
                                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">{stat.label}</span>
                                    <span className="text-xs font-black text-white tabular-nums">{stat.val}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
