import { Injectable, Service } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Vehiculo} from '../model/vehiculomodel';


@Injectable()
export class VehiculoService {
  private jsonUrl = 'assets/vehiculo/vehiculo.json';

  constructor(private http: HttpClient) {
  }

  getVehiculos(): Observable<Vehiculo[]> {
    return this.http.get<Vehiculo[]>(this.jsonUrl)
  }
}
