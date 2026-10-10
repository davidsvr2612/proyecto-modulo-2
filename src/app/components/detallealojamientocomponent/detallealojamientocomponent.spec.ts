import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleAlojamientoComponent } from './detallealojamientocomponent';

describe('DetalleAlojamientoComponent', () => {
  let component: DetalleAlojamientoComponent;
  let fixture: ComponentFixture<DetalleAlojamientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetalleAlojamientoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleAlojamientoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
