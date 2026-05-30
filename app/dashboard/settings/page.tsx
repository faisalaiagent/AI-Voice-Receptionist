'use client'
import { useState } from 'react'
import { Settings, Building2, Clock, Phone, Globe, Users, UserPlus,
  Shield, Key, Bell, Trash2, Save, CheckCircle, Mail, Edit2 } from 'lucide-react'
import { TopBar } from '@/components/dashboard/TopBar'
import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const mockTeam = [
  { id: 'u1', name: 'Alex Morgan',    email: 'admin@meridianhealth.com', role: 'business_admin', avatar: 'AM' },
  { id: 'u2', name: 'Sarah Chen',     email: 'sarah@meridianhealth.com', role: 'agent',          avatar: 'SC' },
  { id: 'u3', name: 'James Wilson',   email: 'james@meridianhealth.com', role: 'viewer',         avatar: 'JW' },
]

function Section({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-cyan-400" />
          <h3 className="font-semibold text-white text-sm">{title}</h3>
        </div>
      </CardHeader>
      <CardBody className="space-y-4">{children}</CardBody>
    </Card>
  )
}

function RoleBadge({ role }: { role: string }) {
  const map: Record<string, string> = {
    business_admin: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/20',
    agent:          'bg-violet-500/15 text-violet-400 border-violet-500/20',
    viewer:         'bg-slate-500/15 text-slate-400 border-slate-500/20',
  }
  return (
    <span className={cn('text-[10px] px-2 py-0.5 rounded-full border font-medium capitalize', map[role] ?? map.viewer)}>
      {role.replace('_', ' ')}
    </span>
  )
}

// ─── NOTIFICATION SECTION ────────────────────────────────────
// Lifted out of map so useState is called at component level (Rules of Hooks)
const NOTIF_PREFS = [
  { label: 'New appointment booked',  desc: 'Notify when AI books an appointment',     defaultOn: true  },
  { label: 'Human handoff requested', desc: 'Alert when caller requests a human',       defaultOn: true  },
  { label: 'Missed call alert',       desc: 'When a call goes unanswered',              defaultOn: true  },
  { label: 'Weekly report',           desc: 'Summary of weekly performance',            defaultOn: false },
]

function NotificationSection() {
  const [prefs, setPrefs] = useState<boolean[]>(NOTIF_PREFS.map(p => p.defaultOn))
  const toggle = (i: number) => setPrefs(prev => prev.map((v, j) => j === i ? !v : v))

  return (
    <Section title="Notifications" icon={Bell}>
      <div className="space-y-4">
        {NOTIF_PREFS.map((n, i) => (
          <div key={i} className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white">{n.label}</p>
              <p className="text-xs text-slate-500">{n.desc}</p>
            </div>
            <button
              onClick={() => toggle(i)}
              className={cn('relative inline-flex w-10 h-5 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-[#0D1B35]',
                prefs[i] ? 'bg-cyan-500' : 'bg-white/10'
              )}
            >
              <span className={cn('absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform', prefs[i] && 'translate-x-5')} />
            </button>
          </div>
        ))}
      </div>
    </Section>
  )
}

export default function SettingsPage() {
  const [biz, setBiz] = useState({
    name: 'Meridian Health Clinic',
    phone: '+1 (800) 555-0100',
    email: 'info@meridianhealth.com',
    website: 'https://meridianhealth.com',
    industry: 'Healthcare',
    timezone: 'America/New_York',
    transferNumber: '+1 (555) 999-0000',
  })
  const [hours, setHours] = useState(
    DAYS.map((_, i) => ({ day: i, open: '09:00', close: '18:00', isOpen: i > 0 && i < 6 }))
  )
  const [saving, setSaving] = useState(false)
  const [saved, setSaved]   = useState(false)
  const [invite, setInvite] = useState({ email: '', role: 'agent' })

  async function handleSave() {
    setSaving(true)
    await new Promise(r => setTimeout(r, 1000))
    setSaving(false); setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar
        title="Settings"
        subtitle="Business configuration and team management"
        actions={
          <div className="flex items-center gap-2">
            {saved && <span className="text-xs text-emerald-400 flex items-center gap-1 animate-fade-in"><CheckCircle className="w-3.5 h-3.5" /> Saved</span>}
            <Button size="sm" onClick={handleSave} loading={saving}>
              <Save className="w-3.5 h-3.5" /> Save Changes
            </Button>
          </div>
        }
      />

      <div className="flex-1 p-6">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left */}
          <div className="space-y-6">
            <Section title="Business Information" icon={Building2}>
              <div>
                <label className="block text-xs text-slate-400 mb-1.5">Business Name</label>
                <input value={biz.name} onChange={e => setBiz({...biz, name: e.target.value})} className="input-base" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">Phone Number</label>
                  <input value={biz.phone} onChange={e => setBiz({...biz, phone: e.target.value})} className="input-base" />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">Industry</label>
                  <select value={biz.industry} onChange={e => setBiz({...biz, industry: e.target.value})} className="input-base">
                    {['Healthcare', 'Legal', 'Real Estate', 'Finance', 'Dental', 'Veterinary', 'Beauty & Wellness', 'Other'].map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1.5">Business Email</label>
                <input type="email" value={biz.email} onChange={e => setBiz({...biz, email: e.target.value})} className="input-base" />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1.5">Website</label>
                <input value={biz.website} onChange={e => setBiz({...biz, website: e.target.value})} className="input-base" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">Timezone</label>
                  <select value={biz.timezone} onChange={e => setBiz({...biz, timezone: e.target.value})} className="input-base">
                    {['America/New_York','America/Chicago','America/Denver','America/Los_Angeles','America/Toronto','Europe/London','Asia/Karachi'].map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">Transfer Number</label>
                  <input value={biz.transferNumber} onChange={e => setBiz({...biz, transferNumber: e.target.value})} className="input-base" placeholder="Handoff number" />
                </div>
              </div>
            </Section>

            {/* Working Hours */}
            <Section title="Working Hours" icon={Clock}>
              <div className="space-y-2">
                {hours.map((h, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <button
                      onClick={() => setHours(hours.map((x, j) => j === i ? {...x, isOpen: !x.isOpen} : x))}
                      className={cn('w-8 h-4 rounded-full transition-colors flex-shrink-0', h.isOpen ? 'bg-cyan-500' : 'bg-white/10')}
                    >
                      <span className={cn('block w-3 h-3 rounded-full bg-white shadow mx-0.5 transition-transform', h.isOpen && 'translate-x-4')} />
                    </button>
                    <span className="text-xs text-slate-400 w-20 flex-shrink-0">{DAYS[i]}</span>
                    {h.isOpen ? (
                      <>
                        <input type="time" value={h.open} onChange={e => setHours(hours.map((x,j)=>j===i?{...x,open:e.target.value}:x))}
                          className="input-base py-1 text-xs flex-1" />
                        <span className="text-slate-600 text-xs">to</span>
                        <input type="time" value={h.close} onChange={e => setHours(hours.map((x,j)=>j===i?{...x,close:e.target.value}:x))}
                          className="input-base py-1 text-xs flex-1" />
                      </>
                    ) : (
                      <span className="text-xs text-slate-600 flex-1">Closed</span>
                    )}
                  </div>
                ))}
              </div>
            </Section>
          </div>

          {/* Right */}
          <div className="space-y-6">
            {/* Team */}
            <Section title="Team Members" icon={Users}>
              <div className="space-y-2">
                {mockTeam.map(member => (
                  <div key={member.id} className="flex items-center gap-3 p-3 rounded-xl border border-white/[0.04] hover:border-white/[0.08] transition-colors group">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400/20 to-blue-500/20 border border-white/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-cyan-400">{member.avatar}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white">{member.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{member.email}</p>
                    </div>
                    <RoleBadge role={member.role} />
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1 text-slate-500 hover:text-cyan-400 transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
                      <button className="p-1 text-slate-500 hover:text-rose-400 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Invite */}
              <div className="pt-2 border-t border-white/[0.04]">
                <p className="text-xs text-slate-500 mb-2">Invite Team Member</p>
                <div className="flex gap-2">
                  <input value={invite.email} onChange={e => setInvite({...invite, email: e.target.value})}
                    className="input-base flex-1" placeholder="email@company.com" />
                  <select value={invite.role} onChange={e => setInvite({...invite, role: e.target.value})} className="input-base w-auto">
                    <option value="agent">Agent</option>
                    <option value="business_admin">Admin</option>
                    <option value="viewer">Viewer</option>
                  </select>
                  <Button size="sm">
                    <UserPlus className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </Section>

            {/* Security */}
            <Section title="Security" icon={Shield}>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white">Two-Factor Authentication</p>
                    <p className="text-xs text-slate-500">Extra security for your account</p>
                  </div>
                  <Button variant="outline" size="sm">Enable</Button>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-white/[0.04]">
                  <div>
                    <p className="text-sm text-white">Change Password</p>
                    <p className="text-xs text-slate-500">Last changed 30 days ago</p>
                  </div>
                  <Button variant="ghost" size="sm">Update</Button>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-white/[0.04]">
                  <div>
                    <p className="text-sm text-white">API Keys</p>
                    <p className="text-xs text-slate-500">Manage integration keys</p>
                  </div>
                  <Button variant="ghost" size="sm"><Key className="w-3.5 h-3.5" /></Button>
                </div>
              </div>
            </Section>

            {/* Notifications — state lifted out of map to comply with Rules of Hooks */}
            <NotificationSection />

            {/* Danger zone */}
            <div className="p-4 rounded-2xl border border-rose-500/20 bg-rose-500/5">
              <p className="text-sm font-semibold text-rose-400 mb-1">Danger Zone</p>
              <p className="text-xs text-slate-500 mb-3">These actions are irreversible</p>
              <Button variant="danger" size="sm">
                <Trash2 className="w-3.5 h-3.5" /> Delete Business Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
