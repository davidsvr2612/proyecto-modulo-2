import { Injectable } from '@angular/core';

declare var maplibregl: any;

@Injectable({
  providedIn: 'root',
})
export class Maptilerservice {

  private apiKey: string = 'ArLFkAScmbxK3EyczSt';

  constructor() {}

  public crearMapa(
    containerId: string,
    lng: number = -74.08175,
    lat: number = 4.60971,
    zoom: number = 13,
  ): any {
    if (typeof maplibregl === 'undefined') {
      console.error('MapLibre no está cargado');
      return null;
    }

    const map = new maplibregl.Map({
      container: containerId,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${this.apiKey}`,
      center: [lng, lat],
      zoom: zoom,
    });

    return map;
  }

  public agregarMarcador(
    map: any,
    lng: number,
    lat: number,
    titulo: string,
    subtitulo: string = '',
  ): void {
    const contenidoPopup = `
      <div style="font-family: sans-serif;">
        <h4 style="margin: 0 0 5px 0; color: #333;">${titulo}</h4>
        ${subtitulo ? `<p style="margin: 0; font-weight: bold; color: #2563eb;">${subtitulo}</p>` : ''}
      </div>
    `;

    new maplibregl.Marker({ color: '#2563eb' })
      .setLngLat([lng, lat])
      .setPopup(new maplibregl.Popup().setHTML(contenidoPopup))
      .addTo(map);
  }
}
