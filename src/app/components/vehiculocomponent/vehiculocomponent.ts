import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  listaVehiculos: Vehiculo[] = [];

  constructor(
    private vehiculoService: VehiculoService,
    private router: Router,
    private cdr: ChangeDetectorRef //
  ) {}

  ngOnInit() {
    this.vehiculoService.getVehiculos().subscribe({
      next: (data: Vehiculo[]) => {
        console.log('DATOS ASIGNADOS:', data);
        this.listaVehiculos = data;
        this.cdr.detectChanges(); //
      },
      error: (err) => {
        console.error('Error al cargar los vehiculos', err);
      },
    });
  }

  seleccionarVehiculo(id: number) {
    this.router.navigate(['reserva','vehiculos', id]);
  }
}
