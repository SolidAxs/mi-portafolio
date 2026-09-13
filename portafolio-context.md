# Contexto Maestro del Proyecto: Portafolio Profesional

## 1. Resumen y Roles de la IA
* **Propósito:** Desarrollar un portafolio web personal desde cero para mostrar proyectos profesionales, habilidades y un canal de contacto seguro.
* **Roles de la IA:** Actúa como un Tech Lead experto en Angular, Diseñador UI/UX Senior y Especialista en Ciberseguridad Frontend. Eres mi mentor técnico y me guiarás paso a paso (End-to-End).
* **Entorno de Trabajo:** Antigravity IDE y Gemini (Google One).

## 2. Stack Tecnológico y Configuración Base
* **Framework:** Angular (Plantilla default ya inicializada).
* **Modo de Renderizado:** Client-Side Rendering (CSR) puro (Sin SSR/Prerendering activo).
* **Estrategia Angular:** Uso exclusivo de Standalone Components, Feature Folders y arquitectura modular/escalable, los estilos seran en base a SCSS.

## 3. Arquitectura de Carpetas (Feature Folders & SOLID)
La estructura del proyecto organiza el código dividiéndolo por características de negocio (Features) y aplicando principios SOLID para garantizar el desacoplamiento de responsabilidades.

```text
src/
├── app/
│   ├── core/                           # [S][D] Servicios globales únicos (Singletons) e interceptores
│   │   ├── interception/               # Interceptores de ciberseguridad frontend
│   │   └── services/
│   │       ├── markdown-parser.service.ts  # Abstracción para procesar archivos .md
│   │       └── pdf-extractor.service.ts    # Abstracción para procesar archivos .pdf
│   │
│   ├── shared/                         # [O][I] Componentes, pipes y directivas 100% reutilizables
│   │   ├── components/
│   │   │   ├── button/
│   │   │   └── card/
│   │   ├── directives/
│   │   │   └── xss-sanitizer.directive.ts  # [S] Directiva especializada en ciberseguridad UI
│   │   └── pipes/
│   │
│   ├── features/                       # [S] Módulos de negocio aislados (Feature Folders)
│   │   ├── home/                       # Vista principal de bienvenida
│   │   │   └── home.component.ts
│   │   ├── projects/                   # Gestión y visualización de proyectos
│   │   │   ├── components/             # Sub-componentes exclusivos de esta feature
│   │   │   │   ├── project-card/
│   │   │   │   └── project-list/
│   │   │   ├── models/                 # [I] Interfaces segregadas específicas
│   │   │   │   └── project.model.ts
│   │   │   ├── services/               # Lógica interna de la feature
│   │   │   │   └── project-data.service.ts
│   │   │   └── projects.component.ts   # Componente contenedor (Smart Component)
│   │   │
│   │   └── contact/                    # Sección de contacto segura
│   │       ├── models/                 # [I] interface ContactForm
│   │       ├── services/               # [S] Manejo del envío y validación
│   │       └── contact.component.ts
│   │
│   ├── app.config.ts                   # Configuración global de Angular (Providers)
│   ├── app.routes.ts                   # Enrutamiento principal (Lazy Loading de Features)
│   └── app.component.ts                # Componente raíz (Shell de la aplicación)
└── assets/
    └── proyectos/                      # Carpeta física de almacenamiento local de assets de proyectos
```

## 4. Matriz de Cumplimiento de Principios SOLID

Cualquier bloque de código generado o sugerido por la IA debe cumplir de forma obligatoria con las siguientes directrices arquitectónicas:

| Principio SOLID | Implementación en la Arquitectura Angular | Regla de Desarrollo Obligatoria |
| :--- | :--- | :--- |
| **S** - Single Responsibility | Separación estricta entre Presentación (`components`) y Lógica/Datos (`services`). | Los componentes Standalone *solo* manejan eventos de UI y renderizado. Prohibido hacer llamadas HTTP o parsing directo de datos en el controlador del componente. |
| **O** - Open/Closed | Uso de Directivas y Pipes en `shared/` para extender comportamientos de la UI. | Si se requiere sanitizar inputs contra XSS en el formulario de contacto, no se modifica el comportamiento del input nativo; se le añade la directiva `[appXssSanitizer]`. |
| **L** - Liskov Substitution | Interfaces y Clases Abstractas para servicios de datos. | Si el servicio que lee los Markdown cambia en el futuro (ej. pasar de local a una API externa), el nuevo servicio debe implementar la misma interfaz sin alterar los componentes que la consumen. |
| **I** - Interface Segregation | Modelos de TypeScript altamente específicos y atómicos en carpetas `models/`. | No crear modelos unificados gigantes. El contrato de datos de un `Project` es totalmente independiente y ajeno al contrato de un `ContactForm`. El cliente solo depende de lo que usa. |
| **D** - Dependency Inversion | Inyección de Dependencias nativa de Angular utilizando la función `inject()`. | Los componentes no instancian servicios (`new Service()`). Dependen de abstracciones inyectadas. Facilita el desacoplamiento y la creación de mocks para pruebas. |

## 5. Requerimientos de UI/UX y Ciberseguridad
* **UI/UX:** Diseño web moderno, responsivo, minimalista y adaptado a las tendencias actuales de portafolios de ingeniería de software.
* **Seguridad Frontend:** Medidas estrictas aplicadas de manera activa:
  * Sanitización rigurosa de inputs mediante `DomSanitizer` o directivas dedicadas.
  * Prevención de vulnerabilidades Cross-Site Scripting (XSS).
  * Bloqueo preventivo de inyecciones de código malicioso en áreas de captura de datos (Contacto).

## 6. Gestión de Contenido y Orquestación (MD y PDFs)
* **Origen de Datos:** Los archivos PDF (explicación de proyectos) y las imágenes se ubican localmente en la ruta física `src/assets/projects/`.
* **Estrategia requerida:**
  * Diseñar un formato base en Markdown (.md) que funcione como el orquestador estático de metadatos de los proyectos.
  * Implementar una solución eficiente (ej. scripts de pre-construcción con Node.js, parsing de PDF o librerías específicas de Angular) capaz de leer estos archivos, extraer el texto de los PDFs e integrar dinámicamente todo el contenido y las imágenes en las vistas de Angular.

## 7. Assets Generativos y Despliegue (Fase Final)
* **Assets:** La IA generará propuestas visuales, fondos gráficos o placeholders técnicos cuando falten recursos visuales.
* **Despliegue:** Configurar una guía detallada para desplegar la SPA en modo CSR de forma 100% gratuita (Priorizando Firebase Hosting, Vercel o GitHub Pages).

## 8. Estado Actual del Desarrollo
* **Estado:** Plantilla base de Angular creada e inicializada.
* **Próximo Paso Inmediato (Paso 1):** Validar comandos de consola para garantizar que la app corra en modo CSR puro y generar físicamente la estructura de carpetas definida en la sección 3.
