export const UVT_2025 = 49_799
export const UVT_2026 = 52_374

export const TOPES_RENTA_AG2025 = {
  patrimonio: 4_500 * UVT_2025,
  ingresos: 1_400 * UVT_2025,
  tarjetaCredito: 1_400 * UVT_2025,
  compras: 1_400 * UVT_2025,
  consignaciones: 1_400 * UVT_2025,
} as const

export type DatosTopes = {
  patrimonio: number
  ingresos: number
  tarjetaCredito: number
  compras: number
  consignaciones: number
  responsableIva: boolean
}

export type ResultadoTope = { id: string; criterio: string; valor: number; tope: number; supera: boolean }

export function verificarTopes(d: DatosTopes) {
  const t = TOPES_RENTA_AG2025
  const criterios: ResultadoTope[] = [
    { id: 'patrimonio', criterio: 'Patrimonio bruto a 31 dic. 2025', valor: d.patrimonio, tope: t.patrimonio, supera: d.patrimonio > t.patrimonio },
    { id: 'ingresos', criterio: 'Ingresos brutos en 2025', valor: d.ingresos, tope: t.ingresos, supera: d.ingresos >= t.ingresos },
    { id: 'tarjeta', criterio: 'Consumos con tarjeta de crédito', valor: d.tarjetaCredito, tope: t.tarjetaCredito, supera: d.tarjetaCredito > t.tarjetaCredito },
    { id: 'compras', criterio: 'Compras y consumos totales', valor: d.compras, tope: t.compras, supera: d.compras > t.compras },
    { id: 'consignaciones', criterio: 'Consignaciones, depósitos o inversiones', valor: d.consignaciones, tope: t.consignaciones, supera: d.consignaciones > t.consignaciones },
  ]
  const debeDeclarar = d.responsableIva || criterios.some((c) => c.supera)
  return { criterios, debeDeclarar }
}

// Renta personas naturales año gravable 2025: una fecha por cada par de últimos dígitos del NIT (01-02 … 99-00).
const FECHAS_RENTA_PN_2026 = [
  '2026-08-12', '2026-08-13', '2026-08-14', '2026-08-18', '2026-08-19', '2026-08-20', '2026-08-21',
  '2026-08-24', '2026-08-25', '2026-08-26', '2026-08-27', '2026-08-28', '2026-08-31',
  '2026-09-01', '2026-09-02', '2026-09-03', '2026-09-04', '2026-09-07', '2026-09-08', '2026-09-09',
  '2026-09-10', '2026-09-11', '2026-09-14', '2026-09-15', '2026-09-16', '2026-09-17', '2026-09-18',
  '2026-09-21', '2026-09-22', '2026-09-23', '2026-09-24', '2026-09-25', '2026-09-28',
  '2026-10-01', '2026-10-02', '2026-10-05', '2026-10-06', '2026-10-07', '2026-10-08', '2026-10-09',
  '2026-10-13', '2026-10-14', '2026-10-15', '2026-10-16', '2026-10-19', '2026-10-20', '2026-10-21',
  '2026-10-22', '2026-10-23', '2026-10-26',
] as const

const formatoFecha = new Intl.DateTimeFormat('es-CO', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
})

export function fechaRentaPersonaNatural(nit: string) {
  const digitos = nit.replace(/\D/g, '')
  if (digitos.length < 2) return null
  const ultimos = Number(digitos.slice(-2))
  const indice = ultimos === 0 ? 49 : Math.ceil(ultimos / 2) - 1
  const iso = FECHAS_RENTA_PN_2026[indice]
  const par = ultimos === 0 ? 99 : indice * 2 + 1
  const rango = `${String(par).padStart(2, '0')} y ${String((par + 1) % 100).padStart(2, '0')}`
  return { iso, rango, ultimos: digitos.slice(-2), texto: formatoFecha.format(new Date(`${iso}T00:00:00Z`)) }
}
