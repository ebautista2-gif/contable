import type { Metadata } from 'next'
import { SeccionCalculadoras } from '@/components/calculadoras/seccion-calculadoras'

export const metadata: Metadata = { title: 'Calculadoras laborales y tributarias | D&E Contadores' }

export default function Page() {
  return <SeccionCalculadoras />
}
