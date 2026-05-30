// ============================================================
// TOP BAR — page header with title, subtitle, and action slot
// ============================================================
'use client'
import { ReactNode } from 'react'
import { Menu, Bell } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useStore } from '@/store/useStore'

interface TopBarProps {
  title: string
  subtitle?: string
  actions?: ReactNode
}

export function TopBar({ title, subtitle, actions }: TopBarProps) {
  const { toggleSidebar, notifications } = useStore()

  return (
    <header className={cn(
      'sticky top-0 z-20 flex items-center justify-between h-16 px-6',
      'bg-[#060E1F]/80 backdrop-blur-xl border-b border-[rgba(6,182,212,0.08)]',
      'transition-all duration-300',
    )}>
      {/* Left: title */}
      <div className="flex items-center gap-3">
        {/* Mobile hamburger */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden w-8 h-8 rounded-lg flex items-center justify-center text-[#7B9CC4] hover:text-[#F0F6FF] hover:bg-[rgba(6,182,212,0.08)] transition-all"
        >
          <Menu size={18} />
        </button>
        <div>
          <h1 className="text-base font-bold font-display text-[#F0F6FF] leading-none">{title}</h1>
          {subtitle && (
            <p className="text-[11px] text-[#435A7A] mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>

      {/* Right: actions + bell */}
      <div className="flex items-center gap-2">
        {actions}
        <button className="relative w-8 h-8 rounded-lg flex items-center justify-center text-[#7B9CC4] hover:text-[#F0F6FF] hover:bg-[rgba(6,182,212,0.08)] transition-all">
          <Bell size={16} />
          {notifications.length > 0 && (
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-cyan-500" />
          )}
        </button>
      </div>
    </header>
  )
}
