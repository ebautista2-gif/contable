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
  type LucideIcon,
} from 'lucide-react'

export type Servicio = {
  id: string
  icono: LucideIcon
  titulo: string
  resumen: string
  queHacemos: string[]
  entregables: string[]
  idealPara: string
}

export const SERVICIOS: Servicio[] = [
  {
    id: 'contabilidad',
    icono: BookOpen,
    titulo: 'Contabilidad general',
    resumen:
      'Llevamos la contabilidad completa de tu negocio bajo NIIF para que tengas información financiera confiable y al día para tomar decisiones y cumplir con la ley.',
    queHacemos: [
      'Registro y causación de compras, ventas, gastos, nómina y movimientos bancarios.',
      'Conciliaciones bancarias, de cartera, proveedores e inventarios cada mes.',
      'Elaboración de estados financieros: balance general, estado de resultados, flujo de efectivo y cambios en el patrimonio.',
      'Revisión y validación de la facturación electrónica y documento soporte ante la DIAN.',
      'Cierre contable mensual y anual con notas a los estados financieros.',
      'Certificaciones contables firmadas por contador público para bancos, licitaciones o terceros.',
    ],
    entregables: ['Estados financieros mensuales', 'Libros contables actualizados', 'Informe de gestión con indicadores'],
    idealPara: 'Personas naturales comerciantes, pymes, sociedades S.A.S. y entidades sin ánimo de lucro.',
  },
  {
    id: 'tributaria',
    icono: Landmark,
    titulo: 'Asesoría fiscal y tributaria',
    resumen:
      'Preparamos y presentamos tus impuestos a tiempo, buscando legalmente la menor carga tributaria y evitando sanciones de la DIAN y de la administración municipal.',
    queHacemos: [
      'Declaración de renta de personas naturales y personas jurídicas.',
      'Declaraciones de IVA, retención en la fuente, autorretención e impuesto al consumo.',
      'Industria y comercio (ICA), avisos y tableros y reteICA en San Gil y otros municipios.',
      'Información exógena nacional y municipal.',
      'Inscripción y actualización del RUT, régimen simple de tributación (RST).',
      'Planeación tributaria anual y respuesta a requerimientos, emplazamientos y procesos de fiscalización.',
    ],
    entregables: ['Formularios presentados y pagados', 'Calendario tributario personalizado', 'Soportes de cada declaración'],
    idealPara: 'Asalariados, independientes, rentistas, comerciantes y empresas de cualquier tamaño.',
  },
  {
    id: 'auditoria',
    icono: ClipboardCheck,
    titulo: 'Auditoría y revisoría',
    resumen:
      'Evaluamos tus procesos y cifras con criterio independiente para detectar riesgos, errores o fraudes y asegurar el cumplimiento normativo.',
    queHacemos: [
      'Auditoría interna de procesos contables, de compras, ventas, inventarios y tesorería.',
      'Auditoría externa de estados financieros.',
      'Revisión de control interno y matriz de riesgos.',
      'Arqueos de caja, toma física de inventarios y verificación de activos fijos.',
      'Detección de inconsistencias, fugas de dinero o posibles fraudes.',
      'Apoyo en revisoría fiscal para entidades obligadas.',
    ],
    entregables: ['Informe de auditoría con hallazgos', 'Plan de mejoramiento', 'Dictamen cuando aplique'],
    idealPara: 'Empresas en crecimiento, propiedad horizontal, cooperativas y entidades obligadas a revisoría.',
  },
  {
    id: 'financiera',
    icono: LineChart,
    titulo: 'Asesoría financiera',
    resumen:
      'Convertimos tus números en decisiones: sabrás cuánto ganas realmente, cuánto puedes invertir y cómo proteger el flujo de caja.',
    queHacemos: [
      'Análisis de estados financieros e indicadores de liquidez, rentabilidad y endeudamiento.',
      'Elaboración de presupuestos anuales y control de ejecución.',
      'Proyecciones financieras y flujo de caja para solicitudes de crédito.',
      'Evaluación de proyectos de inversión (VPN, TIR, punto de equilibrio).',
      'Análisis de costos y fijación de precios.',
    ],
    entregables: ['Presupuesto y flujo de caja', 'Tablero de indicadores', 'Informe de viabilidad de proyectos'],
    idealPara: 'Emprendedores que buscan crédito o inversión y empresas que quieren crecer con orden.',
  },
  {
    id: 'consultoria',
    icono: Briefcase,
    titulo: 'Consultoría empresarial',
    resumen:
      'Te acompañamos desde la idea hasta la operación: elegimos contigo la figura jurídica correcta y organizamos los procesos de tu empresa.',
    queHacemos: [
      'Asesoría para elegir entre persona natural, S.A.S. u otro tipo societario.',
      'Constitución de empresas: estatutos, registro en Cámara de Comercio, RUT y cuentas bancarias.',
      'Diseño de procesos administrativos y de control.',
      'Estrategia de negocio y formalización empresarial.',
      'Reformas estatutarias, aumentos de capital, liquidación y cierre de sociedades.',
    ],
    entregables: ['Empresa constituida y lista para facturar', 'Manual de procesos básicos', 'Hoja de ruta de crecimiento'],
    idealPara: 'Emprendedores, negocios informales que quieren formalizarse y sociedades en reestructuración.',
  },
  {
    id: 'nomina',
    icono: Users,
    titulo: 'Nómina y recursos humanos',
    resumen:
      'Liquidamos tu nómina correctamente cada periodo y te asesoramos para cumplir la legislación laboral colombiana sin riesgos.',
    queHacemos: [
      'Liquidación de nómina quincenal o mensual con horas extras, recargos y deducciones.',
      'Nómina electrónica transmitida a la DIAN.',
      'Liquidación de prestaciones sociales: prima, cesantías, intereses y vacaciones.',
      'Liquidación de contratos laborales al terminar la relación.',
      'Elaboración de contratos, otrosíes, reglamento interno y certificados laborales.',
      'Asesoría en procesos disciplinarios, despidos y ante el Ministerio del Trabajo.',
    ],
    entregables: ['Desprendibles de pago', 'Nómina electrónica transmitida', 'Liquidaciones firmadas'],
    idealPara: 'Empleadores con uno o más trabajadores, incluyendo empleadas domésticas.',
  },
  {
    id: 'legal',
    icono: Scale,
    titulo: 'Servicios legales y regulatorios',
    resumen:
      'Mantenemos tu empresa al día con sus obligaciones societarias y normativas para que no tengas multas ni bloqueos.',
    queHacemos: [
      'Elaboración de actas de asamblea y junta directiva.',
      'Registro y actualización de libros oficiales (actas y accionistas).',
      'Reformas de estatutos y nombramientos de representantes legales.',
      'Cumplimiento ante Supersociedades, SAGRILAFT y protección de datos (RNBD) cuando aplique.',
      'Renovación anual de la matrícula mercantil.',
    ],
    entregables: ['Actas y libros al día', 'Certificados de cumplimiento', 'Matrícula renovada'],
    idealPara: 'Sociedades comerciales, juntas de acción comunal y entidades sin ánimo de lucro.',
  },
  {
    id: 'software',
    icono: MonitorCog,
    titulo: 'Implementación de software contable',
    resumen:
      'Configuramos el programa contable que mejor se adapta a tu negocio y capacitamos a tu equipo para usarlo desde el primer día.',
    queHacemos: [
      'Diagnóstico para elegir el software adecuado (Siigo, Alegra, Loggro, Russoft, World Office, entre otros).',
      'Parametrización de plan de cuentas, impuestos, inventarios y centros de costo.',
      'Habilitación de facturación electrónica y nómina electrónica.',
      'Migración de saldos iniciales e información histórica.',
      'Capacitación práctica al personal y soporte posterior.',
    ],
    entregables: ['Software configurado y operando', 'Facturación electrónica habilitada', 'Capacitación al equipo'],
    idealPara: 'Negocios que llevan cuentas en Excel o cambian de software contable.',
  },
  {
    id: 'tramites',
    icono: FileStack,
    titulo: 'Trámites administrativos y legales',
    resumen:
      'Nos encargamos del papeleo ante entidades públicas para que tú te concentres en tu negocio.',
    queHacemos: [
      'Registro mercantil, matrícula y renovación en Cámara de Comercio.',
      'Inscripción, actualización y cancelación del RUT ante la DIAN.',
      'Firma electrónica, habilitación de facturación y resolución de numeración.',
      'Registro en industria y comercio municipal.',
      'Trámites ante el Ministerio del Trabajo, licencias y permisos de funcionamiento.',
    ],
    entregables: ['Trámite radicado y aprobado', 'Certificados y constancias', 'Seguimiento hasta su cierre'],
    idealPara: 'Cualquier persona o empresa que necesite resolver un trámite puntual sin perder tiempo.',
  },
  {
    id: 'seguridad-social',
    icono: HeartPulse,
    titulo: 'Seguridad social y PILA',
    resumen:
      'Gestionamos afiliaciones y pagos de seguridad social de empleados e independientes para que siempre estés cubierto y al día.',
    queHacemos: [
      'Afiliación a EPS, fondo de pensiones (AFP), ARL y caja de compensación (CCF).',
      'Liquidación y pago mensual de la planilla PILA para empresas e independientes.',
      'Cálculo correcto del IBC para independientes (40 % de los ingresos).',
      'Trámite de incapacidades, licencias de maternidad y paternidad ante la EPS.',
      'Novedades de ingreso, retiro, traslados y corrección de planillas.',
    ],
    entregables: ['Planilla PILA pagada', 'Certificados de afiliación', 'Reconocimiento de incapacidades'],
    idealPara: 'Empleadores, contratistas independientes y trabajadores por prestación de servicios.',
  },
]
