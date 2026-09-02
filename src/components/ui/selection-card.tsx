import type { ReactNode } from 'react'
import { formatStorage } from '@/lib/pricing-engine'

interface SelectionCardProps {
  selected: boolean
  onClick: () => void
  icon?: ReactNode
  label: string
  description?: string
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function SelectionCard({
  selected,
  onClick,
  icon,
  label,
  description,
  disabled = false,
  size = 'md',
}: SelectionCardProps) {
  const sizeClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-5',
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full text-left rounded-[10px] border transition-all duration-200
        ${sizeClasses[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${selected
          ? 'border-fg bg-fg/[0.04] shadow-[var(--shadow-sm)]'
          : 'border-line bg-surface hover:border-line-strong hover:bg-bg-subtle'
        }
      `}
    >
      <div className="flex items-center gap-3">
        {icon && (
          <div className={`
            flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center
            ${selected ? 'bg-accent/20 text-fg' : 'bg-bg-subtle text-fg-subtle'}
          `}>
            {icon}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className={`font-medium truncate ${selected ? 'text-fg' : 'text-fg-muted'}`}>
            {label}
          </p>
          {description && (
            <p className="text-sm text-fg-subtle truncate">{description}</p>
          )}
        </div>
        {selected && (
          <div className="flex-shrink-0">
            <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
    </button>
  )
}

interface StoragePillProps {
  value: string
  selected: boolean
  onClick: () => void
  disabled?: boolean
}

export function StoragePill({ value, selected, onClick, disabled }: StoragePillProps) {
  const label = formatStorage(value)

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        min-h-11 px-4 py-2.5 rounded-[10px] font-medium text-sm transition-all duration-200 border
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${selected
          ? 'border-transparent bg-cta text-cta-contrast'
          : 'border-line bg-surface text-fg-muted hover:border-line-strong hover:text-fg'
        }
      `}
    >
      {label}
    </button>
  )
}

interface ConditionCardProps {
  selected: boolean
  onClick: () => void
  icon: ReactNode
  label: string
  variant?: 'good' | 'warning' | 'bad'
}

export function ConditionCard({ selected, onClick, icon, label, variant = 'good' }: ConditionCardProps) {
  const variantStyles = {
    good: selected ? 'border-fg bg-fg/[0.04]' : 'border-line bg-surface hover:border-line-strong',
    warning: selected ? 'border-accent bg-accent/10' : 'border-line bg-surface hover:border-accent/50',
    bad: selected ? 'border-red-400 bg-red-50 dark:bg-red-500/10' : 'border-line bg-surface hover:border-red-300',
  }

  const iconColor = {
    good: selected ? 'text-fg' : 'text-fg-subtle',
    warning: selected ? 'text-accent-contrast' : 'text-fg-subtle',
    bad: selected ? 'text-red-600 dark:text-red-400' : 'text-fg-subtle',
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex flex-col items-center gap-2 p-3.5 min-h-[5.5rem] rounded-[10px] border transition-all duration-200
        ${variantStyles[variant]}
      `}
    >
      <div className={`w-8 h-8 ${iconColor[variant]}`}>
        {icon}
      </div>
      <span className={`text-sm font-medium text-center ${selected ? 'text-fg' : 'text-fg-muted'}`}>
        {label}
      </span>
    </button>
  )
}

interface ToggleCardProps {
  selected: boolean
  onClick: () => void
  icon: ReactNode
  label: string
  isPositive?: boolean
  neutral?: boolean
}

export function ToggleCard({ selected, onClick, icon, label, isPositive = true, neutral = false }: ToggleCardProps) {
  const selectedColor = neutral
    ? 'border-fg bg-fg/[0.04]'
    : isPositive
      ? 'border-fg bg-fg/[0.04]'
      : 'border-red-400 bg-red-50 dark:bg-red-500/10'

  const iconSelected = neutral
    ? 'text-fg'
    : isPositive
      ? 'text-fg'
      : 'text-red-600 dark:text-red-400'

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex-1 flex flex-col items-center gap-3 p-4 min-h-[6.5rem] rounded-[10px] border transition-all duration-200
        ${selected ? selectedColor : 'border-line bg-surface hover:border-line-strong'}
      `}
    >
      <div className={`w-10 h-10 ${selected ? iconSelected : 'text-fg-subtle'}`}>
        {icon}
      </div>
      <span className={`text-sm sm:text-base font-medium text-center leading-tight ${selected ? 'text-fg' : 'text-fg-muted'}`}>
        {label}
      </span>
    </button>
  )
}
