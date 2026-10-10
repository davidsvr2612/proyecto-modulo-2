import { Inject, Injectable } from '@angular/core';
import {
  BASE_API_CONFIG,
  BaseApiConfig,
  RequestListingDetailsModel,
  ResponseListingDetailModel,
} from '../models/alojamientomodel';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AlojamientoService {
  // Propiedades de la clase
  private readonly token: string;
  private readonly baseUrl: string;

  constructor(
    @Inject(BASE_API_CONFIG) baseApiConfig: BaseApiConfig,
    private http: HttpClient,
  ) {
    if (!baseApiConfig.token) {
      throw new Error('El token de Apify es obligatorio para inicializar');
    }

    this.token = baseApiConfig.token;
    this.baseUrl = baseApiConfig.baseUrl || 'https://romy--airbnb-all-in-one-api.apify.actor';
  }

  public async getListingDetails(
    filters: RequestListingDetailsModel,
  ): Promise<ResponseListingDetailModel> {
    console.log('getListingDetails -> Parámetros recibidos:', filters);

    // Construimos los parámetros HTTP usando HttpParams de Angular
    let params = new HttpParams()
      .set('listing_id', filters.listing_id)
      .set('checkin', filters.checkin)
      .set('checkout', filters.checkout)
      .set('adults', filters.adults.toString())
      .set('token', this.token);

    // Agregamos parámetros opcionales solo si existen
    if (filters.children !== undefined) {
      params = params.set('children', filters.children.toString());
    }
    if (filters.infants !== undefined) {
      params = params.set('infants', filters.infants.toString());
    }
    if (filters.pets !== undefined) {
      params = params.set('pets', filters.pets.toString());
    }
    if (filters.currency) {
      params = params.set('currency', filters.currency);
    }

    // Unimos la url base y el endpoint a consultar.
    const url = `${this.baseUrl}/listing`;

    console.log('URL base completa:', url);
    console.log('Parámetros:', params.toString());

    try {
      // Usamos firstValueFrom para convertir el Observable en Promise
      // this.http.get --> esto es lllamdo a la api
      const response = await firstValueFrom(
        this.http.get<ResponseListingDetailModel>(url, { params }),
      );

      console.log('Respuesta exitosa de la API:', response);

      return response;
    } catch (error: any) {
      console.error('Error al consultar la API de alojamientos:');
      console.error('Detalles del error:', error);

      if (error.status) {
        console.error(`Código HTTP: ${error.status}`);
        console.error(`Mensaje: ${error.message}`);
      }

      throw error;
    }
  }
}
