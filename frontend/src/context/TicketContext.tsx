"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Ticket {
    id: number;
    subject: string;
    customer: string;
    location: string;
    status: "Open" | "Pending" | "Solved";
    priority: "Low" | "Medium" | "High" | "Critical";
    time: string;
    assignee: string;
    messages: { role: "agent" | "customer"; name: string; message: string; time: string; avatar?: string }[];
}

interface TicketContextType {
    tickets: Ticket[];
    getTicketById: (id: number) => Ticket | undefined;
    updateTicketStatus: (id: number, status: Ticket["status"]) => void;
    updateTicketPriority: (id: number, priority: Ticket["priority"]) => void;
    updateTicketAssignee: (id: number, assignee: string) => void;
    deleteTicket: (id: number) => void;
    addMessage: (ticketId: number, message: Ticket["messages"][0]) => void;
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

const DEFAULT_TICKETS: Ticket[] = [
    {
        id: 67,
        subject: "AWS S3 Latency in Mombasa",
        customer: "Alice Awuor",
        location: "Mombasa, KE",
        status: "Open",
        priority: "High",
        time: "2 mins ago",
        assignee: "Sarah Njeri",
        messages: [
            { role: "customer", name: "Alice Awuor", message: "Jambo! We are seeing high latency on our S3 buckets in the Mombasa region. Can you assist?", time: "10:00 AM" },
            { role: "agent", name: "Sarah Njeri", message: "Hi Alice, let me check the routing for you.", time: "10:05 AM" }
        ]
    },
    {
        id: 42,
        subject: "Fiber Cut - Thika Road",
        customer: "Kevin Omolo",
        location: "Ruaraka, Nairobi",
        status: "Pending",
        priority: "High",
        time: "1 hour ago",
        assignee: "Peter Kiprono",
        messages: [
            { role: "customer", name: "Kevin Omolo", message: "Our branch in Ruaraka is offline. Possibly a fiber cut near the Mall.", time: "09:00 AM" }
        ]
    },
    {
        id: 65,
        subject: "SQL Server Deadlock",
        customer: "Sarah Njeri",
        location: "Upper Hill",
        status: "Solved",
        priority: "Medium",
        time: "3 hours ago",
        assignee: "Faith Wambui",
        messages: [
            { role: "customer", name: "Sarah Njeri", message: "Database is locking up during the payroll run.", time: "07:00 AM" },
            { role: "agent", name: "Faith Wambui", message: "Fixed by optimizing the query index.", time: "08:30 AM" }
        ]
    }
];

export function TicketProvider({ children }: { children: ReactNode }) {
    const [tickets, setTickets] = useState<Ticket[]>([]);

    useEffect(() => {
        try {
            const saved = localStorage.getItem("supportdesk_tickets");
            if (saved) {
                setTickets(JSON.parse(saved));
            } else {
                setTickets(DEFAULT_TICKETS);
            }
        } catch (e) {
            console.error("Failed to parse tickets:", e);
            setTickets(DEFAULT_TICKETS);
        }
    }, []);

    const save = (newTickets: Ticket[]) => {
        setTickets(newTickets);
        localStorage.setItem("supportdesk_tickets", JSON.stringify(newTickets));
    };

    const getTicketById = (id: number) => tickets.find(t => t.id === id);

    const updateTicketStatus = (id: number, status: Ticket["status"]) => {
        const updated = tickets.map(t => t.id === id ? { ...t, status } : t);
        save(updated);
    };

    const updateTicketPriority = (id: number, priority: Ticket["priority"]) => {
        const updated = tickets.map(t => t.id === id ? { ...t, priority } : t);
        save(updated);
    };

    const updateTicketAssignee = (id: number, assignee: string) => {
        const updated = tickets.map(t => t.id === id ? { ...t, assignee } : t);
        save(updated);
    };

    const deleteTicket = (id: number) => {
        const updated = tickets.filter(t => t.id !== id);
        save(updated);
    };

    const addMessage = (ticketId: number, message: Ticket["messages"][0]) => {
        const updated = tickets.map(t => t.id === ticketId ? { ...t, messages: [...t.messages, message] } : t);
        save(updated);
    };

    return (
        <TicketContext.Provider value={{ tickets, getTicketById, updateTicketStatus, updateTicketPriority, updateTicketAssignee, deleteTicket, addMessage }}>
            {children}
        </TicketContext.Provider>
    );
}

export function useTickets() {
    const context = useContext(TicketContext);
    if (context === undefined) throw new Error("useTickets must be used within a TicketProvider");
    return context;
}
