import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Authservice } from './authservice';

export interface SesionActiva {
  nombre: string;
  correo: string;
}

@Injectable({
  providedIn: 'root'
})
export class Loginservice {
  private auth = inject(Authservice);
  private sesionSubject = new BehaviorSubject<SesionActiva | null>(this.auth.obtenerSesion());

  getObservable() {
    return this.sesionSubject.asObservable();
  }

  getSesion(): SesionActiva | null {
    return this.sesionSubject.value;
  }

  estaAutenticado(): boolean {
    return this.sesionSubject.value !== null;
  }

  iniciarSesion(correo: string, password: string): string {
    const error = this.auth.iniciarSesion(correo, password);
    this.sincronizar();
    return error;
  }

  registrar(nombre: string, correo: string, password: string): string {
    const error = this.auth.registrar(nombre, correo, password);
    this.sincronizar();
    return error;
  }

  cerrarSesion(): void {
    this.auth.cerrarSesion();
    this.sincronizar();
  }

  private sincronizar(): void {
    this.sesionSubject.next(this.auth.obtenerSesion());
  }
}
