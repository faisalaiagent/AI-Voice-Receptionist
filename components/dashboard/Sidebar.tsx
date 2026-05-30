// ============================================================
// SIDEBAR — main navigation with collapsible support
// ============================================================
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Phone, Calendar, HelpCircle, Bot, MessageSquare,
  CreditCard, Settings, ChevronLeft, ChevronRight, Zap, LogOut, User,
} from 'lucide-react'
import { cn, initials } from '@/lib/utils'
import { useStore } from '@/store'

const NAV_ITEMS = [
  { href: '/dashboard/overview',     label: 'Overview',       icon: LayoutDashboard, section: 'main' },
  { href: '/dashboard/calls',        label: 'Calls',          icon: Phone,           section: 'main' },
  { href: '/dashboard/appointments', label: 'Appointments',   icon: Calendar,        section: 'main' },
  { href: '/dashboard/faqs',         label: 'FAQ Manager',    icon: HelpCircle,      section: 'manage' },
  { href: '/dashboard/ai-config',    label: 'AI Config',      icon: Bot,             section: 'manage' },
  { href: '/dashboard/whatsapp',     label: 'WhatsApp',       icon: MessageSquare,   section: 'manage' },
  { href: '/dashboard/billing',      label: 'Billing',        icon: CreditCard,      section: 'account' },
  { href: '/dashboard/settings',     label: 'Settings',       icon: Settings,        section: 'account' },
]

export function Sidebar() {
  const pathname = usePathname()
  const { sidebarOpen, toggleSidebar, user } = useStore()

  const sections = [
    { id: 'main',    label: 'WORKSPACE' },
    { id: 'manage',  label: 'MANAGE' },
    { id: 'account', label: 'ACCOUNT' },
  ]

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 h-screen z-30 flex flex-col transition-all duration-300 ease-in-out',
        'bg-[#0D1B35] border-r border-[rgba(6,182,212,0.1)]',
        sidebarOpen ? 'w-[220px]' : 'w-[64px]'
      )}
    >
      {/* ── Logo ── */}
      <div className={cn(
        'flex items-center gap-3 px-4 h-16 border-b border-[rgba(6,182,212,0.1)] flex-shrink-0',
        !sidebarOpen && 'justify-center px-0'
      )}>
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-[0_0_16px_rgba(6,182,212,0.4)]">
          <Zap size={16} className="text-white" />
        </div>
        {sidebarOpen && (
          <div>
            <span className="font-display font-bold text-[#F0F6FF] text-base leading-none">VoiceAI</span>
            <p className="text-[10px] text-[#7B9CC4] mt-0.5">Receptionist Pro</p>
          </div>
        )}
      </div>

      {/* ── Navigation ── */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 scroll-thin">
        {sections.map((section) => {
          const items = NAV_ITEMS.filter((i) => i.section === section.id)
          return (
            <div key={section.id} className="mb-5">
              {sidebarOpen && (
                <p className="text-[10px] font-semibold text-[#435A7A] uppercase tracking-widest px-3 mb-2">
                  {section.label}
                </p>
              )}
              <div className="flex flex-col gap-0.5">
                {items.map((item) => {
                  const active = pathname === item.href || pathname.startsWith(item.href + '/')
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      title={!sidebarOpen ? item.label : undefined}
                      className={cn(
                        'flex items-center gap-3 h-9 rounded-xl text-sm font-medium transition-all duration-150',
                        sidebarOpen ? 'px-3' : 'justify-center px-0 w-10 mx-auto',
                        active
                          ? 'nav-active text-cyan-400'
                          : 'text-[#7B9CC4] hover:text-[#F0F6FF] hover:bg-[rgba(6,182,212,0.06)]'
                      )}
                    >
                      <item.icon
                        size={16}
                        className={cn('flex-shrink-0', active ? 'text-cyan-400' : 'text-[#7B9CC4]')}
                      />
                      {sidebarOpen && <span className="truncate">{item.label}</span>}
                    </Link>
                  )
                })}
              </div>
            </div>
          )
        })}
      </nav>

      {/* ── User Profile ── */}
      {sidebarOpen && (
        <div className="p-3 border-t border-[rgba(6,182,212,0.1)] flex-shrink-0">
          <div className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-[rgba(6,182,212,0.06)] transition-colors cursor-pointer group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
              {initials(user.name)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-[#F0F6FF] truncate">{user.name}</p>
              <p className="text-[10px] text-[#7B9CC4] truncate">{user.businessName}</p>
            </div>
            <LogOut size={13} className="text-[#435A7A] group-hover:text-rose-400 transition-colors flex-shrink-0" />
          </div>
        </div>
      )}

      {/* ── Collapse Toggle ── */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-[#132140] border border-[rgba(6,182,212,0.2)] flex items-center justify-center text-[#7B9CC4] hover:text-cyan-400 hover:border-cyan-500/40 transition-all shadow-lg z-10"
      >
        {sidebarOpen ? <ChevronLeft size={12} /> : <ChevronRight size={12} />}
      </button>
    </aside>
  )
}
