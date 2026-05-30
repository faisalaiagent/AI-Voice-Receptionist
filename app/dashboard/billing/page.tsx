'use client'
import { useState } from 'react'
import { CreditCard, Zap, Check, ArrowRight, TrendingUp, AlertTriangle,
  Download, Calendar, ChevronRight, Star } from 'lucide-react'
import { TopBar } from '@/components/dashboard/TopBar'
import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { subscriptionPlans, mockUsage } from '@/lib/data'
import { usagePct, cn } from '@/lib/utils'

// ─── USAGE BAR ────────────────────────────────────────────────
function UsageBar({ label, used, limit, color = 'cyan' }: {
  label: string; used: number; limit: number; color?: string
}) {
  const pct = usagePct(used, limit)
  const warn = pct > 80
  const danger = pct > 95

  const barColor = danger ? 'from-rose-500 to-red-500'
    : warn ? 'from-amber-500 to-orange-500'
    : 'from-cyan-500 to-blue-500'

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-300">{label}</span>
        <span className={cn('text-xs font-semibold', danger ? 'text-rose-400' : warn ? 'text-amber-400' : 'text-slate-400')}>
          {used.toLocaleString()} / {limit.toLocaleString()}
        </span>
      </div>
      <div className="h-2 rounded-full bg-white/[0.04] overflow-hidden">
        <div
          className={cn('h-full rounded-full bg-gradient-to-r transition-all duration-700', barColor)}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex justify-between text-[11px] text-slate-600">
        <span>{pct}% used</span>
        {warn && (
          <span className={danger ? 'text-rose-400' : 'text-amber-400'}>
            <AlertTriangle className="w-3 h-3 inline mr-0.5" />
            {danger ? 'Almost full' : 'Running low'}
          </span>
        )}
      </div>
    </div>
  )
}

// ─── PLAN CARD ────────────────────────────────────────────────
function PlanCard({ plan, current }: { plan: typeof subscriptionPlans[0]; current: boolean }) {
  const [loading, setLoading] = useState(false)

  async function handleUpgrade() {
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
  }

  return (
    <div className={cn(
      'relative rounded-2xl border p-6 flex flex-col gap-5 transition-all duration-200',
      current
        ? 'border-cyan-500/40 bg-cyan-500/5'
        : plan.highlighted
        ? 'border-violet-500/30 bg-violet-500/5 ring-1 ring-violet-500/20'
        : 'border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12]'
    )}>
      {/* Badges */}
      <div className="flex items-center gap-2">
        {current && (
          <span className="text-[10px] px-2.5 py-1 rounded-full bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 font-semibold">
            Current Plan
          </span>
        )}
        {plan.highlighted && !current && (
          <span className="text-[10px] px-2.5 py-1 rounded-full bg-violet-500/15 text-violet-400 border border-violet-500/30 font-semibold flex items-center gap-1">
            <Star className="w-2.5 h-2.5" /> Most Popular
          </span>
        )}
      </div>

      {/* Plan name & price */}
      <div>
        <p className="text-lg font-bold text-white font-display">{plan.name}</p>
        <p className="text-xs text-slate-500 mt-0.5">{plan.description}</p>
        <div className="flex items-baseline gap-1.5 mt-3">
          <span className="text-3xl font-bold text-white font-display">${plan.price}</span>
          <span className="text-sm text-slate-500">{plan.period}</span>
        </div>
      </div>

      {/* Features */}
      <ul className="space-y-2 flex-1">
        {plan.features.map(f => (
          <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
            <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            {f}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Button
        variant={current ? 'ghost' : plan.highlighted ? 'primary' : 'outline'}
        className="w-full"
        disabled={current}
        loading={loading}
        onClick={handleUpgrade}
      >
        {current ? 'Current Plan' : plan.cta}
        {!current && <ArrowRight className="w-4 h-4" />}
      </Button>
    </div>
  )
}

// ─── INVOICE ROW ──────────────────────────────────────────────
function InvoiceRow({ date, amount, status }: { date: string; amount: string; status: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/[0.04] last:border-0">
      <div>
        <p className="text-sm text-white">{date}</p>
        <p className="text-xs text-slate-500">Pro Plan — Monthly</p>
      </div>
      <div className="flex items-center gap-3">
        <span className={cn('text-xs px-2 py-0.5 rounded-full', status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400')}>
          {status}
        </span>
        <span className="text-sm font-semibold text-white">{amount}</span>
        <button className="p-1.5 text-slate-500 hover:text-cyan-400 transition-colors">
          <Download className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}

// ─── MAIN PAGE ────────────────────────────────────────────────
export default function BillingPage() {
  const currentPlan = 'pro'

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar
        title="Billing & Subscription"
        subtitle="Manage your plan, usage, and invoices"
      />

      <div className="flex-1 p-6 space-y-6">
        {/* Current plan banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 to-blue-600/5 animate-slide-up">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center flex-shrink-0">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-white font-semibold">You're on the Pro Plan</p>
            <p className="text-sm text-slate-400 mt-0.5">Next billing date: August 15, 2025 · $149/month</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">Cancel Plan</Button>
            <Button size="sm">
              <CreditCard className="w-3.5 h-3.5" /> Manage Payment
            </Button>
          </div>
        </div>

        {/* Usage meters */}
        <Card className="animate-slide-up" style={{ animationDelay: '80ms' } as React.CSSProperties}>
          <CardHeader>
            <div>
              <h3 className="font-semibold text-white text-sm">Usage This Month</h3>
              <p className="text-xs text-slate-500 mt-0.5">Resets on the 15th</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Calendar className="w-3.5 h-3.5" />
              July 1 — July 14
            </div>
          </CardHeader>
          <CardBody className="space-y-6">
            <UsageBar label="Calls" used={mockUsage.calls.used} limit={mockUsage.calls.limit} />
            <UsageBar label="Minutes" used={mockUsage.minutes.used} limit={mockUsage.minutes.limit} />
            <UsageBar label="WhatsApp Messages" used={mockUsage.whatsapp.used} limit={mockUsage.whatsapp.limit} />
          </CardBody>
        </Card>

        {/* Plans */}
        <div className="animate-slide-up" style={{ animationDelay: '160ms' } as React.CSSProperties}>
          <h3 className="font-semibold text-white mb-4">Available Plans</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {subscriptionPlans.map(plan => (
              <PlanCard key={plan.id} plan={plan} current={plan.id === currentPlan} />
            ))}
          </div>
        </div>

        {/* Payment method + Invoices */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Payment method */}
          <Card className="animate-slide-up" style={{ animationDelay: '240ms' } as React.CSSProperties}>
            <CardHeader>
              <h3 className="font-semibold text-white text-sm">Payment Method</h3>
              <Button variant="ghost" size="sm">Update</Button>
            </CardHeader>
            <CardBody>
              <div className="flex items-center gap-4 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                <div className="w-12 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">VISA</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">•••• •••• •••• 4242</p>
                  <p className="text-xs text-slate-500">Expires 12/27</p>
                </div>
                <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Default</span>
              </div>
            </CardBody>
          </Card>

          {/* Invoice history */}
          <Card className="animate-slide-up" style={{ animationDelay: '280ms' } as React.CSSProperties}>
            <CardHeader>
              <h3 className="font-semibold text-white text-sm">Invoice History</h3>
              <Button variant="ghost" size="sm">View all</Button>
            </CardHeader>
            <CardBody className="pt-0 pb-2">
              {[
                { date: 'July 15, 2025',  amount: '$149.00', status: 'Paid' },
                { date: 'June 15, 2025',  amount: '$149.00', status: 'Paid' },
                { date: 'May 15, 2025',   amount: '$149.00', status: 'Paid' },
              ].map((inv, i) => <InvoiceRow key={i} {...inv} />)}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}
