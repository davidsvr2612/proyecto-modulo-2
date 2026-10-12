import { TestBed } from '@angular/core/testing';
import { Loginservice, SesionActiva } from './loginservice';

describe('Loginservice', () => {
  let service: Loginservice;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(Loginservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start without an active session', () => {
    expect(service.estaAutenticado()).toBe(false);
    expect(service.getSesion()).toBeNull();
  });

  it('should register a user and open the session', () => {
    const error = service.registrar('Santiago', 'Correo@Prueba.com', '123456');
    expect(error).toBe('');
    expect(service.estaAutenticado()).toBe(true);
    expect(service.getSesion()).toEqual({ nombre: 'Santiago', correo: 'correo@prueba.com' });
  });

  it('should not register the same email twice', () => {
    service.registrar('Santiago', 'correo@prueba.com', '123456');
    const error = service.registrar('Otra persona', 'CORREO@prueba.com', '654321');
    expect(error).toBe('Ya existe una cuenta con ese correo.');
  });

  it('should log in with valid credentials', () => {
    service.registrar('Santiago', 'correo@prueba.com', '123456');
    service.cerrarSesion();
    expect(service.estaAutenticado()).toBe(false);

    const error = service.iniciarSesion('correo@prueba.com', '123456');
    expect(error).toBe('');
    expect(service.getSesion()?.nombre).toBe('Santiago');
  });

  it('should reject wrong credentials', () => {
    service.registrar('Santiago', 'correo@prueba.com', '123456');
    service.cerrarSesion();

    const error = service.iniciarSesion('correo@prueba.com', 'incorrecta');
    expect(error).toBe('Correo o contraseña incorrectos.');
    expect(service.estaAutenticado()).toBe(false);
  });

  it('should notify subscribers when the session changes', () => {
    const valores: (SesionActiva | null)[] = [];
    service.getObservable().subscribe(valor => valores.push(valor));

    service.registrar('Santiago', 'correo@prueba.com', '123456');
    service.cerrarSesion();

    expect(valores.length).toBe(3);
    expect(valores[0]).toBeNull();
    expect(valores[1]?.correo).toBe('correo@prueba.com');
    expect(valores[2]).toBeNull();
  });
});
