"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
    name: string;
    email: string;
    company: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (userData: User) => void;
    logout: () => void;
    register: (userData: User) => void;
    updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load user from localStorage on initial render
    useEffect(() => {
        try {
            const savedUser = localStorage.getItem("supportdesk_user");
            if (savedUser) {
                setUser(JSON.parse(savedUser));
            }
        } catch (e) {
            console.error("Failed to parse auth user:", e);
        }
        setIsLoading(false);
    }, []);

    const login = (userData: User) => {
        setUser(userData);
        localStorage.setItem("supportdesk_user", JSON.stringify(userData));
    };

    const register = (userData: User) => {
        setUser(userData);
        localStorage.setItem("supportdesk_user", JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("supportdesk_user");
    };

    const updateUser = (userData: Partial<User>) => {
        if (!user) return;
        const updatedUser = { ...user, ...userData };
        setUser(updatedUser);
        localStorage.setItem("supportdesk_user", JSON.stringify(updatedUser));
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout, register, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
