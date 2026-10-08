import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Vehiculocomponent } from './components/vehiculocomponent/vehiculocomponent';
import {Actividadcomponent} from './components/actividadcomponent/actividadcomponent';
import { Logincomponent } from './components/logincomponent/logincomponent';

const routes: Routes = [
  { path: '', component: Vehiculocomponent },
  {path:'vehiculos', component: Vehiculocomponent},
  { path: 'actividades', component: Actividadcomponent },
  { path: 'login', component: Logincomponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
