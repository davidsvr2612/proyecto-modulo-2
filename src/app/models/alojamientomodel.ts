export interface Alojamientomodel {
  listing_id: string;
  checkin : string;
  checkout: string;
  adults: number;
  children?: number;
  infants?: number;
  pets?: number;
  currency?: string;
}

export interface ClientConfig {
  token: string;
  baseUrl?: string;
}
