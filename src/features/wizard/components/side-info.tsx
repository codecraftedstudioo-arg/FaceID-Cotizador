import { useEffect, useState } from 'react'
import { tenant } from '@/config/tenant'

function useCounter(target: number, duration = 2000) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * target))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [target, duration])

  return count
}

/**
 * Paneles laterales originales del cotizador (desktop).
 * Recuperado de wizard.tsx en bff6b2d. Solo visual.
 */
export function SideInfo({ position }: { position: 'left' | 'right' }) {
  const clientCount = useCounter(tenant.stats.devicesEvaluated, 1500)

  if (position === 'left') {
    return (
      <div className="hidden lg:flex flex-col gap-4 text-right justify-self-end min-w-0 max-w-[220px] pr-2 xl:pr-6">
        <div className="space-y-1">
          <div className="flex items-center justify-end gap-2">
            <span className="text-fg-muted text-sm font-medium">Cotización instantánea</span>
            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
              <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <p className="text-fg-subtle text-xs">Resultado en 1 minuto</p>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-end gap-2">
            <span className="text-fg-muted text-sm font-medium">Mejor precio</span>
            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-fg-subtle text-xs">Garantizado del mercado</p>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-end gap-2">
            <span className="text-fg-muted text-sm font-medium">Pago inmediato</span>
            <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
              <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <p className="text-fg-subtle text-xs">Efectivo o transferencia</p>
        </div>
      </div>
    )
  }

  return (
      <div className="hidden lg:flex flex-col gap-4 text-left justify-self-start min-w-0 max-w-[220px] pl-2 xl:pl-6">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
            <svg className="w-4 h-4 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <span className="text-fg-muted text-sm font-medium">100% Seguro</span>
        </div>
        <p className="text-fg-subtle text-xs pl-10">{tenant.contact.address || 'Local físico'}</p>
      </div>

      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
            <svg className="w-4 h-4 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <span className="text-fg-muted text-sm font-medium">Soporte WhatsApp</span>
        </div>
        <p className="text-fg-subtle text-xs pl-10">Respondemos en minutos</p>
      </div>

      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center">
            <svg className="w-4 h-4 text-rose-600 dark:text-rose-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <span className="text-fg-muted text-sm font-medium">+{clientCount} clientes</span>
        </div>
        <p className="text-fg-subtle text-xs pl-10">Confían en nosotros</p>
      </div>
    </div>
  )
}
