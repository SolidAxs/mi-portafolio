/**
 * [I] Modelo atómico del dominio "Experiencia Laboral".
 * Diseñado según los principios SOLID de segregación de interfaces.
 */

export interface ExperienceItem {
  readonly id: string;
  role: string;
  company: string;
  employmentType?: string;
  period: string;
  startDate: string;
  endDate: string;
  duration: string;
  location: string;
  highlights: string[];
  skills: string[];
  featured?: boolean;
  badge?: string;
  companyIcon?: string;
}
