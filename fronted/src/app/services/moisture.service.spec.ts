import { TestBed } from '@angular/core/testing';

import { MoistureService } from './moisture.service';

describe('MoistureService', () => {
  let service: MoistureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoistureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
