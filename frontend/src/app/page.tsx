"use client";

import { Navbar } from "@/components/layout/Navbar";
import { BarChart3, Ticket, Users, Clock, ArrowUpRight, ArrowDownRight } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useTickets } from "@/context/TicketContext";
import { useMembers } from "@/context/MemberContext";

export default function Home() {
  const { user } = useAuth();
  const { tickets } = useTickets();
  const { members } = useMembers();

  // Derived stats
  const activeTickets = tickets.filter(t => t.status !== "Solved").length;
  const activeMembers = members.filter(m => m.status === "Active").length;
  return (
    <div className="flex-1 flex flex-col min-w-0">
      <Navbar />

      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto">
          <header className="mb-10">
            <h1 className="text-2xl font-bold text-zinc-900 mb-2">Jambo, {user?.name || 'Moses'}!</h1>
            <p className="text-zinc-500 font-medium">Here's what's happening with {user?.company || 'SupportDesk KE'} today.</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[
              { label: "Total Tickets", value: tickets.length.toString(), icon: Ticket, trend: "+12%", up: true, href: "/tickets" },
              { label: "Uptime (24h)", value: "99.98%", icon: BarChart3, trend: "+0.01%", up: true, href: "/reporting" },
              { label: "Avg. Resolution", value: "45m", icon: Clock, trend: "-12m", up: true, href: "/reporting" },
              { label: "Team Online", value: activeMembers.toString(), icon: Users, trend: "Stable", up: true, href: "/support" },
            ].map((stat) => (
              <Link
                key={stat.label}
                href={stat.href}
                className="bg-white p-6 rounded-2xl border border-border-subtle shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-zinc-50 rounded-lg group-hover:bg-primary/10 transition-colors">
                    <stat.icon className="w-5 h-5 text-zinc-600 group-hover:text-primary transition-colors" />
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-bold ${stat.up ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {stat.trend}
                    {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  </div>
                </div>
                <p className="text-sm font-medium text-zinc-500 mb-1">{stat.label}</p>
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-bold text-zinc-900">{stat.value}</p>
                  <ArrowUpRight className="w-4 h-4 text-zinc-300 opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0" />
                </div>
              </Link>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-border-subtle shadow-sm overflow-hidden mb-10">
            <div className="p-6 border-b border-border-subtle flex items-center justify-between">
              <h2 className="font-bold text-zinc-800">System Activity</h2>
              <Link href="/notifications" className="text-sm text-primary font-semibold hover:underline">View all</Link>
            </div>
            <div className="divide-y divide-border-subtle">
              {tickets.slice(0, 4).map((ticket, i) => (
                <Link
                  key={`activity-${ticket.id}-${i}`}
                  href={`/tickets/${ticket.id}`}
                  className="p-6 flex items-center gap-4 hover:bg-zinc-50 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center font-bold text-zinc-400 group-hover:bg-white transition-colors">
                    {ticket.customer[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-zinc-800">
                      <span className="font-bold group-hover:text-primary transition-colors">{ticket.customer}</span> reported: {ticket.subject}
                    </p>
                    <p className="text-xs text-zinc-400 mt-0.5">{ticket.time}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${ticket.status === 'Open' ? 'bg-orange-50 text-orange-600' :
                      ticket.status === 'Solved' ? 'bg-emerald-50 text-emerald-600' :
                        'bg-blue-50 text-blue-600'}`}>
                      {ticket.status}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-zinc-300 opacity-0 group-hover:opacity-100 transition-all" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
