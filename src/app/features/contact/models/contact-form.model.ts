/**
 * [I] Modelo atómico del dominio "Formulario de Contacto".
 * Segregado e independiente de cualquier otro modelo de la aplicación.
 */

/** Datos del formulario de contacto */
export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/** Estado reactivo del envío del formulario */
export interface ContactFormState {
  isSubmitting: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
}

/** Estado inicial del formulario */
export const INITIAL_FORM_STATE: ContactFormState = {
  isSubmitting: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
};

/** Resultado del proceso de validación */
export interface ValidationResult {
  isValid: boolean;
  errors: Partial<Record<keyof ContactForm, string>>;
}
