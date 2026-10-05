'use client'

import { useState } from 'react'
import { CalendarDays, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { enlaceWhatsApp } from '@/lib/empresa'
import { fechaRentaPersonaNatural } from '@/lib/tributario'

export function BuscadorCalendario() {
  const [nit, setNit] = useState('')
  const resultado = fechaRentaPersonaNatural(nit)

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
      <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-col gap-2">
          <Label htmlFor="nit-calendario">Número de cédula o NIT</Label>
          <Input
            id="nit-calendario"
            inputMode="numeric"
            autoComplete="off"
            placeholder="Ej: 1098765432"
            className="h-10 bg-card tabular-nums"
            value={nit}
            onChange={(e) => setNit(e.target.value.replace(/\D/g, '').slice(0, 12))}
            aria-describedby="nit-calendario-ayuda"
          />
          <p id="nit-calendario-ayuda" className="text-xs text-muted-foreground">
            Escríbelo sin el dígito de verificación. Usamos los dos últimos dígitos.
          </p>
        </div>
        <div className="rounded-xl border bg-card p-4 text-sm leading-relaxed text-muted-foreground">
          <p className="font-medium text-foreground">Declaración de renta personas naturales · año gravable 2025</p>
          <p className="mt-1">
            Plazos del 12 de agosto al 26 de octubre de 2026. Algunos municipios afectados por emergencias tienen
            plazos especiales; confírmalo con nosotros.
          </p>
        </div>
      </form>

      <div aria-live="polite">
        {resultado ? (
          <div className="flex h-full flex-col justify-between gap-6 rounded-xl bg-primary p-6 text-primary-foreground">
            <div>
              <p className="text-sm text-primary-foreground/80">
                NIT terminado en {resultado.ultimos} · grupo {resultado.rango}
              </p>
              <p className="mt-2 font-serif text-4xl leading-tight tracking-tight first-letter:uppercase">
                {resultado.texto}
              </p>
              <p className="mt-3 text-sm text-primary-foreground/80">
                Fecha límite para presentar y pagar tu declaración de renta. Presentarla tarde genera sanción mínima de
                10 UVT.
              </p>
            </div>
            <Button
              className="w-fit bg-accent text-accent-foreground hover:bg-accent/90"
              nativeButton={false}
              render={
                <a
                  href={enlaceWhatsApp(`Hola, mi NIT termina en ${resultado.ultimos} y quiero ayuda con mi declaración de renta.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              <MessageCircle data-icon="inline-start" aria-hidden="true" />
              Quiero que me la presenten
            </Button>
          </div>
        ) : (
          <div className="flex h-full min-h-56 flex-col items-center justify-center gap-3 rounded-xl border border-dashed bg-card p-6 text-center">
            <CalendarDays className="size-8 text-primary" aria-hidden="true" />
            <p className="max-w-xs text-sm text-muted-foreground">
              Ingresa al menos dos dígitos para ver tu fecha de vencimiento.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
