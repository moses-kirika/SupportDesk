"use client";

import { Home, Ticket, Users, Building2, BarChart3, Settings, Bell, LogOut, Search } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Ticket, label: "Tickets", href: "/tickets" },
    { icon: Users, label: "Support", href: "/support" },
    { icon: Building2, label: "Organisations", href: "/organisations" },
    { icon: BarChart3, label: "Reporting", href: "/reporting" },
    { icon: Settings, label: "Admin", href: "/admin" },
];

const footerItems = [
    { icon: Bell, label: "Notifications", href: "/notifications" },
];

export function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    return (
        <div className="flex flex-col w-64 h-screen bg-gradient-to-b from-sidebar-start to-sidebar-end text-white/70 p-4 border-r border-white/10">
            <div className="flex items-center gap-2 mb-8 px-2">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <span className="text-sidebar-start font-bold text-xl">H</span>
                </div>
                <span className="text-white font-semibold text-lg">H Desk</span>
                <div className="ml-auto w-5 h-5 border border-white/20 rounded flex items-center justify-center text-[10px]">
                    <span className="opacity-50">K</span>
                </div>
            </div>

            <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full bg-white/10 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-white/30 placeholder:text-white/30"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1 items-center opacity-30 text-[10px]">
                    <span className="border border-white/50 rounded px-1">⌘</span>
                    <span className="border border-white/50 rounded px-1 text-xs">K</span>
                </div>
            </div>

            <nav className="flex-1 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.label === "Tickets" && pathname.startsWith("/tickets"));
                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive ? "bg-white/10 text-white" : "hover:bg-white/5 hover:text-white"
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="text-sm font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto space-y-1 border-t border-white/10 pt-4">
                {footerItems.map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 hover:text-white transition-colors"
                    >
                        <item.icon className="w-5 h-5" />
                        <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                ))}

                <div className="mt-4 flex items-center gap-3 px-3 py-3 border-t border-white/10">
                    <div className="w-8 h-8 rounded-full bg-zinc-400 overflow-hidden">
                        <img src={`https://i.pravatar.cc/32?u=${user?.name || 'user'}`} alt="User" />
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                        <p className="text-sm font-medium text-white truncate">{user?.name || 'Moses'}</p>
                        <p className="text-xs opacity-50 truncate">{user?.email || 'moses@hdesk.ke'}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="text-white/50 hover:text-white transition-colors"
                    >
                        <LogOut className="w-4 h-4 rotate-180" />
                    </button>
                </div>
            </div>
        </div>
    );
}
