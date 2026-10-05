import { Mail, MapPin, Phone, UserRound } from 'lucide-react'
import { EMPRESA } from '@/lib/empresa'

const valores = [
  { titulo: 'Confidencialidad', texto: 'Tu información financiera se maneja con reserva absoluta.' },
  { titulo: 'Oportunidad', texto: 'Cada obligación se presenta antes de su vencimiento.' },
  { titulo: 'Cercanía', texto: 'Hablas directamente con el contador a cargo de tu cuenta.' },
]

export function QuienesSomos() {
  return (
    <section id="quienes-somos" className="scroll-mt-28 mx-auto grid max-w-6xl gap-12 px-4 py-20 md:px-6 md:py-28 lg:grid-cols-[1.3fr_1fr]">
      <div>
        <p className="text-sm font-medium text-primary">Quiénes somos</p>
        <h2 className="mt-2 font-serif text-4xl leading-tight tracking-tight text-balance md:text-5xl">
          Una firma contable que convierte tus cifras en decisiones
        </h2>
        <p className="mt-6 leading-relaxed text-muted-foreground">
          En D&amp;E Contadores acompañamos a personas naturales, emprendedores y empresas en su gestión contable,
          tributaria, laboral y financiera. Creemos que un presupuesto bien construido y unos estados financieros
          confiables son la herramienta más poderosa para dirigir un negocio.
        </p>
        <ul className="mt-10 grid gap-6 sm:grid-cols-3">
          {valores.map((v) => (
            <li key={v.titulo} className="border-t-2 border-accent pt-4">
              <h3 className="font-semibold">{v.titulo}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{v.texto}</p>
            </li>
          ))}
        </ul>
      </div>

      <aside className="flex flex-col gap-6 rounded-2xl border bg-card p-7 shadow-sm">
        <span className="flex size-12 items-center justify-center rounded-full bg-secondary text-primary">
          <UserRound className="size-6" aria-hidden="true" />
        </span>
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Contador a cargo</p>
          <p className="mt-1 font-serif text-2xl tracking-tight">{EMPRESA.contador}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Contador público. Lidera personalmente cada proceso contable, tributario y de seguridad social de nuestros
            clientes.
          </p>
        </div>
        <div className="flex flex-col gap-3 border-t pt-5 text-sm">
          <p className="flex items-center gap-3">
            <MapPin className="size-4 text-primary" aria-hidden="true" />
            {EMPRESA.direccion}
          </p>
          {EMPRESA.telefonos.map((t) => (
            <a key={t.href} href={t.href} className="flex items-center gap-3 hover:text-primary">
              <Phone className="size-4 text-primary" aria-hidden="true" />
              {t.texto}
            </a>
          ))}
          <a href={`mailto:${EMPRESA.correo}`} className="flex items-center gap-3 break-all hover:text-primary">
            <Mail className="size-4 shrink-0 text-primary" aria-hidden="true" />
            {EMPRESA.correo}
          </a>
        </div>
      </aside>
    </section>
  )
}
