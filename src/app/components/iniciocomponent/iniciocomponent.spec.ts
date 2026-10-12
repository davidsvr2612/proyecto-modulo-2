import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AppModule } from '../../app-module';
import { Alojamiento } from '../../model/alojamientomodel';
import { AlojamientoService } from '../../services/alojamientoservice';
import { Iniciocomponent } from './iniciocomponent';

function crearAlojamiento(id: number, calificacion: number, activo = true): Alojamiento {
  return {
    id,
    nombre: `Alojamiento ${id}`,
    descripcion: '',
    ciudad: 'Bogotá',
    ubicacion: 'Centro',
    tipo: 'Casa',
    capacidad: 4,
    habitaciones: 2,
    camas: 2,
    banos: 1,
    precioNoche: 100000,
    tarifaLimpieza: 20000,
    calificacion,
    activo,
    imagenPrincipal: '',
    imagenes: [],
    servicios: [],
    reglas: [],
  };
}

describe('Iniciocomponent', () => {
  let component: Iniciocomponent;
  let fixture: ComponentFixture<Iniciocomponent>;
  let router: Router;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [
        {
          provide: AlojamientoService,
          useValue: {
            getAlojamientos: () =>
              of([
                crearAlojamiento(1, 4.2),
                crearAlojamiento(2, 4.9),
                crearAlojamiento(3, 5, false),
                crearAlojamiento(4, 4.7),
                crearAlojamiento(5, 4.5),
              ]),
          },
        },
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(Iniciocomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the three best rated active lodgings', () => {
    expect(component.destacados.map(a => a.id)).toEqual([2, 4, 5]);
    expect(component.cargando).toBe(false);
  });

  it('should render a card for each featured lodging', () => {
    const tarjetas = (fixture.nativeElement as HTMLElement).querySelectorAll('.destacado');
    expect(tarjetas.length).toBe(3);
  });

  it('should navigate to every section', () => {
    const navegar = vi.spyOn(router, 'navigate').mockResolvedValue(true);

    component.buscarAlojamientos();
    component.irAVehiculos();
    component.irAActividades();
    component.irAReservas();

    expect(navegar).toHaveBeenNthCalledWith(1, ['/alojamientos']);
    expect(navegar).toHaveBeenNthCalledWith(2, ['/vehiculos']);
    expect(navegar).toHaveBeenNthCalledWith(3, ['/actividades']);
    expect(navegar).toHaveBeenNthCalledWith(4, ['/mis-reservas']);
  });
});
