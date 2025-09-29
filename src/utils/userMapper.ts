import type { User } from '../types/User'

export const mapBackendUser = (backendUser: any): User => {
  return {
    nombre: backendUser.nombre || '',
    apellido: backendUser.apellido || '',
    rol: backendUser.rol || '',
    tipo_documento: backendUser.tipo_documento || '',
    documento: backendUser.documento || '',
    email: backendUser.email || '',

    // Opcionales para frontend
    password: backendUser.password || '',
    confirm: backendUser.confirm || '',
    acepta_terminos: backendUser.acepta_terminos || false,
  }
}
