import { AlojamientoService } from './services/alojamientoservice';
import { ClientConfig } from './models/alojamientomodel';

async function ejecutarAplicacion() {

  const airbnbApiClient = new AlojamientoService(
    'apify_api_hkwOYHW5jxoqXj9CEEpyB56e0SpgYC479ze3',
    'https://apify.actor'
  );

  const busquedaIndonesia = new URLSearchParams({
    listing_id: '1633199196629299212',
    checkin: '2026-09-01',
    checkout: '2026-09-05',
    adults: '2',
    children: '0',
    infants: '0',
    pets: '0',
    currency: 'IDR',
  });

  const busquedaNuevaYork = new URLSearchParams({
    listing_id: '987654321',
    checkin: '2026-12-20',
    checkout: '2026-12-27',
    adults: '1',
    currency: 'USD',
  });

  try {
    console.log('⏳ Solicitando información de Indonesia...');
    const resultadoBali = await airbnbApiClient.getListingDetails(busquedaIndonesia);
    console.log('✅ Datos obtenidos correctamente:', resultadoBali);

    console.log('⏳ Solicitando información de Nueva York...');
    const resultadoNY = await airbnbApiClient.getListingDetails(busquedaNuevaYork);
    console.log('✅ Datos obtenidos correctamente:', resultadoNY);
  } catch (error: any) {
    console.error('💥 La aplicación no pudo completar la operación:', error.message);
  }
}

ejecutarAplicacion();

