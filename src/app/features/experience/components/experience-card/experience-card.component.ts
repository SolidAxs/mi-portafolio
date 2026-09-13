import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceItem } from '../../models/experience.model';

/**
 * [S] Componente presentacional para renderizar un nodo del timeline de experiencia.
 */
@Component({
  selector: 'app-experience-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience-card.component.html',
  styleUrl: './experience-card.component.scss',
})
export class ExperienceCardComponent {
  @Input({ required: true }) experience!: ExperienceItem;
  @Input() isFirst = false;
  @Input() isLast = false;
}
