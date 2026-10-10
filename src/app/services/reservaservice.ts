import { Injectable } from '@angular/core';
import { Reserva } from '../model/alojamientomodel';
import { Authservice } from './authservice';

@Injectable({ providedIn: 'root' })
export class ReservaService {
  private clave = 'gohome-reservas';
  constructor(private auth: Authservice) {}

  obtenerTodas(): any[] { try { const datos = localStorage.getItem(this.clave); return datos ? JSON.parse(datos) as any[] : []; } catch { return []; } }
  obtenerReservas(): any[] { const usuario = this.auth.obtenerSesion(); if (!usuario) return []; return this.obtenerTodas().filter(reserva => reserva.usuarioEmail === usuario.correo || (!reserva.usuarioEmail && reserva.correo === usuario.correo)); }
  guardarReserva(reserva: Reserva | any): void { const usuario = this.auth.obtenerSesion(); if (!usuario) throw new Error('Debes iniciar sesión para reservar.'); const reservas = this.obtenerTodas(); reservas.unshift({ ...reserva, usuarioEmail: usuario.correo }); localStorage.setItem(this.clave, JSON.stringify(reservas)); }
  eliminarReserva(id: string): void { const usuario = this.auth.obtenerSesion(); if (!usuario) return; localStorage.setItem(this.clave, JSON.stringify(this.obtenerTodas().filter(reserva => !(reserva.id === id && reserva.usuarioEmail === usuario.correo)))); }
}
