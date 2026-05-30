// ============================================================
// CALLS PAGE — full call log with transcript modal
// ============================================================
'use client'
import { useState, useMemo } from 'react'
import {
  Phone, Search, Filter, Play, FileText, Trash2,
  PhoneIncoming, PhoneOff, Clock, TrendingUp
} from 'lucide-react'
import { TopBar } from '@/components/dashboard/TopBar'
import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input, Select } from '@/components/ui/Input'
import { Modal, ConfirmModal } from '@/components/ui/Modal'
import { Table } from '@/components/ui/Table'
import { mockCalls, mockTranscript, formatDuration } from '@/lib/data'
import {
  timeAgo, statusBg, intentLabel, intentColor,
  sentimentEmoji, formatDateTime, cn
} from '@/lib/utils'
import { useStore } from '@/store/useStore'
import { Call } from '@/types'

export default function CallsPage() {
  const { addNotification } = useStore()
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterIntent, setFilterIntent] = useState('all')
  const [selectedCall, setSelectedCall] = useState<Call | null>(null)
  const [transcriptOpen, setTranscriptOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<Call | null>(null)

  // Filter calls
  const filtered = useMemo(() => {
    return mockCalls.filter(c => {
      const matchSearch = !search ||
        c.from.includes(search) ||
        c.callSid.toLowerCase().includes(search.toLowerCase())
      const matchStatus = filterStatus === 'all' || c.status === filterStatus
      const matchIntent = filterIntent === 'all' || c.intent === filterIntent
      return matchSearch && matchStatus && matchIntent
    })
  }, [search, filterStatus, filterIntent])

  const handleDelete = () => {
    addNotification({ type: 'success', title: 'Call deleted', message: `Call record removed successfully.` })
    setDeleteTarget(null)
  }

  const handlePlayRecording = (call: Call) => {
    addNotification({ type: 'info', title: 'Recording', message: 'Opening recording player…' })
  }

  const columns = [
    {
      key: 'from',
      label: 'Caller',
      render: (_: any, row: Call) => (
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-[#1A2B52] flex items-center justify-center flex-shrink-0">
            <PhoneIncoming size={12} className="text-[#7B9CC4]" />
          </div>
          <div>
            <p className="text-xs font-semibold text-[#F0F6FF]">{row.from}</p>
            <p className="text-[10px] text-[#435A7A] font-mono">{row.callSid.slice(0, 12)}…</p>
          </div>
        </div>
      ),
    },
    {
      key: 'startTime',
      label: 'Time',
      sortable: true,
      render: (v: string) => (
        <div>
          <p className="text-xs text-[#F0F6FF]">{timeAgo(v)}</p>
          <p className="text-[10px] text-[#435A7A]">{formatDateTime(v)}</p>
        </div>
      ),
    },
    {
      key: 'duration',
      label: 'Duration',
      render: (v: number) => (
        <span className="text-xs font-mono text-[#7B9CC4]">{formatDuration(v)}</span>
      ),
    },
    {
      key: 'intent',
      label: 'Intent',
      render: (v: string) => (
        <Badge className={intentColor(v)}>{intentLabel(v)}</Badge>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (v: string) => (
        <Badge className={statusBg(v)} dot dotColor={
          v === 'completed' ? 'bg-emerald-400' :
          v === 'in-progress' ? 'bg-cyan-400' :
          'bg-rose-400'
        }>
          {v}
        </Badge>
      ),
    },
    {
      key: 'sentiment',
      label: 'Mood',
      align: 'center' as const,
      render: (v: string) => (
        <span className="text-base" title={v}>{sentimentEmoji(v)}</span>
      ),
    },
    {
      key: '_id',
      label: 'Actions',
      align: 'right' as const,
      render: (_: any, row: Call) => (
        <div className="flex items-center justify-end gap-1">
          <button
            onClick={(e) => { e.stopPropagation(); handlePlayRecording(row) }}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-[#435A7A] hover:text-cyan-400 hover:bg-[rgba(6,182,212,0.08)] transition-all"
            title="Play recording"
          >
            <Play size={12} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              setSelectedCall(row)
              setTranscriptOpen(true)
            }}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-[#435A7A] hover:text-violet-400 hover:bg-[rgba(139,92,246,0.08)] transition-all"
            title="View transcript"
          >
            <FileText size={12} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setDeleteTarget(row) }}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-[#435A7A] hover:text-rose-400 hover:bg-[rgba(244,63,94,0.08)] transition-all"
            title="Delete"
          >
            <Trash2 size={12} />
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="dashboard-page">
      <TopBar
        title="Calls"
        subtitle={`${mockCalls.length} total calls · ${mockCalls.filter(c => c.status === 'completed').length} resolved`}
        actions={
          <Button variant="primary" size="sm" icon={<TrendingUp size={13} />}>
            Export CSV
          </Button>
        }
      />

      <div className="flex-1 p-6 space-y-4">
        {/* ── Summary mini-stats ── */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: 'Total', value: mockCalls.length, color: 'text-cyan-400' },
            { label: 'Resolved', value: mockCalls.filter(c => c.resolution === 'resolved').length, color: 'text-emerald-400' },
            { label: 'Transferred', value: mockCalls.filter(c => c.resolution === 'transferred').length, color: 'text-amber-400' },
            { label: 'Abandoned', value: mockCalls.filter(c => c.resolution === 'abandoned').length, color: 'text-rose-400' },
          ].map(stat => (
            <Card key={stat.label} className="p-4 animate-slide-up">
              <p className="text-xs text-[#435A7A] uppercase tracking-wider">{stat.label}</p>
              <p className={`text-2xl font-bold font-display mt-1 ${stat.color}`}>{stat.value}</p>
            </Card>
          ))}
        </div>

        {/* ── Table ── */}
        <Card className="animate-slide-up stagger-2">
          <CardHeader>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex-1 min-w-[180px]">
                <Input
                  placeholder="Search by number or SID…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  icon={<Search size={14} />}
                />
              </div>
              <Select
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
                options={[
                  { value: 'all', label: 'All Statuses' },
                  { value: 'completed', label: 'Completed' },
                  { value: 'in-progress', label: 'In Progress' },
                  { value: 'failed', label: 'Failed' },
                  { value: 'no-answer', label: 'No Answer' },
                ]}
                className="w-36"
              />
              <Select
                value={filterIntent}
                onChange={e => setFilterIntent(e.target.value)}
                options={[
                  { value: 'all', label: 'All Intents' },
                  { value: 'book_appointment', label: 'Booking' },
                  { value: 'faq', label: 'FAQ' },
                  { value: 'human_handoff', label: 'Handoff' },
                  { value: 'other', label: 'Other' },
                ]}
                className="w-36"
              />
            </div>
          </CardHeader>
          <CardBody className="p-0">
            <Table
              columns={columns}
              data={filtered}
              keyExtractor={r => r._id}
              onRowClick={row => { setSelectedCall(row); setTranscriptOpen(true) }}
              emptyMessage="No calls match your filters"
              emptyIcon={<PhoneOff />}
            />
          </CardBody>
        </Card>
      </div>

      {/* ── Transcript Modal ── */}
      <Modal
        open={transcriptOpen}
        onClose={() => setTranscriptOpen(false)}
        title="Call Transcript"
        description={selectedCall ? `${selectedCall.from} · ${timeAgo(selectedCall.startTime)} · ${formatDuration(selectedCall.duration)}` : ''}
        size="lg"
      >
        <div className="flex flex-col gap-3 max-h-[60vh] overflow-y-auto scroll-thin pr-2">
          {mockTranscript.messages.map((msg, i) => (
            <div
              key={i}
              className={cn(
                'flex gap-3',
                msg.role === 'assistant' ? 'flex-row' : 'flex-row-reverse'
              )}
            >
              <div className={cn(
                'w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5',
                msg.role === 'assistant'
                  ? 'bg-cyan-500/20 text-cyan-400'
                  : 'bg-violet-500/20 text-violet-400'
              )}>
                {msg.role === 'assistant' ? 'AI' : 'C'}
              </div>
              <div className={cn(
                'flex-1 max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed',
                msg.role === 'assistant'
                  ? 'bg-[#0F1F3D] text-[#F0F6FF] rounded-tl-sm'
                  : 'bg-[#1A2B52] text-[#F0F6FF] rounded-tr-sm text-right'
              )}>
                {msg.content}
                <p className="text-[10px] text-[#435A7A] mt-1">
                  {new Date(msg.timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
        </div>
        {mockTranscript.summary && (
          <div className="mt-4 p-3 rounded-xl bg-[#0F1F3D] border border-[rgba(6,182,212,0.1)]">
            <p className="text-xs font-semibold text-cyan-400 mb-1">AI Summary</p>
            <p className="text-xs text-[#7B9CC4] leading-relaxed">{mockTranscript.summary}</p>
          </div>
        )}
      </Modal>

      {/* ── Delete Confirm ── */}
      <ConfirmModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Call Record"
        message="This will permanently remove the call log, transcript, and recording. This action cannot be undone."
        confirmLabel="Delete"
        danger
      />
    </div>
  )
}
