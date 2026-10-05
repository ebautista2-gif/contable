'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cop, type Concepto } from '@/lib/colombia'
import { cn } from '@/lib/utils'

const formatoNumero = new Intl.NumberFormat('es-CO', { maximumFractionDigits: 0 })

export function CampoMoneda({
  id,
  label,
  valor,
  onChange,
  ayuda,
}: {
  id: string
  label: string
  valor: number
  onChange: (valor: number) => void
  ayuda?: string
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-muted-foreground">
          $
        </span>
        <Input
          id={id}
          inputMode="numeric"
          autoComplete="off"
          className="h-10 bg-card pl-7 tabular-nums"
          value={valor ? formatoNumero.format(valor) : ''}
          placeholder="0"
          onChange={(e) => {
            const digitos = e.target.value.replace(/\D/g, '').slice(0, 12)
            onChange(digitos ? Number(digitos) : 0)
          }}
          aria-describedby={ayuda ? `${id}-ayuda` : undefined}
        />
      </div>
      {ayuda && (
        <p id={`${id}-ayuda`} className="text-xs text-muted-foreground">
          {ayuda}
        </p>
      )}
    </div>
  )
}

export function CampoSelect({
  id,
  label,
  valor,
  onChange,
  opciones,
}: {
  id: string
  label: string
  valor: string
  onChange: (valor: string) => void
  opciones: { value: string; label: string }[]
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      <select
        id={id}
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full rounded-lg border border-input bg-card px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        {opciones.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export function TablaConceptos({
  titulo,
  conceptos,
  total,
  etiquetaTotal,
  negativo,
}: {
  titulo: string
  conceptos: Concepto[]
  total: number
  etiquetaTotal: string
  negativo?: boolean
}) {
  return (
    <div className="flex flex-col">
      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{titulo}</h4>
      <dl className="divide-y divide-border">
        {conceptos.map((c) => (
          <div key={c.concepto} className="flex items-start justify-between gap-4 py-2.5">
            <div className="min-w-0">
              <dt className="text-sm font-medium">{c.concepto}</dt>
              <dd className="text-xs text-muted-foreground">{c.detalle}</dd>
            </div>
            <dd className={cn('shrink-0 text-sm tabular-nums', negativo && 'text-destructive')}>
              {negativo && c.valor > 0 ? '− ' : ''}
              {cop(c.valor)}
            </dd>
          </div>
        ))}
        <div className="flex items-center justify-between gap-4 py-2.5">
          <dt className="text-sm font-semibold">{etiquetaTotal}</dt>
          <dd className="text-sm font-semibold tabular-nums">{cop(total)}</dd>
        </div>
      </dl>
    </div>
  )
}

export function ResultadoDestacado({ etiqueta, valor, nota }: { etiqueta: string; valor: number; nota?: string }) {
  return (
    <div className="rounded-xl bg-primary p-5 text-primary-foreground">
      <p className="text-sm text-primary-foreground/80">{etiqueta}</p>
      <p className="mt-1 font-serif text-4xl tabular-nums tracking-tight" aria-live="polite">
        {cop(valor)}
      </p>
      {nota && <p className="mt-2 text-xs text-primary-foreground/70">{nota}</p>}
    </div>
  )
}
