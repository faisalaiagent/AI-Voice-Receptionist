// ============================================================
// 404 NOT FOUND — custom error page
// ============================================================
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#060E1F] flex flex-col items-center justify-center text-center px-6">
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-cyan-500/20 flex items-center justify-center mb-6">
        <span className="text-4xl">📡</span>
      </div>
      <h1 className="text-6xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-3">
        404
      </h1>
      <p className="text-xl font-semibold text-white mb-2">Page not found</p>
      <p className="text-sm text-slate-400 max-w-xs mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/dashboard/overview"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-[#060E1F] font-semibold text-sm transition-all shadow-[0_4px_16px_rgba(6,182,212,0.4)]"
      >
        Go to Dashboard
      </Link>
    </div>
  )
}
