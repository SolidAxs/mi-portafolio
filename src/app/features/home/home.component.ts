import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { CardComponent } from '../../shared/components/card/card.component';
import { TechIconComponent } from '../../shared/components/tech-icon/tech-icon.component';
import { ProjectDataService } from '../projects/services/project-data.service';
import { ExperienceDataService } from '../experience/services/experience-data.service';
import { Project } from '../projects/models/project.model';
import { AnalyticsService } from '../../core/services/analytics.service';

export type TechCategory =
  | 'all'
  | 'frontend'
  | 'backend'
  | 'data'
  | 'cloud'
  | 'ai'
  | 'architecture';

export interface TechItem {
  name: string;
  category: TechCategory;
  categoryLabel: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, FormsModule, ButtonComponent, CardComponent, TechIconComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private projectService = inject(ProjectDataService);
  private experienceService = inject(ExperienceDataService);
  private analytics = inject(AnalyticsService);

  featuredProjects: Project[] = [];
  readonly latestExperience = this.experienceService.latestExperience;
  readonly totalYears = this.experienceService.totalYears;

  /** Filtro de categoría activa */
  readonly selectedCategory = signal<TechCategory>('all');
  /** Filtro de búsqueda rápida */
  readonly searchQuery = signal<string>('');

  readonly categories: { id: TechCategory; label: string; count: number }[] = [
    { id: 'all',          label: 'Todas',                     count: 64 },
    { id: 'frontend',     label: 'Frontend & Mobile',         count: 16 },
    { id: 'backend',      label: 'Backend, Java & .NET',      count: 16 },
    { id: 'data',         label: 'Bases de Datos & Data',     count: 9  },
    { id: 'cloud',        label: 'Cloud & DevOps',            count: 9  },
    { id: 'ai',           label: 'IA & Herramientas',         count: 8  },
    { id: 'architecture', label: 'Arquitectura & Principios', count: 6  },
  ];

  readonly techStack: TechItem[] = [
    // ── Frontend & Mobile (16)
    { name: 'Angular',        category: 'frontend', categoryLabel: 'Frontend' },
    { name: 'React',          category: 'frontend', categoryLabel: 'Frontend' },
    { name: 'TypeScript',     category: 'frontend', categoryLabel: 'Lenguaje' },
    { name: 'JavaScript',     category: 'frontend', categoryLabel: 'Lenguaje' },
    { name: 'HTML',           category: 'frontend', categoryLabel: 'Frontend' },
    { name: 'CSS',            category: 'frontend', categoryLabel: 'Estilos'  },
    { name: 'Sass',           category: 'frontend', categoryLabel: 'Estilos'  },
    { name: 'Bootstrap',      category: 'frontend', categoryLabel: 'UI Framework' },
    { name: 'TailwindCSS',    category: 'frontend', categoryLabel: 'UI Framework' },
    { name: 'Material UI',    category: 'frontend', categoryLabel: 'UI Framework' },
    { name: 'Next.js',        category: 'frontend', categoryLabel: 'Full Stack' },
    { name: 'Remix',          category: 'frontend', categoryLabel: 'Full Stack' },
    { name: 'Flutter',        category: 'frontend', categoryLabel: 'Mobile' },
    { name: 'Dart',           category: 'frontend', categoryLabel: 'Lenguaje' },
    { name: 'Xamarin Forms',  category: 'frontend', categoryLabel: 'Mobile' },
    { name: 'Blazor',         category: 'frontend', categoryLabel: 'Frontend .NET' },

    // ── Backend, Java & .NET (16)
    { name: 'Java 17',          category: 'backend', categoryLabel: 'Lenguaje' },
    { name: 'Spring Boot',      category: 'backend', categoryLabel: 'Framework Backend' },
    { name: 'Spring Data',      category: 'backend', categoryLabel: 'ORM / Data Access' },
    { name: 'Spring Security',  category: 'backend', categoryLabel: 'Seguridad & Auth' },
    { name: '.NET',             category: 'backend', categoryLabel: 'Ecosistema' },
    { name: '.NET Framework',   category: 'backend', categoryLabel: 'Framework' },
    { name: 'ASP.NET Core',     category: 'backend', categoryLabel: 'Web API' },
    { name: 'Entity Framework', category: 'backend', categoryLabel: 'ORM' },
    { name: 'C#',               category: 'backend', categoryLabel: 'Lenguaje' },
    { name: 'PHP',              category: 'backend', categoryLabel: 'Lenguaje' },
    { name: 'Laravel',          category: 'backend', categoryLabel: 'Framework PHP' },
    { name: 'Symfony',          category: 'backend', categoryLabel: 'Framework PHP' },
    { name: 'Node.js',          category: 'backend', categoryLabel: 'Runtime' },
    { name: 'Python',           category: 'backend', categoryLabel: 'Lenguaje' },
    { name: 'FastAPI',          category: 'backend', categoryLabel: 'Web API' },
    { name: 'Flask',            category: 'backend', categoryLabel: 'Web Framework' },

    // ── Bases de Datos & Data (9)
    { name: 'SQL Server',    category: 'data', categoryLabel: 'RDBMS' },
    { name: 'PostgreSQL',    category: 'data', categoryLabel: 'RDBMS' },
    { name: 'Oracle DB',     category: 'data', categoryLabel: 'RDBMS' },
    { name: 'MySQL',         category: 'data', categoryLabel: 'RDBMS' },
    { name: 'SQLite',        category: 'data', categoryLabel: 'Embedded DB' },
    { name: 'MongoDB',       category: 'data', categoryLabel: 'NoSQL' },
    { name: 'Elasticsearch', category: 'data', categoryLabel: 'Search & Analytics' },
    { name: 'Pandas',        category: 'data', categoryLabel: 'Data Analysis' },
    { name: 'NumPy',         category: 'data', categoryLabel: 'Scientific Computing' },

    // ── Cloud, DevOps & APIs (9)
    { name: 'Azure',                  category: 'cloud', categoryLabel: 'Cloud Platform' },
    { name: 'AZ-900',                 category: 'cloud', categoryLabel: 'Certificación Microsoft' },
    { name: 'AWS (EC2, CloudWatch)',  category: 'cloud', categoryLabel: 'Cloud Platform' },
    { name: 'Docker',                 category: 'cloud', categoryLabel: 'Contenedores' },
    { name: 'Docker Compose',         category: 'cloud', categoryLabel: 'Orquestación' },
    { name: 'RabbitMQ',               category: 'cloud', categoryLabel: 'Message Broker' },
    { name: 'AWS SQS',                category: 'cloud', categoryLabel: 'Message Queue' },
    { name: 'GraphQL',                category: 'cloud', categoryLabel: 'Query Language' },
    { name: 'REST APIs',              category: 'cloud', categoryLabel: 'Arquitectura API' },

    // ── IA & Herramientas (8)
    { name: 'Codex',       category: 'ai', categoryLabel: 'AI Coding' },
    { name: 'Claude Code', category: 'ai', categoryLabel: 'AI Assistant' },
    { name: 'Antigravity', category: 'ai', categoryLabel: 'AI Agentic' },
    { name: 'ChatGPT',     category: 'ai', categoryLabel: 'Gen AI' },
    { name: 'Gemini',      category: 'ai', categoryLabel: 'Google AI' },
    { name: 'GitHub',      category: 'ai', categoryLabel: 'Version Control' },
    { name: 'GitLab',      category: 'ai', categoryLabel: 'DevOps & CI/CD' },
    { name: 'Bitbucket',   category: 'ai', categoryLabel: 'Git Repository' },

    // ── Arquitectura & Principios (6)
    { name: 'Principios SOLID',              category: 'architecture', categoryLabel: 'Diseño OO' },
    { name: 'Principios KISS',               category: 'architecture', categoryLabel: 'Simplicidad' },
    { name: 'Principios DRY',                category: 'architecture', categoryLabel: 'Reusabilidad' },
    { name: 'Clean Architecture',            category: 'architecture', categoryLabel: 'Patrón de Diseño' },
    { name: 'Test-Driven Development (TDD)', category: 'architecture', categoryLabel: 'Metodología QA' },
    { name: 'Domain-Driven Design (DDD)',    category: 'architecture', categoryLabel: 'Modelado Core' },
  
    
  
  ];

  /** Lista filtrada por categoría y búsqueda */
  readonly filteredTechStack = computed(() => {
    const cat = this.selectedCategory();
    const query = this.searchQuery().trim().toLowerCase();

    return this.techStack.filter((item) => {
      const matchCat = cat === 'all' || item.category === cat;
      const matchQuery = !query || item.name.toLowerCase().includes(query) || item.categoryLabel.toLowerCase().includes(query);
      return matchCat && matchQuery;
    });
  });

  setCategory(cat: TechCategory): void {
    this.selectedCategory.set(cat);
  }

  onDownloadCv(): void {
    this.analytics.trackEvent('download_cv', {
      file_name: 'CV_Alexis_Martinez_Juarez_Backend.pdf',
    });
  }

  ngOnInit(): void {
    this.featuredProjects = this.projectService.featuredProjects();
  }
}
