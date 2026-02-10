import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BedAvailability } from './bed-availability';

describe('BedAvailability', () => {
  let component: BedAvailability;
  let fixture: ComponentFixture<BedAvailability>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BedAvailability]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BedAvailability);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
