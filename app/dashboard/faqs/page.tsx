// ============================================================
// FAQ MANAGER — create, edit, reorder AI knowledge base
// ============================================================
'use client'
import { useState, useMemo } from 'react'
import {
  HelpCircle, Plus, Search, Edit2, Trash2, Eye, EyeOff,
  TrendingUp, ChevronUp, ChevronDown, Tag
} from 'lucide-react'
import { TopBar } from '@/components/dashboard/TopBar'
import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input, Select, Textarea } from '@/components/ui/Input'
import { Modal, ConfirmModal } from '@/components/ui/Modal'
import { mockFAQs } from '@/lib/data'
import { timeAgo, truncate, cn } from '@/lib/utils'
import { useStore } from '@/store/useStore'
import { FAQ } from '@/types'

const CATEGORIES = ['All', 'General', 'Appointments', 'Billing', 'Services', 'Policies']

export default function FAQsPage() {
  const { addNotification } = useStore()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [faqs, setFaqs] = useState<FAQ[]>(mockFAQs)
  const [editTarget, setEditTarget] = useState<FAQ | null>(null)
  const [newOpen, setNewOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<FAQ | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [form, setForm] = useState({ question:'', answer:'', category:'General', tags:'' })

  const filtered = useMemo(() => {
    return faqs.filter(f => {
      const matchSearch = !search ||
        f.question.toLowerCase().includes(search.toLowerCase()) ||
        f.answer.toLowerCase().includes(search.toLowerCase())
      const matchCat = category === 'All' || f.category === category
      return matchSearch && matchCat
    })
  }, [faqs, search, category])

  const handleToggle = (id: string) => {
    setFaqs(prev => prev.map(f => f._id === id ? { ...f, isActive: !f.isActive } : f))
    const faq = faqs.find(f => f._id === id)
    addNotification({
      type: 'info',
      title: `FAQ ${faq?.isActive ? 'disabled' : 'enabled'}`,
      message: truncate(faq?.question ?? '', 50),
    })
  }

  const handleDelete = () => {
    setFaqs(prev => prev.filter(f => f._id !== deleteTarget?._id))
    addNotification({ type: 'success', title: 'FAQ deleted' })
    setDeleteTarget(null)
  }

  const handleSave = () => {
    if (editTarget) {
      setFaqs(prev => prev.map(f =>
        f._id === editTarget._id
          ? { ...f, question: form.question, answer: form.answer, category: form.category }
          : f
      ))
      addNotification({ type: 'success', title: 'FAQ updated' })
      setEditTarget(null)
    } else {
      const newFaq: FAQ = {
        _id: `f${Date.now()}`,
        businessId: 'b1',
        question: form.question,
        answer: form.answer,
        category: form.category,
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
        priority: faqs.length + 1,
        isActive: true,
        hitCount: 0,
        createdAt: new Date().toISOString(),
      }
      setFaqs(prev => [newFaq, ...prev])
      addNotification({ type: 'success', title: 'FAQ created', message: 'AI will use this in future calls.' })
      setNewOpen(false)
    }
    setForm({ question:'', answer:'', category:'General', tags:'' })
  }

  const openEdit = (faq: FAQ) => {
    setEditTarget(faq)
    setForm({ question: faq.question, answer: faq.answer, category: faq.category, tags: faq.tags.join(', ') })
  }

  return (
    <div className="dashboard-page">
      <TopBar
        title="FAQ Manager"
        subtitle={`${faqs.filter(f => f.isActive).length} active · ${faqs.length} total · AI uses these to answer calls`}
        actions={
          <Button
            variant="primary"
            size="sm"
            icon={<Plus size={13} />}
            onClick={() => setNewOpen(true)}
          >
            Add FAQ
          </Button>
        }
      />

      <div className="flex-1 p-6 space-y-4">
        {/* Search + category filter */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <Input
              placeholder="Search questions and answers…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              icon={<Search size={14} />}
            />
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                  category === cat
                    ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                    : 'text-[#435A7A] hover:text-[#7B9CC4] hover:bg-[rgba(6,182,212,0.05)]'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Cards */}
        <div className="flex flex-col gap-3">
          {filtered.length === 0 && (
            <Card className="p-12 text-center">
              <HelpCircle size={32} className="text-[#435A7A] mx-auto mb-3" />
              <p className="text-sm text-[#435A7A]">No FAQs match your search</p>
            </Card>
          )}
          {filtered.map((faq, idx) => (
            <div
              key={faq._id}
              className={cn(
                'glass-card overflow-hidden transition-all duration-200 animate-slide-up',
                !faq.isActive && 'opacity-50',
              )}
              style={{ animationDelay: `${idx * 0.04}s` }}
            >
              {/* Header row */}
              <div
                className="flex items-start gap-3 p-4 cursor-pointer hover:bg-[rgba(6,182,212,0.03)] transition-colors"
                onClick={() => setExpandedId(expandedId === faq._id ? null : faq._id)}
              >
                {/* Priority indicator */}
                <div className="w-6 h-6 rounded-lg bg-[#1A2B52] flex items-center justify-center text-[10px] font-bold text-[#7B9CC4] flex-shrink-0 mt-0.5">
                  {faq.priority}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#F0F6FF] leading-snug">{faq.question}</p>
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    <Badge className="bg-[#1A2B52] text-[#7B9CC4] text-[10px]">
                      {faq.category}
                    </Badge>
                    {faq.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="tag-chip">
                        <Tag size={8} />
                        {tag}
                      </span>
                    ))}
                    <span className="text-[10px] text-[#435A7A] flex items-center gap-1">
                      <TrendingUp size={9} />
                      {faq.hitCount} uses
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                  <button
                    onClick={e => { e.stopPropagation(); handleToggle(faq._id) }}
                    className={cn(
                      'w-7 h-7 rounded-lg flex items-center justify-center transition-all',
                      faq.isActive
                        ? 'text-emerald-400 hover:bg-emerald-500/10'
                        : 'text-[#435A7A] hover:bg-[rgba(6,182,212,0.08)]'
                    )}
                    title={faq.isActive ? 'Disable' : 'Enable'}
                  >
                    {faq.isActive ? <Eye size={13} /> : <EyeOff size={13} />}
                  </button>
                  <button
                    onClick={e => { e.stopPropagation(); openEdit(faq) }}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-[#435A7A] hover:text-cyan-400 hover:bg-[rgba(6,182,212,0.08)] transition-all"
                  >
                    <Edit2 size={13} />
                  </button>
                  <button
                    onClick={e => { e.stopPropagation(); setDeleteTarget(faq) }}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-[#435A7A] hover:text-rose-400 hover:bg-[rgba(244,63,94,0.08)] transition-all"
                  >
                    <Trash2 size={13} />
                  </button>
                  <span className="text-[#435A7A] ml-1">
                    {expandedId === faq._id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </span>
                </div>
              </div>

              {/* Expanded answer */}
              {expandedId === faq._id && (
                <div className="px-4 pb-4 pt-0 animate-slide-up">
                  <div className="ml-9 p-3 rounded-xl bg-[#0F1F3D] border border-[rgba(6,182,212,0.08)]">
                    <p className="text-xs text-[#7B9CC4] leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Add / Edit FAQ Modal ── */}
      <Modal
        open={newOpen || !!editTarget}
        onClose={() => { setNewOpen(false); setEditTarget(null) }}
        title={editTarget ? 'Edit FAQ' : 'New FAQ'}
        description="This will be injected into the AI context on every call"
        size="md"
      >
        <div className="space-y-4">
          <Input
            label="Question"
            placeholder="What are your office hours?"
            value={form.question}
            onChange={e => setForm(f => ({ ...f, question: e.target.value }))}
          />
          <Textarea
            label="Answer"
            placeholder="We are open Monday through Friday from 9 AM to 6 PM…"
            rows={5}
            value={form.answer}
            onChange={e => setForm(f => ({ ...f, answer: e.target.value }))}
          />
          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Category"
              value={form.category}
              onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
              options={CATEGORIES.slice(1).map(c => ({ value: c, label: c }))}
            />
            <Input
              label="Tags (comma-separated)"
              placeholder="hours, schedule, open"
              value={form.tags}
              onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
              icon={<Tag size={13} />}
            />
          </div>
          <div className="flex gap-3 pt-1">
            <Button variant="secondary" className="flex-1" onClick={() => { setNewOpen(false); setEditTarget(null) }}>
              Cancel
            </Button>
            <Button
              variant="primary"
              className="flex-1"
              onClick={handleSave}
              disabled={!form.question.trim() || !form.answer.trim()}
            >
              {editTarget ? 'Save Changes' : 'Add FAQ'}
            </Button>
          </div>
        </div>
      </Modal>

      <ConfirmModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete FAQ"
        message={`"${truncate(deleteTarget?.question ?? '', 60)}" — the AI will no longer use this answer.`}
        confirmLabel="Delete"
        danger
      />
    </div>
  )
}
