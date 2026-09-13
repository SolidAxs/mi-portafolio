import { Component, inject, OnInit, signal } from '@angular/core';
import { ProjectDataService } from './services/project-data.service';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectDetailModalComponent } from './components/project-detail-modal/project-detail-modal.component';
import { Project, ProjectCategory } from './models/project.model';

/**
 * [S] Smart Component (Container): orquesta el estado y lo delega
 * al ProjectListComponent (Dumb) para la presentación.
 * [D] Inyecta ProjectDataService vía inject().
 */
@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ProjectListComponent, ProjectDetailModalComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements OnInit {
  private projectService = inject(ProjectDataService);

  projects: Project[] = [];
  activeCategory: ProjectCategory | 'all' = 'all';
  selectedProject = signal<Project | null>(null);

  ngOnInit(): void {
    this.projects = this.projectService.projects();
  }

  onCategoryChanged(category: ProjectCategory | 'all'): void {
    this.activeCategory = category;
    this.projectService.setFilter({ category });
    this.projects = this.projectService.projects();
  }

  openProjectDetail(project: Project): void {
    this.selectedProject.set(project);
  }

  closeProjectDetail(): void {
    this.selectedProject.set(null);
  }
}

