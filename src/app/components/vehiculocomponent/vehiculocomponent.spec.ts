import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Vehiculocomponent } from './vehiculocomponent';

describe('Vehiculocomponent', () => {
  let component: Vehiculocomponent;
  let fixture: ComponentFixture<Vehiculocomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Vehiculocomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Vehiculocomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
