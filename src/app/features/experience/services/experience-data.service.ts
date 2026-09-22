import { Injectable, signal, computed } from '@angular/core';
import { ExperienceItem } from '../models/experience.model';

/**
 * [S] Responsabilidad única: proveer y gestionar la trayectoria profesional.
 * [D] Inyectable en cualquier componente vía inject(ExperienceDataService).
 */
@Injectable({ providedIn: 'root' })
export class ExperienceDataService {
  private readonly _experiences = signal<ExperienceItem[]>(EXPERIENCES_DATA);

  /** Listado completo de experiencias ordenadas cronológicamente (más reciente primero) */
  readonly experiences = this._experiences.asReadonly();

  /** Última experiencia profesional destacada (Trinum Solutions) */
  readonly latestExperience = computed(() => {
    return this._experiences().find(exp => exp.featured) ?? this._experiences()[0];
  });

  /** Total de años acumulados de experiencia */
  readonly totalYears = computed(() => '10+');

  getById(id: string): ExperienceItem | undefined {
    return this._experiences().find(exp => exp.id === id);
  }
}

// ── Trayectoria Profesional Real (Alexis Martínez Juárez) ────────────────────
const EXPERIENCES_DATA: ExperienceItem[] = [
  // ── 1. Trinum Solutions (Última Experiencia) ──────────────────────────────
  {
    id: 'trinum-solutions',
    role: 'Integration & Backend Developer',
    company: 'Trinum Solutions',
    employmentType: 'Jornada completa',
    period: 'ago. 2023 - ago. 2026',
    startDate: '2023-08',
    endDate: '2026-08',
    duration: '3 años',
    location: 'Ciudad de México, México · En remoto',
    badge: 'Última experiencia',
    featured: true,
    highlights: [
      'Automatización y Migración Masiva: Desarrollé scripts en Python para optimizar la migración técnica de más de 300 complejos cinematográficos al sistema POS AdmitOne (UK), automatizando la actualización masiva de parámetros en bases de datos y el consumo a gran escala de endpoints y Web Services por servidor.',
      'Desarrollo de Servicios e Integraciones (.NET y PHP): Diseñé y desplegué servicios en .NET Core y Laravel críticos para la operación, incluyendo la sincronización masiva de timezones en servidores locales, la recolección automatizada de logs para proveedores y la extracción de datos centralizados para reportes ejecutivos.',
      'Optimización de Base de Datos y Rendimiento: Reemplacé la ejecución manual de scripts pesados en la base de datos central mediante servicios automatizados en SQL Server y PostgreSQL, reduciendo tiempos de procesamiento y eliminando errores humanos en el reporteo técnico.',
      'Desarrollo de Middleware y Métodos de Pago: Implementé y di mantenimiento a middlewares en Delphi y .NET para integrar pasarelas de pago con tarjeta y en terminales de autocobro en efectivo con los proveedores MIT, Jaguar y Leadin.',
      'Creación de APIs: Desarrollé Web Services y APIs REST a la medida para Cinemex, permitiendo el consumo seguro y eficiente de información transaccional específica.',
    ],
    skills: [
      'Python',
      '.NET Framework',
      '.NET Core',
      'C#',
      'Laravel',
      'PHP',
      'SQL Server',
      'PostgreSQL',
      'Delphi',
      'REST APIs',
      'Web Services',
      'Pasarelas de Pago',
      'Terminales Autocobro (MIT, Jaguar, Leadin)',
      'AdmitOne POS',
      'Batch Processing',
    ],
  },

  // ── 2. Maka & SmartUp (Consultor Externo) ─────────────────────────────────
  {
    id: 'consultor-maka-smartup',
    role: 'Senior Full Stack Developer',
    company: 'Maka / SmartUp',
    employmentType: 'Consultor externo',
    period: 'feb. 2025 - mar. 2026',
    startDate: '2025-02',
    endDate: '2026-03',
    duration: '1 año 1 mes',
    location: 'En remoto',
    highlights: [
      'Arquitectura y desarrollo de APIs y servicios de integración (PHP/.NET) para los programas de lealtad Maka Vet y Maka Recompensas.',
      'Desarrollo frontend (React JS) e integración con endpoints y microservicios backend.',
      'Procesamiento asíncrono con queues y consumo de servicios en AWS (EC2, SQS).',
    ],
    skills: [
      'PHP',
      '.NET',
      'React JS',
      'REST APIs',
      'AWS',
      'AWS SQS',
      'Queues / Asincronía',
      'Microservicios',
      'Programas de Lealtad (Maka Vet, Maka Recompensas)',
    ],
  },

  // ── 2. Bahia BI Developer ───────────────────────────────────────────────────────
  {
    id: 'bi-developer-joy',
    role: 'BI Developer',
    company: 'Bahia',
    employmentType: 'Consultoría',
    period: 'may. 2023 - jul. 2023',
    startDate: '2023-05',
    endDate: '2023-07',
    duration: '3 meses',
    location: 'En remoto',
    highlights: [
      'Extracción masiva de data estratégica para la toma de decisiones directivas y operativas.',
      'Análisis profundo de flujos de negocio y propuestas metodológicas de optimización de procesos.',
      'Optimización técnica en los procesos de distribución de Digi-Joys para la App de Joy.',
      'Elaboración de dashboards analíticos, matrices de correlación lineal y heatmaps de comportamiento de usuarios.',
    ],
    skills: [
      'Business Intelligence',
      'Data Analytics',
      'SQL Server',
      'Python',
      'Matrices de Correlación',
      'Heatmaps',
      'Modelado de Datos',
      'Optimización de Procesos',
    ],
  },

  // ── 3. Bahia Senior Backend Developer ───────────────────────────────────────────
  {
    id: 'sr-backend-developer',
    role: 'Senior Backend Developer',
    company: 'Bahia',
    employmentType: 'Jornada completa',
    period: 'feb. 2022 - abr. 2023',
    startDate: '2022-02',
    endDate: '2023-04',
    duration: '1 año 3 meses',
    location: 'En remoto',
    highlights: [
      'Encargado del desarrollo y mantenimiento continuo de la API y Stored Procedures consumidos por el portal y aplicación web del programa de lealtad TeleVía REWARDS utilizando tecnologías .NET.',
      'Creación y automatización de procesos backend para cumplir la alta demanda transaccional del día a día del programa de lealtad TeleVía REWARDS.',
      'Recopilación y estructuración de data para facilitar la toma de decisiones ejecutivas y formulación de estrategias operativas.',
      'Colaboración activa en el desarrollo de endpoints y Stored Procedures de alta concurrencia para el programa de lealtad Puntos Verdes.',
    ],
    skills: [
      '.NET Core',
      'C#',
      'SQL Server',
      'Stored Procedures',
      'REST APIs',
      'Procesamiento Transaccional',
      'TeleVía REWARDS',
      'Puntos Verdes',
    ],
  },

  // ── 4. Bahia Senior Frontend Developer ──────────────────────────────────────────
  {
    id: 'sr-frontend-developer',
    role: 'Senior Frontend Developer',
    company: 'Bahia',
    employmentType: 'Jornada completa',
    period: 'jul. 2020 - ene. 2022',
    startDate: '2020-07',
    endDate: '2022-01',
    duration: '1 año 7 meses',
    location: 'En remoto',
    highlights: [
      'Desarrollo y mantenimiento del portal web y aplicación interactiva del programa de lealtad TeleVía REWARDS con React.js y JavaScript moderno.',
      'Mantenimiento al portal web y a la aplicación móvil de Puntos Verdes empleando tecnologías .NET (ASP.NET MVC, ASP Web Forms y Xamarin Forms).',
      'Colaboración en el desarrollo frontend de sitios web corporativos como Cuídate Ya, Cosechómetro, BanCoppel, Wavin y la aplicación de Qlaira utilizando React.js, React Native y HTML5.',
      'Colaboración en el diseño de nuevos endpoints y Stored Procedures para la API de Puntos Verdes utilizando .NET API y Microsoft SQL Server.',
      'Redacción exhaustiva de documentación técnica y especificaciones de componentes.',
    ],
    skills: [
      'React.js',
      'React Native',
      'JavaScript (ES6+)',
      'ASP.NET MVC',
      'ASP Web Forms',
      'Xamarin Forms',
      'SQL Server',
      'HTML5 / SCSS',
      'REST APIs',
    ],
  },

  // ── 5. Bahia Full-Stack .NET Developer ──────────────────────────────────────────
  {
    id: 'fullstack-net-developer',
    role: 'Full-Stack .NET Developer',
    company: 'Bahia',
    employmentType: 'Jornada completa',
    period: 'ene. 2019 - jun. 2020',
    startDate: '2019-01',
    endDate: '2020-06',
    duration: '1 año 6 meses',
    location: 'Ciudad de México, México · Presencial',
    highlights: [
      'Mantenimiento y desarrollo de nuevas funcionalidades en el portal web del programa de lealtad Puntos Verdes de Caja Popular Mexicana.',
      'Desarrollo y mantenimiento de la aplicación móvil Puntos Verdes para plataformas Android e iOS.',
      'Desarrollo y configuración de Stored Procedures optimizados para procesos transaccionales y conciliación operativa diaria.',
    ],
    skills: [
      '.NET',
      'C#',
      'SQL Server',
      'Mobile (Android & iOS)',
      'Stored Procedures',
      'Arquitectura Web',
      'Programas de Lealtad',
    ],
  },

  // ── 6. Desarrollador de Software ──────────────────────────────────────────
  {
    id: 'desarrollador-software-aslogic',
    role: 'Desarrollador de Software',
    company: 'Aslogic SA de CV',
    employmentType: 'Jornada completa',
    period: 'sept. 2016 - abr. 2018',
    startDate: '2016-09',
    endDate: '2018-04',
    duration: '1 año 8 meses',
    location: 'Tecámac, México · Presencial',
    highlights: [
      'Planeación, desarrollo y mantenimiento de sistemas web, servicios web y aplicaciones de escritorio corporativas utilizando tecnologías .NET.',
      'Generación, firmado digital y manipulación de comprobantes fiscales CFDI 3.3 en XML conforme a los esquemas técnicos del Anexo 20 del SAT.',
      'Elaboración de manuales de usuario y documentación técnica de arquitectura para clientes y personal de soporte.',
    ],
    skills: [
      '.NET Framework',
      'C#',
      'CFDI 3.3 (SAT Anexo 20)',
      'XML / XSLT',
      'Servicios Web',
      'Aplicaciones de Escritorio',
      'SQL Server',
    ],
  },
];
