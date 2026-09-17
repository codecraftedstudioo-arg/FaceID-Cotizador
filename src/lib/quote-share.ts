import { formatPrice, formatStorage } from './pricing-engine'

export type QuoteShareLang = 'es' | 'en'

export type QuoteShareInput = {
  lang: QuoteShareLang
  brandName: string
  model: string
  storage: string
  price: number
  arsAmount?: number | null
  disclaimer: string
  url: string
  upgrade?: {
    model: string
    storage: string
    difference: number
    covers: boolean
  } | null
}

export type QuoteSharePayload = {
  title: string
  text: string
  url: string
  clipboard: string
}

export type QuoteShareResult = 'shared' | 'copied' | 'cancelled' | 'failed'

function deviceLabel(lang: QuoteShareLang, model: string, storage: string) {
  const cap = formatStorage(storage)
  return lang === 'es' ? `${model} de ${cap}` : `${model} ${cap}`
}

function arsSuffix(arsAmount?: number | null) {
  if (arsAmount == null || arsAmount <= 0) return ''
  return ` (${arsAmount.toLocaleString('es-AR')} ARS)`
}

export function buildQuoteSharePayload(input: QuoteShareInput): QuoteSharePayload {
  const { lang, brandName, disclaimer, url } = input
  const yours = deviceLabel(lang, input.model, input.storage)
  const price = formatPrice(input.price)
  const ars = arsSuffix(input.arsAmount)

  let body: string
  if (input.upgrade) {
    const next = deviceLabel(lang, input.upgrade.model, input.upgrade.storage)
    const absDiff = formatPrice(Math.abs(input.upgrade.difference))
    if (lang === 'es') {
      const outcome = input.upgrade.covers
        ? `Me queda a favor: ${absDiff}${ars}`
        : `Diferencia a pagar: ${absDiff}${ars}`
      body = `${brandName} me cotizó el canje de mi ${yours} por un ${next}.\n${outcome}.`
    } else {
      const outcome = input.upgrade.covers
        ? `Credit in my favor: ${absDiff}${ars}`
        : `Difference to pay: ${absDiff}${ars}`
      body = `${brandName} quoted a trade-in of my ${yours} for a ${next}.\n${outcome}.`
    }
  } else if (lang === 'es') {
    body = `${brandName} me cotizó mi ${yours} en ${price}${ars}.`
  } else {
    body = `${brandName} quoted my ${yours} at ${price}${ars}.`
  }

  const cta = lang === 'es' ? 'Cotizá el tuyo:' : 'Get your quote:'
  const text = `${body}\n${disclaimer}`
  const title = lang === 'es' ? `Cotización ${brandName}` : `${brandName} quote`

  return {
    title,
    text,
    url,
    clipboard: `${text}\n\n${cta} ${url}`,
  }
}

async function copyToClipboard(value: string) {
  if (typeof window !== 'undefined') window.focus()
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value)
    return
  }
  if (typeof document === 'undefined') {
    throw new Error('Clipboard unavailable')
  }
  const el = document.createElement('textarea')
  el.value = value
  el.setAttribute('readonly', '')
  el.style.position = 'fixed'
  el.style.left = '-9999px'
  document.body.appendChild(el)
  el.select()
  const ok = document.execCommand('copy')
  document.body.removeChild(el)
  if (!ok) throw new Error('Copy command failed')
}

function isAbortError(err: unknown) {
  return (
    (err instanceof DOMException && err.name === 'AbortError') ||
    (err instanceof Error && err.name === 'AbortError')
  )
}

export async function shareQuote(payload: QuoteSharePayload): Promise<QuoteShareResult> {
  try {
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      await navigator.share({
        title: payload.title,
        text: payload.text,
        url: payload.url,
      })
      return 'shared'
    }
  } catch (err) {
    if (isAbortError(err)) return 'cancelled'
  }

  try {
    await copyToClipboard(payload.clipboard)
    return 'copied'
  } catch {
    return 'failed'
  }
}
