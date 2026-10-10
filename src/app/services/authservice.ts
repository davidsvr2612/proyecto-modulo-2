import { Injectable } from '@angular/core';

export interface Usuario {
  nombre: string;
  correo: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class Authservice {
  private usuariosKey = 'gohome-usuarios';
  private sesionKey = 'gohome-sesion';

  registrar(nombre: string, correo: string, password: string): string {
    const usuarios = this.obtenerUsuarios();
    const email = correo.trim().toLowerCase();
    if (usuarios.some(usuario => usuario.correo === email)) return 'Ya existe una cuenta con ese correo.';
    usuarios.push({ nombre: nombre.trim(), correo: email, password });
    localStorage.setItem(this.usuariosKey, JSON.stringify(usuarios));
    localStorage.setItem(this.sesionKey, JSON.stringify({ nombre: nombre.trim(), correo: email }));
    return '';
  }

  iniciarSesion(correo: string, password: string): string {
    const email = correo.trim().toLowerCase();
    const usuario = this.obtenerUsuarios().find(item => item.correo === email && item.password === password);
    if (!usuario) return 'Correo o contraseña incorrectos.';
    localStorage.setItem(this.sesionKey, JSON.stringify({ nombre: usuario.nombre, correo: usuario.correo }));
    return '';
  }

  obtenerSesion(): { nombre: string; correo: string } | null {
    try { return JSON.parse(localStorage.getItem(this.sesionKey) || 'null'); } catch { return null; }
  }

  cerrarSesion(): void { localStorage.removeItem(this.sesionKey); }

  private obtenerUsuarios(): Usuario[] {
    try { return JSON.parse(localStorage.getItem(this.usuariosKey) || '[]') as Usuario[]; } catch { return []; }
  }
}
