import { TestBed } from '@angular/core/testing';
import { Vehiculoservice } from './vehiculoservice';

describe('Vehiculoservice', () => {
  let service: Vehiculoservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Vehiculoservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
