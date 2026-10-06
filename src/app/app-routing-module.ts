import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Vehiculocomponent } from './components/vehiculocomponent/vehiculocomponent';
const routes: Routes = [
  { path: '', component: Vehiculocomponent },
  {path:'vehiculos', component: Vehiculocomponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
