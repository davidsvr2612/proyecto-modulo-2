import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehiculo } from '../../model/vehiculomodel';
import { Actividad } from '../../model/actividadmodel';
import { VehiculoService } from '../../services/vehiculoservice';
import { Actividadservice } from '../../services/actividadservice';
import { ReservaService } from '../../services/reservaservice';
import { Authservice } from '../../services/authservice';

@Component({ selector: 'app-reservaritemcomponent', standalone: false, templateUrl: './reservaritemcomponent.html', styleUrl: './reservaritemcomponent.css' })
export class Reservaritemcomponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private vehiculos = inject(VehiculoService);
  private actividades = inject(Actividadservice);
  private reservas = inject(ReservaService);
  private auth = inject(Authservice);
  private cdr = inject(ChangeDetectorRef);
  tipo = '';
  id = 0;
  item?: Vehiculo | Actividad;
  fechaInicio = '';
  fechaFin = '';
  cantidad = 1;
  error = '';
  mensaje = '';
  minFecha = this.fechaLocal(new Date());
  cotizacion = false;

  ngOnInit(): void {
    this.tipo = this.route.snapshot.paramMap.get('tipo') || '';
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.auth.obtenerSesion()) { void this.router.navigate(['/iniciar-sesion'], { queryParams: { returnUrl: this.router.url } }); return; }
    if (this.tipo === 'vehiculos') this.vehiculos.getVehiculos().subscribe({ next: data => { this.item = data.find(x => x.id === this.id && x.disponible); if (!this.item) this.error = 'Este vehículo no está disponible.'; this.cdr.markForCheck(); }, error: () => { this.error = 'No fue posible cargar el vehículo.'; } });
    else if (this.tipo === 'actividades') this.actividades.getActividades().subscribe({ next: data => { this.item = data.find(x => x.id === this.id && x.disponible); if (!this.item) this.error = 'Esta actividad no está disponible.'; this.cdr.markForCheck(); }, error: () => { this.error = 'No fue posible cargar la actividad.'; } });
    else this.error = 'El tipo de reserva no es válido.';
  }

  private fechaLocal(fecha: Date): string { return `${fecha.getFullYear()}-${String(fecha.getMonth()+1).padStart(2,'0')}-${String(fecha.getDate()).padStart(2,'0')}`; }
  get esVehiculo(): boolean { return this.tipo === 'vehiculos'; }
  get precio(): number { return this.item ? (this.esVehiculo ? (this.item as Vehiculo).precioPorDia : (this.item as Actividad).precio) : 0; }
  get nombre(): string { return this.item ? (this.esVehiculo ? (this.item as Vehiculo).modelo : (this.item as Actividad).nombre) : ''; }
  get ubicacion(): string { return this.item ? String(this.item.ubicacion) : ''; }
  get dias(): number { if (!this.fechaInicio || !this.fechaFin) return 0; return Math.round((new Date(this.fechaFin+'T00:00:00').getTime()-new Date(this.fechaInicio+'T00:00:00').getTime())/86400000); }
  get total(): number { return this.precio * (this.esVehiculo ? this.dias : this.cantidad); }
  calcular(): void { this.error = ''; this.cotizacion = false; if (!this.item) { this.error = 'No se encontró el servicio.'; return; } if (!this.fechaInicio || this.fechaInicio < this.minFecha) { this.error = 'La fecha no puede ser anterior a hoy.'; return; } if (this.esVehiculo && (!this.fechaFin || this.dias <= 0)) { this.error = 'La fecha de devolución debe ser posterior a la fecha de recogida.'; return; } if (!this.esVehiculo && (!Number.isInteger(this.cantidad) || this.cantidad < 1)) { this.error = 'La cantidad de personas debe ser mayor que cero.'; return; } if (this.precio <= 0) { this.error = 'El precio no es válido.'; return; } this.cotizacion = true; }
  reservar(): void { const usuario = this.auth.obtenerSesion(); if (!usuario) { void this.router.navigate(['/iniciar-sesion'], { queryParams: { returnUrl: this.router.url } }); return; } if (!this.cotizacion || !this.item) { this.error = 'Primero debes calcular una cotización válida.'; return; } const reserva = { id: `GH-${Date.now()}-${Math.floor(Math.random()*1000)}`, tipo: this.esVehiculo ? 'Vehículo' : 'Actividad', itemId: this.id, alojamiento: this.nombre, ciudad: this.ubicacion, fechaLlegada: this.fechaInicio, fechaSalida: this.esVehiculo ? this.fechaFin : this.fechaInicio, huespedes: this.esVehiculo ? 1 : this.cantidad, noches: this.esVehiculo ? this.dias : 1, total: this.total, nombreHuesped: usuario.nombre, correo: usuario.correo, usuarioEmail: usuario.correo, estado: 'CONFIRMADA' }; try { this.reservas.guardarReserva(reserva as any); void this.router.navigate(['/mis-reservas']); } catch { this.error = 'No fue posible guardar la reserva en este navegador.'; } }
}
