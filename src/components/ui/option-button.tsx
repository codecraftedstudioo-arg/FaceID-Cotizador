import type { ReactNode } from 'react'

interface OptionButtonProps {
  children: ReactNode
  selected?: boolean
  onClick: () => void
  disabled?: boolean
  description?: string
}

/**
 * Option button for wizard selections
 * When clicked, it shows as selected with a blue border
 */
export function OptionButton({
  children,
  selected = false,
  onClick,
  disabled = false,
  description,
}: OptionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full p-4 min-h-12 rounded-[10px] border text-left transition-all duration-200
        ${selected
          ? 'border-fg bg-fg/[0.04]'
          : 'border-line bg-surface hover:border-line-strong hover:bg-bg-subtle'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      <div className="font-medium text-fg">{children}</div>
      {description && (
        <div className="mt-1 text-sm text-fg-subtle">{description}</div>
      )}
    </button>
  )
}
