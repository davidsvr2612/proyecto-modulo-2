import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlojamientoService } from '../../services/alojamientoservice';
import { Alojamientomodel } from '../../models/alojamientomodel';

@Component({
  selector: 'app-alojamientocomponent',
  standalone: false,
  styleUrl: './alojamientocomponent.css',
  templateUrl: './alojamientocomponent.html',
})
export class AlojamientoComponent implements OnInit {
  alojamientos: Alojamientomodel[] = [];
  alojamientosFiltrados: Alojamientomodel[] = [];

  query: string = '';
  checkin: string = '';
  checkout: string = '';
  adults: number = 1;

  filtroCiudad: string = '';
  filtroHuespedes: number | null = null;
  filtroTipo: string = '';
  filtroPrecioMax: number | null = null;
  ciudadesDisponibles: string[] = [];
  tiposDisponibles: string[] = [];

  cargando: boolean = false;
  errorMensaje: string = '';
  busquedaRealizada: boolean = false;

  constructor(
    private alojamientoService: AlojamientoService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.alojamientos = [];
    this.alojamientosFiltrados = [];
    this.ciudadesDisponibles = [];
    this.tiposDisponibles = [];

    const hoy = new Date().toISOString().split('T')[0];
    this.checkin = hoy;
  }

  buscar(): void {
    if (!this.query || !this.checkin || !this.checkout) {
      this.errorMensaje = 'Por favor complete todos los campos de búsqueda.';
      return;
    }
    if (new Date(this.checkout) <= new Date(this.checkin)) {
      this.errorMensaje = 'La fecha de salida debe ser posterior a la fecha de llegada.';
      return;
    }
    if (this.adults <= 0) {
      this.errorMensaje = 'El número de huéspedes debe ser mayor a cero.';
      return;
    }

    this.cargando = true;
    this.errorMensaje = '';
    this.busquedaRealizada = true;

    this.alojamientoService
      .buscarAlojamientos(this.query, this.checkin, this.checkout, this.adults)
      .subscribe({
        next: (data) => {
          this.alojamientos = data;
          this.alojamientosFiltrados = data;
          this.ciudadesDisponibles = [...new Set(data.map((a: any) => a.ciudad))]
            .filter(Boolean)
            .sort();
          this.tiposDisponibles = [...new Set(data.map((a: any) => a.tipo))].filter(Boolean).sort();
          this.cargando = false;
        },
        error: (err) => {
          console.error('Error al buscar alojamientos:', err);
          this.errorMensaje = 'Ocurrió un error al conectar con la API. Intente de nuevo.';
          this.cargando = false;
        },
      });
  }

  aplicarFiltros(): void {
    this.alojamientosFiltrados = this.alojamientos.filter((a) => {
      const cumpleCiudad = this.filtroCiudad ? a.ciudad === this.filtroCiudad : true;
      const cumpleHuespedes = this.filtroHuespedes ? a.capacidad >= this.filtroHuespedes : true;
      const cumpleTipo = this.filtroTipo ? a.tipo === this.filtroTipo : true;
      const cumplePrecio = this.filtroPrecioMax ? a.precioNoche <= this.filtroPrecioMax : true;
      return cumpleCiudad && cumpleHuespedes && cumpleTipo && cumplePrecio;
    });
  }

  limpiarFiltros(): void {
    this.filtroCiudad = '';
    this.filtroHuespedes = null;
    this.filtroTipo = '';
    this.filtroPrecioMax = null;
    this.alojamientosFiltrados = this.alojamientos;
  }

  verDetalle(id: number | string): void {
    this.router.navigate(['/alojamiento', id]);
  }
}
