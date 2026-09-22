import { Injectable, signal, computed } from '@angular/core';
import { Project, ProjectFilter } from '../models/project.model';

/**
 * [S] Responsabilidad única: proveer y filtrar los datos de proyectos.
 * [D] Los componentes consumen este servicio vía inject(), sin instanciarlo.
 *
 * Fase actual: datos estáticos en memoria.
 * Fase 2: reemplazar `PROJECTS_DATA` con llamadas a Markdown/PDF desde assets.
 */
@Injectable({ providedIn: 'root' })
export class ProjectDataService {
  // Estado interno reactivo
  private readonly _projects = signal<Project[]>(PROJECTS_DATA);
  private readonly _filter   = signal<ProjectFilter>({ category: 'all' });

  // Proyectos filtrados (computado)
  readonly projects = computed(() => {
    const filter = this._filter();
    return this._projects().filter(p => {
      if (filter.category && filter.category !== 'all') {
        if (filter.category === 'backend') {
          // Los proyectos fullstack integran el desarrollo backend
          if (p.category !== 'backend' && p.category !== 'fullstack') return false;
        } else if (p.category !== filter.category) {
          return false;
        }
      }
      if (filter.technology && !p.technologies.includes(filter.technology)) return false;
      if (filter.featured !== undefined && p.featured !== filter.featured) return false;
      return true;
    });
  });

  readonly featuredProjects = computed(() =>
    this._projects().filter(p => p.featured)
  );

  readonly allTechnologies = computed(() => {
    const techs = new Set(this._projects().flatMap(p => p.technologies));
    return Array.from(techs).sort();
  });

  readonly activeFilter = this._filter.asReadonly();

  setFilter(filter: ProjectFilter): void {
    this._filter.set(filter);
  }

  resetFilter(): void {
    this._filter.set({ category: 'all' });
  }

  getById(id: string): Project | undefined {
    return this._projects().find(p => p.id === id);
  }
}

// ── Proyectos Reales (Alexis Martínez Juárez) ─────────────────────────────
const PROJECTS_DATA: Project[] = [

  // ── 1. Maka Vet ──────────────────────────────────────────────────────────
  {
    id: 'maka-vet',
    title: 'Maka Vet — Programa de Lealtad Veterinario',
    shortDescription:
      'Plataforma de lealtad e incentivos para la red de médicos veterinarios de MAKA. ' +
      'Registro de compras, validación de facturas, acumulación de puntos y catálogo de beneficios.',
    longDescription:
      'Plataforma especializada en la gestión de programas de lealtad e incentivos para la ' +
      'red de médicos veterinarios de MAKA. Diseñada para facilitar el registro de compras, ' +
      'validación de facturas, acumulación de puntos y consulta de beneficios enfocados al ' +
      'sector veterinario. El sistema soporta flujos complejos de validación documental y ' +
      'maneja catálogos dinámicos de premios para diferentes segmentos de clientes.',
    role: 'Fullstack Developer — Planeación arquitectónica y desarrollo del frontend y backend, ' +
      'garantizando la integración continua de servicios, endpoints y bases de datos.',
    technologies: ['React.js', 'Next.js', 'JavaScript', 'HTML5', 'CSS3', 'REST APIs', 'SQL Server', 'PHP', 'Laravel'],
    imageUrl: 'assets/projects/maka-vet/makavet-1.png',
    images: [
      'assets/projects/maka-vet/makavet-1.png',
      'assets/projects/maka-vet/makavet-2.png',
      'assets/projects/maka-vet/makavet-3.png',
      'assets/projects/maka-vet/makavet-4.png',
    ],
    projectUrl: 'https://recompensas.somosmaka.com/',
    featured: true,
    year: 2026,
    category: 'web',
    status: 'active',
    highlights: [
      'Validación de facturas y registro de compras',
      'Catálogo dinámico de premios',
      'Acumulación y consulta de puntos en tiempo real',
      'Integración continua con APIs RESTful del backend',
      'Diseño responsivo orientado al sector veterinario',
    ],
  },

  // ── 2. Maka Recompensas ──────────────────────────────────────────────────
  {
    id: 'maka-recompensas',
    title: 'Maka Recompensas — MAKA Rewards+',
    shortDescription:
      'Portal web integral del programa de lealtad para distribuidores, mayoristas y minoristas ' +
      'de MAKA. Incluye módulos de conciliación de facturas y catálogo de redención de premios.',
    longDescription:
      'Portal web integral del programa de lealtad "MAKA Rewards+", orientado a distribuidores, ' +
      'mayoristas y minoristas. Incluye flujos complejos para la acumulación por cumplimientos de ' +
      'objetivos de ventas, módulos administrativos para conciliación de facturas y un catálogo ' +
      'dinámico para la redención de premios. Integra microservicios backend desarrollados con Java 17, ' +
      'Spring Boot, Spring Data JPA y Spring Security para el control de accesos y la gestión segura de transacciones.',
    role: 'Fullstack Developer — Planeación arquitectónica y desarrollo de componentes frontend y microservicios backend con Java (Spring Boot) y .NET, ' +
      'garantizando la integración de servicios, endpoints y bases de datos.',
    technologies: ['React.js', 'Next.js', 'Java 17', 'Spring Boot', 'Spring Data', 'Spring Security', '.NET', 'JavaScript (ES6+)', 'Material UI', 'REST APIs', 'SQL Server'],
    imageUrl: 'assets/projects/maka-recompensas/makarecompensas-1.png',
    images: [
      'assets/projects/maka-recompensas/makarecompensas-1.png',
      'assets/projects/maka-recompensas/makarecompensas-2.png',
      'assets/projects/maka-recompensas/makarecompensas-3.png',
      'assets/projects/maka-recompensas/makarecompensas-4.png',
    ],
    projectUrl: 'https://makarecompensas.proanpetfood.com/',
    featured: true,
    year: 2026,
    category: 'web',
    status: 'active',
    highlights: [
      'Flujos de acumulación por cumplimiento de metas de ventas',
      'Microservicios backend desarrollados con Java 17 y Spring Boot',
      'Módulos administrativos de conciliación de facturas',
      'Catálogo dinámico para redención de premios',
      'Dashboard de seguimiento de objetivos por distribuidor',
      'Arquitectura modular con Material UI',
    ],
  },

  // ── 3. Puntos Verdes (Portal Web) ────────────────────────────────────────
  {
    id: 'puntos-verdes',
    title: 'Puntos Verdes — Portal Web de Lealtad',
    shortDescription:
      'Plataforma web de lealtad e incentivos sustentables para la Caja Popular Mexicana. ' +
      'Registro de interacciones, consulta de saldos y canje de beneficios.',
    longDescription:
      'Plataforma web orientada a la administración y seguimiento de programas de lealtad e ' +
      'incentivos sustentables de la Caja Popular Mexicana. Permite a los usuarios registrar ' +
      'interacciones, consultar saldos acumulados y canjear beneficios. Desarrollada con una ' +
      'arquitectura de microservicios en Java 17 con Spring Boot, Spring Security (autenticación OAuth2/JWT) ' +
      'y Spring Data JPA, junto con servicios .NET Core, gestionando transacciones de puntos en tiempo real, ' +
      'reportes de acumulación y paneles de administración para la gestión masiva de usuarios.',
    role: 'Desarrollador Sr. Fullstack — Diseño e implementación de la arquitectura web y microservicios con Java (Spring Boot) ' +
      'y .NET Core, optimización de base de datos y construcción de servicios para gestión de usuarios y transacciones.',
    technologies: ['Java 17', 'Spring Boot', 'Spring Data', 'Spring Security', '.NET Framework', '.NET Core', 'C#', 'SQL Server', 'REST APIs', 'JavaScript'],
    imageUrl: 'assets/projects/puntos-verdes/puntosverdes1.jpg',
    images: [
      'assets/projects/puntos-verdes/puntosverdes1.jpg',
      'assets/projects/puntos-verdes/puntosverdes2.png',
      'assets/projects/puntos-verdes/puntosverdes3.png',
      'assets/projects/puntos-verdes/puntosverdes4.png',
      'assets/projects/puntos-verdes/puntosverdes5.png',
    ],
    projectUrl: 'https://puntosverdes.mx/',
    featured: true,
    year: 2019,
    category: 'fullstack',
    status: 'active',
    highlights: [
      'Arquitectura de microservicios con Java 17, Spring Boot y Spring Security',
      'Gestión de transacciones de puntos en tiempo real con Spring Data',
      'Módulos de administración masiva de usuarios',
      'Optimización de queries en SQL Server',
      'Servicios de procesamiento transaccional',
      'Integración con sistemas externos de la Caja Popular Mexicana',
    ],
  },

  // ── 4. App Puntos Verdes (Móvil) ─────────────────────────────────────────
  {
    id: 'puntos-verdes-app',
    title: 'App Puntos Verdes — Aplicación Móvil',
    shortDescription:
      'Aplicación móvil para iOS y Android del ecosistema Puntos Verdes. ' +
      'Consulta de puntos en tiempo real, notificaciones push y escaneo de validaciones.',
    longDescription:
      'Aplicación móvil complementaria para el ecosistema Puntos Verdes, diseñada para ofrecer ' +
      'a los usuarios una experiencia ágil desde dispositivos móviles. Incluye consulta de puntos ' +
      'en tiempo real, notificaciones push, escaneo de validaciones y catálogo de premios. ' +
      'Publicada tanto en App Store como en Google Play Store, disponible para la base de socios ' +
      'de la Caja Popular Mexicana.',
    role: 'Desarrollador Sr. Frontend — Desarrollo del cliente móvil, conexión con microservicios ' +
      'en backend, optimización de rendimiento y manejo de estados locales.',
    technologies: ['Flutter', 'Dart', 'REST APIs', 'Push Notifications'],
    imageUrl: 'assets/projects/puntos-verdes-app/puntos-verdes-app-1.png',
    images: [
      'assets/projects/puntos-verdes-app/puntos-verdes-app-1.png',
      'assets/projects/puntos-verdes-app/puntos-verdes-app-2.png',
      'assets/projects/puntos-verdes-app/puntos-verdes-app-3.png',
      'assets/projects/puntos-verdes-app/puntos-verdes-app-4.png',
      'assets/projects/puntos-verdes-app/puntos-verdes-app-5.png',
    ],
    projectUrl: 'https://apps.apple.com/mx/app/cpm-puntos-verdes/id1578582422',
    featured: false,
    year: 2021,
    category: 'mobile',
    status: 'archived',
    highlights: [
      'Publicada en App Store y Google Play',
      'Consulta de puntos en tiempo real',
      'Notificaciones push integradas',
      'Desarrollo con Flutter (iOS & Android desde un solo codebase)',
      'Conexión con microservicios del backend',
    ],
  },

  // ── 5. Quaker State Rewards ───────────────────────────────────────────────
  {
    id: 'quaker-state-rewards',
    title: 'Quaker State Rewards — Motor de Recompensas',
    shortDescription:
      'Portal y motor de recompensas para incentivar la preferencia del consumidor. ' +
      'Registro de tickets de compra, dinámicas promocionales y canje de premios en catálogo.',
    longDescription:
      'Portal y motor de recompensas diseñado para incentivar la preferencia del consumidor ' +
      'mediante dinámicas promocionales, registro de tickets de compra y canje de premios en ' +
      'catálogo. El servicio operó en producción de forma exitosa completando su ciclo de vida ' +
      'comercial. La plataforma integraba validación de comprobantes, procesamiento transaccional ' +
      'de puntos y un catálogo de premios con integración logística para entrega.',
    role: 'Desarrollador Sr. Fullstack — Mantenimiento, implementación de nuevos módulos de ' +
      'redención, procesamiento transaccional de puntos y desarrollo de interfaces web.',
    technologies: ['.NET Core', 'C#', 'Angular', 'SQL Server', 'REST APIs'],
    imageUrl: 'assets/projects/quaker-state-rewards/quaker-state-rewards-1.png',
    images: [
      'assets/projects/quaker-state-rewards/quaker-state-rewards-1.png',
      'assets/projects/quaker-state-rewards/quaker-state-rewards-2.png',
      'assets/projects/quaker-state-rewards/quaker-state-rewards-3.png',
      'assets/projects/quaker-state-rewards/quaker-state-rewards-4.png',
    ],
    featured: false,
    year: 2023,
    category: 'fullstack',
    status: 'deprecated',
    highlights: [
      'Motor de redención de puntos con catálogo integrado',
      'Validación automática de tickets de compra',
      'Procesamiento transaccional de puntos a escala',
      'Módulos de dinámicas promocionales',
      'Stack fullstack: Angular + .NET Core',
    ],
  },

  // ── 6. Televia Rewards ────────────────────────────────────────────────────
  {
    id: 'televia-rewards',
    title: 'TeleVía REWARDS — Programa de Lealtad',
    shortDescription:
      'Programa de lealtad para la plataforma TeleVía. Recompensas por recargas y uso del tag, ' +
      'con catálogo exclusivo de beneficios para usuarios frecuentes.',
    longDescription:
      'Programa de lealtad desarrollado para la plataforma TeleVía, enfocado en recompensar a ' +
      'los usuarios frecuentes mediante la acumulación de puntos por recargas y uso de tag, ' +
      'permitiendo la redención en un catálogo exclusivo de beneficios. La plataforma procesaba ' +
      'transacciones de telepeaje en tiempo real mediante microservicios desarrollados en Java 8 y Spring Boot, ' +
      'gestionaba la acumulación automática con Spring Data JPA y aseguraba la API de integración con Spring Security.',
    role: 'Desarrollador Fullstack — Creación y mantenimiento de portales de lealtad, microservicios backend en Java (Spring Boot) ' +
      'y .NET Core, consumo de servicios transaccionales de telepeaje y procesamiento de datos.',
    technologies: ['Java 8 / 17', 'Spring Boot', 'Spring Data', 'Spring Security', 'React.js', '.NET Core', 'Python', 'C#', 'JavaScript', 'SQL Server', 'REST APIs'],
    imageUrl: 'assets/projects/televia-rewards/televia-rewards-1.png',
    images: [
      'assets/projects/televia-rewards/televia-rewards-1.png',
      'assets/projects/televia-rewards/televia-rewards-2.png',
      'assets/projects/televia-rewards/televia-rewards-3.png',
      'assets/projects/televia-rewards/televia-rewards-4.png',
      'assets/projects/televia-rewards/televia-rewards-5.png',
    ],
    projectUrl: 'https://new.televia.bahia360.mx/',
    featured: false,
    year: 2023,
    category: 'fullstack',
    status: 'deprecated',
    highlights: [
      'Procesamiento de transacciones de telepeaje en tiempo real',
      'Microservicios de integración segura con Spring Boot, Spring Security y Spring Data',
      'Acumulación automática de puntos por uso de tag/recarga',
      'Catálogo de beneficios con integración a proveedores',
      'Stack multi-lenguaje: Java (Spring Boot) + React + .NET Core + Python',
      'Sistema de notificaciones y comunicación con usuarios',
    ],
  },

  // ── 7. Migración y Automatización POS AdmitOne (Cinemex / Trinum) ────────
  {
    id: 'admitone-cinema-migration',
    title: 'Migración y Automatización Masiva POS (AdmitOne UK / Cinemex)',
    shortDescription:
      'Scripts en Python para la migración técnica de más de 300 complejos cinematográficos al POS AdmitOne (UK), ' +
      'automatizando actualización masiva de parámetros y consumo de Web Services.',
    longDescription:
      'Desarrollo e implementación de scripts de alta escala en Python para optimizar la migración técnica de ' +
      'más de 300 complejos cinematográficos de Cinemex hacia el sistema POS internacional AdmitOne (Reino Unido). ' +
      'La solución automatizó la actualización masiva de parámetros en bases de datos locales y centralizadas, ' +
      'así como el consumo concurrente a gran escala de endpoints y Web Services por cada servidor de complejo, ' +
      'reduciendo drásticamente los tiempos de transición operativa y asegurando cero interrupciones en ventas.',
    role: 'Integration & Backend Developer (Trinum Solutions) — Orquestación técnica en Python, migración ' +
      'de bases de datos y automatización de Web Services en más de 300 servidores locales.',
    technologies: ['Python', 'Web Services', 'REST APIs', 'SQL Server', 'AdmitOne POS', 'Automatización', 'Batch Processing'],
    imageUrl: '',
    images: [],
    featured: false,
    year: 2023,
    category: 'backend',
    status: 'completed',
    highlights: [
      'Automatización de la migración técnica en más de 300 complejos cinematográficos',
      'Integración con la plataforma internacional AdmitOne POS (Reino Unido)',
      'Actualización masiva de parámetros en bases de datos sin afectación operativa',
      'Consumo a gran escala de endpoints y Web Services concurrentes por servidor',
      'Eliminación de tiempos muertos e inconsistencias en la venta de taquilla y dulcería',
    ],
  },

  // ── 8. Middleware de Pasarelas de Pago & Autocobro (Trinum) ───────────────
  {
    id: 'pos-payment-middleware',
    title: 'Middleware de Pasarelas de Pago y Autocobro (MIT, Jaguar, Leadin)',
    shortDescription:
      'Middlewares transaccionales en Delphi y .NET para integración de pasarelas de pago con tarjeta ' +
      'y terminales de autocobro en efectivo con proveedores MIT, Jaguar y Leadin.',
    longDescription:
      'Diseño, implementación y mantenimiento continuo de middlewares transaccionales de misión crítica en Delphi ' +
      'y .NET para puntos de venta y kioscos de autoservicio. Integración de pasarelas de pago con tarjeta bancaria ' +
      'y comunicación directa con terminales de autocobro en efectivo con los proveedores MIT, Jaguar y Leadin. ' +
      'La solución garantiza transacciones atómicas, tolerancia a fallos de conectividad, conciliación transaccional ' +
      'inmediata y cumplimiento de estrictos estándares de seguridad bancaria.',
    role: 'Integration & Backend Developer (Trinum Solutions) — Desarrollo de middlewares de hardware y ' +
      'pasarelas de cobro en Delphi y .NET, pruebas de estrés y protocolos de comunicación.',
    technologies: ['.NET Framework', 'Delphi', 'C#', 'Pasarelas de Pago', 'Terminales Autocobro', 'MIT', 'Jaguar', 'Leadin'],
    imageUrl: '',
    images: [],
    featured: false,
    year: [2024,2025,2026],
    category: 'backend',
    status: 'completed',
    highlights: [
      'Integración de pasarelas de pago con tarjeta con los proveedores MIT, Jaguar y Leadin',
      'Soporte y comunicación con hardware en terminales de autocobro en efectivo',
      'Desarrollo de middlewares en Delphi y .NET con alta tolerancia a desconexión',
      'Garantía de atomicidad e idempotencia en cobros de alta afluencia comercial',
      'Monitoreo y logs de auditoría para conciliación y trazabilidad financiera',
    ],
  },

  // ── 9. APIs RESTful & Web Services Cinemex (Trinum) ──────────────────────
  {
    id: 'cinemex-custom-apis',
    title: 'Web Services y APIs RESTful Transaccionales a la Medida (Cinemex)',
    shortDescription:
      'Desarrollo de Web Services y APIs RESTful a la medida para Cinemex, permitiendo el consumo seguro ' +
      'y eficiente de información transaccional específica.',
    longDescription:
      'Arquitectura, diseño y desarrollo de Web Services y APIs RESTful a la medida para Cinemex. ' +
      'Los servicios operan como canal seguro y de alto rendimiento para el consumo y transferencia de ' +
      'información transaccional crítica entre servidores locales de complejos y plataformas centrales corporativas. ' +
      'Implementan estrictos mecanismos de autenticación, control de accesos, validación de esquemas y ' +
      'resiliencia ante cargas masivas concurrentes en horarios pico.',
    role: 'Integration & Backend Developer (Trinum Solutions) — Arquitectura de servicios backend, diseño ' +
      'de contratos de API RESTful y seguridad transaccional corporativa.',
    technologies: ['.NET', 'C#', 'PHP', 'Laravel', 'REST APIs', 'Web Services', 'SQL Server', 'Seguridad Transaccional', 'Cinemex'],
    imageUrl: '',
    images: [],
    featured: false,
    year: 2025,
    category: 'backend',
    status: 'completed',
    highlights: [
      'Web Services y APIs REST a la medida para consumo transaccional corporativo',
      'Canal seguro para consulta y sincronización de datos de complejos Cinemex',
      'Políticas estrictas de autenticación, autorización y auditoría de peticiones',
      'Respuestas de baja latencia bajo cargas intensivas de fin de semana',
      'Diseño desacoplado y contratos de datos versionados para alta confiabilidad',
    ],
  },

  // ── 10. Sincronización Operativa & Optimización BD (Trinum) ───────────────
  {
    id: 'db-optimization-sync-services',
    title: 'Servicios de Sincronización Operativa y Optimización de Bases de Datos',
    shortDescription:
      'Servicios .NET para sincronización masiva de timezones en servidores locales, extracción centralizada ' +
      'de reportes y automatización de tareas pesadas en SQL Server y PostgreSQL.',
    longDescription:
      'Diseño y despliegue de servicios críticos en .NET Framework orientados a la estabilidad y automatización ' +
      'operativa. Incluye la sincronización masiva y automática de husos horarios (timezones) en servidores locales ' +
      'distribuidos, recolección automatizada de logs y telemetría para proveedores, y extracción centralizada de datos ' +
      'para reportes ejecutivos. Asimismo, se reemplazó la ejecución manual de scripts pesados en la base de datos central ' +
      'mediante procesos automatizados en SQL Server y PostgreSQL, reduciendo tiempos de procesamiento y eliminando errores humanos.',
    role: 'Integration & Backend Developer (Trinum Solutions) — Creación de servicios .NET en segundo plano, ' +
      'optimización de queries y procedimientos almacenados en SQL Server y PostgreSQL.',
    technologies: ['.NET Framework', 'SQL Server', 'PostgreSQL', 'C#', 'Optimización de Bases de Datos', 'Background Services', 'ETL'],
    imageUrl: '',
    images: [],
    featured: false,
    year: 2026,
    category: 'backend',
    status: 'completed',
    highlights: [
      'Sincronización masiva automática de timezones en cientos de servidores locales',
      'Sustitución de scripts manuales pesados por servicios automatizados en SQL Server y PostgreSQL',
      'Recolección automatizada de logs y telemetría operativa para proveedores externos',
      'Extracción y procesamiento centralizado de datos para reportería técnica y ejecutiva',
      'Eliminación de errores humanos y reducción sustancial de latencia en consultas críticas',
    ],
  },

  // ── 11. Facturación Electrónica SAT CFDI 3.3 (Aslogic) ────────────────────
  {
    id: 'sat-cfdi-billing-engine',
    title: 'Motor de Facturación Electrónica SAT CFDI 3.3 (XML / Anexo 20)',
    shortDescription:
      'Componentes y servicios en .NET para la generación, firmado criptográfico y manipulación de CFDI 3.3 ' +
      'en XML conforme a las especificaciones del Anexo 20 del SAT.',
    longDescription:
      'Desarrollo de módulos y servicios backend en .NET para la planeación, generación, firmado criptográfico ' +
      'y manipulación técnica de Comprobantes Fiscales Digitales por Internet (CFDI 3.3) en formato XML, siguiendo ' +
      'estrictamente los esquemas y especificaciones técnicas del Anexo 20 del SAT (Servicio de Administración Tributaria). ' +
      'Integración con Web Services de timbrado de Proveedores Autorizados de Certificación (PAC), transformaciones ' +
      'XSLT para cadena original y validación de sellos digitales.',
    role: 'Desarrollador de Software (Aslogic SA de CV) — Desarrollo de módulos de facturación electrónica, ' +
      'serialización y parseo de XML, y conexión con Web Services de timbrado.',
    technologies: ['.NET Framework', 'C#', 'CFDI 3.3 (SAT Anexo 20)', 'XML / XSLT', 'Servicios Web', 'Criptografía', 'SQL Server'],
    imageUrl: '',
    images: [],
    featured: false,
    year: 2016,
    category: 'backend',
    status: 'completed',
    highlights: [
      'Generación y manipulación de comprobantes fiscales digitales CFDI 3.3 en XML',
      'Cumplimiento estricto de lineamientos del Anexo 20 del SAT y validación de esquemas XSD',
      'Algoritmos de sellado digital criptográfico y transformación de cadena original vía XSLT',
      'Integración con Web Services de timbrado con Proveedores Autorizados (PAC)',
      'Documentación técnica y manuales de usuario para personal operativo y clientes',
    ],
  },
];

