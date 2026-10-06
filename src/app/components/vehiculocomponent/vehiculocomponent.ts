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
    void this.router.navigate(['reserva', 'vehiculos', id]);
  }
}
