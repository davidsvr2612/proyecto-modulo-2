import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Authservice } from '../../services/authservice';

@Component({ selector: 'app-navbarcomponent', standalone: false, styleUrl: './navbarcomponent.css', templateUrl: './navbarcomponent.html' })
export class Navbarcomponent {
  private auth = inject(Authservice);
  private router = inject(Router);
  get usuario(): { nombre: string; correo: string } | null { return this.auth.obtenerSesion(); }
  cerrarSesion(): void { this.auth.cerrarSesion(); void this.router.navigate(['/iniciar-sesion']); }
}
