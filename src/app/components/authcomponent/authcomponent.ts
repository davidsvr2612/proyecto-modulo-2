import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Authservice } from '../../services/authservice';

@Component({ selector: 'app-authcomponent', standalone: false, templateUrl: './authcomponent.html', styleUrl: './authcomponent.css' })
export class Authcomponent implements OnInit {
  private auth = inject(Authservice);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  modo: 'login' | 'registro' = 'login';
  nombre = '';
  correo = '';
  password = '';
  confirmarPassword = '';
  error = '';
  returnUrl = '/alojamientos';

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/alojamientos';
    if (this.auth.obtenerSesion()) void this.router.navigateByUrl(this.returnUrl);
    this.modo = (this.route.snapshot.queryParamMap.get('modo') === 'registro' || this.route.snapshot.data['modo'] === 'registro') ? 'registro' : 'login';
  }

  cambiarModo(modo: 'login' | 'registro'): void { this.modo = modo; this.error = ''; }

  enviar(): void {
    this.error = '';
    if (this.modo === 'registro') {
      if (this.nombre.trim().length < 2) { this.error = 'Ingresa tu nombre completo.'; return; }
      if (this.password.length < 6) { this.error = 'La contraseña debe tener al menos 6 caracteres.'; return; }
      if (this.password !== this.confirmarPassword) { this.error = 'Las contraseñas no coinciden.'; return; }
      this.error = this.auth.registrar(this.nombre, this.correo, this.password);
    } else {
      this.error = this.auth.iniciarSesion(this.correo, this.password);
    }
    if (!this.error) void this.router.navigateByUrl(this.returnUrl);
  }
}
