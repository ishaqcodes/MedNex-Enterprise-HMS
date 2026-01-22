import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-patient-admission',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './patient-admission.component.html',
  styleUrls: ['./patient-admission.component.scss']
})
export class PatientAdmissionComponent implements OnInit {

  patientForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.patientForm = this.fb.group({

      // 🔹 Personal (10)
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: [''],
      dob: [''],
      age: [''],
      bloodGroup: [''],
      maritalStatus: [''],
      phone: [''],
      alternatePhone: [''],
      email: [''],
      occupation: [''],
      religion: [''],


      // 🔹 Address (8)
      address1: [''],
      address2: [''],
      city: [''],
      state: [''],
      pincode: [''],
      country: [''],
      nationality: [''],
      nationalId: [''],

      // 🔹 Emergency (6)
      emergencyName: [''],
      emergencyRelation: [''],
      emergencyPhone: [''],
      emergencyAddress: [''],
      guardianName: [''],
      guardianPhone: [''],

      // 🔹 Admission (8)
      admissionDate: [''],
      admissionType: [''],
      wardType: [''],
      roomNumber: [''],
      bedNumber: [''],
      referredDoctor: [''],
      hospitalBranch: [''],
      admissionReason: [''],

      // 🔹 Insurance (8)
      insuranceProvider: [''],
      policyNumber: [''],
      validTill: [''],
      coverageAmount: [''],
      claimStatus: [''],
      tpaName: [''],
      insurancePhone: [''],
      insuranceEmail: [''],

      // 🔹 Medical (10)
      height: [''],
      weight: [''],
      bp: [''],
      sugar: [''],
      allergy: [''],
      disability: [''],
      chronicDisease: [''],
      surgeryHistory: [''],
      medication: [''],
      remarks: ['']
    });
  }

  submitForm() {
    console.log(this.patientForm.value);
    alert('Form Submitted Successfully ✅');
  }
}