import { Component, inject, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { ContactService } from './services/contact.service';
import { ContactForm } from './models/contact-form.model';
import { XssSanitizerDirective } from '../../shared/directives/xss-sanitizer.directive';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { AnalyticsService } from '../../core/services/analytics.service';

/**
 * [S] Smart Component de Contacto: orquesta el formulario reactivo
 *     y delega el envío al ContactService.
 * [D] Inyecta FormBuilder y ContactService vía inject().
 * [O] La protección XSS se aplica via directiva, sin modificar el componente.
 */
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, XssSanitizerDirective, ButtonComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnDestroy {
  private fb        = inject(FormBuilder);
  private contact   = inject(ContactService);
  private analytics = inject(AnalyticsService);

  /** Estado reactivo del envío */
  readonly state = this.contact.state;

  contactForm: FormGroup = this.fb.group({
    name:    ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
    email:   ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(120)]],
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(2000)]],
  });

  // Acceso rápido a los controles
  get name()    { return this.contactForm.get('name')!;    }
  get email()   { return this.contactForm.get('email')!;   }
  get subject() { return this.contactForm.get('subject')!; }
  get message() { return this.contactForm.get('message')!; }

  /** Devuelve el mensaje de error para un control específico */
  getError(control: AbstractControl | null): string {
    if (!control || !control.errors || !control.touched) return '';
    const { required, minlength, maxlength, email } = control.errors;

    if (required)   return 'Este campo es requerido.';
    if (email)      return 'Ingresa un correo electrónico válido.';
    if (minlength)  return `Mínimo ${minlength.requiredLength} caracteres.`;
    if (maxlength)  return `Máximo ${maxlength.requiredLength} caracteres.`;
    return 'Campo inválido.';
  }

  async onSubmit(): Promise<void> {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }
    await this.contact.submit(this.contactForm.value as ContactForm);
    if (this.state().isSuccess) {
      this.analytics.trackEvent('contact_form_success', {
        subject: this.contactForm.value.subject,
      });
      this.contactForm.reset();
    }
  }

  resetState(): void {
    this.contact.reset();
  }

  ngOnDestroy(): void {
    this.contact.reset();
  }
}
