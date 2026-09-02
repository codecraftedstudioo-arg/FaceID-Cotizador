import type { ReactNode, RefObject } from 'react'
import { tenant } from '@/config/tenant'
import { useExchangeRate } from '@/lib/use-exchange-rate'

/**
 * iPhone 15 Pro Frame — contenedor original del cotizador.
 * Recuperado de wizard.tsx en el commit bff6b2d (Initial FaceID cotizador).
 * HTML/CSS: el contenido real se renderiza dentro de la pantalla.
 */
export function IPhoneFrame({
  children,
  contentRef,
  showRate,
}: {
  children: ReactNode
  contentRef?: RefObject<HTMLDivElement | null>
  showRate?: boolean
}) {
  const { rate } = useExchangeRate()

  return (
    <div className="relative mx-auto w-[min(300px,calc(100vw-1.5rem))] sm:w-[350px] md:w-[390px]">
      <div className="absolute inset-4 bg-black/40 blur-2xl rounded-[50px]" />

      <div
        className="relative rounded-[48px] sm:rounded-[52px] p-[2px]"
        style={{
          background: 'linear-gradient(145deg, #5a5a5c 0%, #3d3d3f 15%, #252527 50%, #3d3d3f 85%, #5a5a5c 100%)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255,255,255,0.1)',
        }}
      >
        <div className="bg-[#111] rounded-[46px] sm:rounded-[50px] p-[8px] sm:p-[10px]">
          <div className="relative bg-bg rounded-[38px] sm:rounded-[42px] overflow-hidden flex flex-col h-[min(640px,calc(100dvh-11rem))] sm:h-[700px]">
            <div className="flex-shrink-0 relative h-12 sm:h-14">
              <div className="absolute left-5 top-3 text-fg text-[11px] sm:text-xs font-semibold">
                {new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false })}
              </div>

              <div className="absolute left-1/2 -translate-x-1/2 top-2 sm:top-2.5">
                <div
                  className="bg-black rounded-[20px] w-24 sm:w-28 h-[26px] sm:h-[30px] flex items-center justify-center gap-2"
                  style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.04)' }}
                >
                  <div className="w-[10px] h-[10px] rounded-full bg-[#111] flex items-center justify-center">
                    <div className="w-[6px] h-[6px] rounded-full bg-accent/80" />
                  </div>
                  <div className="w-[8px] h-[8px] rounded-full bg-[#111]" />
                </div>
              </div>

              <div className="absolute right-5 top-3 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-fg" viewBox="0 0 20 20" fill="currentColor">
                  <rect x="1" y="14" width="3" height="5" rx="0.5" />
                  <rect x="6" y="10" width="3" height="9" rx="0.5" />
                  <rect x="11" y="6" width="3" height="13" rx="0.5" />
                  <rect x="16" y="2" width="3" height="17" rx="0.5" />
                </svg>
                <div className="w-5 h-2.5 rounded-sm border border-fg flex items-center p-[1px]">
                  <div className="w-3/4 h-full bg-fg rounded-[1px]" />
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 px-3 py-2 flex items-center gap-2 border-b border-line">
              <div className="w-9 h-9 rounded-[10px] overflow-hidden shadow-lg flex-shrink-0 bg-white">
                <img
                  src={tenant.brand.logo}
                  alt={tenant.brand.name}
                  className="w-full h-full object-contain p-0.5"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-fg text-xs font-semibold">{tenant.brand.name}</p>
                <p className="text-fg-subtle text-[10px]">Cotizador iPhone</p>
              </div>
              {showRate && rate !== null && (
                <div className="flex-shrink-0 rounded-lg bg-fg/[0.04] border border-fg/[0.08] px-2.5 py-1.5 text-right">
                  <p className="text-[8px] uppercase tracking-wider text-fg-subtle leading-none">{tenant.currency.exchangeRateLabel}</p>
                  <p className="text-[11px] font-semibold text-fg tracking-tight mt-0.5">${rate.toLocaleString('es-AR')}</p>
                  <p className="text-[9px] text-fg-subtle mt-0.5 leading-none">
                    {new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false })}
                    {' · '}
                    {new Date().toLocaleDateString('es-AR')}
                  </p>
                </div>
              )}
            </div>

            <div ref={contentRef} className="flex-1 overflow-y-auto overflow-x-hidden px-4 sm:px-5 scrollbar-thin pt-2">
              {children}
            </div>

            <div className="flex-shrink-0 flex justify-center py-2">
              <div className="w-28 sm:w-32 h-[5px] bg-fg/30 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      <div className="hidden sm:block pointer-events-none">
        <div className="absolute -left-[3px] top-[17%] w-[4px] h-7 rounded-l-sm bg-gradient-to-r from-[#4a4a4c] to-[#3a3a3c]" />
        <div className="absolute -left-[3px] top-[25%] w-[4px] h-11 rounded-l-sm bg-gradient-to-r from-[#4a4a4c] to-[#3a3a3c]" />
        <div className="absolute -left-[3px] top-[37%] w-[4px] h-11 rounded-l-sm bg-gradient-to-r from-[#4a4a4c] to-[#3a3a3c]" />
        <div className="absolute -right-[3px] top-[26%] w-[4px] h-14 rounded-r-sm bg-gradient-to-l from-[#4a4a4c] to-[#3a3a3c]" />
      </div>
    </div>
  )
}
