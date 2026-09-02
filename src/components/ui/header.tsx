import type { ReactNode } from 'react'
import { tenant, getWebsiteUrl } from '@/config/tenant'

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2.5 min-w-0">
      <img
        src={tenant.brand.logo}
        alt=""
        className="h-9 w-9 sm:h-10 sm:w-10 rounded-[8px] object-cover shrink-0 ring-1 ring-line"
      />
      <span className="flex items-baseline gap-2 min-w-0">
        <span className="font-display text-[16px] sm:text-[18px] font-bold tracking-tight text-fg leading-none">
          FACE <span className="text-accent">ID</span>
        </span>
        {!compact && (
          <span className="text-[13px] sm:text-sm font-medium text-fg-muted truncate">
            Cotizador
          </span>
        )}
      </span>
    </span>
  )
}

interface BrandHeaderProps {
  right?: ReactNode
  onLogoClick?: () => void
}

/**
 * Header de la herramienta: logo FACE ID + Cotizador.
 * No incluye navegación de la landing; se siente relacionado, no idéntico.
 */
export function BrandHeader({ right, onLogoClick }: BrandHeaderProps) {
  const websiteUrl = getWebsiteUrl()
  const logoClass = 'block min-w-0 hover:opacity-80 transition-opacity'

  return (
    <header className="sticky top-0 z-50 bg-surface/90 backdrop-blur-xl border-b border-line">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        {onLogoClick ? (
          <button type="button" onClick={onLogoClick} className={logoClass} aria-label="FACE ID Cotizador">
            <BrandMark />
          </button>
        ) : (
          <a
            href={websiteUrl}
            target={websiteUrl.startsWith('http') ? '_blank' : undefined}
            rel={websiteUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
            className={logoClass}
            aria-label="FACE ID Cotizador"
          >
            <BrandMark />
          </a>
        )}
        {right ? <div className="flex items-center gap-2 sm:gap-3 shrink-0">{right}</div> : null}
      </div>
    </header>
  )
}

/**
 * Header with logo, language toggle, and link to main site
 */
export function Header() {
  return <BrandHeader />
}
