import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Alojamiento } from '../../model/alojamientomodel';
import { AlojamientoService } from '../../services/alojamientoservice';
import { Loginservice } from '../../services/loginservice';

@Component({
  selector: 'app-iniciocomponent',
  standalone: false,
  styleUrl: './iniciocomponent.css',
  templateUrl: './iniciocomponent.html',
})
export class Iniciocomponent implements OnInit {
  private router = inject(Router);
  private alojamientoService = inject(AlojamientoService);
  private loginservice = inject(Loginservice);
  private cdr = inject(ChangeDetectorRef);

  sesion$ = this.loginservice.getObservable();
  destacados: Alojamiento[] = [];
  cargando = true;
  error = '';

  ngOnInit(): void {
    this.alojamientoService.getAlojamientos().subscribe({
      next: datos => {
        this.destacados = datos
          .filter(alojamiento => alojamiento.activo && alojamiento.precioNoche > 0)
          .sort((a, b) => b.calificacion - a.calificacion)
          .slice(0, 3);
        this.cargando = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.error = 'No fue posible cargar los alojamientos destacados.';
        this.cargando = false;
        this.cdr.markForCheck();
      }
    });
  }

  buscarAlojamientos(): void {
    void this.router.navigate(['/alojamientos']);
  }

  irAVehiculos(): void {
    void this.router.navigate(['/vehiculos']);
  }

  irAActividades(): void {
    void this.router.navigate(['/actividades']);
  }

  irAReservas(): void {
    void this.router.navigate(['/mis-reservas']);
  }
}
