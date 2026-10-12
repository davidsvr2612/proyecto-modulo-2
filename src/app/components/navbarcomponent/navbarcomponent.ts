import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Loginservice } from '../../services/loginservice';

@Component({
  selector: 'app-navbarcomponent',
  standalone: false,
  styleUrl: './navbarcomponent.css',
  templateUrl: './navbarcomponent.html',
})
export class Navbarcomponent {
  private loginservice = inject(Loginservice);
  private router = inject(Router);

  usuario$ = this.loginservice.getObservable();

  cerrarSesion(): void {
    this.loginservice.cerrarSesion();
    void this.router.navigate(['/iniciar-sesion']);
  }
}
