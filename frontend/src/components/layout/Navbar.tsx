"use client";

import { MessageSquare, Phone, Bell, Search, Settings, LogOut, User } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const { user, logout } = useAuth();
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    // Simple breadcrumb logic
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs = segments.length > 0
        ? segments.map(s => s.charAt(0).toUpperCase() + s.slice(1))
        : ["Dashboard"];

    return (
        <header className="h-16 flex items-center justify-between px-6 bg-white border-b border-border-subtle relative z-20">
            <div className="flex items-center gap-2 text-sm font-medium">
                {segments.length > 0 ? (
                    <>
                        <span className="text-zinc-400">App</span>
                        <span className="text-zinc-300">/</span>
                        {breadcrumbs.map((crumb, i) => (
                            <div key={crumb} className="flex items-center gap-2">
                                <Link
                                    href={`/${segments.slice(0, i + 1).join('/')}`}
                                    className={i === breadcrumbs.length - 1 ? "text-zinc-800 font-bold" : "text-zinc-500 hover:text-primary transition-colors"}
                                >
                                    {crumb === 'Tickets' && segments[i + 1] ? 'Tickets' :
                                        crumb.length === 2 && !isNaN(Number(crumb)) ? `Ticket #${crumb}` : crumb}
                                </Link>
                                {i < breadcrumbs.length - 1 && <span className="text-zinc-300">/</span>}
                            </div>
                        ))}
                    </>
                ) : (
                    <span className="text-zinc-800 font-bold">Dashboard</span>
                )}
            </div>

            <div className="flex-1 max-w-md mx-10 hidden lg:block">
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="Global search (Tickets, Members, Orgs)..."
                        className="w-full bg-zinc-50 border border-border-subtle rounded-xl py-2 pl-10 pr-4 text-xs focus:outline-none focus:ring-2 focus:ring-primary/10 focus:bg-white transition-all"
                    />
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="flex items-center gap-4 text-zinc-400">
                    <button className="hover:text-zinc-800 transition-colors p-2 hover:bg-zinc-50 rounded-lg relative group">
                        <MessageSquare className="w-5 h-5" />
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-[8px] text-white font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm">3</span>
                    </button>
                    <button className="hover:text-zinc-800 transition-colors p-2 hover:bg-zinc-50 rounded-lg">
                        <Phone className="w-5 h-5" />
                    </button>
                    <Link href="/notifications" className="hover:text-zinc-800 transition-colors p-2 hover:bg-zinc-50 rounded-lg relative">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
                    </Link>
                </div>

                <div className="relative">
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className={`w-9 h-9 rounded-full overflow-hidden border-2 transition-all shadow-sm ${isProfileOpen ? 'border-primary ring-4 ring-primary/5' : 'border-white hover:border-zinc-200'}`}
                    >
                        <img src={`https://i.pravatar.cc/32?u=${user?.name || 'user'}`} alt={user?.name} className="w-full h-full object-cover" />
                    </button>

                    {isProfileOpen && (
                        <>
                            <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)} />
                            <div className="absolute right-0 mt-3 w-56 bg-white border border-border-subtle rounded-2xl shadow-xl z-20 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                                <div className="px-4 py-3 border-b border-zinc-50 mb-2">
                                    <p className="text-sm font-bold text-zinc-800 text-left">{user?.name || 'Moses'}</p>
                                    <p className="text-[10px] font-medium text-zinc-500 text-left">{user?.email || 'moses@hdesk.ke'}</p>
                                </div>
                                <Link
                                    href="/profile"
                                    onClick={() => setIsProfileOpen(false)}
                                    className="w-full px-4 py-2 flex items-center gap-3 text-sm font-semibold text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition-colors text-left"
                                >
                                    <User className="w-4 h-4" /> My Profile
                                </Link>
                                <Link
                                    href="/admin"
                                    onClick={() => setIsProfileOpen(false)}
                                    className="w-full px-4 py-2 flex items-center gap-3 text-sm font-semibold text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition-colors text-left"
                                >
                                    <Settings className="w-4 h-4" /> Account Settings
                                </Link>
                                <div className="h-px bg-zinc-50 my-2" />
                                <button
                                    onClick={handleLogout}
                                    className="w-full px-4 py-2 flex items-center gap-3 text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-colors text-left"
                                >
                                    <LogOut className="w-4 h-4" /> Sign out
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
