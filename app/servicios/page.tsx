import type { Metadata } from 'next'
import { Servicios } from '@/components/site/servicios'

export const metadata: Metadata = { title: 'Servicios | D&E Contadores' }

export default function Page() {
  return <Servicios />
}
