import { Component, OnInit } from '@angular/core';
import { Alojamientomodel } from '../../models/alojamientomodel';
import { AlojamientoService } from '../../services/alojamientoservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-iniciocomponent',
  standalone: false,
  styleUrl: './iniciocomponent.css',
  templateUrl: './iniciocomponent.html',
})
export class Iniciocomponent {
  constructor(private router: Router) {}

  buscarAlojamientos(): void {
    this.router.navigate(['/alojamientos']);
  }

  irAVehiculos(): void {
    this.router.navigate(['/vehiculos']);
  }

  irAActividades(): void {
    this.router.navigate(['/actividades']);
  }

  irAReservas(): void {
    this.router.navigate(['/reservas']);
  }
}
