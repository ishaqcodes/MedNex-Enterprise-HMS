import { TestBed } from '@angular/core/testing';

import { BedManagement } from './bed-management';

describe('BedManagement', () => {
  let service: BedManagement;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BedManagement);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
