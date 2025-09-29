/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL_LOCAL: string
  readonly VITE_API_BASE_URL_DEPLOY: string
  // agrega aquí más variables de entorno si las usas
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
