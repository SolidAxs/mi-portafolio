import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize    = 'sm' | 'md' | 'lg';

/**
 * [S] Componente de UI puro: solo renderiza y emite eventos.
 * [O] Extendible via `variant` y `size` sin modificar el componente.
 *
 * Uso:
 *   <app-button variant="primary" size="lg" routerLink="/projects">Ver más</app-button>
 *   <app-button variant="outline" (clicked)="handleClick()">Acción</app-button>
 */
@Component({
  selector: 'app-button',
  standalone: true,
  imports: [RouterLink, NgTemplateOutlet],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() routerLink?: string | any[];
  @Input() href?: string;
  @Input() disabled = false;
  @Input() loading = false;
  @Input() fullWidth = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  @Output() clicked = new EventEmitter<MouseEvent>();

  get classes(): string {
    return [
      'btn',
      `btn--${this.variant}`,
      `btn--${this.size}`,
      this.fullWidth ? 'btn--full' : '',
      this.disabled ? 'btn--disabled' : '',
      this.loading  ? 'btn--loading'  : '',
    ].filter(Boolean).join(' ');
  }

  onClick(event: MouseEvent): void {
    if (!this.disabled && !this.loading) {
      this.clicked.emit(event);
    }
  }
}
