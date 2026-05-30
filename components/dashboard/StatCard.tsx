// ============================================================
// STAT CARD — KPI metric card with trend indicator
// ============================================================
'use client'
import { ReactNode } from 'react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatCardProps {
  label: string
  value: string | number
  delta?: number
  deltaLabel?: string
  icon: ReactNode
  iconBg?: string
  glow?: string
  suffix?: string
  loading?: boolean
}

export function StatCard({
  label, value, delta, deltaLabel, icon, iconBg = 'bg-cyan-500/10',
  glow = 'stat-glow-cyan', suffix, loading,
}: StatCardProps) {
  const positive = delta !== undefined && delta >= 0
  const neutral  = delta === 0

  return (
    <div className={cn(
      'glass-card p-5 flex flex-col gap-4 animate-slide-up',
      glow
    )}>
      {/* Top row: icon + label */}
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-[#7B9CC4] uppercase tracking-wider">{label}</p>
        <div className={cn(
          'w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0',
          iconBg
        )}>
          {icon}
        </div>
      </div>

      {/* Value */}
      {loading ? (
        <div className="skeleton h-8 w-28" />
      ) : (
        <div className="flex items-end gap-2">
          <span className="text-3xl font-bold font-display text-[#F0F6FF] leading-none tracking-tight">
            {value}
          </span>
          {suffix && (
            <span className="text-sm text-[#7B9CC4] mb-0.5">{suffix}</span>
          )}
        </div>
      )}

      {/* Delta */}
      {delta !== undefined && (
        <div className={cn(
          'flex items-center gap-1.5 text-xs font-medium',
          neutral  ? 'text-[#7B9CC4]' :
          positive ? 'text-emerald-400' :
                     'text-rose-400'
        )}>
          {neutral  ? <Minus size={12} /> :
           positive ? <TrendingUp size={12} /> :
                      <TrendingDown size={12} />}
          <span>
            {positive && !neutral && '+'}
            {delta}{deltaLabel ?? '%'}
          </span>
          <span className="text-[#435A7A] font-normal">vs yesterday</span>
        </div>
      )}
    </div>
  )
}
