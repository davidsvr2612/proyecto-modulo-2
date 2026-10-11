import { TestBed } from '@angular/core/testing';
import { Maptilerservice } from './maptilerservice';

describe('Maptilerservice', () => {
  let service: Maptilerservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Maptilerservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
