export const EMPRESA = {
  nombre: 'D&E Contadores',
  eslogan: 'Experiencia y profesionalismo a tu servicio',
  contador: 'Edwin Fernando Bautista Sánchez',
  direccion: 'Carrera 17 # 20-06, San Gil, Santander',
  telefonos: [
    { texto: '350 424 7757', href: 'tel:+573504247757' },
    { texto: '301 268 9918', href: 'tel:+573012689918' },
  ],
  correo: 'contadoresprofesionales123@gmail.com',
  whatsapp: 'https://wa.me/573504247757',
} as const

const consultaMapa = encodeURIComponent('Carrera 17 #20-06, San Gil, Santander, Colombia')

export const MAPA = {
  embed: `https://www.google.com/maps?q=${consultaMapa}&z=17&output=embed`,
  enlace: `https://www.google.com/maps/search/?api=1&query=${consultaMapa}`,
}

export function enlaceWhatsApp(mensaje: string) {
  return `${EMPRESA.whatsapp}?text=${encodeURIComponent(mensaje)}`
}
