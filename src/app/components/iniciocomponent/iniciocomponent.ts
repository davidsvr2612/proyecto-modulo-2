import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alojamientoservice } from '../../services/alojamientoservice';
import { Alojamientomodel } from '../../models/alojamientomodel';

@Component({
  selector: 'app-iniciocomponent',
  standalone: false,
  styleUrl: './iniciocomponent.css',
  templateUrl: './iniciocomponent.html',
})
export class Iniciocomponent implements OnInit {
  destacados: Alojamientomodel[] = [];

  constructor(
    private alojamientoService: Alojamientoservice,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.alojamientoService.getDestacados().subscribe({
      next: (data) => (this.destacados = data),
      error: (err) => console.error('Error cargando destacados', err),
    });
  }

  irABusqueda(): void {
    this.router.navigate(['/listado']);
  }
}
