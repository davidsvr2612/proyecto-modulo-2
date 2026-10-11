import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
<<<<<<< HEAD
=======
import { CommonModule } from '@angular/common';
>>>>>>> main
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Footercomponent } from './components/footercomponent/footercomponent';
import { Navbarcomponent } from './components/navbarcomponent/navbarcomponent';
import { Vehiculocomponent } from './components/vehiculocomponent/vehiculocomponent';
import { Actividadcomponent } from './components/actividadcomponent/actividadcomponent';
import { AlojamientoComponent } from './components/alojamientocomponent/alojamientocomponent';
import { DetalleAlojamientoComponent } from './components/detallealojamientocomponent/detallealojamientocomponent';
import { ReservasComponent } from './components/reservascomponent/reservascomponent';
import { Authcomponent } from './components/authcomponent/authcomponent';
import { Reservaritemcomponent } from './components/reservaritemcomponent/reservaritemcomponent';

@NgModule({
  declarations: [App, Footercomponent, Navbarcomponent, Vehiculocomponent, Actividadcomponent, AlojamientoComponent, DetalleAlojamientoComponent, ReservasComponent, Authcomponent, Reservaritemcomponent],
<<<<<<< HEAD
  imports: [BrowserModule, HttpClientModule, FormsModule, AppRoutingModule],
=======
  imports: [BrowserModule, HttpClientModule, FormsModule, AppRoutingModule,CommonModule],
>>>>>>> main
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
