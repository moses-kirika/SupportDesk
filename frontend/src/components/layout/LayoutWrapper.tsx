"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAuthPage = pathname === "/login" || pathname === "/register";

    return (
        <div className="flex h-screen bg-zinc-50 overflow-hidden">
            {!isAuthPage && <Sidebar />}
            {children}
        </div>
    );
}
