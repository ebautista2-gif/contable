'use client'

import { Calculator, CalendarDays, Clock, Landmark, Wallet } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cop, PARAMETROS_2026 } from '@/lib/colombia'
import { UVT_2026 } from '@/lib/tributario'
import { BuscadorCalendario } from './buscador-calendario'
import { CalculadoraHorasExtras } from './calculadora-horas-extras'
import { CalculadoraLiquidacion } from './calculadora-liquidacion'
import { CalculadoraNomina } from './calculadora-nomina'
import { VerificadorTopes } from './verificador-topes'

const pestanas = [
  { value: 'liquidacion', label: 'Liquidación laboral', icono: Calculator, contenido: CalculadoraLiquidacion },
  { value: 'topes', label: 'Topes DIAN', icono: Landmark, contenido: VerificadorTopes },
  { value: 'calendario', label: 'Calendario tributario', icono: CalendarDays, contenido: BuscadorCalendario },
  { value: 'nomina', label: 'Costo empleador', icono: Wallet, contenido: CalculadoraNomina },
  { value: 'horas', label: 'Horas extras', icono: Clock, contenido: CalculadoraHorasExtras },
]

export function SeccionCalculadoras() {
  return (
    <section id="calculadoras" className="scroll-mt-28 border-y bg-secondary/40 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-primary">Herramientas gratuitas</p>
            <h2 className="mt-2 font-serif text-4xl leading-tight tracking-tight text-balance md:text-5xl">
              Calculadoras laborales y tributarias para Colombia
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Liquida prestaciones sociales, verifica si debes declarar renta y consulta tu fecha de vencimiento ante la
              DIAN. Los resultados son orientativos; para tu caso particular, agenda una asesoría.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-card">
              SMMLV {PARAMETROS_2026.anio}: {cop(PARAMETROS_2026.smmlv)}
            </Badge>
            <Badge variant="outline" className="bg-card">
              Auxilio transporte: {cop(PARAMETROS_2026.auxilioTransporte)}
            </Badge>
            <Badge variant="outline" className="bg-card">
              UVT 2026: {cop(UVT_2026)}
            </Badge>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border bg-background p-4 shadow-sm md:p-8">
          <Tabs defaultValue="liquidacion" className="gap-8">
            <TabsList className="h-auto! w-full flex-wrap justify-start bg-muted p-1 lg:w-fit">
              {pestanas.map(({ value, label, icono: Icono }) => (
                <TabsTrigger key={value} value={value} className="flex-none px-3 py-2">
                  <Icono aria-hidden="true" />
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>
            {pestanas.map(({ value, contenido: Contenido }) => (
              <TabsContent key={value} value={value}>
                <Contenido />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  )
}
