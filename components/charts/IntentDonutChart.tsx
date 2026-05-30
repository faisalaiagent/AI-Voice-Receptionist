// ============================================================
// INTENT DONUT CHART — shows call intent distribution
// ============================================================
'use client'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { IntentData } from '@/types'

interface Props { data: IntentData[] }

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null
  const d = payload[0]
  return (
    <div className="bg-[#122040] border border-[rgba(6,182,212,0.2)] rounded-xl px-4 py-3 shadow-xl">
      <p className="text-xs font-semibold text-[#F0F6FF]">{d.name}</p>
      <p className="text-xs text-[#7B9CC4] mt-1">{d.value}% of calls</p>
    </div>
  )
}

export function IntentDonutChart({ data }: Props) {
  return (
    <div className="flex flex-col gap-4 h-full">
      <ResponsiveContainer width="100%" height={160}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={72}
            paddingAngle={3}
            dataKey="value"
            strokeWidth={0}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} opacity={0.9} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex flex-col gap-2">
        {data.map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: item.color }}
              />
              <span className="text-xs text-[#7B9CC4]">{item.name}</span>
            </div>
            <span className="text-xs font-semibold text-[#F0F6FF]">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
