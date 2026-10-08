import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlojamientoComponent } from './alojamientocomponent';

describe('AlojamientoComponent', () => {
  let component: AlojamientoComponent;
  let fixture: ComponentFixture<AlojamientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlojamientoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AlojamientoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
