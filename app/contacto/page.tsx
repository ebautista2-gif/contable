import type { Metadata } from 'next'
import { Contacto } from '@/components/site/contacto'

export const metadata: Metadata = { title: 'Contacto | D&E Contadores' }

export default function Page() {
  return <Contacto />
}
