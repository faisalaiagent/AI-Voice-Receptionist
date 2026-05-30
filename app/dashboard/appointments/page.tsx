// ============================================================
// APPOINTMENTS PAGE — calendar + booking management
// ============================================================
'use client'
import { useState, useMemo } from 'react'
import {
  Calendar, Plus, Search, CheckCircle, XCircle,
  Clock, User, Phone, Mail, MessageSquare, MoreHorizontal
} from 'lucide-react'
import { TopBar } from '@/components/dashboard/TopBar'
import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input, Select, Textarea } from '@/components/ui/Input'
import { Modal, ConfirmModal } from '@/components/ui/Modal'
import { Table } from '@/components/ui/Table'
import { mockAppointments } from '@/lib/data'
import { timeAgo, statusBg, formatDate, formatDateTime, cn } from '@/lib/utils'
import { useStore } from '@/store/useStore'
import { Appointment } from '@/types'

const STATUS_FILTERS = ['all', 'confirmed', 'pending', 'completed', 'cancelled', 'no_show']

function StatusIcon({ status }: { status: string }) {
  if (status === 'confirmed' || status === 'completed')
    return <CheckCircle size={13} className="text-emerald-400" />
  if (status === 'cancelled' || status === 'no_show')
    return <XCircle size={13} className="text-rose-400" />
  return <Clock size={13} className="text-amber-400" />
}

export default function AppointmentsPage() {
  const { addNotification } = useStore()
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [newApptOpen, setNewApptOpen] = useState(false)
  const [selectedAppt, setSelectedAppt] = useState<Appointment | null>(null)
  const [cancelTarget, setCancelTarget] = useState<Appointment | null>(null)
  const [form, setForm] = useState({
    customerName: '', customerPhone: '', customerEmail: '',
    service: '', date: '', startTime: '', notes: '',
  })

  const filtered = useMemo(() => {
    return mockAppointments.filter(a => {
      const matchSearch = !search ||
        a.customerName.toLowerCase().includes(search.toLowerCase()) ||
        a.customerPhone.includes(search)
      const matchStatus = filterStatus === 'all' || a.status === filterStatus
      return matchSearch && matchStatus
    })
  }, [search, filterStatus])

  const stats = useMemo(() => ({
    total: mockAppointments.length,
    today: mockAppointments.filter(a => {
      const d = new Date(a.date)
      const today = new Date()
      return d.toDateString() === today.toDateString()
    }).length,
    confirmed: mockAppointments.filter(a => a.status === 'confirmed').length,
    pending: mockAppointments.filter(a => a.status === 'pending').length,
  }), [])

  const handleCreate = () => {
    addNotification({
      type: 'success',
      title: 'Appointment created',
      message: `Booking for ${form.customerName} confirmed.`,
    })
    setNewApptOpen(false)
    setForm({ customerName:'', customerPhone:'', customerEmail:'', service:'', date:'', startTime:'', notes:'' })
  }

  const handleResend = (a: Appointment) => {
    addNotification({ type: 'success', title: 'WhatsApp sent', message: `Confirmation resent to ${a.customerPhone}` })
  }

  const handleCancel = () => {
    addNotification({ type: 'info', title: 'Appointment cancelled', message: 'Customer will be notified via WhatsApp.' })
    setCancelTarget(null)
  }

  const columns = [
    {
      key: 'customerName',
      label: 'Customer',
      render: (_: any, row: Appointment) => (
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center text-[10px] font-bold text-cyan-400 flex-shrink-0">
            {row.customerName.split(' ').map(n => n[0]).join('').slice(0,2)}
          </div>
          <div>
            <p className="text-xs font-semibold text-[#F0F6FF]">{row.customerName}</p>
            <p className="text-[10px] text-[#435A7A]">{row.customerPhone}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'service',
      label: 'Service',
      render: (v: string) => (
        <span className="text-xs text-[#F0F6FF]">{v}</span>
      ),
    },
    {
      key: 'date',
      label: 'Date & Time',
      sortable: true,
      render: (_: any, row: Appointment) => (
        <div>
          <p className="text-xs font-semibold text-[#F0F6FF]">{formatDate(row.date)}</p>
          <p className="text-[11px] text-[#435A7A]">{row.startTime} – {row.endTime}</p>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (v: string) => (
        <Badge className={statusBg(v)} dot dotColor={
          v === 'confirmed' || v === 'completed' ? 'bg-emerald-400' :
          v === 'pending' ? 'bg-amber-400' : 'bg-rose-400'
        }>
          {v.replace('_', ' ')}
        </Badge>
      ),
    },
    {
      key: 'createdBy',
      label: 'Source',
      render: (v: string) => (
        <Badge className={
          v === 'ai' ? 'bg-cyan-500/10 text-cyan-400' : 'bg-[#1A2B52] text-[#7B9CC4]'
        }>
          {v === 'ai' ? '🤖 AI' : v === 'agent' ? '👤 Agent' : '⚙️ Admin'}
        </Badge>
      ),
    },
    {
      key: 'confirmationSent',
      label: 'WA Sent',
      align: 'center' as const,
      render: (v: boolean) => (
        <span className={`text-base ${v ? 'opacity-100' : 'opacity-30'}`} title={v ? 'Sent' : 'Not sent'}>
          {v ? '✅' : '○'}
        </span>
      ),
    },
    {
      key: '_id',
      label: 'Actions',
      align: 'right' as const,
      render: (_: any, row: Appointment) => (
        <div className="flex items-center justify-end gap-1">
          <button
            onClick={e => { e.stopPropagation(); handleResend(row) }}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-[#435A7A] hover:text-emerald-400 hover:bg-[rgba(16,185,129,0.08)] transition-all"
            title="Resend WhatsApp"
          >
            <MessageSquare size={12} />
          </button>
          <button
            onClick={e => { e.stopPropagation(); setCancelTarget(row) }}
            disabled={['cancelled','completed','no_show'].includes(row.status)}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-[#435A7A] hover:text-rose-400 hover:bg-[rgba(244,63,94,0.08)] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            title="Cancel appointment"
          >
            <XCircle size={12} />
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="dashboard-page">
      <TopBar
        title="Appointments"
        subtitle={`${stats.confirmed} confirmed · ${stats.pending} pending today`}
        actions={
          <Button
            variant="primary"
            size="sm"
            icon={<Plus size={13} />}
            onClick={() => setNewApptOpen(true)}
          >
            New Booking
          </Button>
        }
      />

      <div className="flex-1 p-6 space-y-4">
        {/* Mini stats */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: 'Total', value: stats.total, color: 'text-[#F0F6FF]' },
            { label: 'Today', value: stats.today, color: 'text-cyan-400' },
            { label: 'Confirmed', value: stats.confirmed, color: 'text-emerald-400' },
            { label: 'Pending', value: stats.pending, color: 'text-amber-400' },
          ].map(s => (
            <Card key={s.label} className="p-4 animate-slide-up">
              <p className="text-xs text-[#435A7A] uppercase tracking-wider">{s.label}</p>
              <p className={`text-2xl font-bold font-display mt-1 ${s.color}`}>{s.value}</p>
            </Card>
          ))}
        </div>

        {/* Filters + Table */}
        <Card className="animate-slide-up stagger-2">
          <CardHeader>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex-1 min-w-[180px]">
                <Input
                  placeholder="Search by name or phone…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  icon={<Search size={14} />}
                />
              </div>
              <div className="flex gap-1.5">
                {STATUS_FILTERS.map(s => (
                  <button
                    key={s}
                    onClick={() => setFilterStatus(s)}
                    className={cn(
                      'px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize',
                      filterStatus === s
                        ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                        : 'text-[#435A7A] hover:text-[#7B9CC4] hover:bg-[rgba(6,182,212,0.05)]'
                    )}
                  >
                    {s === 'all' ? 'All' : s.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardBody className="p-0">
            <Table
              columns={columns}
              data={filtered}
              keyExtractor={r => r._id}
              onRowClick={row => setSelectedAppt(row)}
              emptyMessage="No appointments found"
              emptyIcon={<Calendar />}
            />
          </CardBody>
        </Card>
      </div>

      {/* ── New Appointment Modal ── */}
      <Modal
        open={newApptOpen}
        onClose={() => setNewApptOpen(false)}
        title="New Appointment"
        description="Create a manual booking for a customer"
        size="md"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Customer Name"
              placeholder="Jane Smith"
              value={form.customerName}
              onChange={e => setForm(f => ({ ...f, customerName: e.target.value }))}
              icon={<User size={13} />}
            />
            <Input
              label="Phone Number"
              placeholder="+1 (555) 000-0000"
              value={form.customerPhone}
              onChange={e => setForm(f => ({ ...f, customerPhone: e.target.value }))}
              icon={<Phone size={13} />}
            />
          </div>
          <Input
            label="Email (optional)"
            placeholder="jane@example.com"
            value={form.customerEmail}
            onChange={e => setForm(f => ({ ...f, customerEmail: e.target.value }))}
            icon={<Mail size={13} />}
          />
          <Select
            label="Service"
            value={form.service}
            onChange={e => setForm(f => ({ ...f, service: e.target.value }))}
            options={[
              { value: '', label: 'Select service…' },
              { value: 'Annual Check-up', label: 'Annual Check-up' },
              { value: 'Consultation', label: 'Consultation' },
              { value: 'Follow-up Visit', label: 'Follow-up Visit' },
              { value: 'Initial Assessment', label: 'Initial Assessment' },
            ]}
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Date"
              type="date"
              value={form.date}
              onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
            />
            <Input
              label="Time"
              type="time"
              value={form.startTime}
              onChange={e => setForm(f => ({ ...f, startTime: e.target.value }))}
            />
          </div>
          <Textarea
            label="Notes (optional)"
            placeholder="Any special notes…"
            rows={3}
            value={form.notes}
            onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
          />
          <div className="flex gap-3 pt-1">
            <Button variant="secondary" className="flex-1" onClick={() => setNewApptOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" className="flex-1" onClick={handleCreate}>
              Create & Send WhatsApp
            </Button>
          </div>
        </div>
      </Modal>

      {/* ── Cancel Confirm ── */}
      <ConfirmModal
        open={!!cancelTarget}
        onClose={() => setCancelTarget(null)}
        onConfirm={handleCancel}
        title="Cancel Appointment"
        message={`Cancel ${cancelTarget?.customerName}'s appointment on ${cancelTarget ? formatDate(cancelTarget.date) : ''}? A cancellation notice will be sent via WhatsApp.`}
        confirmLabel="Yes, Cancel"
        danger
      />
    </div>
  )
}
