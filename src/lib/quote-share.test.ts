import { describe, it, expect, vi, beforeEach } from 'vitest'
import { buildQuoteSharePayload, shareQuote } from './quote-share'

const base = {
  brandName: 'FACE ID',
  model: 'iPhone 14 Pro Max',
  storage: '256',
  price: 350,
  disclaimer: '*Precio estimado sujeto a revisión física',
  url: 'https://cotizador.example/',
}

describe('buildQuoteSharePayload', () => {
  it('arma el texto de venta en español', () => {
    const payload = buildQuoteSharePayload({ ...base, lang: 'es' })
    expect(payload.title).toBe('Cotización FACE ID')
    expect(payload.text).toContain('FACE ID me cotizó mi iPhone 14 Pro Max de 256 GB en USD 350.')
    expect(payload.text).toContain('*Precio estimado sujeto a revisión física')
    expect(payload.text).not.toContain(base.url)
    expect(payload.clipboard).toContain('Cotizá el tuyo: https://cotizador.example/')
  })

  it('incluye equivalente en ARS cuando hay tipo de cambio', () => {
    const payload = buildQuoteSharePayload({ ...base, lang: 'es', arsAmount: 455000 })
    expect(payload.text).toContain('USD 350 (455.000 ARS)')
  })

  it('arma el texto de canje con diferencia a pagar', () => {
    const payload = buildQuoteSharePayload({
      ...base,
      lang: 'es',
      upgrade: {
        model: 'iPhone 16',
        storage: '128',
        difference: 200,
        covers: false,
      },
    })
    expect(payload.text).toContain('canje de mi iPhone 14 Pro Max de 256 GB por un iPhone 16 de 128 GB')
    expect(payload.text).toContain('Diferencia a pagar: USD 200')
  })
})

describe('shareQuote', () => {
  beforeEach(() => {
    vi.unstubAllGlobals()
  })

  it('usa navigator.share cuando está disponible', async () => {
    const share = vi.fn().mockResolvedValue(undefined)
    vi.stubGlobal('navigator', { share })
    const payload = buildQuoteSharePayload({ ...base, lang: 'es' })
    await expect(shareQuote(payload)).resolves.toBe('shared')
    expect(share).toHaveBeenCalledWith({
      title: payload.title,
      text: payload.text,
      url: payload.url,
    })
  })

  it('copia al portapapeles si no hay share nativo', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    vi.stubGlobal('navigator', { clipboard: { writeText } })
    const payload = buildQuoteSharePayload({ ...base, lang: 'es' })
    await expect(shareQuote(payload)).resolves.toBe('copied')
    expect(writeText).toHaveBeenCalledWith(payload.clipboard)
  })

  it('trata AbortError como cancelación', async () => {
    const share = vi.fn().mockRejectedValue(new DOMException('dismissed', 'AbortError'))
    vi.stubGlobal('navigator', { share })
    const payload = buildQuoteSharePayload({ ...base, lang: 'es' })
    await expect(shareQuote(payload)).resolves.toBe('cancelled')
  })
})
