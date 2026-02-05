"use client";

import { Check, MoreHorizontal } from "lucide-react";

interface MessageBubbleProps {
    author: string;
    timestamp: string;
    content: string;
    avatarUrl: string;
    isAgent?: boolean;
}

export function MessageBubble({ author, timestamp, content, avatarUrl, isAgent }: MessageBubbleProps) {
    return (
        <div className={`flex flex-col ${isAgent ? "items-end" : "items-start"} mb-8 last:mb-0`}>
            <div className={`flex gap-3 max-w-[85%] ${isAgent ? "flex-row-reverse" : "flex-row"}`}>
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mt-1">
                    <img src={avatarUrl} alt={author} />
                </div>

                <div className="flex flex-col gap-2">
                    <div className={`p-4 rounded-2xl shadow-sm text-sm leading-relaxed border ${isAgent
                            ? "bg-agent-msg-bg border-blue-100/50 text-zinc-800 rounded-tr-none"
                            : "bg-white border-zinc-100 text-zinc-800 rounded-tl-none"
                        }`}>
                        {content}
                    </div>

                    <div className="flex items-center gap-2 px-1">
                        <span className="text-[11px] font-semibold text-zinc-900">{author}</span>
                        <span className="text-[11px] text-zinc-400">{timestamp}</span>
                        {isAgent && <div className="w-3 h-3 rounded-full overflow-hidden bg-zinc-200"><img src="https://i.pravatar.cc/12?u=rakob" /></div>}
                    </div>
                </div>
            </div>
        </div>
    );
}
