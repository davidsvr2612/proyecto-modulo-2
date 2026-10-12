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


# Installation

```bash
git clone https://github.com/davidsvr2612/proyecto-modulo-2.git
cd proyecto-modulo-2
npm install
npm run start
```

## Running the app:

```bash
ng serve
```
## Features

### Navigation bar and footer

The bar appears on every screen because it is part of the root component. It contains the brand name, which links to the home page, and links to Accommodations, My bookings, Vehicles, and Activities. On small screens it collapses into a menu button thanks to Bootstrap's `collapse` behavior.

The right end changes depending on the session state. If there is no authenticated user, it shows the "Iniciar sesión" (Sign in) and "Crear cuenta" (Create account) links. If there is one, it shows the person's name and a "Cerrar sesión" (Sign out) button that clears the session and takes them back to the sign-in screen. The bar subscribes to the session maintained by `Loginservice`, so it updates the moment someone signs in or out.

The footer is a simple block with the copyright notice.

### Home page

This is the screen reached by the brand name in the bar and by the `/` route. It has three blocks.

**Welcome.** A header with the platform name, a title, and a short description of what can be done on the site. If a session is open, the title greets the person by name; if not, a "Crear cuenta" (Create account) button also appears. The main button, "Buscar alojamientos" (Search accommodations), leads to the full listing.

**Featured accommodations.** Active accommodations with a valid price are selected and sorted from highest to lowest rating, and the first three are shown as cards with a photo, city, name, rating, type, capacity, price per night, and a "Ver detalle" (View details) button leading to the detail page. A loading indicator is shown while the data loads, a warning appears if the read fails, and a message is shown if there is nothing to display. A button leads to the full listing.

**Services.** Four cards (Accommodations, Vehicles, Activities, and Bookings), each with an icon, a phrase, and a button that opens its section: `/alojamientos`, `/vehiculos`, `/actividades`, and `/mis-reservas`. If someone without a session enters bookings, that screen sends them to sign in.

### Sign in

This happens at `/iniciar-sesion`, with `Logincomponent`. The form asks for an email and a password:

- Both fields are required, and the submit button stays disabled until the form is valid (email with a correct format and non-empty password). If an empty submission is attempted anyway, the message "Ingresa tu correo y tu contraseña." (Enter your email and password.) is shown.
- A button with an eye icon lets the user show or hide the password while typing.
- If the email and password do not match any registered account, the message "Correo o contraseña incorrectos." (Incorrect email or password.) is shown.
- When the credentials are correct, the person is taken to the address saved in the `returnUrl` parameter or, if there is none, to `/alojamientos`. Only internal addresses starting with `/` are accepted; any other value is ignored.
- If a session is already open, instead of the form a panel appears with the account's name and email, shortcuts to "Mis reservas" (My bookings) and to accommodations, and a button to sign out.
- The "Crear cuenta" (Create account) link preserves the `returnUrl`, so that after registering the person returns to where they were.

### Registration

This happens at `/registro`, with `Authcomponent`. It asks for full name, email, password, and password confirmation. Before creating the account, the following is checked:

- the name has at least 2 characters,
- the password has at least 6 characters,
- the password and its confirmation match,
- no other account with the same email already exists.

The email is normalized (spaces are removed and it is lowercased) so that two accounts differing only in capitalization cannot be created. Upon successful registration, the user is signed in automatically and redirected to the return address. This screen keeps a two-button toggle, so it also allows switching to a sign-in form without leaving it; both paths use the same service. If someone with an open session enters here, they are redirected straight away.

### Accommodations page

This is the screen the application starts with, and it has three parts.

**Carousel.** At the top there is a carousel of three slides with a background image, a label, a title, and an action button. The first presents the platform and scrolls down to the listing, the second invites users to see the vehicles, and the third leads to the activities. The carousel advances on its own every 5 seconds, pauses when the cursor is over it, supports touch gestures, and returns to the first slide at the end. It is configured from the component with Bootstrap's `Carousel` class once the view is ready.

**Filters.** There are four criteria that can be combined:

- city, with a list that builds itself from the loaded accommodations and is sorted alphabetically according to Spanish rules,
- accommodation type (Apartment, Cabin, or House),
- number of guests, which keeps only accommodations with equal or greater capacity,
- maximum price per night, in Colombian pesos.

The "Limpiar filtros" (Clear filters) button resets all fields. Next to the listing title, the number of options remaining after filtering is shown.

**Listing.** Each accommodation is presented in a card with its main photo, the city in a label over the image, the name, the rating, the type, the maximum guest capacity, the amenities it offers, and the price per night formatted in COP currency. A button leads to the full detail page. Only accommodations marked as active and with a price greater than zero are shown.

A loading indicator is shown while the data arrives. If the read fails, an error warning appears, and if the filters leave no results, a no-matches message is shown along with a button to clear them.

### Accommodation detail

When an accommodation is opened, it is looked up by the route identifier among the active ones. If it does not exist or is not available, a message is shown instead of the page.

The information is organized as follows:

- header with name, location, city, rating, and number of reviews,
- gallery with the first image large and the rest in a side column,
- accommodation type, capacity, bedrooms, beds, and bathrooms,
- description, list of amenities with a checkmark, and house rules,
- guest reviews, each with author, rating, and comment. If the accommodation has no reviews, a message says so.

In the right-hand column there is a booking card that follows the page scroll on large screens. It shows the price per night and a form with arrival date, departure date, and number of guests.

**Quote.** When "Calcular cotización" (Calculate quote) is pressed, the data is validated in this order and the first error found is shown:

1. that both dates are filled in,
2. that the arrival is not earlier than today,
3. that the departure is later than the arrival,
4. that guests is an integer greater than zero,
5. that the accommodation's capacity is not exceeded,
6. that the price per night is valid.

If everything is correct, the number of nights is calculated and a summary is presented with these items:

```
subtotal        = nights × price per night
service fee     = 10% of the subtotal
cleaning fee    = value specific to each accommodation
total           = subtotal + cleaning fee + service fee
```

The date fields already prevent picking past days from the picker itself, and if any data is modified after calculating, the previous quote disappears to avoid booking with outdated values. Today's date is calculated using the device's local time and not UTC, so that it does not jump ahead a day at certain hours.

**Booking.** The "Reservar ahora" (Book now) button appears next to the summary. If there is no session, it sends the user to sign in and remembers the page to return to. If there is one, it creates the booking in the account's name (name and email come from the session and are not asked for again), with status `CONFIRMADA`, saves it, and takes the user to "Mis reservas" (My bookings).

### Vehicle catalog

Shows the rental vehicles with these combinable filters:

- city,
- vehicle type,
- transmission,
- maximum price per day,
- a checkbox to show only available ones.

The city, type, and transmission lists are generated from the data, without repeated values and sorted. There is also a button to clear the filters and an options counter.

Each card includes the photo, the city over the image, the model, the type, the transmission, and the price per day. The "Reservar Auto" (Book car) button leads to `/reserva/vehiculos/:id`. If there are no results, a message is shown.

### Activity catalog

Works like the vehicle catalog but with two filters: location and maximum price per person. Each card shows the image, the place, the name, the description, and the price per person. The "Reservar" (Book) button leads to `/reserva/actividades/:id`.

### Vehicle and activity booking

Both kinds of service use the same screen, `/reserva/:tipo/:id`, which adapts according to the type received in the route. The first thing it does is check that a session is open; if not, it redirects to sign-in with the return address.

It then loads the corresponding catalog and looks up the item by its identifier, accepting it only if it is marked as available. If it is not, a warning is shown, and if the route type is neither `vehiculos` nor `actividades`, a message says the booking type is not valid.

The page shows the image, name, location, and price (per day or per person, as applicable). It also includes a Google map centered on the coordinates (`lat` and `lng`) of the vehicle or activity, with a marker at that point. If an item came without coordinates, the map is centered on Bogotá.

The form changes depending on the service:

| | Vehicle | Activity |
| --- | --- | --- |
| Fields | pickup date and return date | activity date and number of people |
| Total calculation | price per day × rental days | price per person × people |
| Validations | pickup not earlier than today and return later than pickup | date not earlier than today and people as an integer greater than zero |

It is also checked that the price is greater than zero. When calculating, a summary with the breakdown and the total is shown, and below it the "Confirmar reserva" (Confirm booking) button. As with accommodations, any change to the dates invalidates the displayed quote.

On confirming, the booking is saved with its type ("Vehículo" or "Actividad"), the dates, the quantity, the total, and the account data. For activities, the departure date matches the start date and a single night is recorded; for vehicles, the nights correspond to the rental days and guests are recorded as 1. Afterwards, "Mis reservas" (My bookings) opens.

### My bookings

Lists the bookings of the account with the open session, from most recent to oldest. If someone enters without a session, they are sent to sign in.

Each booking is shown in a card with:

- the name of the service, preceded by its type when it is a vehicle or an activity,
- the city or location,
- the booking status,
- arrival date and departure date (the label changes to "Fecha" (Date) for activities and to "Devolución" (Return) for vehicles),
- guests and nights,
- total value, formatted as currency,
- name and email of the person who booked,
- the booking's unique code, in the format `GH-` followed by a number generated from the time.

The "Quitar de la lista" (Remove from list) button deletes the booking, and only if it belongs to the active account. When there are no bookings, a message appears with a shortcut to the accommodations listing.

## Catalog data

The three catalogs are JSON files inside `public/assets/`, which Angular publishes as static resources and which the application queries with HTTP requests.

| File | Contents |
| --- | --- |
| `alojamiento/alojamiento.json` | 30 accommodations in 21 cities and 35 reviews |
| `vehiculo/vehiculo.json` | 69 vehicles in 8 cities, of type car, SUV, or sports car, with automatic or manual transmission |
| `actividad/actividad.json` | 20 activities in 16 locations |

The accommodations file is an object with two lists, `alojamientos` and `resenas`, which are related through the `alojamientoId` field. The vehicle and activity files are simple lists. To add content, just add a record with the same shape as the existing ones; no code changes are needed.

## Project Structure

```text
public/assets/
  alojamiento/alojamiento.json     
  vehiculo/vehiculo.json          
  actividad/actividad.json   
src/
  index.html                  
  styles.css                       
  main.ts                          
  app/
    app.ts / app.html              
    app-module.ts                  
    model/                        
    services/                      
    components/                    
```

This project is protected under the GNU 3.0 license (see the LICENSE file for details).
