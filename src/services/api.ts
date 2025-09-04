import axios from "axios";
import type { AxiosInstance } from "axios";

// Crear instancia de Axios
export const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
});

// Funciones para la API
export const apiService = {
  getSomething() {
    return api.get("/something");
  },
  postSomething(data: any) {
    return api.post("/something", data);
  }
};