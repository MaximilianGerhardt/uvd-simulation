"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { MessageSquare, Send, AlertTriangle } from "lucide-react";

interface Comment {
  id: string;
  author_name: string;
  comment_text: string;
  locale: string;
  created_at: string;
}

export function CommunityComments() {
  const t = useTranslations("community");
  const locale = useLocale();
  const [comments, setComments] = useState<Comment[]>([]);
  const [total, setTotal] = useState(0);
  const [authorName, setAuthorName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const fetchComments = useCallback(async () => {
    try {
      const res = await fetch("/api/community/comments?limit=20");
      const data = await res.json();
      setComments(data.comments ?? []);
      setTotal(data.total ?? 0);
    } catch {
      // silent
    }
  }, []);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!agreed || submitting) return;
    setError(null);
    setSuccess(false);
    setSubmitting(true);

    try {
      const res = await fetch("/api/community/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          authorName: authorName.trim(),
          commentText: commentText.trim(),
          locale,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
      } else {
        setSuccess(true);
        setAuthorName("");
        setCommentText("");
        setAgreed(false);
        await fetchComments();
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString(locale, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  return (
    <div className="space-y-8">
      {/* Comment form */}
      <div className="rounded-2xl border border-[#D0D0D0]/50 bg-[#f8f8f8] p-6 sm:p-8">
        <h3 className="mb-2 flex items-center gap-2 text-lg font-medium text-[#1b1b1b]">
          <MessageSquare className="h-5 w-5" />
          {t("comments.title")}
        </h3>
        <p className="mb-6 text-sm text-[#1b1b1b]/45">
          {t("comments.subtitle")}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder={t("comments.namePlaceholder")}
              maxLength={50}
              className="w-full rounded-xl border border-[#D0D0D0]/50 bg-white px-4 py-3 text-sm text-[#1b1b1b] placeholder:text-[#1b1b1b]/25 focus:border-[#1b1b1b] focus:outline-none transition-colors"
            />
          </div>
          <div>
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder={t("comments.commentPlaceholder")}
              maxLength={1000}
              rows={4}
              className="w-full rounded-xl border border-[#D0D0D0]/50 bg-white px-4 py-3 text-sm text-[#1b1b1b] placeholder:text-[#1b1b1b]/25 focus:border-[#1b1b1b] focus:outline-none transition-colors resize-none"
            />
            <div className="mt-1 text-right text-xs text-[#1b1b1b]/25">
              {commentText.length}/1000
            </div>
          </div>

          {/* Disclaimer checkbox */}
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-[#D0D0D0] accent-[#1b1b1b]"
            />
            <span className="text-xs leading-relaxed text-[#1b1b1b]/45">
              {t("comments.disclaimer")}
            </span>
          </label>

          {error && (
            <div className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
              <AlertTriangle className="h-4 w-4 flex-shrink-0" />
              {error}
            </div>
          )}

          {success && (
            <div className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
              {t("comments.success")}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting || !agreed || authorName.trim().length < 2 || commentText.trim().length < 10}
            className="inline-flex items-center gap-2 rounded-full bg-[#1b1b1b] px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-80 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Send className="h-4 w-4" />
            {submitting ? t("comments.submitting") : t("comments.submit")}
          </button>
        </form>
      </div>

      {/* Comments list */}
      {comments.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-medium uppercase tracking-[0.05em] text-[#1b1b1b]/30">
            {t("comments.listTitle", { count: total })}
          </h3>
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="rounded-2xl border border-[#D0D0D0]/50 bg-white p-5"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-[#1b1b1b]">
                  {comment.author_name}
                </span>
                <span className="text-xs text-[#1b1b1b]/25">
                  {formatDate(comment.created_at)}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-[#1b1b1b]/60">
                {comment.comment_text}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
