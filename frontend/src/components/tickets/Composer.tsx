"use client";

import { Bold, Italic, Link, Paperclip, List, ListOrdered, ChevronDown, Send, Smile } from "lucide-react";
import { useState } from "react";

interface ComposerProps {
    onSend?: (content: string) => void;
}

export function Composer({ onSend }: ComposerProps) {
    const [message, setMessage] = useState("");

    const handleSend = () => {
        if (message.trim() && onSend) {
            onSend(message);
            setMessage("");
        }
    };

    return (
        <div className="bg-white border border-border-subtle rounded-xl shadow-sm overflow-hidden flex flex-col mx-6 mb-6">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-border-subtle">
                <button className="p-1.5 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-50 rounded transition-colors">
                    <Bold className="w-4 h-4" />
                </button>
                <button className="p-1.5 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-50 rounded transition-colors">
                    <Italic className="w-4 h-4" />
                </button>
                <button className="p-1.5 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-50 rounded transition-colors">
                    <Paperclip className="w-4 h-4" />
                </button>
                <button className="p-1.5 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-50 rounded transition-colors">
                    <Link className="w-4 h-4" />
                </button>
                <div className="w-px h-4 bg-zinc-200 mx-1" />
                <button className="p-1.5 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-50 rounded transition-colors">
                    <List className="w-4 h-4" />
                </button>
                <button className="p-1.5 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-50 rounded transition-colors">
                    <ListOrdered className="w-4 h-4" />
                </button>
            </div>

            <div className="relative">
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your response here..."
                    className="w-full h-32 p-4 text-sm focus:outline-none placeholder:text-zinc-400 resize-none"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                            handleSend();
                        }
                    }}
                />

                <div className="absolute bottom-4 left-4 flex items-center gap-4 text-zinc-400">
                    <Paperclip className="w-4 h-4 cursor-pointer hover:text-zinc-600" />
                    <Smile className="w-4 h-4 cursor-pointer hover:text-zinc-600" />
                    <Link className="w-4 h-4 cursor-pointer hover:text-zinc-600" />
                </div>

                <div className="absolute bottom-4 right-4 flex items-center gap-2">
                    <div className="flex items-center">
                        <button
                            onClick={handleSend}
                            className="bg-primary text-white text-xs font-semibold py-2 px-4 rounded-l-lg hover:bg-blue-600 active:bg-blue-700 transition-all flex items-center gap-2"
                        >
                            Send Reply
                        </button>
                        <button className="bg-primary/95 text-white py-2 px-2 border-l border-white/20 rounded-r-lg hover:bg-blue-600 transition-colors">
                            <ChevronDown className="w-4 h-4" />
                        </button>
                    </div>

                    <button
                        onClick={handleSend}
                        className="ml-2 w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center hover:bg-primary hover:text-white shadow-sm transition-all group"
                    >
                        <Send className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
}
