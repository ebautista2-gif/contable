import Link from 'next/link'
import { ArrowRight, Briefcase, Calculator, HeartPulse, Laptop, Phone, Users } from 'lucide-react'

const accesos = [
  { href: '/quienes-somos', titulo: 'Quiénes Somos', texto: 'Conoce a nuestro equipo y nuestra trayectoria.', icono: Users },
  { href: '/servicios', titulo: 'Servicios', texto: 'Contabilidad, impuestos, nómina y asesoría.', icono: Briefcase },
  { href: '/calculadoras', titulo: 'Calculadoras', texto: 'Liquidación, nómina, horas extras y topes DIAN.', icono: Calculator },
  { href: '/software', titulo: 'Software', texto: 'Herramientas contables que manejamos.', icono: Laptop },
  { href: '/seguridad-social', titulo: 'Seguridad Social', texto: 'Afiliaciones y pago de planilla PILA.', icono: HeartPulse },
  { href: '/contacto', titulo: 'Contacto', texto: 'Visítanos, llámanos o escríbenos.', icono: Phone },
]

export function Accesos() {
  return (
    <section aria-labelledby="accesos-titulo" className="mx-auto max-w-6xl px-4 py-20 md:px-6">
      <h2 id="accesos-titulo" className="font-serif text-3xl font-semibold text-balance md:text-4xl">
        ¿En qué podemos ayudarte?
      </h2>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {accesos.map(({ href, titulo, texto, icono: Icono }) => (
          <li key={href}>
            <Link
              href={href}
              className="group flex h-full flex-col gap-3 rounded-lg border bg-card p-6 transition-colors hover:border-accent"
            >
              <Icono className="size-6 text-accent" aria-hidden="true" />
              <span className="font-serif text-xl font-semibold">{titulo}</span>
              <span className="text-sm leading-relaxed text-muted-foreground">{texto}</span>
              <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium">
                Ver más
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
