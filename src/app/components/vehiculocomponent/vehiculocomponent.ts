import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { Vehiculo } from '../../model/vehiculomodel';
import { VehiculoService } from '../../services/vehiculoservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehiculocomponent',
  standalone: false,
  styleUrl: './vehiculocomponent.css',
  templateUrl: './vehiculocomponent.html',
})
export class Vehiculocomponent implements OnInit {
  private vehiculoService = inject(VehiculoService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  listaVehiculos: Vehiculo[] = [];
  tipoSeleccionado = '';
  transmisionSeleccionada = '';
  ciudadSeleccionada = '';
  precioMaximo = '';
  soloDisponibles = false;

  get tiposDisponibles(): string[] {
    return [...new Set(this.listaVehiculos.map(vehiculo => vehiculo.tipo))].sort();
  }

  get transmisionesDisponibles(): string[] {
    return [...new Set(this.listaVehiculos.map(vehiculo => vehiculo.transmision))].sort();
  }

  get ciudadesDisponibles(): string[] {
    return [...new Set(this.listaVehiculos.map(vehiculo => String(vehiculo.ubicacion)))].sort();
  }

  get vehiculosFiltrados(): Vehiculo[] {
    return this.listaVehiculos.filter(vehiculo =>
      (!this.tipoSeleccionado || vehiculo.tipo === this.tipoSeleccionado) &&
      (!this.transmisionSeleccionada || vehiculo.transmision === this.transmisionSeleccionada) &&
      (!this.ciudadSeleccionada || String(vehiculo.ubicacion) === this.ciudadSeleccionada) &&
      (this.precioMaximo === '' || vehiculo.precioPorDia <= Number(this.precioMaximo)) &&
      (!this.soloDisponibles || vehiculo.disponible)
    );
  }

  limpiarFiltros(): void {
    this.tipoSeleccionado = '';
    this.transmisionSeleccionada = '';
    this.ciudadSeleccionada = '';
    this.precioMaximo = '';
    this.soloDisponibles = false;
  }

  ngOnInit() {
    this.vehiculoService.getVehiculos().subscribe({
      next: (data: Vehiculo[]) => {
        console.log('Datos Asignados:', data);
        this.listaVehiculos = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar los vehiculos', err);
      },
    });
  }

  seleccionarVehiculo(id: number) {
    void this.router.navigate(['/reserva', 'vehiculos', id]);
  }
}
