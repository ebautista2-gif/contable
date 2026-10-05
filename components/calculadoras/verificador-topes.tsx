'use client'

import { useState } from 'react'
import { CheckCircle2, CircleAlert } from 'lucide-react'
import { cop } from '@/lib/colombia'
import { UVT_2025, verificarTopes, type DatosTopes } from '@/lib/tributario'
import { cn } from '@/lib/utils'
import { CampoMoneda } from './campos'

const campos: { id: keyof Omit<DatosTopes, 'responsableIva'>; label: string; ayuda: string }[] = [
  { id: 'patrimonio', label: 'Patrimonio bruto a 31 de diciembre de 2025', ayuda: 'Bienes, cuentas, inversiones y vehículos, sin restar deudas.' },
  { id: 'ingresos', label: 'Ingresos brutos recibidos en 2025', ayuda: 'Salarios, honorarios, arriendos, ventas, intereses, etc.' },
  { id: 'tarjetaCredito', label: 'Consumos con tarjeta de crédito', ayuda: 'Total facturado en el año.' },
  { id: 'compras', label: 'Compras y consumos totales', ayuda: 'Con cualquier medio de pago.' },
  { id: 'consignaciones', label: 'Consignaciones, depósitos e inversiones', ayuda: 'Valor acumulado de todo el año.' },
]

export function VerificadorTopes() {
  const [datos, setDatos] = useState<DatosTopes>({
    patrimonio: 0,
    ingresos: 0,
    tarjetaCredito: 0,
    compras: 0,
    consignaciones: 0,
    responsableIva: false,
  })
  const { criterios, debeDeclarar } = verificarTopes(datos)

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
      <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
        {campos.map((c) => (
          <CampoMoneda
            key={c.id}
            id={`tope-${c.id}`}
            label={c.label}
            ayuda={c.ayuda}
            valor={datos[c.id]}
            onChange={(v) => setDatos((d) => ({ ...d, [c.id]: v }))}
          />
        ))}
        <label className="flex items-start gap-3 rounded-lg border bg-card p-3 text-sm">
          <input
            type="checkbox"
            className="mt-0.5 size-4 accent-primary"
            checked={datos.responsableIva}
            onChange={(e) => setDatos((d) => ({ ...d, responsableIva: e.target.checked }))}
          />
          <span>
            Fui responsable de IVA a 31 de diciembre de 2025
            <span className="block text-xs text-muted-foreground">Los responsables de IVA siempre deben declarar.</span>
          </span>
        </label>
      </form>

      <div className="flex flex-col gap-5">
        <div
          aria-live="polite"
          className={cn('flex items-start gap-3 rounded-xl p-5', debeDeclarar ? 'bg-primary text-primary-foreground' : 'bg-secondary')}
        >
          {debeDeclarar ? (
            <CircleAlert className="mt-1 size-5 shrink-0" aria-hidden="true" />
          ) : (
            <CheckCircle2 className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" />
          )}
          <div>
            <p className="font-serif text-2xl tracking-tight">
              {debeDeclarar ? 'Debes declarar renta en 2026' : 'Por ahora no estás obligado a declarar'}
            </p>
            <p className={cn('mt-1 text-sm', debeDeclarar ? 'text-primary-foreground/80' : 'text-muted-foreground')}>
              {debeDeclarar
                ? 'Superas al menos un tope del año gravable 2025. Te ayudamos a presentarla a tiempo.'
                : 'No superas ningún tope. Aun así, declarar voluntariamente puede permitir recuperar retenciones.'}
            </p>
          </div>
        </div>

        <div>
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Topes año gravable 2025 · UVT {cop(UVT_2025)}
          </h4>
          <ul className="divide-y rounded-xl border bg-card">
            {criterios.map((c) => (
              <li key={c.id} className="flex items-center justify-between gap-4 px-4 py-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium">{c.criterio}</p>
                  <p className="text-xs text-muted-foreground">Tope: {cop(c.tope)}</p>
                </div>
                <span
                  className={cn(
                    'shrink-0 rounded-full px-2.5 py-1 text-xs font-medium',
                    c.supera ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground',
                  )}
                >
                  {c.supera ? 'Supera' : 'No supera'}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
