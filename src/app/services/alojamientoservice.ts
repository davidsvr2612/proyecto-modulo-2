import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClientConfig } from '../models/alojamientomodel';

@Injectable({
  providedIn: 'root',
})
export class AlojamientoService {
  private readonly token: string;
  private readonly baseUrl: string;

  /**
   * El constructor inicializa el cliente con tus credenciales seguras.

  /*constructor(config: ClientConfig) {
    if (!config.token) {
      throw new Error('El token de Apify es obligatorio para inicializar el cliente.');
    }
    this.token = config.token;
    // Si no se pasa una baseUrl, usamos la del Actor Standby que ya probaste por defecto
    this.baseUrl = config.baseUrl || 'https://apify.actor';
  }*/

  constructor(p1: string, p2?: string ) {
    if (!p1) {
      throw new Error('El token de Apify es obligatorio');
    }
    this.token = p1;
    this.baseUrl = p2 || 'https://apify.actor';
  }

  /**
   * MÉTODO PRIVADO: Constructor de URLs e Inyector de Parámetros
   * Se encarga puramente de tomar un objeto plano de TypeScript y transformarlo
   * en una URL válida para internet con codificación segura.
   */
  private buildUrl(endpoint: string, params: URLSearchParams): string {
    // Combinamos la base (https://...) con el endpoint (/listing o /search)
    const url = new URL(`${this.baseUrl}${endpoint}`);

    // Convertimos el objeto TypeScript en parámetros de consulta (?key=value&key2=value2)
    const searchParams = new URLSearchParams();

    // Recorremos los filtros dinámicos y los agregamos si existen
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });

    // Inyectamos el token de seguridad al final de forma automatizada
    searchParams.append('token', this.token);

    // Fusionamos los parámetros con la URL principal
    url.search = searchParams.toString();
    return url.toString();
  }

  /**
   * MÉTODO PÚBLICO: Obtener el detalle y disponibilidad de un alojamiento
   * Consume el endpoint síncrono de Standby y gestiona los estados de HTTP.
   */
  public async getListingDetails(filters: URLSearchParams): Promise<any> {
    // Construimos la URL usando nuestra función interna de soporte
    const finalUrl = this.buildUrl('/listing', filters);

    try {
      // Realizamos la petición HTTP síncrona
      const response = await fetch(finalUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      // Manejo de errores de HTTP de manera explícita (401, 404, 500, etc.)
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`[Apify Error ${response.status}]: ${errorText || response.statusText}`);
      }

      // Retornamos el JSON procesado listo para la lógica de tu negocio
      return await response.json();
    } catch (error) {
      // Re-lanzamos el error con un contexto claro de dónde falló la arquitectura
      console.error(`❌Falló la consulta en el método getListingDetails:`);
      throw error;
    }
  }
}
