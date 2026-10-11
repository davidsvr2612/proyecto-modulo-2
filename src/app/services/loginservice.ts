import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Usermodel } from '../model/usermodel';

@Injectable({
  providedIn: 'root'
})
export class Loginservice {
  private perfil: Usermodel = {
    userName: "Santiago",
    email: "abc@gmail.com",
    password: "12345"
  };

  private isPerfil: boolean = false;
  private perfilSubject = new BehaviorSubject<Usermodel>(this.perfil);

  actualizarPerfil(perfil: Usermodel): void {
    this.perfilSubject.next(perfil);
    this.perfil = perfil;
    this.isPerfil = true;
  }

  eliminarPerfil(): void {
    this.isPerfil = false;
  }

  getPerfil(): boolean {
    return this.isPerfil;
  }

  getObservable() {
    return this.perfilSubject.asObservable();
  }
}
