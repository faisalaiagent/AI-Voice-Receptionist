// ============================================================
// NOTIFICATION TOAST — slide-in alerts
// ============================================================
'use client'
import { useEffect } from 'react'
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useStore, AppNotification } from '@/store/useStore'

const icons = {
  success: <CheckCircle size={16} className="text-emerald-400 flex-shrink-0" />,
  error:   <XCircle    size={16} className="text-rose-400    flex-shrink-0" />,
  warning: <AlertTriangle size={16} className="text-amber-400 flex-shrink-0" />,
  info:    <Info       size={16} className="text-cyan-400    flex-shrink-0" />,
}

const borders = {
  success: 'border-emerald-500/25',
  error:   'border-rose-500/25',
  warning: 'border-amber-500/25',
  info:    'border-cyan-500/25',
}

function Toast({ n }: { n: AppNotification }) {
  const remove = useStore(s => s.removeNotification)
  return (
    <div className={cn(
      'flex items-start gap-3 px-4 py-3.5 rounded-xl bg-[#122040] border shadow-[0_8px_32px_rgba(0,0,0,0.5)] animate-slide-right',
      borders[n.type]
    )}>
      {icons[n.type]}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[#F0F6FF]">{n.title}</p>
        {n.message && <p className="text-xs text-[#7B9CC4] mt-0.5 leading-relaxed">{n.message}</p>}
      </div>
      <button
        onClick={() => remove(n.id)}
        className="flex-shrink-0 w-5 h-5 rounded flex items-center justify-center text-[#435A7A] hover:text-[#F0F6FF] transition-colors"
      >
        <X size={12} />
      </button>
    </div>
  )
}

export function NotificationCenter() {
  const { notifications } = useStore()
  if (notifications.length === 0) return null

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 w-80">
      {notifications.map(n => <Toast key={n.id} n={n} />)}
    </div>
  )
}
