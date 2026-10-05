import Image from 'next/image'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { EMPRESA, enlaceWhatsApp } from '@/lib/empresa'

export function Hero() {
  return (
    <section id="inicio" className="scroll-mt-28 bg-foreground text-background">
      <div className="relative">
        <div className="relative mx-auto aspect-[1408/768] max-h-[78vh] w-full">
          <Image
            src="/images/portada-de-contadores.jpg"
            alt="Letrero de D&E Contadores con balanza dorada en la recepción de la oficina: Asesoría contable y tributaria"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-foreground to-transparent" />
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 pt-6 pb-16 md:px-6 md:pb-24 lg:grid-cols-[1.4fr_1fr] lg:items-end">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">{EMPRESA.nombre}</p>
          <h1 className="mt-4 font-serif text-4xl leading-[1.05] tracking-tight text-balance md:text-6xl">
            Experiencia y profesionalismo a tu servicio
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-background/75">
            Una buena gestión presupuestaria y financiera es la base de toda decisión estratégica. Te damos información
            clara y oportuna para que tu empresa crezca con orden y cumpla a tiempo con la DIAN.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              size="lg"
              className="h-11 bg-accent px-5 text-accent-foreground hover:bg-accent/90"
              nativeButton={false}
              render={
                <a
                  href={enlaceWhatsApp('Hola, quiero solicitar una asesoría con D&E Contadores.')}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              <MessageCircle data-icon="inline-start" aria-hidden="true" />
              Solicitar asesoría
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-11 border-background/30 bg-transparent px-5 text-background hover:bg-background/10 hover:text-background"
              nativeButton={false}
              render={<a href="/calculadoras" />}
            >
              Probar calculadoras
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </Button>
          </div>
        </div>
        <dl className="grid grid-cols-3 gap-6 border-t border-background/15 pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
          {[
            { valor: '10', etiqueta: 'áreas de servicio' },
            { valor: '5', etiqueta: 'calculadoras gratis' },
            { valor: '100%', etiqueta: 'cumplimiento DIAN' },
          ].map((c) => (
            <div key={c.etiqueta} className="flex flex-col-reverse">
              <dt className="mt-1 text-xs text-background/60">{c.etiqueta}</dt>
              <dd className="font-serif text-3xl tracking-tight text-accent">{c.valor}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
