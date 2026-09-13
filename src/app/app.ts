import { Component, signal, HostListener, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AnalyticsService } from './core/services/analytics.service';

interface NavLink {
  label: string;
  path: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  // Iniciar el servicio de analíticas
  private readonly analytics = inject(AnalyticsService);

  readonly navLinks: NavLink[] = [
    { label: 'Inicio',      path: '/'           },
    { label: 'Proyectos',   path: '/projects'   },
    { label: 'Experiencia', path: '/experience' },
    { label: 'Contacto',    path: '/contact'    },
  ];

  /** Controla el menú móvil */
  menuOpen = signal(false);

  /** Detecta scroll para aplicar estilo compacto al navbar */
  scrolled = signal(false);

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 40);
  }

  readonly currentYear = new Date().getFullYear();

  toggleMenu(): void {
    this.menuOpen.update(v => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
