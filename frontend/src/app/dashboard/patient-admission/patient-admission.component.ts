import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { BedManagementService } from '../../core/services/bed-management.service';

@Component({
  selector: 'app-patient-admission',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, 
    MatInputModule, MatButtonModule, MatIconModule, MatSelectModule, 
    MatDatepickerModule, MatNativeDateModule, MatTabsModule, 
    MatCheckboxModule, MatRadioModule, MatSnackBarModule, MatDividerModule
  ],
  templateUrl: './patient-admission.component.html',
  styleUrls: ['./patient-admission.component.scss']
})
export class PatientAdmissionComponent {
  admissionForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private bedService: BedManagementService,
    private snackBar: MatSnackBar
  ) {
    this.admissionForm = this.fb.group({
      // --- New Logic: Type Selection ---
      registrationType: ['OPD', Validators.required], // Default OPD

      // Tab 1: Personal
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['Male', Validators.required],
      maritalStatus: ['Single'],
      aadhar: ['', [Validators.required, Validators.pattern('^[0-9]{12}$')]],
      contactNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', Validators.email],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],

      // Tab 2: Clinical
      bloodGroup: ['', Validators.required],
      height: [''],
      weight: [''],
      allergies: [''],
      isDiabetic: [false],
      isHypertensive: [false],
      chiefComplaint: ['', Validators.required],
      admittingDoctor: ['', Validators.required],
      bedType: ['General'], // Optional based on selection

      // Tab 3: Emergency
      emergencyName: ['', Validators.required],
      emergencyRelation: ['', Validators.required],
      emergencyPhone: ['', Validators.required],
      insuranceProvider: [''],
      policyNumber: [''],
      isCashless: [false]
    });
  }

  onSubmit() {
    if (this.admissionForm.valid) {
      const formData = this.admissionForm.value;
      const patientName = `${formData.firstName} ${formData.lastName}`;
      const regType = formData.registrationType;

      // --- OPD CASE ---
      if (regType === 'OPD') {
        this.snackBar.open(
          `🏥 OPD Token Generated for ${formData.admittingDoctor}`, 
          'Print', 
          { duration: 5000, verticalPosition: 'top' }
        );
        // Reset but keep OPD selected
        this.admissionForm.reset({ registrationType: 'OPD', gender: 'Male', maritalStatus: 'Single' });
        return;
      }

      // --- IPD CASE ---
      const bedType = formData.bedType || 'General';
      const assignedBedId = this.bedService.occupyBed(patientName, bedType);

      if (assignedBedId) {
        this.snackBar.open(
          `✅ Admission Success! Bed Allocated: ${assignedBedId}`, 
          'Print Label', 
          { duration: 5000, verticalPosition: 'top' }
        );
        this.admissionForm.reset({ registrationType: 'IPD', gender: 'Male', maritalStatus: 'Single' });
      } else {
        this.snackBar.open(
          `❌ No ${bedType} Beds Available!`, 
          'Close', 
          { duration: 5000, panelClass: ['error-snackbar'], verticalPosition: 'top' }
        );
      }
    } else {
      this.snackBar.open('⚠️ Please fill all required fields.', 'Close', { duration: 3000 });
    }
  }
}