"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shield, Mail, Lock, ArrowRight, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: "moses@hdesk.ke", password: "••••••••" });

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            login({
                name: "Moses",
                email: formData.email,
                company: "SupportDesk KE",
                role: "CTO / Admin"
            });
            router.push("/");
        }, 1500);
    };

    return (
        <div className="min-h-screen w-full flex bg-white font-sans overflow-hidden">
            {/* Left Side: Login Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-24 xl:px-32 relative z-10 bg-white">
                <div className="max-w-[440px] w-full mx-auto">
                    {/* Logo */}
                    <Link href="/" className="inline-flex items-center gap-2 mb-12 group">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                            <span className="text-white font-black text-xl">H</span>
                        </div>
                        <span className="text-xl font-black text-zinc-900 tracking-tight">SupportDesk <span className="text-primary">KE</span></span>
                    </Link>

                    <header className="mb-10">
                        <h1 className="text-3xl font-black text-zinc-900 mb-3 tracking-tight">Welcome back</h1>
                        <p className="text-zinc-500 font-medium">Securely access your IT service management portal.</p>
                    </header>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Work Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-300 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl py-4 pl-12 pr-4 text-zinc-900 placeholder:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:bg-white focus:border-primary transition-all font-medium"
                                    placeholder="email@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between ml-1">
                                <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">Password</label>
                                <button type="button" className="text-[11px] font-bold text-primary uppercase tracking-widest hover:underline">Forgot password?</button>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-300 group-focus-within:text-primary transition-colors" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl py-4 pl-12 pr-12 text-zinc-900 placeholder:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:bg-white focus:border-primary transition-all font-medium"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-300 hover:text-zinc-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 px-1">
                            <input
                                type="checkbox"
                                id="remember"
                                className="w-4 h-4 rounded border-zinc-300 text-primary focus:ring-primary/20 accent-primary cursor-pointer"
                            />
                            <label htmlFor="remember" className="text-sm font-semibold text-zinc-500 cursor-pointer select-none">Keep me logged in for 30 days</label>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-zinc-900 hover:bg-zinc-800 disabled:bg-zinc-400 text-white font-bold py-4 rounded-2xl shadow-xl shadow-zinc-200 flex items-center justify-center gap-3 active:scale-[0.98] transition-all group relative overflow-hidden"
                        >
                            {isLoading ? (
                                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <span>Sign in to Workspace</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-12 pt-8 border-t border-zinc-100 flex flex-col items-center gap-6">
                        <p className="text-sm text-zinc-500 font-medium text-center">
                            Don't have a workspace?{" "}
                            <Link href="/register" className="text-primary hover:underline font-extrabold">Create an account</Link>
                        </p>

                        <div className="flex items-center gap-3 py-2 px-4 bg-emerald-50 rounded-full border border-emerald-100">
                            <Shield className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">Enterprise-grade secure login</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side: Visual Image */}
            <div className="hidden lg:block w-1/2 relative bg-zinc-900">
                <img
                    src="/auth_sidebar_visual_1769527728704.png"
                    alt="IT Infrastructure"
                    className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity hover:opacity-100 hover:mix-blend-normal transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />

                <div className="absolute bottom-24 left-24 right-24 text-white">
                    <div className="flex gap-2 mb-6">
                        {[1, 2, 3].map(i => (
                            <div key={i} className={`h-1 rounded-full transition-all ${i === 1 ? 'w-8 bg-primary' : 'w-4 bg-white/20'}`} />
                        ))}
                    </div>
                    <blockquote className="text-4xl font-black mb-8 leading-tight tracking-tight">
                        "Reliable uptime for the future of Kenya's digital infrastructure."
                    </blockquote>
                    <div className="flex items-center gap-4">
                        <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map(i => (
                                <img key={i} src={`https://i.pravatar.cc/40?u=${i + 10}`} className="w-8 h-8 rounded-full border-2 border-zinc-950" alt="avatar" />
                            ))}
                        </div>
                        <p className="text-sm font-bold text-white/60 uppercase tracking-widest">Joined by 250+ Kenyan Enterprises</p>
                    </div>
                </div>

                {/* Floating Metrics Badge */}
                <div className="absolute top-24 right-24 bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex items-center gap-4 animate-bounce-slow">
                    <div className="p-2 bg-emerald-500 rounded-lg">
                        <CheckCircle2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-0.5">System Status</p>
                        <p className="text-sm font-bold text-white tracking-widest">99.99% Uptime</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
