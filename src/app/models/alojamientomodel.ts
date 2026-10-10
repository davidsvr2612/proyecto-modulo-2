import { InjectionToken } from '@angular/core';

// Representa la estructura para mapear la configuración base del API
export interface BaseApiConfig {
  token: string;
  baseUrl?: string;
}

// Representa los campos que se necesitan enviar para listar los alojamientos disponibles
// Esto es un DTO
export interface RequestListingDetailsModel {
  listing_id: string;
  checkin: string;
  checkout: string;
  adults: number;
  children?: number;
  infants?: number;
  pets?: number;
  currency?: string;
}

// Representa los campos que retorna la respuesta de la API
export interface ResponseListingDetailModel {
  listing_id?: string;
  title?: string;
  price?: number;
  currency?: string;
  available?: boolean;
  [key: string]: any;
}

export interface SearchRequest {}
export const BASE_API_CONFIG = new InjectionToken<BaseApiConfig>('baseapi.config');
