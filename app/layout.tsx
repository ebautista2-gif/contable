import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Newsreader } from 'next/font/google'
import { BotonWhatsApp, PiePagina } from '@/components/site/contacto'
import { Encabezado } from '@/components/site/encabezado'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const newsreader = Newsreader({ subsets: ['latin'], variable: '--font-newsreader' })

export const metadata: Metadata = {
  title: 'D&E Contadores | Asesoría contable y tributaria en Colombia',
  description:
    'Experiencia y profesionalismo a tu servicio. Contabilidad, impuestos, PILA y nómina. Calcula gratis tu liquidación laboral, topes DIAN y fecha de renta 2026.',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f9f8f3',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es-CO" className={`${inter.variable} ${newsreader.variable}`}>
      <body className="antialiased">
        <Encabezado />
        <main>{children}</main>
        <PiePagina />
        <BotonWhatsApp />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
