"use client";
import AuthGuard from "@/components/AuthGuard";
import { useAuth } from "@/context/AuthContext";
import { photographers } from "@/lib/data";
import Image from "next/image";
import { useState } from "react";

export default function MessagesPage() {
  const { user } = useAuth();
  const [selectedCreator, setSelectedCreator] = useState<string | null>(null);
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState<{ creatorId: string; text: string; from: "user" | "creator"; time: number }[]>([]);

  const selected = photographers.find((p) => p.id === selectedCreator);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !selectedCreator) return;
    setMessages((prev) => [...prev, { creatorId: selectedCreator, text: messageText, from: "user", time: Date.now() }]);
    setMessageText("");
  };

  const creatorMessages = messages.filter((m) => m.creatorId === selectedCreator);

  if (user?.role === "creator") {
    return (
      <AuthGuard>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
          <p className="text-4xl mb-3">💬</p>
          <h2 className="text-2xl font-bold mb-2">Creator Messages</h2>
          <p className="text-[var(--text-muted)]">Messages from your subscribers will appear here.</p>
        </div>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-2">Messages</h1>
        <p className="text-[var(--text-muted)] mb-8">Chat with your favorite creators</p>

        <div className="grid md:grid-cols-[280px_1fr] gap-4 min-h-[500px]">
          {/* Creator list */}
          <div className="rounded-xl bg-[var(--bg-card)] border border-[var(--border)] overflow-hidden">
            <div className="p-3 border-b border-[var(--border)] text-sm font-medium text-[var(--text-muted)]">Creators</div>
            <div className="divide-y divide-[var(--border)]">
              {photographers.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedCreator(p.id)}
                  className={`w-full flex items-center gap-3 p-3 text-left hover:bg-[var(--bg-card-hover)] transition ${selectedCreator === p.id ? "bg-[var(--bg-card-hover)]" : ""}`}
                >
                  <Image src={p.avatar} alt={p.name} width={36} height={36} className="rounded-full shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{p.name}</p>
                    <p className="text-xs text-[var(--text-muted)]">@{p.username}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat area */}
          <div className="rounded-xl bg-[var(--bg-card)] border border-[var(--border)] flex flex-col">
            {selected ? (
              <>
                <div className="p-4 border-b border-[var(--border)] flex items-center gap-3">
                  <Image src={selected.avatar} alt={selected.name} width={32} height={32} className="rounded-full" />
                  <div>
                    <p className="text-sm font-medium">{selected.name}</p>
                    <p className="text-xs text-[var(--text-muted)]">@{selected.username}</p>
                  </div>
                </div>
                <div className="flex-1 p-4 space-y-3 overflow-y-auto min-h-[300px]">
                  {creatorMessages.length === 0 && (
                    <p className="text-sm text-[var(--text-muted)] text-center py-10">No messages yet. Say hi!</p>
                  )}
                  {creatorMessages.map((m, i) => (
                    <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm ${m.from === "user" ? "bg-[var(--accent)] text-white rounded-br-sm" : "bg-[var(--border)] rounded-bl-sm"}`}>
                        {m.text}
                      </div>
                    </div>
                  ))}
                </div>
                <form onSubmit={sendMessage} className="p-3 border-t border-[var(--border)] flex gap-2">
                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 bg-[var(--bg)]/50 border border-[var(--border)] rounded-full px-4 py-2 text-sm focus:border-[var(--accent)] outline-none transition"
                  />
                  <button type="submit" className="px-4 py-2 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-sm font-medium transition">
                    Send
                  </button>
                </form>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-[var(--text-muted)] text-sm">
                Select a creator to start chatting
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
