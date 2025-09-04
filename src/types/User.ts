export interface RegisterForm {
  name: string;
  lastName: string;
  role: 'Aprendiz' | 'Instructor' | 'Administrativo' | '';
  documentType: 'Cédula de ciudadania' | 'Tarjeta de identidad' | 'Cédula de extranjeria' | '';
  documentNumber: string;
  email: string;
  password: string;
  confirm: string;
  terms: boolean;
}