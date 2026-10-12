import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Alojamiento } from '../../model/alojamientomodel';
import { AlojamientoService } from '../../services/alojamientoservice';
import { Iniciocomponent } from './iniciocomponent';

describe('Iniciocomponent', () => {
  let component: Iniciocomponent;
  let fixture: ComponentFixture<Iniciocomponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Iniciocomponent],
      providers: [
        {
          provide: AlojamientoService,
          useValue: {
            getAlojamientos: () => of([] as Alojamiento[]),
          },
        },
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(Iniciocomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
