# Gohome

## Accommodation-Marketplace

A frontend to browse, get quotes for, and simulate bookings of short-term accommodations, vehicles, and activities.

## Team members :

- David Santiago Vargas Rey - [@davidsvr2612](https://github.com/davidsvr2612)
- Leonardo Alejandro Mena Freites - [@LeoMenays16](https://github.com/LeoMenays16)
- Letizia Alejandra Rodríguez Cardenas - [@LettyAle](https://github.com/LettyAle)
- Mateo Alvarez Martinez - [@m00n999](https://github.com/m00n999)

## Tecnology used

- Angular
- Typescript
- Bootstrap
- Font Awesome
- Google Maps API
- Node.js
- npm

## Requeriments

- Node.js v24.20.0
- npm v11.19.0

## Main Features

- List of active accommodations, vehicles, and activities with image, city, price, rating, and amenities
- Filters by city, number of guests, type, and maximum price, with a clear-filters option
- Interactive Google Maps integration
- A login and account creation system
- Accommodation detail page with reviews, house rules, and images
- Quote calculation (nights, subtotal, cleaning fee, 10% service fee, total)
-gohome
  ├── public/assets/
  │   ├── alojamiento/
  │   ├── vehiculo/
  │   └── actividad/
  │
  └── src
  ├── app/
  │   ├── components/
  │   ├── guards/
  │   ├── model/
  │   └── services/ Simulated booking and "Mis reservas" view

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.2.1.

# Installation

```bash
git clone https://github.com/mb-2607/accommodation-marketplace
cd accommodation-marketplace
npm install
npm run start
```

## Running the app:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`.

## Project Structure

```text
accomodation-marketplace
├── public/assets/
│   ├── data/
│   └── images/
│
└── src
    ├── components
    ├── guards
    ├── model
    └── services
```

This project uses GNU 3.0 license, see LICENSE to more details
