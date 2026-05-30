// ============================================================
// ERROR BOUNDARY — catches runtime errors in the app
// ============================================================
'use client'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log to error monitoring in production (e.g., Sentry)
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-[#060E1F] flex flex-col items-center justify-center text-center px-6">
      <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-6">
        <span className="text-3xl">⚠️</span>
      </div>
      <h2 className="text-2xl font-bold font-display text-white mb-2">
        Something went wrong
      </h2>
      <p className="text-sm text-slate-400 max-w-sm mb-8 leading-relaxed">
        {error.message || 'An unexpected error occurred. Our team has been notified.'}
      </p>
      <div className="flex items-center gap-3">
        <button
          onClick={reset}
          className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-[#060E1F] font-semibold text-sm transition-all"
        >
          Try Again
        </button>
        <a
          href="/dashboard/overview"
          className="px-5 py-2.5 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:border-white/20 text-sm transition-all"
        >
          Go Home
        </a>
      </div>
    </div>
  )
}
