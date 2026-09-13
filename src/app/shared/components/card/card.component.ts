import { Component, Input } from '@angular/core';

export type CardVariant = 'default' | 'glass' | 'accent' | 'flat';

/**
 * [S] Componente contenedor de UI reutilizable.
 * [O] Variantes vía Input sin modificar la implementación base.
 *
 * Uso:
 *   <app-card variant="glass" [hoverable]="true">
 *     <ng-template #cardHeader>Mi Título</ng-template>
 *     Contenido del card...
 *   </app-card>
 */
@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() variant: CardVariant = 'default';
  @Input() hoverable = false;
  @Input() padding: 'sm' | 'md' | 'lg' | 'none' = 'md';

  get classes(): string {
    return [
      'card',
      `card--${this.variant}`,
      `card--pad-${this.padding}`,
      this.hoverable ? 'card--hoverable' : '',
    ].filter(Boolean).join(' ');
  }
}
