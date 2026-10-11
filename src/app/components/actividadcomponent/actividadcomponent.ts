import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { Actividad } from '../../model/actividadmodel';
import { Actividadservice } from '../../services/actividadservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actividadcomponent',
  standalone: false,
  templateUrl: './actividadcomponent.html',
  styleUrls: ['./actividadcomponent.css'],
})
export class Actividadcomponent implements OnInit {
  private actividadservice = inject(Actividadservice);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);

  listaActividades: Actividad[] = [];
  ciudadSeleccionada = '';
  precioMaximo = '';

  public center: { lat: number; lng: number } = { lat: 4.60971, lng: -74.08175 };
  public zoom = 12;
  public marcadores: Array<{ position: { lat: number; lng: number }; title: string }> = [];

  get ciudadesDisponibles(): string[] {
    return [...new Set(this.listaActividades.map((actividad) => actividad.ubicacion))].sort();
  }

  get actividadesFiltradas(): Actividad[] {
    return this.listaActividades.filter(
      (actividad) =>
        (!this.ciudadSeleccionada || actividad.ubicacion === this.ciudadSeleccionada) &&
        (this.precioMaximo === '' || actividad.precio <= Number(this.precioMaximo)),
    );
  }

  limpiarFiltros(): void {
    this.ciudadSeleccionada = '';
    this.precioMaximo = '';
  }

  ngOnInit(): void {
    this.actividadservice.getActividades().subscribe({
      next: (data: Actividad[]) => {
        this.listaActividades = data;
        this.cdr.markForCheck();
        this.actualizarMarcadoresEnMapa();
      },
      error: (err: unknown) => {
        console.error('Error al cargar las actividades', err);
      },
    });
  }

  private actualizarMarcadoresEnMapa(): void {
    if (this.listaActividades.length === 0) return;

    this.marcadores = this.listaActividades.map((actividad) => {
      const lat = Number((actividad as any).latitud || (actividad as any).lat || 4.60971);
      const lng = Number((actividad as any).longitud || (actividad as any).lng || -74.08175);
      const nombre = (actividad as any).nombre || 'Actividad';

      return {
        position: { lat, lng },
        title: nombre,
      };
    });

    const primera = this.listaActividades[0];
    const latPrim = Number((primera as any).latitud || (primera as any).lat || 4.60971);
    const lngPrim = Number((primera as any).longitud || (primera as any).lng || -74.08175);
    this.center = { lat: latPrim, lng: lngPrim };
  }

  seleccionarActividad(id: number) {
    void this.router.navigate(['/reserva', 'actividades', id]);
  }
}
