import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Vehiculo } from '../../model/vehiculomodel';
import { VehiculoService } from '../../services/vehiculoservice';
import { Router } from '@angular/router';


@Component({
  imports: [CommonModule],
  selector: 'app-vehiculocomponent',
  styleUrl: './vehiculocomponent.css',
  templateUrl: './vehiculocomponent.html',
})
export class Vehiculocomponent implements OnInit {
  listaVehiculos: Vehiculo[] = [];

  constructor(
    private vehiculoService: VehiculoService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.vehiculoService.getVehiculos().subscribe({
      next: (data: Vehiculo[]) => {
        this.listaVehiculos = data;
      },
      error: (err) => {
        console.error('Error al cargar los vehiculos', err);
      },
    });
  }

  seleccionarVehiculo(id: number) {
    this.router.navigate(['/reserva','vehiculos', id]);
  }
}
