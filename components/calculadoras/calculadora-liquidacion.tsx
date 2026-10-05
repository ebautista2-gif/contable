'use client'

import { useState } from 'react'
import { AlertCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  aplicaAuxilioTransporte,
  calcularLiquidacion,
  cop,
  PARAMETROS_2026,
  type MotivoRetiro,
  type TipoContrato,
} from '@/lib/colombia'
import { CampoMoneda, CampoSelect, ResultadoDestacado, TablaConceptos } from './campos'

export function CalculadoraLiquidacion() {
  const [salario, setSalario] = useState(2_500_000)
  const [fechaIngreso, setFechaIngreso] = useState('2024-03-01')
  const [fechaRetiro, setFechaRetiro] = useState('2026-05-10')
  const [diasDisfrutados, setDiasDisfrutados] = useState(15)
  const [tipoContrato, setTipoContrato] = useState<TipoContrato>('indefinido')
  const [motivo, setMotivo] = useState<MotivoRetiro>('renuncia')
  const [fechaFinContrato, setFechaFinContrato] = useState('2026-12-31')
  const [primaJunio, setPrimaJunio] = useState<'si' | 'no'>('si')

  const resultado = calcularLiquidacion({
    salario,
    fechaIngreso,
    fechaRetiro,
    diasVacacionesDisfrutados: diasDisfrutados,
    tipoContrato,
    motivo,
    fechaFinContrato,
    primaJunioPagada: primaJunio === 'si',
  })

  const mesRetiro = Number(fechaRetiro.split('-')[1] || 0)
  const retiroSegundoSemestre = mesRetiro > 6

  const conAuxilio = aplicaAuxilioTransporte(salario)

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
        <CampoMoneda
          id="liq-salario"
          label="Salario básico mensual"
          valor={salario}
          onChange={setSalario}
          ayuda={
            conAuxilio
              ? `Incluye auxilio de transporte de ${cop(PARAMETROS_2026.auxilioTransporte)} (salario ≤ 2 SMMLV).`
              : 'Sin auxilio de transporte (salario superior a 2 SMMLV).'
          }
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="liq-ingreso">Fecha de ingreso</Label>
            <Input
              id="liq-ingreso"
              type="date"
              className="h-10 bg-card"
              value={fechaIngreso}
              onChange={(e) => setFechaIngreso(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="liq-retiro">Fecha de retiro</Label>
            <Input
              id="liq-retiro"
              type="date"
              className="h-10 bg-card"
              value={fechaRetiro}
              onChange={(e) => setFechaRetiro(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="liq-vacaciones">Días de vacaciones ya disfrutados</Label>
          <Input
            id="liq-vacaciones"
            type="number"
            min={0}
            inputMode="numeric"
            className="h-10 bg-card tabular-nums"
            value={diasDisfrutados}
            onChange={(e) => setDiasDisfrutados(Math.max(0, Number(e.target.value)))}
          />
        </div>
        <div className="flex flex-col gap-2">
          <CampoSelect
            id="liq-prima-junio"
            label="¿Recibió la prima de mitad de año (junio)?"
            valor={retiroSegundoSemestre ? primaJunio : 'si'}
            onChange={(v) => setPrimaJunio(v as 'si' | 'no')}
            opciones={[
              { value: 'si', label: 'Sí, ya la recibí' },
              { value: 'no', label: 'No, está pendiente' },
            ]}
          />
          <p className="text-xs leading-relaxed text-muted-foreground">
            {retiroSegundoSemestre
              ? primaJunio === 'no'
                ? 'Se suma la prima del primer semestre (enero a junio) a la liquidación.'
                : 'Solo se liquida la prima proporcional del segundo semestre.'
              : 'Como el retiro es antes del 30 de junio, la prima de mitad de año ya se liquida de forma proporcional.'}
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <CampoSelect
            id="liq-contrato"
            label="Tipo de contrato"
            valor={tipoContrato}
            onChange={(v) => setTipoContrato(v as TipoContrato)}
            opciones={[
              { value: 'indefinido', label: 'Término indefinido' },
              { value: 'fijo', label: 'Término fijo' },
            ]}
          />
          <CampoSelect
            id="liq-motivo"
            label="Motivo de terminación"
            valor={motivo}
            onChange={(v) => setMotivo(v as MotivoRetiro)}
            opciones={[
              { value: 'renuncia', label: 'Renuncia voluntaria' },
              { value: 'justa-causa', label: 'Despido con justa causa' },
              { value: 'sin-justa-causa', label: 'Despido sin justa causa' },
            ]}
          />
        </div>
        {tipoContrato === 'fijo' && motivo === 'sin-justa-causa' && (
          <div className="flex flex-col gap-2">
            <Label htmlFor="liq-fin">Fecha de terminación pactada en el contrato</Label>
            <Input
              id="liq-fin"
              type="date"
              className="h-10 bg-card"
              value={fechaFinContrato}
              onChange={(e) => setFechaFinContrato(e.target.value)}
            />
          </div>
        )}
      </form>

      <div className="flex flex-col gap-6">
        {resultado.ok ? (
          <>
            <ResultadoDestacado
              etiqueta="Total estimado de la liquidación"
              valor={resultado.total}
              nota={`${resultado.diasTotales} días laborados (año comercial de 360 días)`}
            />
            <TablaConceptos
              titulo="Detalle de conceptos"
              conceptos={resultado.conceptos}
              total={resultado.total}
              etiquetaTotal="Total a pagar"
            />
            <p className="text-xs leading-relaxed text-muted-foreground">
              Supone que las cesantías de años anteriores ya fueron consignadas al fondo. No incluye salarios pendientes ni descuentos autorizados.
            </p>
          </>
        ) : (
          <div role="alert" className="flex items-start gap-3 rounded-xl border border-dashed p-5 text-sm text-muted-foreground">
            <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {resultado.error}
          </div>
        )}
      </div>
    </div>
  )
}
