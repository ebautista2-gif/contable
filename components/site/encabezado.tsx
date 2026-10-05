'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Landmark } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { EMPRESA } from '@/lib/empresa'
import { cn } from '@/lib/utils'

export const PESTANAS = [
  { href: '/', label: 'Inicio' },
  { href: '/quienes-somos', label: 'Quiénes Somos' },
  { href: '/servicios', label: 'Servicios' },
  { href: '/calculadoras', label: 'Calculadoras' },
  { href: '/software', label: 'Software' },
  { href: '/seguridad-social', label: 'Seguridad Social' },
  { href: '/contacto', label: 'Contacto' },
] as const

export function Logo({ claro = false }: { claro?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="D&E Contadores, inicio">
      <span className="flex size-9 items-center justify-center rounded-md bg-primary text-accent ring-1 ring-accent/40">
        <Landmark className="size-5" aria-hidden="true" />
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-serif text-lg font-semibold tracking-wide ${claro ? 'text-background' : ''}`}>
          D&amp;E CONTADORES
        </span>
        <span className={`mt-1 text-[10px] uppercase tracking-[0.18em] ${claro ? 'text-background/60' : 'text-muted-foreground'}`}>
          Asesoría contable y tributaria
        </span>
      </span>
    </Link>
  )
}

function Pestanas({ className }: { className?: string }) {
  const ruta = usePathname()
  return (
    <ul className={className}>
      {PESTANAS.map((p) => {
        const activa = p.href === '/' ? ruta === '/' : ruta.startsWith(p.href)
        return (
          <li key={p.href}>
            <Link
              href={p.href}
              aria-current={activa ? 'page' : undefined}
              className={cn(
                'inline-flex border-b-2 py-1 transition-colors hover:text-foreground',
                activa ? 'border-accent font-medium text-foreground' : 'border-transparent',
              )}
            >
              {p.label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export function Encabezado() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 md:px-6">
        <Logo />
        <nav aria-label="Principal" className="hidden lg:block">
          <Pestanas className="flex items-center gap-5 text-sm text-muted-foreground" />
        </nav>
        <Button nativeButton={false} render={<a href={EMPRESA.whatsapp} target="_blank" rel="noopener noreferrer" />}>
          Solicitar asesoría
        </Button>
      </div>
      <nav aria-label="Secciones" className="border-t lg:hidden">
        <Pestanas className="mx-auto flex max-w-6xl gap-5 overflow-x-auto px-4 py-1.5 text-sm whitespace-nowrap text-muted-foreground md:px-6" />
      </nav>
    </header>
  )
}
