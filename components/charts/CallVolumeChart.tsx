// ============================================================
// CALL VOLUME CHART — area chart showing hourly call volume
// ============================================================
'use client'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from 'recharts'
import { CallVolumeData } from '@/types'

interface Props { data: CallVolumeData[] }

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-[#122040] border border-[rgba(6,182,212,0.2)] rounded-xl px-4 py-3 shadow-xl">
      <p className="text-xs font-semibold text-[#7B9CC4] mb-2">{label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-2 text-xs">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-[#7B9CC4]">{p.name}:</span>
          <span className="font-semibold text-[#F0F6FF]">{p.value}</span>
        </div>
      ))}
    </div>
  )
}

export function CallVolumeChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="gradCalls" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#06B6D4" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gradAppts" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#8B5CF6" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="hour"
          tick={{ fill: '#435A7A', fontSize: 11 }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          tick={{ fill: '#435A7A', fontSize: 11 }}
          tickLine={false}
          axisLine={false}
          allowDecimals={false}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{ fontSize: '11px', color: '#7B9CC4', paddingTop: '8px' }}
          iconType="circle"
          iconSize={8}
        />
        <Area
          type="monotone"
          dataKey="calls"
          name="Total Calls"
          stroke="#06B6D4"
          strokeWidth={2}
          fill="url(#gradCalls)"
          dot={false}
          activeDot={{ r: 4, fill: '#06B6D4', stroke: '#0D1B35', strokeWidth: 2 }}
        />
        <Area
          type="monotone"
          dataKey="appointments"
          name="Booked"
          stroke="#8B5CF6"
          strokeWidth={2}
          fill="url(#gradAppts)"
          dot={false}
          activeDot={{ r: 4, fill: '#8B5CF6', stroke: '#0D1B35', strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
