import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Project, formatProjectYear } from '../../models/project.model';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

/**
 * [S] Componente presentacional (Dumb Component).
 * Recibe un Project via @Input y solo renderiza la tarjeta.
 * No conoce la fuente de datos ni el contexto de negocio.
 */
@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss',
})
export class ProjectCardComponent {
  @Input({ required: true }) project!: Project;
  @Output() openDetail = new EventEmitter<Project>();

  get formattedYear(): string {
    return formatProjectYear(this.project.year);
  }

  onCardClick(): void {
    this.openDetail.emit(this.project);
  }

  get statusLabel(): string {
    const labels: Record<string, string> = {
      active:      'Activo',
      completed:   'Completado',
      'in-progress': 'En progreso',
      archived:    'Archivado',
      deprecated:  'Histórico',
    };
    return labels[this.project.status] ?? this.project.status;
  }

  get categoryLabel(): string {
    const labels: Record<string, string> = {
      web:       'Web',
      mobile:    'Mobile',
      backend:   'Backend',
      fullstack: 'Full Stack',
      data:      'Data',
      other:     'Otro',
    };
    return labels[this.project.category] ?? this.project.category;
  }
}
