import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Iniciocomponent } from './components/iniciocomponent/iniciocomponent';
import { Logincomponent } from './components/logincomponent/logincomponent';
import { Vehiculocomponent } from './components/vehiculocomponent/vehiculocomponent';
import { Actividadcomponent } from './components/actividadcomponent/actividadcomponent';
import { AlojamientoComponent } from './components/alojamientocomponent/alojamientocomponent';
import { DetalleAlojamientoComponent } from './components/detallealojamientocomponent/detallealojamientocomponent';
import { ReservasComponent } from './components/reservascomponent/reservascomponent';
import { Authcomponent } from './components/authcomponent/authcomponent';
import { Reservaritemcomponent } from './components/reservaritemcomponent/reservaritemcomponent';

const routes: Routes = [
  { path: '', component: Iniciocomponent, pathMatch: 'full' },
  { path: 'alojamientos', component: AlojamientoComponent },
  { path: 'alojamientos/:id', component: DetalleAlojamientoComponent },
  { path: 'mis-reservas', component: ReservasComponent },
  { path: 'iniciar-sesion', component: Logincomponent },
  { path: 'registro', component: Authcomponent, data: { modo: 'registro' } },
  { path: 'reserva/:tipo/:id', component: Reservaritemcomponent },
  { path: 'vehiculos', component: Vehiculocomponent },
  { path: 'actividades', component: Actividadcomponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
