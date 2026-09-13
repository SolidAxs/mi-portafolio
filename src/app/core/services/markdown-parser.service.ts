import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

/**
 * [L] Interfaz de abstracción para el parser de Markdown.
 * Cualquier implementación futura (API externa, Web Worker, etc.)
 * debe respetar este contrato sin afectar a los componentes consumidores.
 */
export interface IMarkdownParser {
  parse(filePath: string): Observable<string>;
  parseRaw(rawMarkdown: string): string;
}

/**
 * [S] Responsabilidad única: procesar archivos Markdown locales.
 * [D] Los componentes dependen de IMarkdownParser, no de esta clase directamente.
 */
@Injectable({ providedIn: 'root' })
export class MarkdownParserService implements IMarkdownParser {
  private http = inject(HttpClient);

  /**
   * Carga un archivo .md desde assets y devuelve el HTML procesado.
   * @param filePath Ruta relativa al archivo (ej: 'assets/projects/mi-proyecto.md')
   */
  parse(filePath: string): Observable<string> {
    return this.http
      .get(filePath, { responseType: 'text' })
      .pipe(map(md => this.parseRaw(md)));
  }

  /**
   * Convierte una cadena Markdown cruda a HTML seguro.
   * Cubre los elementos más comunes del portafolio.
   */
  parseRaw(rawMarkdown: string): string {
    return rawMarkdown
      // Headings
      .replace(/^### (.+)$/gm, '<h3>$1</h3>')
      .replace(/^## (.+)$/gm,  '<h2>$1</h2>')
      .replace(/^# (.+)$/gm,   '<h1>$1</h1>')
      // Bold / Italic
      .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
      .replace(/\*\*(.+?)\*\*/g,     '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g,         '<em>$1</em>')
      // Inline code
      .replace(/`(.+?)`/g, '<code>$1</code>')
      // Links
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      // Unordered list
      .replace(/^\s*[-*] (.+)$/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
      // Line breaks → paragraphs (doble salto)
      .replace(/\n\n/g, '</p><p>')
      .replace(/^(.+)$/gm, (match) =>
        match.startsWith('<') ? match : `<p>${match}</p>`
      )
      // Limpiar etiquetas vacías
      .replace(/<p><\/p>/g, '');
  }
}
