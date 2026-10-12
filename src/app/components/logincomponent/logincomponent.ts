import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Loginservice } from '../../services/loginservice';

@Component({
  selector: 'app-logincomponent',
  standalone: false,
  styleUrl: './logincomponent.css',
  templateUrl: './logincomponent.html',
})
export class Logincomponent implements OnInit {
  private loginservice = inject(Loginservice);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  sesion$ = this.loginservice.getObservable();
  correo = '';
  password = '';
  verPassword = false;
  error = '';
  returnUrl = '/alojamientos';

  ngOnInit(): void {
    const destino = this.route.snapshot.queryParamMap.get('returnUrl');
    this.returnUrl = destino && destino.startsWith('/') && !destino.startsWith('//') ? destino : '/alojamientos';
  }

  alternarPassword(): void {
    this.verPassword = !this.verPassword;
  }

  login(): void {
    this.error = '';
    if (!this.correo.trim() || !this.password) {
      this.error = 'Ingresa tu correo y tu contraseña.';
      return;
    }
    this.error = this.loginservice.iniciarSesion(this.correo, this.password);
    if (!this.error) {
      void this.router.navigateByUrl(this.returnUrl);
    }
  }

  cerrarSesionActual(): void {
    this.loginservice.cerrarSesion();
  }
}
