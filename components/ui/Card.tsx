// ============================================================
// CARD — reusable container with header/body/footer slots
// ============================================================
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  glow?: 'cyan' | 'violet' | 'emerald' | 'amber' | 'none'
  hover?: boolean
  style?: React.CSSProperties
}

export function Card({ children, className, glow = 'none', hover = false, style }: CardProps) {
  const glowMap = {
    cyan:    'stat-glow-cyan',
    violet:  'stat-glow-violet',
    emerald: 'stat-glow-emerald',
    amber:   'stat-glow-amber',
    none:    '',
  }
  return (
    <div
      style={style}
      className={cn(
        'glass-card',
        hover && 'glass-card-hover cursor-pointer',
        glow !== 'none' && glowMap[glow],
        className
      )}
    >
      {children}
    </div>
  )
}

interface CardHeaderProps {
  children: ReactNode
  className?: string
  border?: boolean
}

/** CardHeader — flex row that spaces 2 children (title + action) apart */
export function CardHeader({ children, className, border = true }: CardHeaderProps) {
  return (
    <div className={cn(
      'px-5 py-4 flex items-center justify-between gap-3',
      border && 'border-b border-[rgba(6,182,212,0.08)]',
      className
    )}>
      {children}
    </div>
  )
}

export function CardBody({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('p-5', className)}>{children}</div>
}

export function CardFooter({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn(
      'px-5 py-3 border-t border-[rgba(6,182,212,0.08)]',
      className
    )}>
      {children}
    </div>
  )
}
