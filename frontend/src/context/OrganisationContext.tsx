"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Organisation {
    id: number;
    name: string;
    industry: string;
    location: string;
    website?: string;
    email?: string;
    phone?: string;
    users: string | number;
    tickets: number;
    sla: string;
    uptime: string;
    logo: string;
    color: string;
    plan: string;
    billing: string;
    joined: string;
}

interface OrganisationContextType {
    organisations: Organisation[];
    addOrganisation: (org: Omit<Organisation, "id" | "users" | "tickets" | "sla" | "uptime" | "logo" | "color" | "plan" | "billing" | "joined">) => void;
    getOrganisationById: (id: number) => Organisation | undefined;
}

const OrganisationContext = createContext<OrganisationContextType | undefined>(undefined);

const DEFAULT_ORGS: Organisation[] = [
    {
        id: 1,
        name: "Nexus Telcom",
        industry: "Telecommunications",
        location: "Orbit Plaza, Nairobi",
        website: "www.nexus.ke",
        email: "support@nexus.ke",
        phone: "+254 711 000 000",
        users: "12,400+",
        tickets: 450,
        sla: "99.8%",
        uptime: "99.99%",
        logo: "N",
        color: "bg-emerald-500",
        plan: "Enterprise Platinum",
        billing: "KSh 450,000 / month",
        joined: "March 2022"
    },
    {
        id: 2,
        name: "Savannah Capital",
        industry: "Finance",
        location: "Mvule Towers, Nairobi",
        website: "www.savannah.ke",
        email: "contact@savannah.ke",
        phone: "+254 711 012 000",
        users: "8,200",
        tickets: 320,
        sla: "98.5%",
        uptime: "99.95%",
        logo: "S",
        color: "bg-lime-600",
        plan: "Corporate Gold",
        billing: "KSh 320,000 / month",
        joined: "January 2021"
    },
    {
        id: 3,
        name: "Rift Holdings",
        industry: "Logistics",
        location: "Lakeside Center, Nakuru",
        website: "www.riftholdings.ke",
        email: "info@riftholdings.ke",
        phone: "+254 711 025 000",
        users: "7,500",
        tickets: 280,
        sla: "99.2%",
        uptime: "99.98%",
        logo: "R",
        color: "bg-rose-800",
        plan: "Corporate Gold",
        billing: "KSh 310,000 / month",
        joined: "June 2021"
    },
    {
        id: 4,
        name: "Zindua Market",
        industry: "E-commerce",
        location: "Bazaar Height, Nairobi",
        website: "www.zindua.ke",
        email: "biz@zindua.ke",
        phone: "+254 700 000 000",
        users: "1,200",
        tickets: 145,
        sla: "96.4%",
        uptime: "99.50%",
        logo: "Z",
        color: "bg-orange-500",
        plan: "Business Pro",
        billing: "KSh 85,000 / month",
        joined: "August 2022"
    },
    {
        id: 5,
        name: "M-Tek City",
        industry: "Government / Tech",
        location: "Machakos, KE",
        website: "www.mtek.ke",
        email: "info@mtek.ke",
        phone: "+254 20 4343013",
        users: "450",
        tickets: 34,
        sla: "100%",
        uptime: "100%",
        logo: "M",
        color: "bg-blue-600",
        plan: "Public Sector Elite",
        billing: "KSh 150,000 / month",
        joined: "February 2023"
    }
];

export function OrganisationProvider({ children }: { children: ReactNode }) {
    const [organisations, setOrganisations] = useState<Organisation[]>([]);

    useEffect(() => {
        try {
            const saved = localStorage.getItem("supportdesk_orgs");
            if (saved) {
                setOrganisations(JSON.parse(saved));
            } else {
                setOrganisations(DEFAULT_ORGS);
            }
        } catch (e) {
            console.error("Failed to parse organisations:", e);
            setOrganisations(DEFAULT_ORGS);
        }
    }, []);

    const addOrganisation = (orgData: Omit<Organisation, "id" | "users" | "tickets" | "sla" | "uptime" | "logo" | "color" | "plan" | "billing" | "joined">) => {
        const newOrg: Organisation = {
            id: organisations.length + 1,
            ...orgData,
            users: "0",
            tickets: 0,
            sla: "100%",
            uptime: "100%",
            logo: orgData.name[0].toUpperCase(),
            color: "bg-primary",
            plan: "Standard Trial",
            billing: "KSh 0 / month",
            joined: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        };
        const updated = [newOrg, ...organisations];
        setOrganisations(updated);
        localStorage.setItem("supportdesk_orgs", JSON.stringify(updated));
    };

    const getOrganisationById = (id: number) => {
        return organisations.find(o => o.id === id);
    };

    return (
        <OrganisationContext.Provider value={{ organisations, addOrganisation, getOrganisationById }}>
            {children}
        </OrganisationContext.Provider>
    );
}

export function useOrganisations() {
    const context = useContext(OrganisationContext);
    if (context === undefined) {
        throw new Error("useOrganisations must be used within an OrganisationProvider");
    }
    return context;
}
