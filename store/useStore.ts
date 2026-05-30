// ============================================================
// GLOBAL ZUSTAND STORE — app-wide state management
// ============================================================
'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  name: string
  email: string
  role: string
  businessName: string
  plan: string
  avatar?: string
}

interface AppState {
  // Sidebar
  sidebarOpen: boolean
  toggleSidebar: () => void
  setSidebarOpen: (v: boolean) => void

  // User
  user: User
  setUser: (u: Partial<User>) => void

  // Auth
  isAuthenticated: boolean
  setAuthenticated: (v: boolean) => void

  // Notifications
  notifications: AppNotification[]
  addNotification: (n: Omit<AppNotification, 'id' | 'at'>) => void
  removeNotification: (id: string) => void
  clearNotifications: () => void
}

export interface AppNotification {
  id: string
  type: 'success' | 'error' | 'info' | 'warning'
  title: string
  message?: string
  at: number
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // ── Sidebar ──────────────────────────────────────────
      sidebarOpen: true,
      toggleSidebar: () => set(s => ({ sidebarOpen: !s.sidebarOpen })),
      setSidebarOpen: (v) => set({ sidebarOpen: v }),

      // ── User ─────────────────────────────────────────────
      user: {
        name: 'Alex Rivera',
        email: 'alex@meridianhealth.com',
        role: 'business_admin',
        businessName: 'Meridian Health',
        plan: 'pro',
      },
      setUser: (u) => set(s => ({ user: { ...s.user, ...u } })),

      // ── Auth ─────────────────────────────────────────────
      isAuthenticated: true, // Demo: always authenticated
      setAuthenticated: (v) => set({ isAuthenticated: v }),

      // ── Notifications ────────────────────────────────────
      notifications: [],
      addNotification: (n) => {
        const id = Math.random().toString(36).slice(2)
        set(s => ({
          notifications: [
            { ...n, id, at: Date.now() },
            ...s.notifications,
          ].slice(0, 10), // keep last 10
        }))
        // Auto-remove after 4 seconds
        setTimeout(() => get().removeNotification(id), 4000)
      },
      removeNotification: (id) =>
        set(s => ({ notifications: s.notifications.filter(n => n.id !== id) })),
      clearNotifications: () => set({ notifications: [] }),
    }),
    {
      name: 'voiceai-store',
      partialState: ['sidebarOpen', 'user'],
    } as any
  )
)
