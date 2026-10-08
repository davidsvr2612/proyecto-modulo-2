import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alojamiento, Cotizacion, Resena, Reserva } from '../../model/alojamientomodel';
import { AlojamientoService } from '../../services/alojamientoservice';
import { ReservaService } from '../../services/reservaservice';
import { Authservice } from '../../services/authservice';

@Component({
  selector: 'app-detallealojamientocomponent',
  standalone: false,
  templateUrl: './detallealojamientocomponent.html',
  styleUrl: './detallealojamientocomponent.css'
})
export class DetalleAlojamientoComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private alojamientoService = inject(AlojamientoService);
  private reservaService = inject(ReservaService);
  private auth = inject(Authservice);
  private cdr = inject(ChangeDetectorRef);

  alojamiento?: Alojamiento;
  resenas: Resena[] = [];
  fechaLlegada = '';
  fechaSalida = '';
  huespedes = 1;
  cotizacion?: Cotizacion;
  nombreHuesped = '';
  correo = '';
  error = '';
  mensaje = '';
  minFecha = this.fechaLocal(new Date());
  procesando = false;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.alojamientoService.getDatos().subscribe({
      next: datos => {
        this.alojamiento = datos.alojamientos.find(item => item.id === id && item.activo);
        this.resenas = datos.resenas.filter(resena => resena.alojamientoId === id);
        if (!this.alojamiento) {
          this.error = 'El alojamiento no existe o no está disponible.';
        } else {
          this.huespedes = 1;
        }
        this.cdr.markForCheck();
      },
      error: () => {
        this.error = 'No fue posible cargar la información del alojamiento.';
        this.cdr.markForCheck();
      }
    });
  }

  private fechaLocal(fecha: Date): string {
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, '0');
    const day = String(fecha.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  actualizarFechas(): void {
    this.cotizacion = undefined;
    this.mensaje = '';
    this.error = '';
  }

  calcularCotizacion(): void {
    this.error = '';
    this.mensaje = '';
    this.cotizacion = undefined;
    if (!this.alojamiento) {
      this.error = 'No se encontró el alojamiento.';
      return;
    }
    if (!this.fechaLlegada || !this.fechaSalida) {
      this.error = 'Selecciona las fechas de llegada y salida.';
      return;
    }
    if (this.fechaLlegada < this.minFecha) {
      this.error = 'La fecha de llegada no puede ser anterior a hoy.';
      return;
    }
    const llegada = new Date(`${this.fechaLlegada}T00:00:00`);
    const salida = new Date(`${this.fechaSalida}T00:00:00`);
    const noches = Math.round((salida.getTime() - llegada.getTime()) / 86400000);
    if (noches <= 0) {
      this.error = 'La fecha de salida debe ser posterior a la fecha de llegada.';
      return;
    }
    if (!Number.isInteger(this.huespedes) || this.huespedes < 1) {
      this.error = 'El número de huéspedes debe ser mayor que cero.';
      return;
    }
    if (this.huespedes > this.alojamiento.capacidad) {
      this.error = `Este alojamiento admite máximo ${this.alojamiento.capacidad} huéspedes.`;
      return;
    }
    if (this.alojamiento.precioNoche <= 0) {
      this.error = 'El precio por noche no es válido.';
      return;
    }
    const subtotal = noches * this.alojamiento.precioNoche;
    const tarifaServicio = subtotal * 0.1;
    this.cotizacion = {
      fechaLlegada: this.fechaLlegada,
      fechaSalida: this.fechaSalida,
      huespedes: this.huespedes,
      noches,
      subtotal,
      tarifaLimpieza: this.alojamiento.tarifaLimpieza,
      tarifaServicio,
      total: subtotal + this.alojamiento.tarifaLimpieza + tarifaServicio
    };
  }

  reservar(): void {
    this.error = '';
    const usuario = this.auth.obtenerSesion();
    if (!usuario) { void this.router.navigate(['/iniciar-sesion'], { queryParams: { returnUrl: this.router.url } }); return; }
    if (!this.alojamiento || !this.cotizacion) {
      this.error = 'Primero debes generar una cotización válida.';
      return;
    }
    this.nombreHuesped = usuario.nombre;
    this.correo = usuario.correo;
    const reserva: Reserva = {
      id: `GH-${Date.now()}`,
      alojamientoId: this.alojamiento.id,
      alojamiento: this.alojamiento.nombre,
      ciudad: this.alojamiento.ciudad,
      fechaLlegada: this.cotizacion.fechaLlegada,
      fechaSalida: this.cotizacion.fechaSalida,
      huespedes: this.cotizacion.huespedes,
      noches: this.cotizacion.noches,
      total: this.cotizacion.total,
      nombreHuesped: this.nombreHuesped.trim(),
      correo: usuario.correo,
      usuarioEmail: usuario.correo,
      estado: 'CONFIRMADA'
    };
    try {
      this.reservaService.guardarReserva(reserva);
      this.mensaje = '¡Reserva confirmada! Puedes consultar el detalle en Mis reservas.';
      this.cotizacion = undefined;
      this.nombreHuesped = '';
      this.correo = '';
      this.procesando = true;
      this.cdr.markForCheck();
      void this.router.navigate(['/mis-reservas']);
    } catch {
      this.error = 'No fue posible guardar la reserva en este navegador.';
    }
  }
}
