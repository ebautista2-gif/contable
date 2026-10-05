import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const pasos = [
  { numero: '01', titulo: 'Diagnóstico', texto: 'Revisamos tu situación contable, tributaria y laboral sin costo.' },
  { numero: '02', titulo: 'Plan a la medida', texto: 'Definimos alcance, calendario de obligaciones y tarifa fija mensual.' },
  { numero: '03', titulo: 'Ejecución', texto: 'Llevamos tu contabilidad, nómina y declaraciones a tiempo.' },
  { numero: '04', titulo: 'Reportes claros', texto: 'Recibes informes mensuales en lenguaje sencillo para decidir mejor.' },
]

const preguntas = [
  {
    p: '¿Cómo se calculan las cesantías en Colombia?',
    r: 'Se multiplica el salario mensual (más el auxilio de transporte si aplica) por los días trabajados en el año y se divide entre 360. Equivale a un mes de salario por cada año de trabajo.',
  },
  {
    p: '¿Qué incluye una liquidación de contrato?',
    r: 'Cesantías, intereses sobre cesantías (12% anual), prima de servicios proporcional del semestre, vacaciones pendientes y, si el despido es sin justa causa, la indemnización del artículo 64 del Código Sustantivo del Trabajo.',
  },
  {
    p: '¿Quién tiene derecho al auxilio de transporte?',
    r: 'Los trabajadores que devengan hasta dos salarios mínimos mensuales. En 2026 el auxilio es de $249.095 y se incluye en la base de cesantías y prima, pero no en la de vacaciones.',
  },
  {
    p: '¿Cuál es el plazo para pagar la liquidación?',
    r: 'Debe pagarse al momento de terminar el contrato. Si el empleador se demora sin justificación, puede generarse la indemnización moratoria del artículo 65 del CST, equivalente a un día de salario por cada día de retraso.',
  },
  {
    p: '¿Las calculadoras sustituyen la asesoría de un contador?',
    r: 'No. Ofrecen una estimación con los parámetros generales de 2026. Salarios variables, salario integral, convenciones colectivas o pactos especiales requieren un análisis individual.',
  },
]

export function Proceso() {
  return (
    <section id="proceso" className="scroll-mt-20 mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
      <div className="max-w-2xl">
        <p className="text-sm font-medium text-primary">Cómo trabajamos</p>
        <h2 className="mt-2 font-serif text-4xl leading-tight tracking-tight text-balance md:text-5xl">
          Un proceso simple, sin sorpresas
        </h2>
      </div>
      <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {pasos.map((paso) => (
          <li key={paso.numero} className="border-t-2 border-primary pt-5">
            <span className="font-serif text-2xl text-primary">{paso.numero}</span>
            <h3 className="mt-3 text-lg font-semibold">{paso.titulo}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{paso.texto}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

export function Preguntas() {
  return (
    <section id="preguntas" className="scroll-mt-20 border-t">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 md:px-6 md:py-28 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="text-sm font-medium text-primary">Preguntas frecuentes</p>
          <h2 className="mt-2 font-serif text-4xl leading-tight tracking-tight text-balance md:text-5xl">
            Lo que más nos preguntan
          </h2>
        </div>
        <Accordion className="w-full">
          {preguntas.map((item) => (
            <AccordionItem key={item.p} value={item.p}>
              <AccordionTrigger className="py-5 text-base">{item.p}</AccordionTrigger>
              <AccordionContent className="leading-relaxed text-muted-foreground">{item.r}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
