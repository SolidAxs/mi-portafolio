import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

/**
 * [L] Contrato de abstracción para la extracción de texto en PDFs.
 * Las implementaciones futuras pueden usar pdf.js, APIs de servidor, etc.
 */
export interface IPdfExtractor {
  extractText(pdfPath: string): Observable<PdfExtractionResult>;
}

export interface PdfExtractionResult {
  text: string;
  pageCount: number;
  success: boolean;
  error?: string;
}

/**
 * [S] Responsabilidad única: abstracción y carga controlada de archivos PDF.
 *
 * NOTA DE ARQUITECTURA:
 * La extracción real de texto PDF en el browser requiere la librería pdf.js.
 * Esta clase provee la interfaz estable (contrato [L]) que los componentes
 * consumen. La implementación completa se integrará en la Fase 2 de desarrollo
 * cuando se instale `pdfjs-dist` como dependencia del proyecto.
 */
@Injectable({ providedIn: 'root' })
export class PdfExtractorService implements IPdfExtractor {
  private http = inject(HttpClient);

  /**
   * Carga el blob del PDF. La extracción de texto requiere pdf.js.
   * @param pdfPath Ruta relativa (ej: 'assets/projects/mi-proyecto.pdf')
   */
  extractText(pdfPath: string): Observable<PdfExtractionResult> {
    return this.http.get(pdfPath, { responseType: 'blob' }).pipe(
      map(() => ({
        text: `[PDF cargado: ${pdfPath}] — Integra pdfjs-dist para extracción completa.`,
        pageCount: 0,
        success: true,
      })),
      catchError(err => of({
        text: '',
        pageCount: 0,
        success: false,
        error: `No se pudo cargar el PDF: ${err.message}`,
      }))
    );
  }

  /** Genera la URL de descarga directa del PDF */
  getDownloadUrl(pdfPath: string): string {
    return `/${pdfPath}`;
  }

  /** Genera la URL para el visor nativo del browser */
  getViewerUrl(pdfPath: string): string {
    return `/${pdfPath}#view=FitH`;
  }
}
