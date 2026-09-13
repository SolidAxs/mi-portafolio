import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
  signal,
  computed,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project, formatProjectYear } from '../../models/project.model';

@Component({
  selector: 'app-project-detail-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-detail-modal.component.html',
  styleUrl: './project-detail-modal.component.scss',
})
export class ProjectDetailModalComponent implements OnDestroy {
  @Output() closed = new EventEmitter<void>();

  private _project = signal<Project | null>(null);

  @Input() set project(val: Project | null) {
    this._project.set(val);
    this.currentImageIndex.set(0);
    if (val) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  get project(): Project | null {
    return this._project();
  }

  currentImageIndex = signal<number>(0);

  allImages = computed<string[]>(() => {
    const proj = this._project();
    if (!proj) return [];
    if (proj.images && proj.images.length > 0) {
      return proj.images;
    }
    return proj.imageUrl ? [proj.imageUrl] : [];
  });

  currentImage = computed<string>(() => {
    const images = this.allImages();
    const idx = this.currentImageIndex();
    return images[idx] ?? '';
  });

  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }

  close(): void {
    document.body.style.overflow = '';
    this.closed.emit();
  }

  nextImage(event?: MouseEvent): void {
    event?.stopPropagation();
    const total = this.allImages().length;
    if (total <= 1) return;
    this.currentImageIndex.update(idx => (idx + 1) % total);
  }

  prevImage(event?: MouseEvent): void {
    event?.stopPropagation();
    const total = this.allImages().length;
    if (total <= 1) return;
    this.currentImageIndex.update(idx => (idx - 1 + total) % total);
  }

  setImage(index: number, event?: MouseEvent): void {
    event?.stopPropagation();
    this.currentImageIndex.set(index);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    if (!this.project) return;
    if (event.key === 'Escape') {
      this.close();
    } else if (event.key === 'ArrowRight') {
      this.nextImage();
    } else if (event.key === 'ArrowLeft') {
      this.prevImage();
    }
  }

  get statusLabel(): string {
    if (!this.project) return '';
    const labels: Record<string, string> = {
      active: 'Activo en producción',
      completed: 'Completado',
      'in-progress': 'En desarrollo',
      archived: 'Archivado',
      deprecated: 'Ciclo comercial concluido',
    };
    return labels[this.project.status] ?? this.project.status;
  }

  get categoryLabel(): string {
    if (!this.project) return '';
    const labels: Record<string, string> = {
      web: 'Web Application',
      mobile: 'Mobile App',
      backend: 'Backend & APIs',
      fullstack: 'Full Stack',
      data: 'Data & Analytics',
    };
    return labels[this.project.category] ?? this.project.category;
  }

  get formattedYear(): string {
    return formatProjectYear(this.project?.year);
  }
}
