"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Users, UserPlus, Mail, Shield, MoreVertical, Search, Filter, X, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useMembers } from "@/context/MemberContext";

export default function SupportPage() {
    const { members, addMember, updateMember, deleteMember } = useMembers();
    const [searchQuery, setSearchQuery] = useState("");
    const [activeStatus, setActiveStatus] = useState("All");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMember, setEditingMember] = useState<any>(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [newMember, setNewMember] = useState({ name: "", email: "", role: "Agent" });

    const filteredMembers = members.filter(m => {
        const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.role.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = activeStatus === "All" || m.status === activeStatus;
        return matchesSearch && matchesStatus;
    });

    const statuses = ["All", "Active", "Away", "Offline"];

    const handleAddMember = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingMember) {
            updateMember(editingMember.id, newMember);
        } else {
            addMember(newMember);
        }
        setShowSuccess(true);
        setTimeout(() => {
            setIsModalOpen(false);
            setShowSuccess(false);
            setEditingMember(null);
            setNewMember({ name: "", email: "", role: "Agent" });
        }, 1500);
    };

    const handleEditMember = (member: any) => {
        setEditingMember(member);
        setNewMember({ name: member.name, email: member.email, role: member.role });
        setIsModalOpen(true);
    };

    const handleDeleteMember = (id: number) => {
        if (confirm("Are you sure you want to remove this team member?")) {
            deleteMember(id);
        }
    };

    const openAddModal = () => {
        setEditingMember(null);
        setNewMember({ name: "", email: "", role: "Agent" });
        setIsModalOpen(true);
    };

    return (
        <div className="flex-1 flex flex-col min-w-0 relative">
            <Navbar />
            <main className="flex-1 overflow-y-auto p-8 bg-zinc-50/30">
                <div className="max-w-6xl mx-auto">
                    <header className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-2xl font-bold text-zinc-900 mb-1">Support Team</h1>
                            <p className="text-zinc-500 font-medium text-sm">Manage your team members and their access levels.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search members..."
                                    className="pl-10 pr-4 py-2 bg-white border border-border-subtle rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 w-64 shadow-sm transition-all"
                                />
                            </div>
                            <button
                                onClick={openAddModal}
                                className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 active:scale-95 transition-all flex items-center gap-2 text-sm shadow-md shadow-primary/20"
                            >
                                <UserPlus className="w-4 h-4" /> Add Member
                            </button>
                        </div>
                    </header>

                    <div className="flex items-center gap-6 mb-6 border-b border-border-subtle">
                        {statuses.map(status => (
                            <button
                                key={status}
                                onClick={() => setActiveStatus(status)}
                                className={`pb-3 text-sm font-bold transition-all relative ${activeStatus === status ? "text-primary" : "text-zinc-400 hover:text-zinc-600"
                                    }`}
                            >
                                {status}
                                {activeStatus === status && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="bg-white border border-border-subtle rounded-2xl shadow-sm overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-zinc-50/50 border-b border-border-subtle">
                                <tr>
                                    <th className="px-6 py-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Member</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Role</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Email</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Status</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border-subtle">
                                {filteredMembers.length > 0 ? (
                                    filteredMembers.map((member) => (
                                        <tr key={member.email} className="hover:bg-zinc-50/80 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="relative">
                                                        <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center font-bold text-zinc-400 border-2 border-white shadow-sm group-hover:bg-white transition-colors">
                                                            {member.name[0]}
                                                        </div>
                                                        <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${member.status === 'Active' ? 'bg-emerald-500' :
                                                            member.status === 'Away' ? 'bg-orange-500' : 'bg-zinc-400'
                                                            }`} />
                                                    </div>
                                                    <span className="text-sm font-bold text-zinc-900 group-hover:text-primary transition-colors">{member.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-sm font-medium text-zinc-600">
                                                    <Shield className="w-4 h-4 text-zinc-400" />
                                                    {member.role}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-sm text-zinc-500 font-medium whitespace-nowrap">
                                                    <Mail className="w-4 h-4 text-zinc-300" />
                                                    {member.email}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${member.status === 'Active' ? 'bg-emerald-50 text-emerald-600' :
                                                    member.status === 'Away' ? 'bg-orange-50 text-orange-600' : 'bg-zinc-100 text-zinc-500'
                                                    }`}>
                                                    {member.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => handleEditMember(member)}
                                                        className="p-2 hover:bg-zinc-100 rounded-lg text-zinc-400 hover:text-primary transition-colors font-bold text-xs"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteMember(member.id)}
                                                        className="p-2 hover:bg-rose-50 rounded-lg text-rose-400 hover:text-rose-600 transition-colors font-bold text-xs"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-20 text-center">
                                            <div className="flex flex-col items-center gap-2">
                                                <div className="w-12 h-12 bg-zinc-50 rounded-full flex items-center justify-center mb-2">
                                                    <Users className="w-6 h-6 text-zinc-300" />
                                                </div>
                                                <p className="text-sm font-bold text-zinc-900">No members found</p>
                                                <p className="text-xs text-zinc-400">Try adjusting your search or filters.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {/* Add Member Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                        {showSuccess ? (
                            <div className="p-12 text-center flex flex-col items-center justify-center gap-4">
                                <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center animate-bounce">
                                    <CheckCircle2 className="w-12 h-12" />
                                </div>
                                <h3 className="text-2xl font-bold text-zinc-900">{editingMember ? 'Member Updated!' : 'Invitation Sent!'}</h3>
                                <p className="text-zinc-500">{editingMember ? 'Team member details have been saved.' : 'The team member has been invited to join.'}</p>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center justify-between p-6 border-b border-zinc-100">
                                    <h3 className="text-xl font-bold text-zinc-900">{editingMember ? 'Edit Team Member' : 'Add Team Member'}</h3>
                                    <button onClick={() => { setIsModalOpen(false); setEditingMember(null); }} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
                                        <X className="w-5 h-5 text-zinc-400" />
                                    </button>
                                </div>
                                <form onSubmit={handleAddMember} className="p-6 space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Full Name</label>
                                        <input
                                            required
                                            type="text"
                                            value={newMember.name}
                                            onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                                            placeholder="Enter full name"
                                            className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all font-medium"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Email Address</label>
                                        <input
                                            required
                                            type="email"
                                            value={newMember.email}
                                            onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                                            placeholder="Enter email address"
                                            className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all font-medium"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Access Role</label>
                                        <select
                                            value={newMember.role}
                                            onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                                            className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all font-medium outline-none appearance-none cursor-pointer"
                                        >
                                            <option>Agent</option>
                                            <option>Lead Support</option>
                                            <option>Administrator</option>
                                            <option>Viewer</option>
                                        </select>
                                    </div>
                                    <div className="pt-4 flex gap-3">
                                        <button
                                            type="button"
                                            onClick={() => { setIsModalOpen(false); setEditingMember(null); }}
                                            className="flex-1 px-4 py-3 border border-zinc-200 rounded-xl font-bold text-zinc-600 hover:bg-zinc-50 transition-all"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex-1 px-4 py-3 bg-primary text-white rounded-xl font-bold hover:bg-blue-600 active:scale-95 transition-all shadow-lg shadow-primary/20"
                                        >
                                            {editingMember ? 'Save Changes' : 'Invite Member'}
                                        </button>
                                    </div>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
