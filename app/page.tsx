import { SeccionCalculadoras } from '@/components/calculadoras/seccion-calculadoras'
import { BotonWhatsApp, Contacto, PiePagina } from '@/components/site/contacto'
import { Encabezado } from '@/components/site/encabezado'
import { Hero } from '@/components/site/hero'
import { Preguntas } from '@/components/site/proceso-y-preguntas'
import { QuienesSomos } from '@/components/site/quienes-somos'
import { Servicios } from '@/components/site/servicios'
import { SeguridadSocial, Software } from '@/components/site/software-y-seguridad'

export default function Page() {
  return (
    <>
      <Encabezado />
      <main>
        <Hero />
        <QuienesSomos />
        <Servicios />
        <SeccionCalculadoras />
        <Software />
        <SeguridadSocial />
        <Preguntas />
        <Contacto />
      </main>
      <PiePagina />
      <BotonWhatsApp />
    </>
  )
}
