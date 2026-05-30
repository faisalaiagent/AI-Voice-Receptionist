// ============================================================
// BUTTON — reusable button with all variants & loading state
// ============================================================
import { forwardRef, ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  icon?: React.ReactNode
  iconRight?: React.ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, icon, iconRight, children, className, disabled, ...props }, ref) => {
    const base = 'inline-flex items-center justify-center gap-2 font-medium rounded-[10px] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D1B35] select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]'

    const variants = {
      primary:   'bg-cyan-500 hover:bg-cyan-400 text-[#060E1F] shadow-[0_4px_16px_rgba(6,182,212,0.35)] hover:shadow-[0_4px_24px_rgba(6,182,212,0.5)] font-semibold',
      secondary: 'bg-[#132140] hover:bg-[#1A2B52] text-[#F0F6FF] border border-[rgba(6,182,212,0.2)] hover:border-[rgba(6,182,212,0.4)]',
      ghost:     'bg-transparent hover:bg-[rgba(6,182,212,0.08)] text-[#7B9CC4] hover:text-[#F0F6FF] border border-transparent hover:border-[rgba(6,182,212,0.15)]',
      danger:    'bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 hover:border-rose-500/40',
      success:   'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 hover:border-emerald-500/40',
      outline:   'bg-transparent hover:bg-[rgba(255,255,255,0.04)] text-[#7B9CC4] hover:text-[#F0F6FF] border border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.2)]',
    }

    const sizes = {
      sm: 'h-8 px-3 text-xs',
      md: 'h-9 px-4 text-sm',
      lg: 'h-11 px-6 text-base',
    }

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {loading ? (
          <span className="spinner w-4 h-4 flex-shrink-0" />
        ) : icon ? (
          <span className="flex-shrink-0">{icon}</span>
        ) : null}
        {children}
        {iconRight && !loading && (
          <span className="flex-shrink-0">{iconRight}</span>
        )}
      </button>
    )
  }
)
Button.displayName = 'Button'
