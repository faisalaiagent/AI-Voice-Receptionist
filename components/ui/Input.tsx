// ============================================================
// INPUT — styled input, textarea, select, toggle components
// ============================================================
import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

// ── Text Input ────────────────────────────────────────────────
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  icon?: React.ReactNode
  iconRight?: React.ReactNode
  // alias used by login/register pages for the show/hide password button
  rightElement?: React.ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, icon, iconRight, rightElement, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
    // rightElement is an alias for iconRight — supports interactive elements (buttons)
    const rightSlot = rightElement ?? iconRight
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-xs font-medium text-[#7B9CC4]">
            {label}
          </label>
        )}
        <div className="relative">
          {/* Left icon — decorative, pointer-events disabled */}
          {icon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#435A7A] pointer-events-none z-10">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'input-base',
              icon       && 'pl-9',
              rightSlot  && 'pr-9',
              error && 'border-rose-500/50 focus:border-rose-500 focus:shadow-[0_0_0_3px_rgba(244,63,94,0.12)]',
              className
            )}
            {...props}
          />
          {/* Right slot — supports both icons and interactive buttons */}
          {rightSlot && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#435A7A] flex items-center">
              {rightSlot}
            </span>
          )}
        </div>
        {error && <p className="text-xs text-rose-400">{error}</p>}
        {hint && !error && <p className="text-xs text-[#435A7A]">{hint}</p>}
      </div>
    )
  }
)
Input.displayName = 'Input'

// ── Textarea ──────────────────────────────────────────────────
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-xs font-medium text-[#7B9CC4]">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            'input-base py-2.5 h-auto resize-none',
            error && 'border-rose-500/50 focus:border-rose-500',
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-rose-400">{error}</p>}
        {hint && !error && <p className="text-xs text-[#435A7A]">{hint}</p>}
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'

// ── Select ────────────────────────────────────────────────────
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: { value: string; label: string }[]
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-xs font-medium text-[#7B9CC4]">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={inputId}
          className={cn(
            'input-base appearance-none cursor-pointer',
            'bg-[url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3E%3Cpath stroke=\'%237B9CC4\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3E%3C/svg%3E")] bg-no-repeat bg-[right_10px_center] bg-[length:16px] pr-8',
            error && 'border-rose-500/50',
            className
          )}
          {...props}
        >
          {options.map(o => (
            <option key={o.value} value={o.value} className="bg-[#0D1B35]">
              {o.label}
            </option>
          ))}
        </select>
        {error && <p className="text-xs text-rose-400">{error}</p>}
      </div>
    )
  }
)
Select.displayName = 'Select'

// ── Toggle / Switch ───────────────────────────────────────────
interface ToggleProps {
  checked: boolean
  onChange: (v: boolean) => void
  label?: string
  description?: string
  size?: 'sm' | 'md'
}

export function Toggle({ checked, onChange, label, description, size = 'md' }: ToggleProps) {
  return (
    <label className="flex items-center justify-between gap-4 cursor-pointer group">
      {(label || description) && (
        <div>
          {label && (
            <p className="text-sm font-medium text-[#F0F6FF] group-hover:text-white transition-colors">
              {label}
            </p>
          )}
          {description && (
            <p className="text-xs text-[#435A7A] mt-0.5">{description}</p>
          )}
        </div>
      )}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative flex-shrink-0 rounded-full transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-[#0D1B35]',
          size === 'md' ? 'w-10 h-6' : 'w-8 h-5',
          checked
            ? 'bg-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.4)]'
            : 'bg-[#1A2B52] border border-[rgba(6,182,212,0.15)]'
        )}
      >
        <span className={cn(
          'absolute top-0.5 rounded-full bg-white shadow transition-all duration-200',
          size === 'md' ? 'w-5 h-5' : 'w-4 h-4',
          checked
            ? size === 'md' ? 'left-[18px]' : 'left-[14px]'
            : 'left-0.5'
        )} />
      </button>
    </label>
  )
}
