export interface User {
  // Propiedades que vienen del backend
  nombre: string // en vez de name
  apellido: string // en vez de lastName
  rol: 'Aprendiz' | 'Instructor' | 'Administrativo' | ''
  tipo_documento: 'Cédula de ciudadania' | 'Tarjeta de identidad' | 'Cédula de extranjeria' | ''
  documento: string
  email: string

  // Propiedades del frontend (para registro / login)
  password?: string
  confirm?: string
  acepta_terminos?: boolean
}
