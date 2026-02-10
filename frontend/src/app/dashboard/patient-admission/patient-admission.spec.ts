import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientAdmission } from './patient-admission.component';

describe('PatientAdmission', () => {
  let component: PatientAdmission;
  let fixture: ComponentFixture<PatientAdmission>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientAdmission]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientAdmission);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
