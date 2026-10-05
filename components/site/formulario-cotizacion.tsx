'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { EMPRESA } from '@/lib/empresa'
import { CampoSelect } from '@/components/calculadoras/campos'

const opcionesServicio = [
  'Contabilidad general',
  'Declaración de renta',
  'Asesoría fiscal y tributaria',
  'Seguridad social y PILA',
  'Nómina y prestaciones',
  'Auditoría',
  'Asesoría financiera',
  'Constitución de empresa',
  'Software contable',
  'Trámites administrativos',
].map((s) => ({ value: s, label: s }))

export function FormularioCotizacion() {
  const [servicio, setServicio] = useState(opcionesServicio[0].value)

  function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const datos = new FormData(e.currentTarget)
    const asunto = `Solicitud de cotización: ${servicio}`
    const cuerpo = [
      `Nombre: ${datos.get('nombre')}`,
      `Teléfono: ${datos.get('telefono')}`,
      `Correo: ${datos.get('correo')}`,
      `Servicio: ${servicio}`,
      '',
      String(datos.get('mensaje') ?? ''),
    ].join('\n')
    window.location.href = `mailto:${EMPRESA.correo}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`
  }

  return (
    <form onSubmit={enviar} className="flex flex-col gap-4 rounded-2xl bg-card p-6 text-card-foreground shadow-lg md:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="cot-nombre">Nombre completo</Label>
          <Input id="cot-nombre" name="nombre" required autoComplete="name" className="h-10" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="cot-telefono">Teléfono</Label>
          <Input id="cot-telefono" name="telefono" type="tel" required autoComplete="tel" className="h-10" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="cot-correo">Correo electrónico</Label>
        <Input id="cot-correo" name="correo" type="email" required autoComplete="email" className="h-10" />
      </div>
      <CampoSelect id="cot-servicio" label="Servicio de interés" valor={servicio} onChange={setServicio} opciones={opcionesServicio} />
      <div className="flex flex-col gap-2">
        <Label htmlFor="cot-mensaje">Cuéntanos tu necesidad</Label>
        <textarea
          id="cot-mensaje"
          name="mensaje"
          rows={4}
          maxLength={1000}
          className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        />
      </div>
      <Button type="submit" size="lg" className="h-11">
        <Send data-icon="inline-start" aria-hidden="true" />
        Enviar solicitud
      </Button>
      <p className="text-center text-xs text-muted-foreground">Se abrirá tu correo con la solicitud lista para {EMPRESA.correo}</p>
    </form>
  )
}
