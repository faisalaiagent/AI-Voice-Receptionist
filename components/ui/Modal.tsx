// ============================================================
// MODAL — accessible dialog overlay with animation
// ============================================================
'use client'
import { useEffect, useCallback, ReactNode } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  description?: string
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export function Modal({ open, onClose, title, description, children, size = 'md', className }: ModalProps) {
  // Close on Escape key
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [open, handleKey])

  if (!open) return null

  const sizeMap = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#060E1F]/80 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Panel */}
      <div className={cn(
        'relative w-full bg-[#0D1B35] border border-[rgba(6,182,212,0.15)] rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,0.6)] animate-scale-in',
        sizeMap[size],
        className
      )}>
        {/* Header */}
        {(title || description) && (
          <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-[rgba(6,182,212,0.08)]">
            <div>
              {title && (
                <h2 className="text-base font-semibold text-[#F0F6FF] font-display">{title}</h2>
              )}
              {description && (
                <p className="text-xs text-[#7B9CC4] mt-0.5">{description}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-[#435A7A] hover:text-[#F0F6FF] hover:bg-[rgba(6,182,212,0.08)] transition-all"
            >
              <X size={14} />
            </button>
          </div>
        )}

        {/* Content */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}

// ── Confirmation Modal ────────────────────────────────────────
interface ConfirmModalProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  danger?: boolean
  loading?: boolean
}

export function ConfirmModal({
  open, onClose, onConfirm, title, message,
  confirmLabel = 'Confirm', cancelLabel = 'Cancel',
  danger = false, loading = false,
}: ConfirmModalProps) {
  return (
    <Modal open={open} onClose={onClose} size="sm">
      <div className="text-center space-y-4">
        <div className={cn(
          'w-12 h-12 rounded-full flex items-center justify-center mx-auto text-2xl',
          danger ? 'bg-rose-500/10' : 'bg-cyan-500/10'
        )}>
          {danger ? '⚠️' : '❓'}
        </div>
        <div>
          <h3 className="text-base font-semibold text-[#F0F6FF] font-display">{title}</h3>
          <p className="text-sm text-[#7B9CC4] mt-1">{message}</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 h-9 rounded-xl text-sm font-medium bg-[#132140] text-[#7B9CC4] border border-[rgba(6,182,212,0.15)] hover:text-[#F0F6FF] hover:border-[rgba(6,182,212,0.3)] transition-all"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={cn(
              'flex-1 h-9 rounded-xl text-sm font-semibold transition-all disabled:opacity-50',
              danger
                ? 'bg-rose-500 hover:bg-rose-400 text-white'
                : 'bg-cyan-500 hover:bg-cyan-400 text-navy-950'
            )}
          >
            {loading ? <span className="spinner w-4 h-4 mx-auto" /> : confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  )
}
