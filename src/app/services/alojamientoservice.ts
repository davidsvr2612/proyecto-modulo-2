import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alojamiento, Resena } from '../model/alojamientomodel';

interface DatosMarketplace {
  alojamientos: Alojamiento[];
  resenas: Resena[];
}

@Injectable({ providedIn: 'root' })
export class AlojamientoService {
  private jsonUrl = 'assets/alojamiento/alojamiento.json';

  constructor(private http: HttpClient) {}

  getDatos(): Observable<DatosMarketplace> {
    return this.http.get<DatosMarketplace>(this.jsonUrl);
  }

  getAlojamientos(): Observable<Alojamiento[]> {
    return new Observable(observer => {
      this.getDatos().subscribe({
        next: datos => {
          observer.next(datos.alojamientos || []);
          observer.complete();
        },
        error: error => observer.error(error)
      });
    });
  }
}
