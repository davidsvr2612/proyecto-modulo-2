import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Footercomponent } from './components/footercomponent/footercomponent';
import { Navbarcomponent } from './components/navbarcomponent/navbarcomponent';
import { Vehiculocomponent } from './components/vehiculocomponent/vehiculocomponent';
import { Actividadcomponent } from './components/actividadcomponent/actividadcomponent';
import { Logincomponent } from './components/logincomponent/logincomponent';

@NgModule({
  declarations: [
    App,
    Footercomponent,
    Navbarcomponent,
    Vehiculocomponent,
    Actividadcomponent,
    Logincomponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
