import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { Reserva } from '../../model/alojamientomodel';
import { Authservice } from '../../services/authservice';
import { Router } from '@angular/router';
import { ReservaService } from '../../services/reservaservice';

@Component({
  selector: 'app-reservascomponent',
  standalone: false,
  templateUrl: './reservascomponent.html',
  styleUrl: './reservascomponent.css'
})
export class ReservasComponent implements OnInit {
  private reservaService = inject(ReservaService);
  private cdr = inject(ChangeDetectorRef);
  private auth = inject(Authservice);
  private router = inject(Router);
  reservas: Reserva[] = [];

  ngOnInit(): void {
    if (!this.auth.obtenerSesion()) { void this.router.navigate(['/iniciar-sesion'], { queryParams: { returnUrl: '/mis-reservas' } }); return; }
    this.reservas = this.reservaService.obtenerReservas();
    this.cdr.markForCheck();
  }

  eliminarReserva(id: string): void {
    this.reservaService.eliminarReserva(id);
    if (!this.auth.obtenerSesion()) { void this.router.navigate(['/iniciar-sesion'], { queryParams: { returnUrl: '/mis-reservas' } }); return; }
    this.reservas = this.reservaService.obtenerReservas();
  }
}
