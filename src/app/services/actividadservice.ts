import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Actividad } from '../model/actividadmodel';

@Injectable({providedIn: 'root'})
export class Actividadservice {
  private jsonUrl = 'assets/actividad/actividad.json';

  constructor(private http: HttpClient) { }

  getActividades(): Observable<Actividad[]>{
    return this.http.get<Actividad[]>(this.jsonUrl);
  }
}
