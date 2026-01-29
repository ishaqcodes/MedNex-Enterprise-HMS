import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PatientService } from './services/patient.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  // Week 1 Requirement: Tenant Switching
  tenants = [
    { id: 'tenant_apollo', name: 'Apollo Hospital (DB_A)' },
    { id: 'tenant_fortis', name: 'Fortis Hospital (DB_B)' },
  ];
  currentTenant = 'tenant_apollo';

  admissionForm: FormGroup;
  patients: any[] = [];
  loading = false;
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
  ) {
    // Week 2 Requirement: Reactive Form with 50+ Fields
    this.admissionForm = this.fb.group({
      // --- SQL Columns ---
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(0), Validators.max(120)]],
      gender: ['Male', Validators.required],

      // --- JSONB Data (Medical History & Details) ---
      medicalHistory: this.fb.group({
        // 1. Vitals
        height: [''],
        weight: [''],
        bpSystolic: [''],
        bpDiastolic: [''],
        pulse: [''],
        temperature: [''],
        spo2: [''],
        bmi: [''],

        // 2. Personal Info
        email: ['', Validators.email],
        phone: ['', Validators.required],
        dob: [''],
        maritalStatus: [''],
        occupation: [''],
        nationality: [''],
        addressLine1: [''],
        city: [''],
        state: [''],
        zipCode: [''],

        // 3. Emergency Contact
        emergencyName: [''],
        emergencyRelation: [''],
        emergencyPhone: [''],

        // 4. Insurance Details
        insuranceProvider: [''],
        policyNumber: [''],
        coverageAmount: [''],
        policyExpiry: [''],
        tpaName: [''],

        // 5. Medical Background
        bloodGroup: [''],
        allergies: [''],
        chronicConditions: [''],
        pastSurgeries: [''],
        familyHistory: [''],
        currentMedications: [''],
        smokingStatus: [''],
        alcoholConsumption: [''],
        dietType: [''],

        // 6. Admission Details
        admissionType: ['Emergency'],
        wardName: [''],
        bedNumber: [''],
        admittingDoctor: [''],
        reasonForAdmission: ['', Validators.required],
        symptoms: ['', Validators.required],
        initialDiagnosis: [''],
        painScore: [''],
        isolationRequired: [false],
      }),
    });
  }

  ngOnInit() {
    this.loadPatients();
  }

  onTenantChange(event: any) {
    this.currentTenant = event.target.value;
    this.patients = [];
    this.loadPatients();
  }

  loadPatients() {
    this.loading = true;
    this.patientService.getPatients(this.currentTenant).subscribe({
      next: (data) => {
        this.patients = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
    });
  }

  onSubmit() {
    if (this.admissionForm.valid) {
      this.patientService
        .addPatient(this.admissionForm.value, this.currentTenant)
        .subscribe({
          next: (res) => {
            this.successMessage = `Patient Admitted Successfully to ${this.currentTenant}!`;
            this.admissionForm.reset({
              gender: 'Male',
              medicalHistory: {
                admissionType: 'Emergency',
                isolationRequired: false,
              },
            });
            this.loadPatients();
            setTimeout(() => (this.successMessage = ''), 3000);
          },
          error: (err) => alert('Failed to admit. Check Backend Logs.'),
        });
    } else {
      alert('Form Invalid! Please fill all required fields (marked *).');
    }
  }

  // Helper for Template
  get mh() {
    return (this.admissionForm.get('medicalHistory') as FormGroup).controls;
  }
}
