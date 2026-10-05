'use client'

import { CheckCircle2, MessageCircle, PackageCheck, Target } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { enlaceWhatsApp } from '@/lib/empresa'
import { SERVICIOS } from '@/lib/servicios'

export function Servicios() {
  return (
    <section id="servicios" className="bg-muted/60 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-primary">Catálogo de servicios</p>
          <h1 className="mt-2 font-serif text-4xl leading-tight tracking-tight text-balance md:text-5xl">
            Todo lo contable, tributario y laboral en un solo equipo
          </h1>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Selecciona un servicio para conocer en detalle qué hacemos, qué recibes y para quién es ideal.
          </p>
        </div>

        <Tabs defaultValue={SERVICIOS[0].id} orientation="vertical" className="mt-10 flex flex-col gap-6 lg:flex-row lg:items-start">
          <TabsList
            variant="line"
            className="flex h-auto w-full flex-row gap-2 overflow-x-auto rounded-xl border bg-card p-2 lg:sticky lg:top-28 lg:w-72 lg:shrink-0 lg:flex-col lg:overflow-visible"
          >
            {SERVICIOS.map(({ id, titulo, icono: Icono }) => (
              <TabsTrigger
                key={id}
                value={id}
                className="h-auto shrink-0 justify-start gap-3 rounded-lg px-3 py-2.5 text-left whitespace-nowrap after:hidden data-active:bg-primary! data-active:text-primary-foreground! lg:w-full lg:whitespace-normal"
              >
                <Icono className="size-4" aria-hidden="true" />
                {titulo}
              </TabsTrigger>
            ))}
          </TabsList>

          {SERVICIOS.map(({ id, titulo, resumen, queHacemos, entregables, idealPara, icono: Icono }) => (
            <TabsContent key={id} value={id} className="min-w-0 rounded-2xl border bg-card p-6 text-base md:p-10">
              <div className="flex items-center gap-4">
                <span className="flex size-12 items-center justify-center rounded-xl bg-primary text-accent">
                  <Icono className="size-6" aria-hidden="true" />
                </span>
                <h2 className="font-serif text-3xl leading-tight tracking-tight md:text-4xl">{titulo}</h2>
              </div>
              <p className="mt-5 leading-relaxed text-muted-foreground">{resumen}</p>

              <h3 className="mt-8 text-sm font-semibold uppercase tracking-wider text-primary">Qué hacemos</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {queHacemos.map((item) => (
                  <li key={item} className="flex gap-3 leading-relaxed">
                    <CheckCircle2 className="mt-1 size-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <div className="rounded-xl bg-muted/70 p-5">
                  <h3 className="flex items-center gap-2 text-sm font-semibold">
                    <PackageCheck className="size-4 text-primary" aria-hidden="true" />
                    Lo que recibes
                  </h3>
                  <ul className="mt-3 flex flex-col gap-1.5 text-sm text-muted-foreground">
                    {entregables.map((e) => (
                      <li key={e}>{e}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl bg-muted/70 p-5">
                  <h3 className="flex items-center gap-2 text-sm font-semibold">
                    <Target className="size-4 text-primary" aria-hidden="true" />
                    Ideal para
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{idealPara}</p>
                </div>
              </div>

              <a
                href={enlaceWhatsApp(`Hola, quiero información sobre el servicio de ${titulo}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                Solicitar este servicio
              </a>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
