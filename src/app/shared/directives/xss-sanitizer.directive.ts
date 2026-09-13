import { Directive, HostListener, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

/**
 * [S] Responsabilidad única: prevención de XSS en campos de texto.
 * [O] Extiende el comportamiento del input nativo sin modificarlo.
 *
 * Uso:
 *   <input type="text" formControlName="name" appXssSanitizer />
 *
 * Sanitiza en tiempo real:
 *  - Etiquetas HTML maliciosas (< >)
 *  - Atributos de eventos inline (onclick=, onload=, etc.)
 *  - URIs con esquema javascript:
 *  - Bloques <script> completos
 */
@Directive({
  selector: '[appXssSanitizer]',
  standalone: true,
})
export class XssSanitizerDirective {
  private ngControl = inject(NgControl, { optional: true });

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement | HTMLTextAreaElement;
    const raw = input.value;
    const sanitized = this.sanitize(raw);

    if (sanitized !== raw) {
      // Actualiza el valor del DOM
      input.value = sanitized;
      // Notifica a Angular Reactive Forms sin disparar otro evento
      this.ngControl?.control?.setValue(sanitized, {
        emitEvent:       false,
        emitViewToModelChange: false,
      });
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pasted = event.clipboardData?.getData('text/plain') ?? '';
    const sanitized = this.sanitize(pasted);
    document.execCommand('insertText', false, sanitized);
  }

  private sanitize(value: string): string {
    return value
      // Bloquea <script> completo
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      // Bloquea esquemas peligrosos
      .replace(/javascript\s*:/gi, '')
      .replace(/vbscript\s*:/gi, '')
      .replace(/data\s*:/gi, '')
      // Bloquea handlers inline (onclick=, onload=, etc.)
      .replace(/on\w+\s*=/gi, '')
      // Escapa caracteres HTML críticos
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;');
  }
}
