import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ProgressBar } from '@/components/ui'
import { BrandHeader } from '@/components/ui/header'
import { ThemeToggle } from '@/components/theme-toggle'
import { useWizard } from './hooks/use-wizard'
import { useI18n } from '@/lib/i18n'
import { useExchangeRate } from '@/lib/use-exchange-rate'
import { usePricingReady, isPanelPricingFailed } from '@/lib/pricing-source'
import {
  Step1Basics,
  Step2Condition,
  Step3Details,
  Step4Functionality,
  Step5Upgrade,
  Step6Contact,
  StepResult,
} from './steps'
import { IPhoneFrame } from './components/iphone-frame'
import { tenant, getWhatsAppUrl, getMapsUrl } from '@/config/tenant'

const TOTAL_STEPS = 6

/**
 * Wizard page: cotizador real dentro del mockup iPhone original.
 */
export function WizardPage() {
  const navigate = useNavigate()
  const { state, prevStep, canjeMode } = useWizard()
  useI18n() // Keep provider active
  const { rate } = useExchangeRate()
  const pricingReady = usePricingReady()
  const { currentStep } = state
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current?.scrollTo) {
      contentRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [currentStep])

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <Step5Upgrade />
      case 2: return <Step1Basics />
      case 3: return <Step2Condition />
      case 4: return <Step3Details />
      case 5: return <Step4Functionality />
      case 6: return <Step6Contact />
      case 7: return <StepResult />
      default: return <Step5Upgrade />
    }
  }

  const showProgress = (currentStep > 1 || (currentStep === 1 && canjeMode)) && currentStep <= TOTAL_STEPS
  const displayStep = canjeMode ? currentStep : currentStep - 1
  const displayTotal = canjeMode ? TOTAL_STEPS : TOTAL_STEPS - 1
  const showRate = rate !== null

  const headerRight = (
    <>
      <button
        type="button"
        onClick={() => navigate('/')}
        className="text-fg-muted hover:text-fg text-sm transition-colors"
      >
        Inicio
      </button>
      {showProgress && (
        <span className="text-fg-subtle text-xs sm:text-sm font-medium tabular-nums">
          {displayStep}/{displayTotal}
        </span>
      )}
      <ThemeToggle />
    </>
  )

  if (!pricingReady) {
    return (
      <div className="min-h-screen bg-bg flex flex-col">
        <BrandHeader right={<ThemeToggle />} onLogoClick={() => navigate('/')} />
        <div className="flex-1 flex flex-col items-center justify-center gap-4 px-4">
          <div className="w-10 h-10 rounded-full border-2 border-line-strong border-t-accent animate-spin" />
          <p className="text-fg-subtle text-sm">Cargando precios…</p>
        </div>
      </div>
    )
  }

  if (isPanelPricingFailed()) {
    return (
      <div className="min-h-screen bg-bg flex flex-col">
        <BrandHeader right={<ThemeToggle />} onLogoClick={() => navigate('/')} />
        <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 text-center">
          <p className="font-display text-fg text-lg font-semibold">Cotización no disponible por el momento</p>
          <p className="text-fg-muted text-sm max-w-sm">
            Estamos teniendo un problema para cargar los precios actualizados. Escribinos y te cotizamos al toque.
          </p>
          {tenant.features.whatsapp ? (
            <a
              href={getWhatsAppUrl('Hola, quiero cotizar mi equipo.')}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-[10px] bg-accent px-5 py-3 text-sm font-semibold text-accent-contrast transition-colors hover:bg-accent-hover"
            >
              Escribinos por WhatsApp
            </a>
          ) : (
            <p className="text-fg-subtle text-sm">Volvé a intentar en unos minutos.</p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      <BrandHeader right={headerRight} onLogoClick={() => navigate('/')} />

      <div className="border-b border-line bg-surface">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-center text-[12px] sm:text-[13px] text-fg-muted">
          {showRate ? (
            <span className="tabular-nums text-center">
              Cotización utilizada · {tenant.currency.exchangeRateLabel}{' '}
              <span className="text-fg font-semibold">${rate.toLocaleString('es-AR')}</span>
            </span>
          ) : (
            <span>Cotizamos en ARS y USD</span>
          )}
        </div>
      </div>

      <main className="flex-1 flex items-center justify-center px-3 sm:px-4 py-4 sm:py-6">
        <IPhoneFrame contentRef={contentRef} showRate={currentStep === 7}>
          {showProgress && (
            <div className="mb-2">
              <ProgressBar currentStep={displayStep} totalSteps={displayTotal} />
            </div>
          )}

          <div>
            {renderStep()}
          </div>

          {showProgress && (
            <div className="mt-4 pt-3 border-t border-line flex items-center justify-between px-1">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center gap-1 text-sm transition-colors text-fg-muted hover:text-fg min-h-10"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Atrás
                </button>
              ) : (
                <div className="w-14" />
              )}
              <span className="text-fg-subtle text-xs tabular-nums">
                {displayStep} de {displayTotal}
              </span>
              <div className="w-14" />
            </div>
          )}
        </IPhoneFrame>
      </main>

      <footer className="py-4 text-center space-y-1 px-4">
        <p className="text-fg-subtle text-xs">
          © {new Date().getFullYear()} {tenant.brand.name}
          {tenant.contact.address && (
            <>
              {' · '}
              {getMapsUrl() ? (
                <a href={getMapsUrl()} target="_blank" rel="noopener noreferrer" className="hover:text-fg-muted transition-colors underline underline-offset-2">
                  {tenant.contact.address}
                </a>
              ) : (
                <span>{tenant.contact.address}</span>
              )}
            </>
          )}
        </p>
      </footer>
    </div>
  )
}

export { WizardProvider } from './hooks/use-wizard'
