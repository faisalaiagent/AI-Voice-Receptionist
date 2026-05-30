// ============================================================
// TABLE — responsive data table with sorting/empty states
// ============================================================
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { ChevronUp, ChevronDown } from 'lucide-react'

interface Column<T> {
  key: string
  label: string
  sortable?: boolean
  width?: string
  align?: 'left' | 'center' | 'right'
  render?: (value: any, row: T) => ReactNode
}

interface TableProps<T> {
  columns: Column<T>[]
  data: T[]
  keyExtractor: (row: T) => string
  onRowClick?: (row: T) => void
  emptyMessage?: string
  emptyIcon?: ReactNode
  loading?: boolean
  sortKey?: string
  sortDir?: 'asc' | 'desc'
  onSort?: (key: string) => void
  className?: string
}

export function Table<T>({
  columns, data, keyExtractor, onRowClick,
  emptyMessage = 'No data found', emptyIcon,
  loading, sortKey, sortDir, onSort, className,
}: TableProps<T>) {
  return (
    <div className={cn('w-full overflow-x-auto scroll-thin', className)}>
      <table className="w-full border-collapse text-sm">
        {/* Header */}
        <thead>
          <tr className="border-b border-[rgba(6,182,212,0.08)]">
            {columns.map(col => (
              <th
                key={col.key}
                style={{ width: col.width }}
                className={cn(
                  'px-4 py-3 text-[11px] font-semibold text-[#435A7A] uppercase tracking-wider select-none',
                  col.align === 'center' && 'text-center',
                  col.align === 'right'  && 'text-right',
                  !col.align            && 'text-left',
                  col.sortable && 'cursor-pointer hover:text-[#7B9CC4] transition-colors'
                )}
                onClick={() => col.sortable && onSort?.(col.key)}
              >
                <span className="inline-flex items-center gap-1">
                  {col.label}
                  {col.sortable && (
                    <span className="flex flex-col">
                      <ChevronUp
                        size={9}
                        className={cn(sortKey === col.key && sortDir === 'asc' ? 'text-cyan-400' : 'opacity-30')}
                      />
                      <ChevronDown
                        size={9}
                        className={cn(sortKey === col.key && sortDir === 'desc' ? 'text-cyan-400' : 'opacity-30')}
                      />
                    </span>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className="border-b border-[rgba(6,182,212,0.05)]">
                {columns.map(col => (
                  <td key={col.key} className="px-4 py-3">
                    <div className="skeleton h-4 w-full max-w-[120px]" />
                  </td>
                ))}
              </tr>
            ))
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-16 text-center">
                <div className="flex flex-col items-center gap-3">
                  {emptyIcon && (
                    <span className="text-4xl opacity-30">{emptyIcon}</span>
                  )}
                  <p className="text-sm text-[#435A7A]">{emptyMessage}</p>
                </div>
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr
                key={keyExtractor(row)}
                onClick={() => onRowClick?.(row)}
                className={cn(
                  'border-b border-[rgba(6,182,212,0.05)] transition-colors animate-fade-in',
                  onRowClick && 'cursor-pointer hover:bg-[rgba(6,182,212,0.04)]',
                  idx % 2 === 1 && 'bg-[rgba(255,255,255,0.01)]'
                )}
                style={{ animationDelay: `${idx * 0.03}s` }}
              >
                {columns.map(col => {
                  const raw = (row as any)[col.key]
                  return (
                    <td
                      key={col.key}
                      className={cn(
                        'px-4 py-3 text-[#F0F6FF]',
                        col.align === 'center' && 'text-center',
                        col.align === 'right'  && 'text-right',
                      )}
                    >
                      {col.render ? col.render(raw, row) : raw ?? '—'}
                    </td>
                  )
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
