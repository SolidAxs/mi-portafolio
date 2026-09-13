import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ExperienceDataService } from './services/experience-data.service';
import { ExperienceCardComponent } from './components/experience-card/experience-card.component';
import { ButtonComponent } from '../../shared/components/button/button.component';

/**
 * [S] Smart Component: orquesta la vista de Trayectoria Profesional.
 * [D] Inyecta ExperienceDataService.
 */
@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, RouterLink, ExperienceCardComponent, ButtonComponent],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
})
export class ExperienceComponent {
  private experienceService = inject(ExperienceDataService);

  readonly experiences = this.experienceService.experiences;
  readonly totalYears = this.experienceService.totalYears;
}
