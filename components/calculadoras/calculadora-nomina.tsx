'use client'

import { useState } from 'react'
import { calcularNomina, cop, TARIFAS_ARL } from '@/lib/colombia'
import { CampoMoneda, CampoSelect, ResultadoDestacado, TablaConceptos } from './campos'

export function CalculadoraNomina() {
  const [salario, setSalario] = useState(1_750_905)
  const [nivelArl, setNivelArl] = useState('0')
  const [exonerada, setExonerada] = useState(true)

  const r = calcularNomina({ salario, nivelArl: Number(nivelArl), empresaExonerada: exonerada })

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
        <CampoMoneda id="nom-salario" label="Salario básico mensual" valor={salario} onChange={setSalario} />
        <CampoSelect
          id="nom-arl"
          label="Nivel de riesgo ARL"
          valor={nivelArl}
          onChange={setNivelArl}
          opciones={TARIFAS_ARL.map((t, i) => ({
            value: String(i),
            label: `Nivel ${t.nivel} · ${t.descripcion}`,
          }))}
        />
        <label className="flex cursor-pointer items-start gap-3 rounded-lg border bg-card p-4">
          <input
            type="checkbox"
            checked={exonerada}
            onChange={(e) => setExonerada(e.target.checked)}
            className="mt-0.5 size-4 accent-primary"
          />
          <span className="flex flex-col gap-1">
            <span className="text-sm font-medium">Empleador exonerado de salud, SENA e ICBF</span>
            <span className="text-xs text-muted-foreground">
              Aplica a personas jurídicas y naturales con dos o más empleados, para trabajadores que devenguen menos de 10
              SMMLV (Art. 114-1 del Estatuto Tributario).
            </span>
          </span>
        </label>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border bg-card p-4">
            <p className="text-xs text-muted-foreground">Total devengado</p>
            <p className="mt-1 text-lg font-semibold tabular-nums">{cop(r.devengado)}</p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <p className="text-xs text-muted-foreground">Costo total empleador</p>
            <p className="mt-1 text-lg font-semibold tabular-nums">{cop(r.costoTotal)}</p>
          </div>
        </div>
      </form>

      <div className="flex flex-col gap-6">
        <ResultadoDestacado
          etiqueta="Neto a pagar al trabajador (mensual)"
          valor={r.netoAPagar}
          nota={r.auxilio > 0 ? `Incluye auxilio de transporte de ${cop(r.auxilio)}` : 'Sin auxilio de transporte'}
        />
        <TablaConceptos
          titulo="Deducciones del trabajador"
          conceptos={r.deducciones}
          total={r.totalDeducciones}
          etiquetaTotal="Total deducciones"
          negativo
        />
        <TablaConceptos
          titulo="Aportes a cargo del empleador"
          conceptos={r.aportesEmpleador}
          total={r.totalAportes}
          etiquetaTotal="Total aportes"
        />
        <TablaConceptos
          titulo="Provisión mensual de prestaciones"
          conceptos={r.provisiones}
          total={r.totalProvisiones}
          etiquetaTotal="Total provisiones"
        />
        <p className="text-xs leading-relaxed text-muted-foreground">
          No incluye retención en la fuente ni otros devengos variables. El IBC mínimo es 1 SMMLV.
        </p>
      </div>
    </div>
  )
}
