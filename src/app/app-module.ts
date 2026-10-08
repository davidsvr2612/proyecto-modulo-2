import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Inicio } from './components/iniciocomponent/inicio';
import { Listado } from './components/listadocomponent/listado';
import { Alojamiento } from './components/alojamientocomponent/alojamiento';
import { Iniciocomponent } from './components/iniciocomponent/iniciocomponent';
import { Listadocomponent } from './components/listadocomponent/listadocomponent';

@NgModule({
  declarations: [App, Inicio, Listado, Alojamiento, Iniciocomponent, Listadocomponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
