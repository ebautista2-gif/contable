import type { Metadata } from 'next'
import { Software } from '@/components/site/software-y-seguridad'

export const metadata: Metadata = { title: 'Software | D&E Contadores' }

export default function Page() {
  return <Software />
}
