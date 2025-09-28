// src/services/api.ts
import axios, { type AxiosInstance } from 'axios'

/* =========
 * Tipos
 * ========= */
export interface User {
  id: number
  name: string
  lastName: string
  email: string
  role: string
}

export interface LoginResponse {
  access: string
  refresh: string
  user: User
}

/* =========
 * Configuración base
 * ========= */
const isDevelopment = import.meta.env.MODE === 'development'
const baseUrl = isDevelopment
  ? import.meta.env.VITE_API_BASE_URL_LOCAL
  : import.meta.env.VITE_API_BASE_URL_DEPLOY

export const api: AxiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})

/* =========
 * Interceptor para adjuntar token
 * ========= */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

/* =========
 * Interceptor para refrescar token automáticamente
 * ========= */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const refresh = localStorage.getItem('refresh_token')
      if (refresh) {
        try {
          const res = await api.post<{ access: string }>('/refresh/', { refresh })
          localStorage.setItem('access_token', res.data.access)

          // reintentar petición original con nuevo token
          error.config.headers.Authorization = `Bearer ${res.data.access}`
          return api.request(error.config)
        } catch (refreshError) {
          console.error('Error al refrescar token:', refreshError)
          // aquí podrías limpiar storage y redirigir al login
        }
      }
    }
    return Promise.reject(error)
  }
)

/* =========
 * Servicios de API
 * ========= */
export const authService = {
  register(data: { name: string; email: string; password: string }) {
    return api.post('/register/', data)
  },
  login(data: { documento: string; password: string }) {
    return api.post<LoginResponse>('/login/', data)
  },
  refreshToken(refresh: string) {
    return api.post<{ access: string }>('/refresh/', { refresh })
  },
}

export const userService = {
  getProfile() {
    return api.get<User>('/perfil-usuario/')
  },
  updateProfile(data: Partial<User>) {
    return api.put<User>('/perfil-usuario/', data)
  },
}