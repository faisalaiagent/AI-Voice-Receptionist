'use client'
import { useState } from 'react'
import { MessageSquare, Send, Search, CheckCheck, Check, Clock, AlertCircle,
  Phone, Calendar, RefreshCw, Filter, Eye } from 'lucide-react'
import { TopBar } from '@/components/dashboard/TopBar'
import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { mockWhatsAppLogs } from '@/lib/data'
import { statusBg, timeAgo, cn } from '@/lib/utils'
import { WhatsAppLog, MsgStatus } from '@/types'

// ─── STATUS ICON MAP ──────────────────────────────────────────
function MsgStatusIcon({ status }: { status: MsgStatus }) {
  if (status === 'read')      return <CheckCheck className="w-3.5 h-3.5 text-cyan-400" />
  if (status === 'delivered') return <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
  if (status === 'sent')      return <Check      className="w-3.5 h-3.5 text-slate-400" />
  if (status === 'queued')    return <Clock      className="w-3.5 h-3.5 text-amber-400" />
  if (status === 'failed')    return <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
  return null
}

// ─── BUBBLE PREVIEW ───────────────────────────────────────────
function MessagePreviewModal({ log, onClose }: { log: WhatsAppLog; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-[#0d1f38] shadow-2xl animate-slide-up overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* WhatsApp header */}
        <div className="flex items-center gap-3 px-4 py-3 bg-[#075E54]">
          <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
            <MessageSquare className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">VoiceAI Receptionist</p>
            <p className="text-[11px] text-green-200">Online</p>
          </div>
          <button onClick={onClose} className="ml-auto text-white/60 hover:text-white">✕</button>
        </div>

        {/* Chat area */}
        <div className="bg-[#0B141A] bg-opacity-80 p-4 min-h-[160px] flex items-end">
          <div className="max-w-[85%] bg-[#1F2C34] rounded-2xl rounded-bl-sm px-4 py-3 shadow">
            <p className="text-sm text-[#E9EDEF] whitespace-pre-line leading-relaxed">{log.body}</p>
            <div className="flex items-center justify-end gap-1.5 mt-2">
              <span className="text-[10px] text-[#8696A0]">{timeAgo(log.sentAt)}</span>
              <MsgStatusIcon status={log.status} />
            </div>
          </div>
        </div>

        {/* Meta */}
        <div className="px-4 py-3 border-t border-white/[0.06] space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500">To</span>
            <span className="text-slate-300 font-medium">{log.to}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500">Type</span>
            <span className="text-slate-300 capitalize">{log.messageType.replace('_', ' ')}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500">Message SID</span>
            <span className="text-slate-500 font-mono text-[10px]">{log.messageSid.slice(0, 20)}…</span>
          </div>
        </div>

        <div className="px-4 pb-4">
          <Button variant="outline" size="sm" className="w-full">
            <RefreshCw className="w-3.5 h-3.5" /> Resend Message
          </Button>
        </div>
      </div>
    </div>
  )
}

// ─── MAIN PAGE ────────────────────────────────────────────────
export default function WhatsAppPage() {
  const [search, setSearch]     = useState('')
  const [filter, setFilter]     = useState('all')
  const [preview, setPreview]   = useState<WhatsAppLog | null>(null)

  const filtered = mockWhatsAppLogs.filter(l => {
    const matchSearch = !search || l.to.includes(search) || l.body.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || l.status === filter || l.messageType === filter
    return matchSearch && matchFilter
  })

  const stats = {
    total:     mockWhatsAppLogs.length,
    delivered: mockWhatsAppLogs.filter(l => ['delivered', 'read'].includes(l.status)).length,
    read:      mockWhatsAppLogs.filter(l => l.status === 'read').length,
    failed:    mockWhatsAppLogs.filter(l => l.status === 'failed').length,
  }

  const deliveryRate = stats.total > 0 ? Math.round((stats.delivered / stats.total) * 100) : 0

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar
        title="WhatsApp Logs"
        subtitle={`${stats.total} messages · ${deliveryRate}% delivery rate`}
        actions={
          <Button variant="outline" size="sm">
            <Send className="w-3.5 h-3.5" /> Send Custom Message
          </Button>
        }
      />

      <div className="flex-1 p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Total Sent',    value: stats.total,     color: 'text-slate-300',    icon: Send },
            { label: 'Delivered',     value: stats.delivered, color: 'text-emerald-400',  icon: CheckCheck },
            { label: 'Read',          value: stats.read,      color: 'text-cyan-400',     icon: CheckCheck },
            { label: 'Failed',        value: stats.failed,    color: 'text-rose-400',     icon: AlertCircle },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-3 p-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] animate-slide-up" style={{ animationDelay: `${i*60}ms` }}>
              <s.icon className={cn('w-5 h-5 flex-shrink-0', s.color)} />
              <div>
                <p className="text-xs text-slate-500">{s.label}</p>
                <p className={cn('text-xl font-bold font-display', s.color)}>{s.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Delivery rate bar */}
        <div className="p-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] animate-slide-up" style={{ animationDelay: '200ms' } as React.CSSProperties}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-white">Delivery Rate</span>
            <span className="text-sm font-bold text-emerald-400">{deliveryRate}%</span>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full transition-all duration-700"
              style={{ width: `${deliveryRate}%` }}
            />
          </div>
        </div>

        {/* Filters */}
        <Card className="animate-slide-up" style={{ animationDelay: '240ms' } as React.CSSProperties}>
          <CardBody className="py-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Search by number or message..." className="input-base pl-9" />
              </div>
              <select value={filter} onChange={e => setFilter(e.target.value)} className="input-base w-auto">
                <option value="all">All Messages</option>
                <option value="appointment_confirmation">Confirmations</option>
                <option value="reminder">Reminders</option>
                <option value="follow_up">Follow-ups</option>
                <option value="delivered">Delivered</option>
                <option value="read">Read</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </CardBody>
        </Card>

        {/* Message list */}
        <Card className="animate-slide-up" style={{ animationDelay: '280ms' } as React.CSSProperties}>
          <CardHeader>
            <h3 className="font-semibold text-white text-sm">Message Log</h3>
            <span className="text-xs text-slate-500">{filtered.length} messages</span>
          </CardHeader>
          <div className="divide-y divide-white/[0.03]">
            {filtered.map((log, i) => (
              <div key={log._id} className="flex items-start gap-4 px-6 py-4 hover:bg-white/[0.02] transition-colors group">
                {/* Icon */}
                <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mt-0.5">
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-white">{log.to}</span>
                    <span className={cn('text-[10px] px-2 py-0.5 rounded-full border font-medium', statusBg(log.status))}>
                      {log.status}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20 capitalize">
                      {log.messageType.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">{log.body}</p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-[11px] text-slate-600 flex items-center gap-1">
                      <Clock className="w-3 h-3" />{timeAgo(log.sentAt)}
                    </span>
                    {log.deliveredAt && (
                      <span className="text-[11px] text-slate-600">
                        · Delivered {timeAgo(log.deliveredAt)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Status icon + actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <MsgStatusIcon status={log.status} />
                  <button
                    onClick={() => setPreview(log)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-slate-600">
                <MessageSquare className="w-10 h-10 mb-3 opacity-40" />
                <p className="text-sm font-medium">No messages found</p>
              </div>
            )}
          </div>
        </Card>
      </div>

      {preview && <MessagePreviewModal log={preview} onClose={() => setPreview(null)} />}
    </div>
  )
}
