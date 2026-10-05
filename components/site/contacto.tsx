import { Mail, MapPin, MessageCircle, Navigation, Phone, UserRound } from 'lucide-react'
import { EMPRESA, MAPA } from '@/lib/empresa'
import { Logo } from './encabezado'
import { FormularioCotizacion } from './formulario-cotizacion'

export function Contacto() {
  return (
    <section id="contacto" className="scroll-mt-28 px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 rounded-3xl bg-foreground px-6 py-12 text-background md:px-12 md:py-16 lg:grid-cols-[1fr_1.2fr]">
        <div className="flex flex-col justify-between gap-10">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">Cotización y contacto</p>
            <h2 className="mt-3 font-serif text-4xl leading-tight tracking-tight text-balance md:text-5xl">
              Cuéntanos qué necesitas y te enviamos una propuesta
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-background/70">
              Contabilidad, PILA, declaración de renta o un trámite puntual: respondemos el mismo día hábil.
            </p>
          </div>
          <address className="flex flex-col gap-4 text-sm not-italic text-background/85">
            <p className="flex items-center gap-3">
              <UserRound className="size-4 text-accent" aria-hidden="true" />
              {EMPRESA.contador}
            </p>
            <p className="flex items-center gap-3">
              <MapPin className="size-4 text-accent" aria-hidden="true" />
              {EMPRESA.direccion}
            </p>
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <Phone className="size-4 text-accent" aria-hidden="true" />
              {EMPRESA.telefonos.map((t, i) => (
                <span key={t.href}>
                  {i > 0 && <span className="mr-3 text-background/40">ó</span>}
                  <a href={t.href} className="hover:text-accent">
                    {t.texto}
                  </a>
                </span>
              ))}
            </p>
            <a href={EMPRESA.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-accent">
              <MessageCircle className="size-4 text-accent" aria-hidden="true" />
              WhatsApp directo
            </a>
            <a href={`mailto:${EMPRESA.correo}`} className="flex items-center gap-3 break-all hover:text-accent">
              <Mail className="size-4 shrink-0 text-accent" aria-hidden="true" />
              {EMPRESA.correo}
            </a>
          </address>
        </div>
        <FormularioCotizacion />
      </div>
      <Ubicacion />
    </section>
  )
}

export function Ubicacion() {
  return (
    <div className="mx-auto mt-10 max-w-6xl">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium text-primary">Nuestra oficina</p>
          <h2 className="mt-1 font-serif text-3xl tracking-tight md:text-4xl">Encuéntranos en San Gil</h2>
          <p className="mt-2 flex items-center gap-2 text-muted-foreground">
            <MapPin className="size-4 text-primary" aria-hidden="true" />
            {EMPRESA.direccion}
          </p>
        </div>
        <a
          href={MAPA.enlace}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center gap-2 rounded-lg border bg-card px-4 py-2.5 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
        >
          <Navigation className="size-4" aria-hidden="true" />
          Cómo llegar con Google Maps
        </a>
      </div>
      <div className="mt-6 overflow-hidden rounded-2xl border shadow-sm">
        <iframe
          src={MAPA.embed}
          title={`Mapa de ubicación de ${EMPRESA.nombre}: ${EMPRESA.direccion}`}
          className="block h-80 w-full md:h-[420px]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </div>
  )
}

export function PiePagina() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between md:px-6">
        <Logo />
        <p className="max-w-xl text-xs leading-relaxed">
          Las calculadoras ofrecen valores estimados con base en el Código Sustantivo del Trabajo, el Estatuto Tributario y
          el calendario DIAN 2026. No reemplazan la asesoría profesional.
        </p>
        <p className="text-xs">© 2026 D&amp;E Contadores</p>
      </div>
    </footer>
  )
}

export function BotonWhatsApp() {
  return (
    <a
      href={EMPRESA.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed right-5 bottom-5 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
    >
      <MessageCircle className="size-7" aria-hidden="true" />
    </a>
  )
}
