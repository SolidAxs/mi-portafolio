/**
 * [I] Modelo atómico del dominio "Proyecto".
 * Completamente independiente del dominio "Contacto".
 */

export type ProjectCategory = 'web' | 'mobile' | 'backend' | 'fullstack';
export type ProjectStatus = 'active' | 'completed' | 'in-progress' | 'archived' | 'deprecated';

/** Contrato de datos completo de un Proyecto */
export interface Project {
  readonly id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  technologies: string[];
  imageUrl: string;
  /** Rutas de screenshots adicionales para galería */
  images?: string[];
  projectUrl?: string;
  repoUrl?: string;
  /** Ruta relativa desde assets/ (ej: 'projects/mi-proyecto.pdf') */
  pdfPath?: string;
  featured: boolean;
  year: number | number[] | string;
  category: ProjectCategory;
  status: ProjectStatus;
  role: string;
  highlights: string[];
}

/**
 * Formatea el año o rango de años de un proyecto de manera estética y consistente
 * Ejemplos:
 *   - 2025 -> "2025"
 *   - [2024, 2025, 2026] -> "2024 - 2026"
 *   - [2021, 2024] -> "2021, 2024"
 *   - "2024 - 2026" -> "2024 - 2026"
 */
export function formatProjectYear(year?: number | number[] | string | null): string {
  if (year == null) return '';
  if (Array.isArray(year)) {
    if (year.length === 0) return '';
    if (year.length === 1) return `${year[0]}`;
    const sorted = [...year].sort((a, b) => a - b);
    const isConsecutive = sorted.every((val, idx, arr) => idx === 0 || val === arr[idx - 1] + 1);
    if (isConsecutive) {
      return `${sorted[0]} - ${sorted[sorted.length - 1]}`;
    }
    return sorted.join(', ');
  }
  return `${year}`;
}

/** Opciones de filtrado del listado de proyectos */
export interface ProjectFilter {
  category?: ProjectCategory | 'all';
  technology?: string;
  featured?: boolean;
}
