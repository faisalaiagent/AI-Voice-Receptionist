// ============================================================
// GLOBAL LOADING UI — shown during route transitions
// ============================================================
export default function Loading() {
  return (
    <div className="min-h-screen bg-[#060E1F] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* Animated logo */}
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_32px_rgba(6,182,212,0.5)] animate-pulse">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        {/* Voice wave */}
        <div className="flex items-end gap-1">
          {[1, 2, 3, 4, 5].map(n => (
            <div
              key={n}
              className="w-1 bg-cyan-500 rounded-full"
              style={{
                height: `${8 + n * 4}px`,
                animation: 'wave 1.2s ease-in-out infinite',
                animationDelay: `${n * 0.1}s`,
              }}
            />
          ))}
        </div>
        <p className="text-xs text-slate-500 tracking-widest uppercase">Loading</p>
      </div>
    </div>
  )
}
