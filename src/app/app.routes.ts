import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then(m => m.HomeComponent),
    title: 'Inicio — Mi Portafolio',
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./features/projects/projects.component').then(m => m.ProjectsComponent),
    title: 'Proyectos — Mi Portafolio',
  },
  {
    path: 'experience',
    loadComponent: () =>
      import('./features/experience/experience.component').then(m => m.ExperienceComponent),
    title: 'Experiencia — Mi Portafolio',
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./features/contact/contact.component').then(m => m.ContactComponent),
    title: 'Contacto — Mi Portafolio',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
