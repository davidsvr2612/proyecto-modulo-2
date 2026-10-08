import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Iniciocomponent } from './components/iniciocomponent/iniciocomponent';
import { Listadocomponent } from './components/listadocomponent/listadocomponent';
import { HttpClientModule } from '@angular/common/http';
import { Alojamientocomponent } from './components/alojamientocomponent/alojamientocomponent';

@NgModule({
  declarations: [App, Iniciocomponent, Listadocomponent, Alojamientocomponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
