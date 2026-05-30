// ============================================================
// OVERVIEW PAGE — main dashboard with KPIs + live monitor
// ============================================================
'use client'
import { Phone, Calendar, CheckCircle, Clock, RefreshCw, PhoneCall } from 'lucide-react'
import { TopBar } from '@/components/dashboard/TopBar'
import { StatCard } from '@/components/dashboard/StatCard'
import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { CallVolumeChart } from '@/components/charts/CallVolumeChart'
import { IntentDonutChart } from '@/components/charts/IntentDonutChart'
import { LiveCallMonitor } from '@/components/realtime/LiveCallMonitor'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import {
  mockAnalytics, mockCallVolume, mockIntentData, mockCalls
} from '@/lib/data'
import { formatDuration, timeAgo, statusBg, intentLabel, intentColor } from '@/lib/utils'
import Link from 'next/link'

export default function OverviewPage() {
  const recentCalls = mockCalls.slice(0, 5)

  return (
    <div className="dashboard-page">
      <TopBar
        title="Overview"
        subtitle={`Real-time dashboard — ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`}
        actions={
          <Button variant="ghost" size="sm" icon={<RefreshCw className="w-3.5 h-3.5" />}>
            Refresh
          </Button>
        }
      />

      <div className="flex-1 p-6 space-y-6">
        {/* ── KPI Cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Total Calls Today"
            value={mockAnalytics.callsToday}
            delta={mockAnalytics.callsTodayDelta}
            deltaLabel=""
            icon={<Phone size={16} className="text-cyan-400" />}
            iconBg="bg-cyan-500/10"
            glow="stat-glow-cyan"
          />
          <StatCard
            label="Appointments Booked"
            value={mockAnalytics.appointmentsToday}
            delta={mockAnalytics.appointmentsTodayDelta}
            deltaLabel=""
            icon={<Calendar size={16} className="text-violet-400" />}
            iconBg="bg-violet-500/10"
            glow="stat-glow-violet"
          />
          <StatCard
            label="Resolution Rate"
            value={`${mockAnalytics.resolutionRate}%`}
            delta={mockAnalytics.resolutionRateDelta}
            icon={<CheckCircle size={16} className="text-emerald-400" />}
            iconBg="bg-emerald-500/10"
            glow="stat-glow-emerald"
          />
          <StatCard
            label="Avg Handle Time"
            value={formatDuration(mockAnalytics.avgHandleTime)}
            delta={mockAnalytics.avgHandleTimeDelta}
            deltaLabel="s"
            icon={<Clock size={16} className="text-amber-400" />}
            iconBg="bg-amber-500/10"
            glow="stat-glow-amber"
          />
        </div>

        {/* ── Charts Row ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Call Volume */}
          <Card className="lg:col-span-2 animate-slide-up stagger-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-[#F0F6FF] font-display">Call Volume</h3>
                  <p className="text-xs text-[#435A7A] mt-0.5">Hourly breakdown · today</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#7B9CC4]">
                  <span className="w-2 h-2 rounded-full bg-cyan-500 inline-block" /> Calls
                  <span className="w-2 h-2 rounded-full bg-violet-500 inline-block ml-1" /> Booked
                </div>
              </div>
            </CardHeader>
            <CardBody className="pt-2">
              <CallVolumeChart data={mockCallVolume} />
            </CardBody>
          </Card>

          {/* Intent Distribution */}
          <Card className="animate-slide-up stagger-3">
            <CardHeader>
              <h3 className="text-sm font-semibold text-[#F0F6FF] font-display">Call Intent</h3>
              <p className="text-xs text-[#435A7A] mt-0.5">Distribution today</p>
            </CardHeader>
            <CardBody>
              <IntentDonutChart data={mockIntentData} />
            </CardBody>
          </Card>
        </div>

        {/* ── Bottom Row: Live Monitor + Recent Calls ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Live Calls */}
          <Card className="lg:col-span-2 animate-slide-up stagger-4">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="pulse-dot" />
                <h3 className="text-sm font-semibold text-[#F0F6FF] font-display">Active Right Now</h3>
              </div>
            </CardHeader>
            <CardBody>
              <LiveCallMonitor />
            </CardBody>
          </Card>

          {/* Recent Calls */}
          <Card className="lg:col-span-3 animate-slide-up stagger-5">
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-[#F0F6FF] font-display">Recent Calls</h3>
                <Link href="/dashboard/calls">
                  <Button variant="ghost" size="sm">View all</Button>
                </Link>
              </div>
            </CardHeader>
            <CardBody className="p-0">
              <div className="divide-y divide-[rgba(6,182,212,0.06)]">
                {recentCalls.map((call, i) => (
                  <div
                    key={call._id}
                    className="flex items-center gap-3 px-5 py-3 hover:bg-[rgba(6,182,212,0.04)] transition-colors animate-fade-in"
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    <div className="w-8 h-8 rounded-full bg-[#1A2B52] flex items-center justify-center flex-shrink-0">
                      <PhoneCall size={13} className="text-[#7B9CC4]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#F0F6FF] truncate">{call.from}</p>
                      <p className="text-[11px] text-[#435A7A]">{timeAgo(call.startTime)}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Badge className={intentColor(call.intent)}>
                        {intentLabel(call.intent)}
                      </Badge>
                      <Badge className={statusBg(call.status)}>
                        {call.status}
                      </Badge>
                      <span className="text-[11px] font-mono text-[#435A7A]">
                        {formatDuration(call.duration)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}
