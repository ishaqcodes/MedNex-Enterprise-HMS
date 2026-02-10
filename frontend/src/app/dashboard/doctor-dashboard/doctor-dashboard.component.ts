import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { Inject } from '@angular/core';

// --- INTERFACES ---
export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  symptoms: string;
  status: 'Waiting' | 'In-Consultation' | 'Discharged';
  priority: 'High' | 'Normal';
}

// --- PRESCRIPTION DIALOG COMPONENT ---
@Component({
  selector: 'prescription-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule],
  template: `
    <div class="dialog-header">
      <h2><mat-icon>medication</mat-icon> Prescription Pad</h2>
      <p>Patient: <strong>{{data.name}}</strong> ({{data.age}} Y / {{data.gender}})</p>
    </div>
    
    <mat-dialog-content>
      <form [formGroup]="rxForm" class="rx-form">
        
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Clinical Diagnosis</mat-label>
          <input matInput formControlName="diagnosis" placeholder="Ex. Acute Viral Fever">
        </mat-form-field>

        <div class="row">
          <mat-form-field appearance="outline" class="half-width">
            <mat-label>Medicine Name</mat-label>
            <input matInput formControlName="medicine" placeholder="Ex. Paracetamol 650">
          </mat-form-field>
          <mat-form-field appearance="outline" class="half-width">
            <mat-label>Dosage</mat-label>
            <mat-select formControlName="dosage">
              <mat-option value="1-0-1">1-0-1 (Morning-Night)</mat-option>
              <mat-option value="1-1-1">1-1-1 (Thrice a day)</mat-option>
              <mat-option value="1-0-0">1-0-0 (Once a day)</mat-option>
              <mat-option value="SOS">SOS (When needed)</mat-option>
            </mat-select>
          </mat-form-field>
        </div>

        <div class="row">
          <mat-form-field appearance="outline" class="half-width">
            <mat-label>Duration (Days)</mat-label>
            <input type="number" matInput formControlName="duration" placeholder="5">
          </mat-form-field>
          <mat-form-field appearance="outline" class="half-width">
            <mat-label>Advice / Notes</mat-label>
            <input matInput formControlName="notes" placeholder="Take after food">
          </mat-form-field>
        </div>

      </form>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-stroked-button mat-dialog-close color="warn">Close</button>
      <button mat-raised-button color="primary" [disabled]="!rxForm.valid" (click)="printRx()">
        <mat-icon>print</mat-icon> Issue & Print
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .dialog-header { background: #e0f2fe; padding: 20px; border-bottom: 1px solid #bae6fd; margin: -24px -24px 20px -24px; color: #0369a1; }
    .rx-form { display: flex; flex-direction: column; gap: 10px; min-width: 500px; }
    .row { display: flex; gap: 15px; }
    .full-width { width: 100%; }
    .half-width { width: 50%; }
  `]
})
export class PrescriptionDialog {
  rxForm: FormGroup;
  constructor(
    private fb: FormBuilder, 
    private dialogRef: MatDialogRef<PrescriptionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Patient
  ) {
    this.rxForm = this.fb.group({
      diagnosis: ['', Validators.required],
      medicine: ['', Validators.required],
      dosage: ['', Validators.required],
      duration: ['', Validators.required],
      notes: ['']
    });
  }
  printRx() {
    if (this.rxForm.valid) {
      alert(`🖨️ Printing Prescription for ${this.data.name}...\nMEDICINE: ${this.rxForm.value.medicine}`);
      this.dialogRef.close(true);
    }
  }
}

// --- MAIN DOCTOR DASHBOARD ---
@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatCardModule, MatTableModule, MatDialogModule, MatChipsModule],
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.scss']
})
export class DoctorDashboardComponent {
  displayedColumns: string[] = ['id', 'name', 'symptoms', 'priority', 'status', 'actions'];
  
  // Mock Data: Doctor ke paas ye patients assign hue hain
  patientQueue: Patient[] = [
    { id: 'OPD-102', name: 'Tony Stark', age: 45, gender: 'M', symptoms: 'Chest Pain, Anxiety', status: 'Waiting', priority: 'High' },
    { id: 'OPD-105', name: 'Natasha Romanoff', age: 32, gender: 'F', symptoms: 'Body Ache, Fatigue', status: 'In-Consultation', priority: 'Normal' },
    { id: 'OPD-108', name: 'Bruce Banner', age: 50, gender: 'M', symptoms: 'Anger Issues, High BP', status: 'Waiting', priority: 'Normal' }
  ];

  constructor(private dialog: MatDialog) {}

  openPrescription(patient: Patient) {
    const dialogRef = this.dialog.open(PrescriptionDialog, {
      width: '600px',
      data: patient
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Status Update: Waiting -> Discharged
        patient.status = 'Discharged';
      }
    });
  }
}