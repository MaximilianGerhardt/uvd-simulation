export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#D0D0D0] border-t-[#FF6B00]" />
        <p className="text-sm text-[#1b1b1b]/30">Loading…</p>
      </div>
    </div>
  );
}
