"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, ReactNode } from "react";

const PUBLIC_ROUTES = ["/login", "/register"];

export function AuthGuard({ children }: { children: ReactNode }) {
    const { user, isLoading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // If not loading and no user, but trying to access a private route
        if (!isLoading && !user && !PUBLIC_ROUTES.includes(pathname)) {
            router.push("/login");
        }

        // If user is logged in but trying to access login/register
        if (!isLoading && user && PUBLIC_ROUTES.includes(pathname)) {
            router.push("/");
        }
    }, [user, isLoading, pathname, router]);

    // Show nothing while loading (to prevent flickering)
    if (isLoading) {
        return (
            <div className="h-screen w-screen flex items-center justify-center bg-[#0f172a]">
                <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
        );
    }

    // Only render children if we are allowed to see the current route
    const isPublic = PUBLIC_ROUTES.includes(pathname);
    if (!user && !isPublic) return null;

    return <>{children}</>;
}
