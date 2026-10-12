import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Alojamiento, Resena } from '../model/alojamientomodel';

export interface DatosAlojamientos {
  alojamientos: Alojamiento[];
  resenas: Resena[];
}

@Injectable({
  providedIn: 'root'
})
export class AlojamientoService {
  private readonly jsonUrl = 'assets/alojamiento/alojamiento.json';

  constructor(private http: HttpClient) {}

  getDatos(): Observable<DatosAlojamientos> {
    return this.http.get<DatosAlojamientos>(this.jsonUrl);
  }

  getAlojamientos(): Observable<Alojamiento[]> {
    return this.getDatos().pipe(map(datos => datos.alojamientos));
  }
}
