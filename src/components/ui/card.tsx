import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={className}>
      {children}
    </div>
  )
}

interface CardHeaderProps {
  title: string
  subtitle?: string
}

export function CardHeader({ title, subtitle }: CardHeaderProps) {
  return (
    <div className="mb-6">
      <h2 className="font-display text-[1.35rem] sm:text-2xl font-bold tracking-tight text-fg leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-1.5 text-fg-muted text-sm leading-relaxed">{subtitle}</p>
      )}
    </div>
  )
}
