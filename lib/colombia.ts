export const PARAMETROS_2026 = {
  anio: 2026,
  smmlv: 1_750_905,
  auxilioTransporte: 249_095,
  horasMensuales: 220,
  recargoDominical: 0.8,
} as const

const { smmlv, auxilioTransporte, horasMensuales, recargoDominical } = PARAMETROS_2026

export const formatoCOP = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
})

export function cop(valor: number) {
  return formatoCOP.format(Math.round(valor))
}

type FechaPartes = { y: number; m: number; d: number }

function partes(fecha: string): FechaPartes | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(fecha)
  if (!match) return null
  return { y: Number(match[1]), m: Number(match[2]), d: Number(match[3]) }
}

function ultimoDiaDelMes(y: number, m: number) {
  return new Date(Date.UTC(y, m, 0)).getUTCDate()
}

function compararFechas(a: FechaPartes, b: FechaPartes) {
  return a.y - b.y || a.m - b.m || a.d - b.d
}

function maxFecha(a: FechaPartes, b: FechaPartes) {
  return compararFechas(a, b) >= 0 ? a : b
}

/** Días comerciales (año de 360 días), incluyendo el día inicial y el final. */
export function dias360(inicio: FechaPartes, fin: FechaPartes) {
  if (compararFechas(fin, inicio) < 0) return 0
  const d1 = Math.min(inicio.d, 30)
  const d2 = fin.d === ultimoDiaDelMes(fin.y, fin.m) ? 30 : Math.min(fin.d, 30)
  return (fin.y - inicio.y) * 360 + (fin.m - inicio.m) * 30 + (d2 - d1) + 1
}

export function aplicaAuxilioTransporte(salario: number) {
  return salario > 0 && salario <= smmlv * 2
}

export type TipoContrato = 'indefinido' | 'fijo'
export type MotivoRetiro = 'renuncia' | 'justa-causa' | 'sin-justa-causa'

export type DatosLiquidacion = {
  salario: number
  fechaIngreso: string
  fechaRetiro: string
  diasVacacionesDisfrutados: number
  tipoContrato: TipoContrato
  motivo: MotivoRetiro
  fechaFinContrato?: string
  primaJunioPagada?: boolean
}

export type Concepto = {
  concepto: string
  detalle: string
  valor: number
}

export type ResultadoLiquidacion =
  | { ok: false; error: string }
  | {
      ok: true
      diasTotales: number
      baseConAuxilio: number
      conceptos: Concepto[]
      total: number
    }

export function calcularLiquidacion(datos: DatosLiquidacion): ResultadoLiquidacion {
  const ingreso = partes(datos.fechaIngreso)
  const retiro = partes(datos.fechaRetiro)

  if (!datos.salario || datos.salario <= 0) {
    return { ok: false, error: 'Ingresa el salario mensual del trabajador.' }
  }
  if (!ingreso || !retiro) {
    return { ok: false, error: 'Ingresa las fechas de ingreso y de retiro.' }
  }
  if (compararFechas(retiro, ingreso) < 0) {
    return { ok: false, error: 'La fecha de retiro debe ser posterior a la fecha de ingreso.' }
  }

  const salario = datos.salario
  const auxilio = aplicaAuxilioTransporte(salario) ? auxilioTransporte : 0
  const base = salario + auxilio
  const diasTotales = dias360(ingreso, retiro)

  const inicioCesantias = maxFecha(ingreso, { y: retiro.y, m: 1, d: 1 })
  const diasCesantias = dias360(inicioCesantias, retiro)
  const cesantias = (base * diasCesantias) / 360
  const intereses = (cesantias * diasCesantias * 0.12) / 360

  const inicioSemestre: FechaPartes = { y: retiro.y, m: retiro.m <= 6 ? 1 : 7, d: 1 }
  const diasPrima = dias360(maxFecha(ingreso, inicioSemestre), retiro)
  const prima = (base * diasPrima) / 360

  function primaPrimerSemestrePendiente(): Concepto[] {
    if (retiro.m <= 6 || datos.primaJunioPagada !== false) return []
    const finJunio: FechaPartes = { y: retiro.y, m: 6, d: 30 }
    if (compararFechas(ingreso!, finJunio) > 0) return []
    const dias = dias360(maxFecha(ingreso!, { y: retiro.y, m: 1, d: 1 }), finJunio)
    return [
      {
        concepto: 'Prima de mitad de año pendiente',
        detalle: `${dias} días del primer semestre de ${retiro.y} no pagados · (salario + auxilio) × días ÷ 360`,
        valor: (base * dias) / 360,
      },
    ]
  }

  const diasVacacionesCausados = (diasTotales * 15) / 360
  const diasVacacionesPendientes = Math.max(
    0,
    diasVacacionesCausados - Math.max(0, datos.diasVacacionesDisfrutados || 0),
  )
  const vacaciones = (salario / 30) * diasVacacionesPendientes

  const conceptos: Concepto[] = [
    {
      concepto: 'Cesantías',
      detalle: `${diasCesantias} días de ${retiro.y} · (salario + auxilio) × días ÷ 360`,
      valor: cesantias,
    },
    {
      concepto: 'Intereses sobre cesantías',
      detalle: `12% anual proporcional · cesantías × días × 12% ÷ 360`,
      valor: intereses,
    },
    {
      concepto: 'Prima de servicios',
      detalle: `${diasPrima} días del semestre · (salario + auxilio) × días ÷ 360`,
      valor: prima,
    },
    ...primaPrimerSemestrePendiente(),
    {
      concepto: 'Vacaciones',
      detalle: `${diasVacacionesPendientes.toFixed(2)} días pendientes · salario ÷ 30 × días`,
      valor: vacaciones,
    },
  ]

  if (datos.motivo === 'sin-justa-causa') {
    const salarioDiario = salario / 30
    if (datos.tipoContrato === 'indefinido') {
      const esAlto = salario >= smmlv * 10
      const primerAnio = esAlto ? 20 : 30
      const adicional = esAlto ? 15 : 20
      const diasIndemnizacion =
        diasTotales <= 360 ? primerAnio : primerAnio + (adicional * (diasTotales - 360)) / 360
      conceptos.push({
        concepto: 'Indemnización sin justa causa',
        detalle: `Art. 64 CST · ${diasIndemnizacion.toFixed(2)} días de salario (${primerAnio} el primer año + ${adicional} por año adicional)`,
        valor: salarioDiario * diasIndemnizacion,
      })
    } else {
      const fin = datos.fechaFinContrato ? partes(datos.fechaFinContrato) : null
      if (!fin) {
        return { ok: false, error: 'Para contrato a término fijo, ingresa la fecha de terminación pactada.' }
      }
      if (compararFechas(fin, retiro) <= 0) {
        return { ok: false, error: 'La fecha de terminación pactada debe ser posterior a la fecha de retiro.' }
      }
      const diasFaltantes = dias360(retiro, fin) - 1
      conceptos.push({
        concepto: 'Indemnización sin justa causa',
        detalle: `Art. 64 CST · ${diasFaltantes} días faltantes del contrato`,
        valor: salarioDiario * diasFaltantes,
      })
    }
  }

  const total = conceptos.reduce((suma, c) => suma + c.valor, 0)
  return { ok: true, diasTotales, baseConAuxilio: base, conceptos, total }
}

export const TARIFAS_ARL = [
  { nivel: 'I', tarifa: 0.00522, descripcion: 'Riesgo mínimo (oficina)' },
  { nivel: 'II', tarifa: 0.01044, descripcion: 'Riesgo bajo' },
  { nivel: 'III', tarifa: 0.02436, descripcion: 'Riesgo medio' },
  { nivel: 'IV', tarifa: 0.0435, descripcion: 'Riesgo alto' },
  { nivel: 'V', tarifa: 0.0696, descripcion: 'Riesgo máximo' },
] as const

function tasaFondoSolidaridad(salario: number) {
  const veces = salario / smmlv
  if (veces < 4) return 0
  if (veces < 16) return 0.01
  if (veces < 17) return 0.012
  if (veces < 18) return 0.014
  if (veces < 19) return 0.016
  if (veces < 20) return 0.018
  return 0.02
}

export type DatosNomina = {
  salario: number
  nivelArl: number
  empresaExonerada: boolean
}

export function calcularNomina({ salario, nivelArl, empresaExonerada }: DatosNomina) {
  const auxilio = aplicaAuxilioTransporte(salario) ? auxilioTransporte : 0
  const ibc = Math.max(salario, smmlv)
  const tasaFsp = tasaFondoSolidaridad(salario)
  const exonerado = empresaExonerada && salario < smmlv * 10

  const deducciones: Concepto[] = [
    { concepto: 'Salud', detalle: '4% del IBC', valor: ibc * 0.04 },
    { concepto: 'Pensión', detalle: '4% del IBC', valor: ibc * 0.04 },
  ]
  if (tasaFsp > 0) {
    deducciones.push({
      concepto: 'Fondo de solidaridad pensional',
      detalle: `${(tasaFsp * 100).toFixed(1)}% · salario ≥ 4 SMMLV`,
      valor: ibc * tasaFsp,
    })
  }

  const devengado = salario + auxilio
  const totalDeducciones = deducciones.reduce((s, c) => s + c.valor, 0)

  const arl = TARIFAS_ARL[nivelArl] ?? TARIFAS_ARL[0]
  const aportesEmpleador: Concepto[] = [
    {
      concepto: 'Salud',
      detalle: exonerado ? 'Exonerado · Art. 114-1 ET' : '8,5% del IBC',
      valor: exonerado ? 0 : ibc * 0.085,
    },
    { concepto: 'Pensión', detalle: '12% del IBC', valor: ibc * 0.12 },
    { concepto: `ARL nivel ${arl.nivel}`, detalle: `${(arl.tarifa * 100).toFixed(3)}% del IBC`, valor: ibc * arl.tarifa },
    { concepto: 'Caja de compensación', detalle: '4% del IBC', valor: ibc * 0.04 },
    {
      concepto: 'ICBF',
      detalle: exonerado ? 'Exonerado · Art. 114-1 ET' : '3% del IBC',
      valor: exonerado ? 0 : ibc * 0.03,
    },
    {
      concepto: 'SENA',
      detalle: exonerado ? 'Exonerado · Art. 114-1 ET' : '2% del IBC',
      valor: exonerado ? 0 : ibc * 0.02,
    },
  ]

  const provisiones: Concepto[] = [
    { concepto: 'Cesantías', detalle: '8,33% de salario + auxilio', valor: devengado * 0.0833 },
    { concepto: 'Intereses cesantías', detalle: '1% de salario + auxilio', valor: devengado * 0.01 },
    { concepto: 'Prima de servicios', detalle: '8,33% de salario + auxilio', valor: devengado * 0.0833 },
    { concepto: 'Vacaciones', detalle: '4,17% del salario', valor: salario * 0.0417 },
  ]

  const totalAportes = aportesEmpleador.reduce((s, c) => s + c.valor, 0)
  const totalProvisiones = provisiones.reduce((s, c) => s + c.valor, 0)

  return {
    auxilio,
    devengado,
    deducciones,
    totalDeducciones,
    netoAPagar: devengado - totalDeducciones,
    aportesEmpleador,
    totalAportes,
    provisiones,
    totalProvisiones,
    costoTotal: devengado + totalAportes + totalProvisiones,
  }
}

export const TIPOS_HORA = [
  { id: 'hed', nombre: 'Hora extra diurna', factor: 1.25, nota: '+25%' },
  { id: 'hen', nombre: 'Hora extra nocturna', factor: 1.75, nota: '+75%' },
  { id: 'rn', nombre: 'Recargo nocturno', factor: 0.35, nota: '+35% (7 p.m. – 6 a.m.)' },
  {
    id: 'rdf',
    nombre: 'Recargo dominical / festivo',
    factor: recargoDominical,
    nota: `+${recargoDominical * 100}%`,
  },
  {
    id: 'heddf',
    nombre: 'Extra diurna dominical / festiva',
    factor: 1 + 0.25 + recargoDominical,
    nota: `+${Math.round((0.25 + recargoDominical) * 100)}%`,
  },
  {
    id: 'hendf',
    nombre: 'Extra nocturna dominical / festiva',
    factor: 1 + 0.75 + recargoDominical,
    nota: `+${Math.round((0.75 + recargoDominical) * 100)}%`,
  },
] as const

export type IdTipoHora = (typeof TIPOS_HORA)[number]['id']

export function calcularHorasExtras(salario: number, horas: Partial<Record<IdTipoHora, number>>) {
  const valorHora = salario / horasMensuales
  const detalle = TIPOS_HORA.map((tipo) => {
    const cantidad = Math.max(0, horas[tipo.id] ?? 0)
    return { ...tipo, cantidad, valor: valorHora * tipo.factor * cantidad }
  })
  return {
    valorHora,
    detalle,
    total: detalle.reduce((s, d) => s + d.valor, 0),
  }
}
