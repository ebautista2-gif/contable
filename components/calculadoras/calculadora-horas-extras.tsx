'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { calcularHorasExtras, cop, PARAMETROS_2026, TIPOS_HORA, type IdTipoHora } from '@/lib/colombia'
import { CampoMoneda, ResultadoDestacado } from './campos'

export function CalculadoraHorasExtras() {
  const [salario, setSalario] = useState(2_200_000)
  const [horas, setHoras] = useState<Partial<Record<IdTipoHora, number>>>({ hed: 6, rn: 8 })

  const r = calcularHorasExtras(salario, horas)

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
        <CampoMoneda
          id="he-salario"
          label="Salario básico mensual"
          valor={salario}
          onChange={setSalario}
          ayuda={`Valor hora ordinaria: ${cop(r.valorHora)} (salario ÷ ${PARAMETROS_2026.horasMensuales} horas)`}
        />
        <fieldset className="flex flex-col gap-3">
          <legend className="mb-1 text-sm font-medium">Horas trabajadas en el mes</legend>
          {TIPOS_HORA.map((tipo) => (
            <div key={tipo.id} className="flex items-center justify-between gap-4 rounded-lg border bg-card px-4 py-2.5">
              <label htmlFor={`he-${tipo.id}`} className="flex min-w-0 flex-col">
                <span className="text-sm font-medium">{tipo.nombre}</span>
                <span className="text-xs text-muted-foreground">{tipo.nota}</span>
              </label>
              <Input
                id={`he-${tipo.id}`}
                type="number"
                min={0}
                step={0.5}
                inputMode="decimal"
                className="h-9 w-20 bg-background text-right tabular-nums"
                value={horas[tipo.id] ?? ''}
                placeholder="0"
                onChange={(e) =>
                  setHoras((prev) => ({ ...prev, [tipo.id]: Math.max(0, Number(e.target.value) || 0) }))
                }
              />
            </div>
          ))}
        </fieldset>
      </form>

      <div className="flex flex-col gap-6">
        <ResultadoDestacado
          etiqueta="Total a pagar por horas extras y recargos"
          valor={r.total}
          nota="Valor adicional al salario básico del mes"
        />
        <div>
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Detalle</h4>
          <dl className="divide-y divide-border">
            {r.detalle.map((d) => (
              <div key={d.id} className="flex items-start justify-between gap-4 py-2.5">
                <div className="min-w-0">
                  <dt className="text-sm font-medium">{d.nombre}</dt>
                  <dd className="text-xs text-muted-foreground tabular-nums">
                    {d.cantidad} h × {cop(r.valorHora)} × {d.factor.toFixed(2)}
                  </dd>
                </div>
                <dd className="shrink-0 text-sm tabular-nums">{cop(d.valor)}</dd>
              </div>
            ))}
          </dl>
        </div>
        <p className="text-xs leading-relaxed text-muted-foreground">
          Según la Ley 2466 de 2025: jornada nocturna desde las 7 p.m. y recargo dominical/festivo del{' '}
          {PARAMETROS_2026.recargoDominical * 100}% (sube a 90% desde el 1 de julio de 2026). Jornada máxima de 44 horas
          semanales hasta el 15 de julio de 2026.
        </p>
      </div>
    </div>
  )
}
