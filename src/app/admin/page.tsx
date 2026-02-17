"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  BarChart3,
  MessageSquare,
  Mail,
  Vote,
  LogOut,
  RefreshCw,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Sparkles,
  Users,
  MailCheck,
  MailX,
  MailQuestion,
} from "lucide-react";

type Tab = "overview" | "comments" | "chat" | "newsletter" | "votes";

interface StatsData {
  votes: {
    counts: Record<string, number>;
    total: number;
    raw: { vote_option: string; created_at: string }[];
  };
  comments: {
    stats: { total: number; approved: number; rejected: number; pending: number };
    items: {
      id: string;
      author_name: string;
      comment_text: string;
      status: string;
      moderation_reason: string | null;
      locale: string;
      created_at: string;
    }[];
  };
  chat: {
    total: number;
    items: {
      id: string;
      question: string;
      locale: string;
      session_hash: string;
      created_at: string;
    }[];
  };
  newsletter: {
    stats: { total: number; confirmed: number; unconfirmed: number; unsubscribed: number };
    items: {
      id: string;
      email: string;
      locale: string;
      confirmed: boolean;
      confirmed_at: string | null;
      subscribed_at: string;
      unsubscribed_at: string | null;
      unsubscribe_reason: string | null;
      unsubscribe_feedback: string | null;
    }[];
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    approved: "bg-green-50 text-green-700 border-green-200",
    rejected: "bg-red-50 text-red-700 border-red-200",
    pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
  };
  const icons: Record<string, React.ReactNode> = {
    approved: <CheckCircle2 className="h-3 w-3" />,
    rejected: <XCircle className="h-3 w-3" />,
    pending: <AlertTriangle className="h-3 w-3" />,
  };
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium ${styles[status] || "bg-gray-50 text-gray-600 border-gray-200"}`}
    >
      {icons[status]}
      {status}
    </span>
  );
}

function LocaleBadge({ locale }: { locale: string }) {
  return (
    <span className="inline-block rounded-full bg-[#f0f0f0] px-2 py-0.5 text-[10px] font-semibold text-[#1b1b1b]/60 uppercase">
      {locale}
    </span>
  );
}

function StatCard({
  label,
  value,
  icon,
  color = "#1b1b1b",
}: {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  color?: string;
}) {
  return (
    <div className="rounded-2xl border border-[#D0D0D0] bg-white p-5">
      <div className="mb-3 flex items-center gap-2">
        <div
          className="flex h-8 w-8 items-center justify-center rounded-lg"
          style={{ background: `${color}12` }}
        >
          <div style={{ color }}>{icon}</div>
        </div>
        <span className="text-xs font-medium text-[#1b1b1b]/40">{label}</span>
      </div>
      <p className="text-2xl font-semibold text-[#1b1b1b]">{value}</p>
    </div>
  );
}

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("overview");
  const [data, setData] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const checkAuth = useCallback(async () => {
    const res = await fetch("/api/admin/session");
    if (!res.ok) {
      router.push("/admin/login");
      return false;
    }
    return true;
  }, [router]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/stats");
      if (!res.ok) {
        if (res.status === 401) {
          router.push("/admin/login");
          return;
        }
        throw new Error("Failed to fetch");
      }
      const json = await res.json();
      setData(json);
    } catch {
      setError("Failed to load data.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    checkAuth().then((ok) => {
      if (ok) fetchData();
    });
  }, [checkAuth, fetchData]);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "overview", label: "Overview", icon: <BarChart3 className="h-4 w-4" /> },
    { id: "comments", label: "Comments", icon: <MessageSquare className="h-4 w-4" /> },
    { id: "chat", label: "Chat Questions", icon: <Sparkles className="h-4 w-4" /> },
    { id: "newsletter", label: "Newsletter", icon: <Mail className="h-4 w-4" /> },
    { id: "votes", label: "Votes", icon: <Vote className="h-4 w-4" /> },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-[#D0D0D0] bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div>
              <span className="text-base font-bold text-[#FF6B00]">UVD</span>
              <span className="text-base font-semibold text-[#1b1b1b]">.ADMIN</span>
            </div>
            <span className="hidden text-[10px] text-[#1b1b1b]/25 sm:block">Dashboard</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchData}
              disabled={loading}
              className="flex items-center gap-1.5 rounded-full border border-[#D0D0D0] px-3 py-1.5 text-xs text-[#1b1b1b]/60 transition-colors hover:border-[#999] hover:text-[#1b1b1b] disabled:opacity-40"
            >
              <RefreshCw className={`h-3 w-3 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-full bg-[#1b1b1b] px-3 py-1.5 text-xs text-white transition-colors hover:bg-[#333]"
            >
              <LogOut className="h-3 w-3" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        {/* Tabs */}
        <nav className="mb-6 flex gap-1 overflow-x-auto rounded-2xl border border-[#D0D0D0] bg-white p-1.5">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2 text-xs font-medium transition-colors ${
                tab === t.id
                  ? "bg-[#1b1b1b] text-white"
                  : "text-[#1b1b1b]/50 hover:bg-[#f0f0f0] hover:text-[#1b1b1b]"
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </nav>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && !data && (
          <div className="flex items-center justify-center py-20">
            <RefreshCw className="h-6 w-6 animate-spin text-[#1b1b1b]/20" />
          </div>
        )}

        {/* Content */}
        {data && (
          <>
            {tab === "overview" && <OverviewTab data={data} />}
            {tab === "comments" && <CommentsTab data={data} />}
            {tab === "chat" && <ChatTab data={data} />}
            {tab === "newsletter" && <NewsletterTab data={data} />}
            {tab === "votes" && <VotesTab data={data} />}
          </>
        )}
      </div>
    </div>
  );
}

/* ──────────────── OVERVIEW TAB ──────────────── */
function OverviewTab({ data }: { data: StatsData }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard
          label="Total Votes"
          value={data.votes.total}
          icon={<Vote className="h-4 w-4" />}
          color="#297FF3"
        />
        <StatCard
          label="Comments"
          value={data.comments.stats.total}
          icon={<MessageSquare className="h-4 w-4" />}
          color="#4ade80"
        />
        <StatCard
          label="Chat Questions"
          value={data.chat.total}
          icon={<Sparkles className="h-4 w-4" />}
          color="#FF6B00"
        />
        <StatCard
          label="Subscribers"
          value={data.newsletter.stats.total}
          icon={<Users className="h-4 w-4" />}
          color="#35C2FF"
        />
      </div>

      {/* Newsletter Breakdown */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          label="Confirmed"
          value={data.newsletter.stats.confirmed}
          icon={<MailCheck className="h-4 w-4" />}
          color="#4ade80"
        />
        <StatCard
          label="Unconfirmed"
          value={data.newsletter.stats.unconfirmed}
          icon={<MailQuestion className="h-4 w-4" />}
          color="#FF6B00"
        />
        <StatCard
          label="Unsubscribed"
          value={data.newsletter.stats.unsubscribed}
          icon={<MailX className="h-4 w-4" />}
          color="#ef4444"
        />
      </div>

      {/* Vote Distribution */}
      <div className="rounded-2xl border border-[#D0D0D0] bg-white p-6">
        <h3 className="mb-4 text-sm font-medium text-[#1b1b1b]">Vote Distribution</h3>
        <div className="space-y-3">
          {Object.entries(data.votes.counts).map(([option, count]) => {
            const pct = data.votes.total > 0 ? (count / data.votes.total) * 100 : 0;
            const colors: Record<string, string> = {
              innovative: "#4ade80",
              interesting: "#297FF3",
              skeptical: "#FF6B00",
              no_opinion: "#D0D0D0",
            };
            return (
              <div key={option}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="font-medium text-[#1b1b1b]/70">{option.replace("_", " ")}</span>
                  <span className="text-[#1b1b1b]/40">
                    {count} ({pct.toFixed(1)}%)
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[#f0f0f0]">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${pct}%`, background: colors[option] || "#999" }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Comment Breakdown */}
      <div className="rounded-2xl border border-[#D0D0D0] bg-white p-6">
        <h3 className="mb-4 text-sm font-medium text-[#1b1b1b]">Comment Status</h3>
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span className="text-sm text-[#1b1b1b]/60">
              Approved: <strong className="text-[#1b1b1b]">{data.comments.stats.approved}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <XCircle className="h-4 w-4 text-red-500" />
            <span className="text-sm text-[#1b1b1b]/60">
              Rejected: <strong className="text-[#1b1b1b]">{data.comments.stats.rejected}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
            <span className="text-sm text-[#1b1b1b]/60">
              Pending: <strong className="text-[#1b1b1b]">{data.comments.stats.pending}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-2xl border border-[#D0D0D0] bg-white p-6">
        <h3 className="mb-4 text-sm font-medium text-[#1b1b1b]">Recent Chat Questions</h3>
        <div className="space-y-2">
          {data.chat.items.slice(0, 5).map((q) => (
            <div
              key={q.id}
              className="flex items-start gap-3 rounded-xl bg-[#f8f8f8] px-4 py-3"
            >
              <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#FF6B00]" />
              <div className="min-w-0 flex-1">
                <p className="text-sm text-[#1b1b1b]/80 break-words">{q.question}</p>
                <div className="mt-1 flex items-center gap-2">
                  <LocaleBadge locale={q.locale} />
                  <span className="text-[10px] text-[#1b1b1b]/30">
                    {formatDate(q.created_at)}
                  </span>
                </div>
              </div>
            </div>
          ))}
          {data.chat.items.length === 0 && (
            <p className="text-sm text-[#1b1b1b]/30">No chat questions yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ──────────────── COMMENTS TAB ──────────────── */
function CommentsTab({ data }: { data: StatsData }) {
  const [filter, setFilter] = useState<string>("all");
  const filtered =
    filter === "all"
      ? data.comments.items
      : data.comments.items.filter((c) => c.status === filter);

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        {["all", "approved", "pending", "rejected"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              filter === f
                ? "bg-[#1b1b1b] text-white"
                : "bg-white border border-[#D0D0D0] text-[#1b1b1b]/50 hover:text-[#1b1b1b]"
            }`}
          >
            {f === "all" ? `All (${data.comments.stats.total})` : `${f} (${data.comments.stats[f as keyof typeof data.comments.stats]})`}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((c) => (
          <div
            key={c.id}
            className="rounded-2xl border border-[#D0D0D0] bg-white p-5"
          >
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-[#1b1b1b]">{c.author_name}</span>
                <LocaleBadge locale={c.locale} />
                <StatusBadge status={c.status} />
              </div>
              <div className="flex items-center gap-1 text-[10px] text-[#1b1b1b]/30">
                <Clock className="h-3 w-3" />
                {formatDate(c.created_at)}
              </div>
            </div>
            <p className="text-sm leading-relaxed text-[#1b1b1b]/70">{c.comment_text}</p>
            {c.moderation_reason && (
              <div className="mt-2 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">
                {c.moderation_reason}
              </div>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="py-10 text-center text-sm text-[#1b1b1b]/30">No comments found.</p>
        )}
      </div>
    </div>
  );
}

/* ──────────────── CHAT TAB ──────────────── */
function ChatTab({ data }: { data: StatsData }) {
  return (
    <div>
      <div className="mb-4 rounded-2xl border border-[#D0D0D0] bg-white p-5">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[#FF6B00]" />
          <span className="text-sm font-medium text-[#1b1b1b]">
            {data.chat.total} questions total
          </span>
        </div>
      </div>

      <div className="space-y-2">
        {data.chat.items.map((q) => (
          <div
            key={q.id}
            className="rounded-2xl border border-[#D0D0D0] bg-white p-5"
          >
            <p className="mb-2 text-sm text-[#1b1b1b]/80 break-words">{q.question}</p>
            <div className="flex items-center gap-3">
              <LocaleBadge locale={q.locale} />
              <span className="text-[10px] text-[#1b1b1b]/30">
                Session: {q.session_hash}
              </span>
              <span className="flex items-center gap-1 text-[10px] text-[#1b1b1b]/30">
                <Clock className="h-3 w-3" />
                {formatDate(q.created_at)}
              </span>
            </div>
          </div>
        ))}
        {data.chat.items.length === 0 && (
          <p className="py-10 text-center text-sm text-[#1b1b1b]/30">No chat questions yet.</p>
        )}
      </div>
    </div>
  );
}

/* ──────────────── NEWSLETTER TAB ──────────────── */
function NewsletterTab({ data }: { data: StatsData }) {
  const [filter, setFilter] = useState<string>("all");

  const filtered = data.newsletter.items.filter((s) => {
    if (filter === "all") return true;
    if (filter === "confirmed") return s.confirmed;
    if (filter === "unconfirmed") return !s.confirmed && !s.unsubscribed_at;
    if (filter === "unsubscribed") return !!s.unsubscribed_at;
    return true;
  });

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        {["all", "confirmed", "unconfirmed", "unsubscribed"].map((f) => {
          const counts: Record<string, number> = {
            all: data.newsletter.stats.total,
            confirmed: data.newsletter.stats.confirmed,
            unconfirmed: data.newsletter.stats.unconfirmed,
            unsubscribed: data.newsletter.stats.unsubscribed,
          };
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                filter === f
                  ? "bg-[#1b1b1b] text-white"
                  : "bg-white border border-[#D0D0D0] text-[#1b1b1b]/50 hover:text-[#1b1b1b]"
              }`}
            >
              {f} ({counts[f]})
            </button>
          );
        })}
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#D0D0D0] bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#D0D0D0] bg-[#f8f8f8]">
                <th className="px-5 py-3 text-xs font-medium text-[#1b1b1b]/40">Email</th>
                <th className="px-5 py-3 text-xs font-medium text-[#1b1b1b]/40">Locale</th>
                <th className="px-5 py-3 text-xs font-medium text-[#1b1b1b]/40">Status</th>
                <th className="px-5 py-3 text-xs font-medium text-[#1b1b1b]/40">Subscribed</th>
                <th className="px-5 py-3 text-xs font-medium text-[#1b1b1b]/40">Confirmed</th>
                <th className="px-5 py-3 text-xs font-medium text-[#1b1b1b]/40">Feedback</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} className="border-b border-[#f0f0f0] last:border-0">
                  <td className="px-5 py-3 font-mono text-xs text-[#1b1b1b]">{s.email}</td>
                  <td className="px-5 py-3">
                    <LocaleBadge locale={s.locale} />
                  </td>
                  <td className="px-5 py-3">
                    {s.unsubscribed_at ? (
                      <StatusBadge status="rejected" />
                    ) : s.confirmed ? (
                      <StatusBadge status="approved" />
                    ) : (
                      <StatusBadge status="pending" />
                    )}
                  </td>
                  <td className="px-5 py-3 text-xs text-[#1b1b1b]/40">
                    {s.subscribed_at ? formatDate(s.subscribed_at) : "—"}
                  </td>
                  <td className="px-5 py-3 text-xs text-[#1b1b1b]/40">
                    {s.confirmed_at ? formatDate(s.confirmed_at) : "—"}
                  </td>
                  <td className="max-w-[200px] px-5 py-3 text-xs text-[#1b1b1b]/40">
                    {s.unsubscribe_reason && (
                      <span className="block text-red-500">{s.unsubscribe_reason}</span>
                    )}
                    {s.unsubscribe_feedback && (
                      <span className="block italic">{s.unsubscribe_feedback}</span>
                    )}
                    {!s.unsubscribe_reason && !s.unsubscribe_feedback && "—"}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-sm text-[#1b1b1b]/30">
                    No subscribers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ──────────────── VOTES TAB ──────────────── */
function VotesTab({ data }: { data: StatsData }) {
  const voteLabels: Record<string, string> = {
    innovative: "Innovative",
    interesting: "Interesting",
    skeptical: "Skeptical",
    no_opinion: "No Opinion",
  };
  const voteColors: Record<string, string> = {
    innovative: "#4ade80",
    interesting: "#297FF3",
    skeptical: "#FF6B00",
    no_opinion: "#D0D0D0",
  };

  return (
    <div>
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {Object.entries(data.votes.counts).map(([option, count]) => (
          <StatCard
            key={option}
            label={voteLabels[option] || option}
            value={count}
            icon={<Vote className="h-4 w-4" />}
            color={voteColors[option] || "#999"}
          />
        ))}
      </div>

      <div className="rounded-2xl border border-[#D0D0D0] bg-white p-6">
        <h3 className="mb-4 text-sm font-medium text-[#1b1b1b]">
          Distribution ({data.votes.total} total)
        </h3>
        <div className="space-y-4">
          {Object.entries(data.votes.counts).map(([option, count]) => {
            const pct = data.votes.total > 0 ? (count / data.votes.total) * 100 : 0;
            return (
              <div key={option}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="font-medium text-[#1b1b1b]">{voteLabels[option]}</span>
                  <span className="text-[#1b1b1b]/40">
                    {count} votes · {pct.toFixed(1)}%
                  </span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-[#f0f0f0]">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${pct}%`,
                      background: voteColors[option] || "#999",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Votes Timeline */}
      <div className="mt-6 rounded-2xl border border-[#D0D0D0] bg-white p-6">
        <h3 className="mb-4 text-sm font-medium text-[#1b1b1b]">Recent Votes</h3>
        <div className="space-y-2">
          {data.votes.raw.slice(0, 20).map((v, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-lg bg-[#f8f8f8] px-4 py-2"
            >
              <div className="flex items-center gap-2">
                <div
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: voteColors[v.vote_option] || "#999" }}
                />
                <span className="text-xs font-medium text-[#1b1b1b]/70">
                  {voteLabels[v.vote_option] || v.vote_option}
                </span>
              </div>
              <span className="text-[10px] text-[#1b1b1b]/30">
                {v.created_at ? formatDate(v.created_at) : "—"}
              </span>
            </div>
          ))}
          {data.votes.raw.length === 0 && (
            <p className="text-sm text-[#1b1b1b]/30">No votes yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
