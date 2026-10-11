import { Component, OnInit, AfterViewInit, ChangeDetectorRef, inject } from '@angular/core';

import { Alojamiento } from '../../model/alojamientomodel';
import { AlojamientoService } from '../../services/alojamientoservice';

declare const bootstrap: { Carousel: { getOrCreateInstance(element: Element, options?: Record<string, unknown>): { cycle(): void } } };

@Component({
  selector: 'app-alojamientocomponent',
  standalone: false,
  templateUrl: './alojamientocomponent.html',
  styleUrl: './alojamientocomponent.css'
})
export class AlojamientoComponent implements OnInit, AfterViewInit {
  private alojamientoService = inject(AlojamientoService);
  private cdr = inject(ChangeDetectorRef);
  listaAlojamientos: Alojamiento[] = [];
  ciudad = '';
  tipo = '';
  huespedes = '';
  precioMaximo = '';
  cargando = true;
  error = '';

  ngAfterViewInit(): void {
    const carouselElement = document.getElementById('gohomeCarousel');
    if (carouselElement && typeof bootstrap !== 'undefined') {
      const carousel = bootstrap.Carousel.getOrCreateInstance(carouselElement, {
        interval: 5000,
        ride: 'carousel',
        pause: 'hover',
        touch: true,
        wrap: true
      });
      carousel.cycle();
    }
  }

  ngOnInit(): void {
    this.alojamientoService.getAlojamientos().subscribe({
      next: datos => {
        this.listaAlojamientos = datos.filter(alojamiento => alojamiento.activo && alojamiento.precioNoche > 0);
        this.cargando = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.error = 'No fue posible cargar los alojamientos. Intenta nuevamente.';
        this.cargando = false;
        this.cdr.markForCheck();
      }
    });
  }

  get ciudadesDisponibles(): string[] {
    return [...new Set(this.listaAlojamientos.map(alojamiento => alojamiento.ciudad).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'es'));
  }

  get alojamientosFiltrados(): Alojamiento[] {
    return this.listaAlojamientos.filter(alojamiento =>
      (!this.ciudad || alojamiento.ciudad === this.ciudad) &&
      (!this.tipo || alojamiento.tipo === this.tipo) &&
      (!this.huespedes || alojamiento.capacidad >= Number(this.huespedes)) &&
      (!this.precioMaximo || alojamiento.precioNoche <= Number(this.precioMaximo))
    );
  }

  limpiarFiltros(): void {
    this.ciudad = '';
    this.tipo = '';
    this.huespedes = '';
    this.precioMaximo = '';
  }
}
