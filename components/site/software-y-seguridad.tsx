import { Check } from 'lucide-react'

const programas = [
  { nombre: 'Siigo', detalle: 'Contabilidad en la nube, facturación y nómina electrónica.' },
  { nombre: 'Alegra', detalle: 'Ideal para pymes y emprendedores que facturan electrónicamente.' },
  { nombre: 'Loggro', detalle: 'Gestión contable y operativa para comercios y restaurantes.' },
  { nombre: 'Russoft', detalle: 'Software contable y administrativo robusto para empresas.' },
]

const pasosSoftware = ['Diagnóstico y elección', 'Parametrización del plan de cuentas', 'Migración de saldos', 'Capacitación a tu equipo']

export function Software() {
  return (
    <section id="software" className="scroll-mt-28 mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <p className="text-sm font-medium text-primary">Software contable</p>
          <h2 className="mt-2 font-serif text-4xl leading-tight tracking-tight text-balance md:text-5xl">
            Implementamos y te enseñamos a usar tu software
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Dejamos tu sistema listo para facturar, llevar inventarios y generar reportes desde el primer día.
          </p>
          <ol className="mt-8 flex flex-col gap-3">
            {pasosSoftware.map((p, i) => (
              <li key={p} className="flex items-center gap-3 text-sm">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-accent">
                  {i + 1}
                </span>
                {p}
              </li>
            ))}
          </ol>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {programas.map((p) => (
            <li key={p.nombre} className="flex flex-col justify-between gap-6 rounded-xl border bg-card p-6">
              <p className="font-serif text-3xl tracking-tight text-primary">{p.nombre}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{p.detalle}</p>
            </li>
          ))}
          <li className="rounded-xl border border-dashed p-6 text-sm text-muted-foreground sm:col-span-2">
            ¿Usas otro programa? También trabajamos con World Office, Helisa y otras plataformas del mercado.
          </li>
        </ul>
      </div>
    </section>
  )
}

const bloques = [
  {
    titulo: 'Afiliaciones',
    items: ['Empleadores y trabajadores', 'EPS · Salud', 'AFP · Pensión', 'ARL · Riesgos laborales', 'CCF · Caja de compensación'],
  },
  {
    titulo: 'Liquidación de PILA',
    items: ['MiPlanilla', 'Aportes en Línea', 'SOI', 'Planillas de corrección', 'Novedades de ingreso y retiro'],
  },
  {
    titulo: 'Independientes y licencias',
    items: ['Cotización sobre el 40 % del ingreso', 'Contratistas de prestación de servicios', 'Incapacidades', 'Licencias de maternidad y paternidad'],
  },
]

export function SeguridadSocial() {
  return (
    <section id="seguridad-social" className="scroll-mt-28 bg-primary py-20 text-primary-foreground md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-accent">Seguridad social</p>
          <h2 className="mt-2 font-serif text-4xl leading-tight tracking-tight text-balance md:text-5xl">
            Trámites de seguridad social y PILA sin contratiempos
          </h2>
          <p className="mt-4 leading-relaxed text-primary-foreground/75">
            Evita sanciones de la UGPP y garantiza la cobertura de tu equipo. Nos encargamos de cada afiliación, novedad y
            pago mensual.
          </p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {bloques.map((b) => (
            <div key={b.titulo} className="rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 p-6">
              <h3 className="font-serif text-2xl tracking-tight">{b.titulo}</h3>
              <ul className="mt-5 flex flex-col gap-2.5 text-sm text-primary-foreground/85">
                {b.items.map((i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
