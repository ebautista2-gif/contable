import type { Metadata } from 'next'
import { QuienesSomos } from '@/components/site/quienes-somos'

export const metadata: Metadata = { title: 'Quiénes Somos | D&E Contadores' }

export default function Page() {
  return <QuienesSomos />
}
