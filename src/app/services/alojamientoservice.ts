import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Alojamientomodel, Resena } from '../models/alojamientomodel';

@Injectable({
  providedIn: 'root',
})
export class AlojamientoService {
  private readonly APIFY_TOKEN: string = 'apify_api_vFewJiOcbFxRgAeOpbNHsdp7W9i8Gz0jTbcz';
  private readonly BASE_URL = 'https://romy--airbnb-all-in-one-api.apify.actor';

  private readonly MARKET = 'CO';
  private readonly CURRENCY = 'COP';

  constructor(private http: HttpClient) {}

  buscarAlojamientos(
    query: string,
    checkin: string,
    checkout: string,
    adults: number = 1,
  ): Observable<Alojamientomodel[]> {
    const params = new HttpParams()
      .set('token', this.APIFY_TOKEN)
      .set('query', query)
      .set('checkin', checkin)
      .set('checkout', checkout)
      .set('adults', adults.toString())
      .set('market', this.MARKET)
      .set('currency', this.CURRENCY);

    return this.http.get<any>(`${this.BASE_URL}/search`, { params }).pipe(
      map((response) => {
        console.log('Respuesta de la API:', response);
        return response.data || response.results || response;
      }),
    );
  }

  obtenerDetalleAlojamiento(listingId: string): Observable<Alojamientomodel> {
    const params = new HttpParams()
      .set('token', this.APIFY_TOKEN)
      .set('listing_id', listingId)
      .set('market', this.MARKET)
      .set('currency', this.CURRENCY);

    return this.http
      .get<any>(`${this.BASE_URL}/listing`, { params })
      .pipe(map((response) => response.data || response));
  }

  obtenerResenas(listingId: string, limit: number = 20): Observable<Resena[]> {
    const params = new HttpParams()
      .set('token', this.APIFY_TOKEN)
      .set('listing_id', listingId)
      .set('limit', limit.toString());

    return this.http
      .get<any>(`${this.BASE_URL}/reviews`, { params })
      .pipe(map((response) => response.data || response.reviews || response));
  }

  obtenerDisponibilidad(listingId: string): Observable<string[]> {
    return this.obtenerDetalleAlojamiento(listingId).pipe(
      map((alojamiento: any) => {
        return alojamiento.fechasOcupadas || alojamiento.calendar || [];
      }),
    );
  }
}
