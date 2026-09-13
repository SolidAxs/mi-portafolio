import { Injectable, signal } from '@angular/core';
import {
  ContactForm,
  ContactFormState,
  INITIAL_FORM_STATE,
} from '../models/contact-form.model';

/**
 * [S] Responsabilidad única: manejar el envío y el estado del formulario de contacto.
 * [D] El componente inyecta este servicio y depende solo de su interfaz pública.
 *
 * Integración real con Formspree endpoint: https://formspree.io/f/mdeojroe
 */
@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly FORMSPREE_ENDPOINT = 'https://formspree.io/f/mdeojroe';

  private readonly _state = signal<ContactFormState>(INITIAL_FORM_STATE);

  /** Estado reactivo del envío — solo lectura para el exterior */
  readonly state = this._state.asReadonly();

  /**
   * Envía el formulario de contacto.
   * El componente no conoce el mecanismo de envío (SRP + DIP).
   */
  async submit(formData: ContactForm): Promise<void> {
    this._state.set({ ...INITIAL_FORM_STATE, isSubmitting: true });

    try {
      await this.sendEmail(formData);
      this._state.set({ ...INITIAL_FORM_STATE, isSuccess: true });
    } catch (error: any) {
      console.error('[ContactService] Error enviando formulario:', error);
      this._state.set({
        ...INITIAL_FORM_STATE,
        isError: true,
        errorMessage:
          error?.message ||
          'Ocurrió un error al enviar el mensaje. Por favor intenta nuevamente o escríbeme directamente a alexis_mtz_617@hotmail.com.',
      });
    }
  }

  reset(): void {
    this._state.set(INITIAL_FORM_STATE);
  }

  /**
   * Envío real de email a través de la API de Formspree
   */
  private async sendEmail(formData: ContactForm): Promise<void> {
    const response = await fetch(this.FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        _replyto: formData.email,
      }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      if (data?.errors && Array.isArray(data.errors) && data.errors.length > 0) {
        const errorMsg = data.errors.map((e: { message?: string }) => e.message || '').filter(Boolean).join('. ');
        throw new Error(errorMsg || 'No fue posible procesar el mensaje.');
      }
      throw new Error(`Error en el servicio de contacto (${response.status}). Intenta más tarde.`);
    }
  }
}
