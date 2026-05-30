// ============================================================
// LIVE CALL MONITOR — real-time active call cards
// ============================================================
'use client'
import { Phone, PhoneOff, Clock } from 'lucide-react'
import { useLiveCalls } from '@/hooks/useLiveCalls'
import { formatDuration, intentLabel, intentColor } from '@/lib/utils'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'

export function LiveCallMonitor() {
  const { calls, connected } = useLiveCalls()

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={cn('pulse-dot', connected ? '' : 'amber')} />
          <span className="text-xs font-semibold text-[#7B9CC4] uppercase tracking-wider">
            Live Calls
          </span>
        </div>
        <span className="text-xs font-bold text-[#F0F6FF] bg-[#1A2B52] px-2 py-0.5 rounded-full">
          {calls.length}
        </span>
      </div>

      {/* Calls list */}
      <div className="flex flex-col gap-2 flex-1">
        {calls.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 py-8 text-center">
            <PhoneOff size={24} className="text-[#435A7A] mb-2" />
            <p className="text-xs text-[#435A7A]">No active calls</p>
          </div>
        ) : (
          calls.map((call, i) => (
            <div
              key={call.callSid}
              className="flex items-center gap-3 p-3 rounded-xl bg-[#0F1F3D] border border-[rgba(6,182,212,0.08)] hover:border-[rgba(6,182,212,0.2)] transition-all animate-slide-right"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {/* Phone icon with wave animation */}
              <div className="relative flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center">
                  <Phone size={14} className="text-cyan-400" />
                </div>
                <div className="absolute -top-0.5 -right-0.5">
                  <div className="pulse-dot cyan w-2 h-2" />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-[#F0F6FF] truncate">{call.from}</p>
                {call.intent ? (
                  <Badge className={cn('mt-0.5 text-[10px]', intentColor(call.intent))}>
                    {intentLabel(call.intent)}
                  </Badge>
                ) : (
                  <div className="flex items-center gap-1 mt-0.5">
                    {/* Voice wave animation: AI thinking */}
                    {[1,2,3,4].map(n => (
                      <div
                        key={n}
                        className="wave-bar h-3"
                        style={{ animationDelay: `${n * 0.1}s` }}
                      />
                    ))}
                    <span className="text-[10px] text-[#435A7A] ml-1">processing</span>
                  </div>
                )}
              </div>

              {/* Duration */}
              <div className="flex items-center gap-1 text-[#7B9CC4] flex-shrink-0">
                <Clock size={10} />
                <span className="text-[11px] font-mono">{formatDuration(call.duration)}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
