import { useState, useRef, useEffect } from 'react'

interface Option {
  value: string
  label: string
}

interface SelectProps {
  label?: string
  placeholder?: string
  options: Option[]
  value?: string
  onChange: (value: string) => void
  disabled?: boolean
}

export function Select({
  label,
  placeholder = 'Seleccionar...',
  options,
  value,
  onChange,
  disabled = false
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedOption = options.find(o => o.value === value)

  return (
    <div ref={ref} className="relative">
      {label && (
        <label className="block text-sm text-fg font-medium mb-2">{label}</label>
      )}

      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          w-full min-h-12 px-4 py-3 rounded-[10px] text-left text-[15px]
          flex items-center justify-between
          border transition-all duration-200
          ${disabled
            ? 'border-line text-fg-subtle cursor-not-allowed bg-bg-subtle'
            : 'border-accent bg-accent/10 text-accent-hover hover:bg-accent/15'
          }
        `}
      >
        <span className={selectedOption ? 'text-accent-hover' : 'text-fg-subtle'}>
          {selectedOption?.label || placeholder}
        </span>
        <svg
          className={`w-5 h-5 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} ${disabled ? 'text-fg-subtle' : 'text-accent-hover'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 py-1.5 bg-surface border border-accent rounded-[10px] shadow-[0_12px_32px_rgba(31,41,55,0.12)] max-h-60 overflow-y-auto">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value)
                setIsOpen(false)
              }}
              className={`
                w-full px-4 py-3 text-left text-[15px] transition-colors
                ${option.value === value
                  ? 'bg-accent/10 text-accent-hover font-medium'
                  : 'text-fg hover:bg-accent/10 hover:text-accent-hover'
                }
              `}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
