import {
  BookOpen,
  Briefcase,
  ClipboardCheck,
  FileStack,
  HeartPulse,
  Landmark,
  LineChart,
  MonitorCog,
  Scale,
  Users,
} from 'lucide-react'

const servicios = [
  { icono: BookOpen, titulo: 'Contabilidad general', descripcion: 'Registro de operaciones, estados financieros (balance, resultados, flujo de efectivo) y supervisión contable.' },
  { icono: Landmark, titulo: 'Asesoría fiscal y tributaria', descripcion: 'Declaraciones de impuestos, planeación fiscal y representación ante la DIAN.' },
  { icono: ClipboardCheck, titulo: 'Auditoría', descripcion: 'Auditoría interna y externa, detección de fraudes o errores y cumplimiento normativo.' },
  { icono: LineChart, titulo: 'Asesoría financiera', descripcion: 'Análisis económico, presupuestos, proyecciones y evaluación de proyectos de inversión.' },
  { icono: Briefcase, titulo: 'Consultoría empresarial', descripcion: 'Constitución de empresas, estrategia de negocio y mejora de procesos.' },
  { icono: Users, titulo: 'Nómina y recursos humanos', descripcion: 'Procesamiento de nómina, prestaciones sociales y asesoría laboral.' },
  { icono: Scale, titulo: 'Servicios legales y regulatorios', descripcion: 'Cumplimiento normativo y temas societarios: actas, libros oficiales y estatutos.' },
  { icono: MonitorCog, titulo: 'Implementación de software contable', descripcion: 'Configuración y capacitación en Siigo, Alegra, Loggro, Russoft, entre otros.' },
  { icono: FileStack, titulo: 'Trámites administrativos y legales', descripcion: 'Registro mercantil, Cámara de Comercio, Ministerio del Trabajo y licencias.' },
  { icono: HeartPulse, titulo: 'Seguridad social y PILA', descripcion: 'Afiliaciones a EPS, AFP, ARL y CCF, liquidación de PILA, independientes y licencias.' },
]

export function Servicios() {
  return (
    <section id="servicios" className="scroll-mt-28 bg-muted/60 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-primary">Catálogo de servicios</p>
          <h2 className="mt-2 font-serif text-4xl leading-tight tracking-tight text-balance md:text-5xl">
            Todo lo contable, tributario y laboral en un solo equipo
          </h2>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {servicios.map(({ icono: Icono, titulo, descripcion }) => (
            <li
              key={titulo}
              className="group flex flex-col gap-4 rounded-xl border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
            >
              <span className="flex size-10 items-center justify-center rounded-lg bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-accent">
                <Icono className="size-5" aria-hidden="true" />
              </span>
              <h3 className="font-semibold leading-snug">{titulo}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{descripcion}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
