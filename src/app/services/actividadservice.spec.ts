import { TestBed } from '@angular/core/testing';
import { Actividadservice } from './actividadservice';

describe('Actividadservice', () => {
  let service: Actividadservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Actividadservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
