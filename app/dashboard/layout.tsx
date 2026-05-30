// ============================================================
// DASHBOARD LAYOUT — sidebar + main content shell
// ============================================================
'use client'
import { useStore } from '@/store/useStore'
import { Sidebar } from '@/components/dashboard/Sidebar'
import { NotificationCenter } from '@/components/ui/Notification'
import { cn } from '@/lib/utils'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { sidebarOpen } = useStore()

  return (
    <div className="flex min-h-screen bg-[#060E1F]">
      {/* Background atmosphere */}
      <div className="fixed inset-0 bg-mesh-gradient pointer-events-none" />
      <div className="fixed inset-0 bg-grid-navy pointer-events-none opacity-40" />

      {/* Sidebar */}
      <Sidebar />

      {/* Main content — offset by sidebar width */}
      <main className={cn(
        'flex-1 flex flex-col min-h-screen relative transition-all duration-300',
        sidebarOpen ? 'ml-[220px]' : 'ml-[64px]'
      )}>
        {children}
      </main>

      {/* Global toast notifications */}
      <NotificationCenter />
    </div>
  )
}
