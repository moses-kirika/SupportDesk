"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Member {
    id: number;
    name: string;
    email: string;
    role: string;
    status: "Active" | "Away" | "Offline";
    lastActive: string;
}

interface MemberContextType {
    members: Member[];
    addMember: (member: Omit<Member, "id" | "status" | "lastActive">) => void;
    updateMember: (id: number, data: Partial<Omit<Member, "id" | "lastActive">>) => void;
    deleteMember: (id: number) => void;
}

const MemberContext = createContext<MemberContextType | undefined>(undefined);

const DEFAULT_MEMBERS: Member[] = [
    { id: 1, name: "Sarah Njeri", email: "sarah@hdesk.ke", role: "Cloud Architect", status: "Active", lastActive: "Just now" },
    { id: 2, name: "Peter Kiprono", email: "peter@hdesk.ke", role: "DevOps Engineer", status: "Active", lastActive: "5m ago" },
    { id: 3, name: "Faith Wambui", email: "faith@hdesk.ke", role: "Security Analyst", status: "Away", lastActive: "1h ago" },
    { id: 4, name: "Alice Awuor", email: "alice@hdesk.ke", role: "L2 Support", status: "Offline", lastActive: "3h ago" },
    { id: 5, name: "Kevin Omolo", email: "kevin@hdesk.ke", role: "Frontend Dev", status: "Active", lastActive: "Just now" }
];

export function MemberProvider({ children }: { children: ReactNode }) {
    const [members, setMembers] = useState<Member[]>([]);

    useEffect(() => {
        try {
            const saved = localStorage.getItem("supportdesk_members");
            if (saved) {
                setMembers(JSON.parse(saved));
            } else {
                setMembers(DEFAULT_MEMBERS);
            }
        } catch (e) {
            console.error("Failed to parse members:", e);
            setMembers(DEFAULT_MEMBERS);
        }
    }, []);

    const addMember = (memberData: Omit<Member, "id" | "status" | "lastActive">) => {
        const newMember: Member = {
            id: members.length > 0 ? Math.max(...members.map(m => m.id)) + 1 : 1,
            ...memberData,
            status: "Offline",
            lastActive: "Just now"
        };
        const updated = [...members, newMember];
        setMembers(updated);
        localStorage.setItem("supportdesk_members", JSON.stringify(updated));
    };

    const updateMember = (id: number, data: Partial<Omit<Member, "id" | "lastActive">>) => {
        const updated = members.map(m => m.id === id ? { ...m, ...data } : m);
        setMembers(updated);
        localStorage.setItem("supportdesk_members", JSON.stringify(updated));
    };

    const deleteMember = (id: number) => {
        const updated = members.filter(m => m.id !== id);
        setMembers(updated);
        localStorage.setItem("supportdesk_members", JSON.stringify(updated));
    };

    return (
        <MemberContext.Provider value={{ members, addMember, updateMember, deleteMember }}>
            {children}
        </MemberContext.Provider>
    );
}

export function useMembers() {
    const context = useContext(MemberContext);
    if (context === undefined) throw new Error("useMembers must be used within a MemberProvider");
    return context;
}
