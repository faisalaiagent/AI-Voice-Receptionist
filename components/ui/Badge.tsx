// ============================================================
// BADGE — small status/label indicator
// ============================================================
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  className?: string
  dot?: boolean
  dotColor?: string
}

export function Badge({ children, className, dot, dotColor }: BadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium leading-none',
      className
    )}>
      {dot && (
        <span className={cn('w-1.5 h-1.5 rounded-full flex-shrink-0', dotColor ?? 'bg-current')} />
      )}
      {children}
    </span>
  )
}
