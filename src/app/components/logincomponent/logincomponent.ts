import {Component, inject, OnInit} from '@angular/core';
import {Loginservice} from '../../services/loginservice';
import {Router} from '@angular/router';

@Component({
  selector: 'app-logincomponent',
  standalone: false,
  styleUrl: './logincomponent.css',
  templateUrl: './logincomponent.html',
})
export class Logincomponent implements OnInit {
  protected username: string = "";
  protected password: string = "";
  protected email: string = "";
  protected esValido: boolean = true;
  protected sesionActiva: boolean = false;

  private rt: Router = inject(Router);
  protected loginservice: Loginservice = inject(Loginservice);

  ngOnInit(): void {
    this.sesionActiva = this.loginservice.getPerfil();

    this.loginservice.getObservable().subscribe(perfil => {
    });
  }


  cerrarSesionActual(): void {
    this.loginservice.eliminarPerfil();
    this.sesionActiva = this.loginservice.getPerfil();
  }

  onEmailInput(event: any): void {
    this.email = event.target.value;
  }

  onUsernameInput(event: any): void {
    this.username = event.target.value;
  }

  onPasswordInput(event: any): void {
    this.password = event.target.value;
  }

  login(): void {
    if(this.username.trim() && this.password.trim() && this.email.trim()){
      this.loginservice.actualizarPerfil({
        userName: this.username,
        email: this.email,
        password: this.password
      });
      void this.rt.navigate([""]);
    } else {
      this.esValido = false;
    }
  }
}
