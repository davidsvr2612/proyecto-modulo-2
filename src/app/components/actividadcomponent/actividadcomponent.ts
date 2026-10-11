import { Component, OnInit, AfterViewInit, ChangeDetectorRef, inject } from '@angular/core';
import { Actividad } from '../../model/actividadmodel';
import { Actividadservice } from '../../services/actividadservice';
import { Maptilerservice } from '../../services/maptilerservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actividadcomponent',
  standalone: false,
  templateUrl: './actividadcomponent.html',
  styleUrls: ['./actividadcomponent.css'],
})
export class ActividadcomponentComponent implements OnInit, AfterViewInit {
  private actividadservice = inject(Actividadservice);
  private maptilerservice = inject(Maptilerservice);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);

  listaActividades: Actividad[] = [];
  private map: any; // Instancia del mapa
  ciudadSeleccionada = '';
  precioMaximo = '';

  get ciudadesDisponibles(): string[] {
    return [...new Set(this.listaActividades.map(actividad => actividad.ubicacion))].sort();
  }

  get actividadesFiltradas(): Actividad[] {
    return this.listaActividades.filter(actividad =>
      (!this.ciudadSeleccionada || actividad.ubicacion === this.ciudadSeleccionada) &&
      (this.precioMaximo === '' || actividad.precio <= Number(this.precioMaximo))
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

  ngAfterViewInit(): void {
    this.map = this.maptilerservice.crearMapa('map-actividad', -74.08175, 4.60971, 12);
  }

  // Método para recorrer tu lista y poner los pines del mapa
  private actualizarMarcadoresEnMapa(): void {
    if (!this.map) return;

    this.listaActividades.forEach((actividad) => {
      const lat = (actividad as any).latitud || 4.60971;
      const lng = (actividad as any).longitud || -74.08175;
      const nombre = (actividad as any).nombre || 'Actividad';
      const precio = (actividad as any).precio ? `$${(actividad as any).precio}` : '';

      this.maptilerservice.agregarMarcador(this.map, lng, lat, nombre, precio);
    });
  }

  seleccionarActividad(id: number) {
    void this.router.navigate(['/reserva', 'actividades', id]);
  }
}
