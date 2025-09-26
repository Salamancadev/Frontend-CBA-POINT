import axios from 'axios'
import type { AxiosInstance } from 'axios'

// // Crear instancia de Axios
// export const api: AxiosInstance = axios.create({
//   baseURL: 'http://localhost:8000/api',
// })

// Detectar si estamos en desarrollo o producción
const isDevelopment = import.meta.env.MODE === 'development'
const myBaseUrl = isDevelopment
  ? import.meta.env.VITE_API_BASE_URL_LOCAL
  : import.meta.env.VITE_API_BASE_URL_DEPLOY

// Crear instancia de Axios
export const api: AxiosInstance = axios.create({
  baseURL: myBaseUrl,
})

// Funciones para la API
export const apiService = {
  getSomething() {
    return api.get('/something')
  },
  postSomething(data: any) {
    return api.post('/something', data)
  },
}
