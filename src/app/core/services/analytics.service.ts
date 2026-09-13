import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    toggleAnalytics?: () => void;
  }
}

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);

  private isInitialized = false;

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.exposeAdminHelper();
      this.init();
    }
  }

  /**
   * Inicializa Google Analytics 4 respetando filtros de localhost y administrador.
   */
  init(): void {
    const gaId = environment.googleAnalyticsId?.trim();

    // 1. Validar que exista un ID configurado
    if (!gaId || gaId === 'G-XXXXXXXXXX') {
      return;
    }

    // 2. Bloquear en entorno local (localhost / 127.0.0.1) a menos que se fuerce explícitamente
    const isLocalhost =
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1' ||
      window.location.hostname.endsWith('.local');

    const allowLocal = localStorage.getItem('allow_localhost_analytics') === 'true';

    if (isLocalhost && !allowLocal) {
      console.info('[Analytics] En pausa en localhost. Configura allow_localhost_analytics=true en localStorage para pruebas.');
      return;
    }

    // 3. Bloquear visitas de ti mismo (Modo Administrador / Dueño)
    if (this.isIgnored()) {
      console.info('[Analytics] Ignorando métricas: Tu navegador está marcado como administrador (ignore_analytics=true).');
      return;
    }

    if (this.isInitialized) {
      return;
    }

    this.loadGtagScript(gaId);
    this.listenToRouteChanges();
    this.isInitialized = true;
  }

  /**
   * Inyecta el script oficial de Google Analytics en el <head>
   */
  private loadGtagScript(gaId: string): void {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };

    window.gtag('js', new Date());
    // send_page_view en false porque controlamos las vistas por ruta en Angular (SPA)
    window.gtag('config', gaId, { send_page_view: false });

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    script.onerror = () => {
      // Si un adblocker bloquea el script, la aplicación sigue funcionando con normalidad
    };
    document.head.appendChild(script);
  }

  /**
   * Rastrea cambios de ruta en la Single Page Application (SPA)
   */
  private listenToRouteChanges(): void {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.trackPageView(event.urlAfterRedirects);
      });
  }

  /**
   * Registra una vista de página
   */
  trackPageView(url: string): void {
    if (!this.canTrack()) return;

    window.gtag('event', 'page_view', {
      page_path: url,
      page_title: document.title,
      page_location: window.location.href,
    });
  }

  /**
   * Registra eventos personalizados (ej. 'download_cv', 'open_project_modal', 'submit_contact')
   */
  trackEvent(eventName: string, params: Record<string, any> = {}): void {
    if (!this.canTrack()) return;

    window.gtag('event', eventName, params);
  }

  /**
   * Comprueba si el navegador actual está marcado para no contabilizar visitas
   */
  isIgnored(): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;
    return localStorage.getItem('ignore_analytics') === 'true';
  }

  /**
   * Activa o desactiva la exclusión de métricas para tu propio navegador
   */
  setIgnoreAnalytics(ignore: boolean): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (ignore) {
      localStorage.setItem('ignore_analytics', 'true');
      console.log('✅ Modo Administrador ACTIVADO: Tus visitas NO se enviarán a Google Analytics.');
    } else {
      localStorage.removeItem('ignore_analytics');
      console.log('ℹ️ Modo Administrador DESACTIVADO: Tus visitas sí se contabilizarán.');
    }
  }

  private canTrack(): boolean {
    return isPlatformBrowser(this.platformId) && typeof window.gtag === 'function' && !this.isIgnored();
  }

  /**
   * Expone un comando rápido en la consola del navegador (F12) para que puedas
   * escribir toggleAnalytics() y no contabilizar tus visitas.
   */
  private exposeAdminHelper(): void {
    window.toggleAnalytics = () => {
      const current = this.isIgnored();
      this.setIgnoreAnalytics(!current);
    };
  }
}
