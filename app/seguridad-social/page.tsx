import type { Metadata } from 'next'
import { SeguridadSocial } from '@/components/site/software-y-seguridad'

export const metadata: Metadata = { title: 'Seguridad Social | D&E Contadores' }

export default function Page() {
  return <SeguridadSocial />
}
