import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Project, ProjectCategory } from '../../models/project.model';
import { ProjectCardComponent } from '../project-card/project-card.component';

/**
 * [S] Componente contenedor de lista: renderiza el grid y los filtros.
 * Recibe los proyectos filtrados desde el Smart Component padre.
 */
@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [ProjectCardComponent],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss',
})
export class ProjectListComponent {
  @Input({ required: true }) projects: Project[] = [];
  @Input() activeCategory: ProjectCategory | 'all' = 'all';
  @Output() categoryChanged = new EventEmitter<ProjectCategory | 'all'>();
  @Output() selectProject = new EventEmitter<Project>();

  readonly categories: Array<{ key: ProjectCategory | 'all'; label: string }> = [
    { key: 'all',       label: 'Todos' },
    { key: 'web',       label: 'Web' },
    { key: 'fullstack', label: 'Full Stack' },
    { key: 'mobile',    label: 'Mobile' },
    { key: 'backend',   label: 'Backend' },
  ];

  selectCategory(category: ProjectCategory | 'all'): void {
    this.categoryChanged.emit(category);
  }
}
