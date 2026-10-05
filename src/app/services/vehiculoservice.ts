import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehiculo } from '../model/vehiculomodel';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {
  private jsonUrl = 'assets/vehiculo/vehiculo.json';

  constructor(private http: HttpClient) {
  }

  getVehiculos(): Observable<Vehiculo[]> {
    return this.http.get<Vehiculo[]>(this.jsonUrl);
  }
}
