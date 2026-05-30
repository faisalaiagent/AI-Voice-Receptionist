// ============================================================
// UTILITY FUNCTIONS — shared helpers used across the entire app
// ============================================================
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Merge Tailwind class names safely */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Format seconds → "2m 34s" */
export function formatDuration(seconds: number): string {
  if (!seconds || seconds === 0) return '—'
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  if (m === 0) return `${s}s`
  return `${m}m ${s}s`
}

/** Alias for formatRelativeTime (used by pages as timeAgo) */
export function timeAgo(dateStr: string): string {
  if (!dateStr) return '—'
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffSecs = Math.floor(diffMs / 1000)
  const diffMins = Math.floor(diffSecs / 60)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffSecs < 60) return 'just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return formatDate(dateStr)
}

/** Same as timeAgo — exported for compatibility */
export const formatRelativeTime = timeAgo

/** Format ISO → "Jan 15, 2025" */
export function formatDate(dateStr: string): string {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  })
}

/** Format ISO → "Jan 15, 2025 · 10:30 AM" */
export function formatDateTime(dateStr: string): string {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: 'numeric', minute: '2-digit', hour12: true,
  })
}

/** Format ISO → "10:30 AM" */
export function formatTime(dateStr: string): string {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleTimeString('en-US', {
    hour: 'numeric', minute: '2-digit', hour12: true,
  })
}

/** Format number with commas: 1000 → "1,000" */
export function formatNumber(n: number): string {
  return n.toLocaleString('en-US')
}

/** Format percentage: 87.4 → "87.4%" */
export function formatPercent(n: number, decimals = 1): string {
  return `${n.toFixed(decimals)}%`
}

/** Format delta with arrow: +12 → "↑ 12" / -5 → "↓ 5" */
export function formatDelta(n: number, suffix = ''): { text: string; positive: boolean } {
  const positive = n >= 0
  return {
    text: `${positive ? '↑' : '↓'} ${Math.abs(n)}${suffix}`,
    positive,
  }
}

/** Clamp a number between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/** Calculate % of used/total */
export function usagePercent(used: number, total: number): number {
  if (total === 0) return 0
  return clamp((used / total) * 100, 0, 100)
}

/** Mask phone for privacy: "+1 (555) 234-5678" → "+1 (555) 234-****" */
export function maskPhone(phone: string): string {
  return phone.replace(/(\d{4})$/, '****')
}

/** Capitalize first letter */
export function capitalize(str: string): string {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/** Convert snake_case intent to readable label */
export function intentLabel(intent: string): string {
  const map: Record<string, string> = {
    book_appointment: 'Booking',
    faq: 'FAQ',
    human_handoff: 'Handoff',
    general_inquiry: 'Inquiry',
    other: 'Other',
  }
  return map[intent] ?? capitalize(intent.replace(/_/g, ' '))
}

/** Intent → color class for badge */
export function intentColor(intent: string): string {
  const map: Record<string, string> = {
    book_appointment: 'bg-cyan-500/15 text-cyan-400',
    faq:              'bg-violet-500/15 text-violet-400',
    human_handoff:    'bg-amber-500/15 text-amber-400',
    general_inquiry:  'bg-emerald-500/15 text-emerald-400',
    other:            'bg-slate-500/15 text-slate-400',
  }
  return map[intent] ?? 'bg-slate-500/15 text-slate-400'
}

/** Sentiment → color class */
export function sentimentColor(sentiment: string): string {
  const map: Record<string, string> = {
    positive: 'text-emerald-400',
    neutral:  'text-slate-400',
    negative: 'text-rose-400',
  }
  return map[sentiment] ?? 'text-slate-400'
}

/** Sentiment → emoji */
export function sentimentEmoji(sentiment: string): string {
  const map: Record<string, string> = {
    positive: '😊',
    neutral:  '😐',
    negative: '😞',
  }
  return map[sentiment] ?? '—'
}

/** Status → badge class mapping */
export function statusBg(status: string): string {
  const map: Record<string, string> = {
    // Call statuses
    completed:     'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    'in-progress': 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20',
    failed:        'bg-rose-500/10 text-rose-400 border border-rose-500/20',
    'no-answer':   'bg-slate-500/10 text-slate-400 border border-slate-500/20',
    busy:          'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    initiated:     'bg-blue-500/10 text-blue-400 border border-blue-500/20',
    ringing:       'bg-blue-500/10 text-blue-400 border border-blue-500/20',
    // Appointment
    confirmed:     'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    pending:       'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    cancelled:     'bg-rose-500/10 text-rose-400 border border-rose-500/20',
    no_show:       'bg-orange-500/10 text-orange-400 border border-orange-500/20',
    // WhatsApp
    delivered:     'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    read:          'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20',
    sent:          'bg-blue-500/10 text-blue-400 border border-blue-500/20',
    queued:        'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    // Subscription
    active:        'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    past_due:      'bg-rose-500/10 text-rose-400 border border-rose-500/20',
    trialing:      'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20',
    // Sentiment
    positive:      'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    neutral:       'bg-slate-500/10 text-slate-400 border border-slate-500/20',
    negative:      'bg-rose-500/10 text-rose-400 border border-rose-500/20',
  }
  return map[status] ?? 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
}

/** Truncate long strings */
export function truncate(str: string, maxLen = 60): string {
  if (!str) return ''
  if (str.length <= maxLen) return str
  return str.slice(0, maxLen).trimEnd() + '…'
}

/** Generate initials from a name: "John Doe" → "JD" */
export function initials(name: string): string {
  if (!name) return '?'
  return name
    .split(' ')
    .map(part => part[0]?.toUpperCase() ?? '')
    .slice(0, 2)
    .join('')
}

/** Sleep utility */
export const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

/** Format a plan name nicely */
export function planLabel(plan: string): string {
  const map: Record<string, string> = {
    free: 'Free',
    starter: 'Starter',
    pro: 'Pro',
    enterprise: 'Enterprise',
  }
  return map[plan] ?? capitalize(plan)
}

/** Alias for usagePercent used in billing page */
export const usagePct = usagePercent
