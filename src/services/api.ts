import axios from 'axios'
import type { AxiosInstance } from 'axios'

// Detectar si estamos en desarrollo o producción
const isDevelopment = import.meta.env.MODE === 'development'
const baseUrl = isDevelopment
  ? import.meta.env.VITE_API_BASE_URL_LOCAL
  : import.meta.env.VITE_API_BASE_URL_DEPLOY

// Crear instancia de Axios
export const api: AxiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Ejemplo de funciones de API
export const apiService = {
  registerUser(data: any) {
    return api.post('/register/', data) // solo '/register/' porque el baseURL ya tiene /api
  },
  loginUser(data: any) {
    return api.post('/login/', data)
  },
  getProfile() {
    return api.get('/perfil-usuario/')
  },
}