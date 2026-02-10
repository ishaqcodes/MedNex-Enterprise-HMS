import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

export interface Staff {
  id: number;
  name: string;
  email: string;
  role: string;
  dept: string;
  status: 'Active' | 'On Leave' | 'Terminated';
  joinDate: Date;
}

// --- MODERN DIALOG COMPONENT ---
@Component({
  selector: 'add-staff-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule],
  template: `
    <div class="dialog-header">
      <h2><mat-icon>person_add</mat-icon> Onboard New Employee</h2>
      <p>Enter details to create a system account.</p>
    </div>
    
    <mat-dialog-content>
      <form [formGroup]="staffForm" class="staff-form">
        
        <div class="form-row">
          <mat-form-field appearance="outline" class="half-width">
            <mat-label>Full Name</mat-label>
            <input matInput formControlName="name" placeholder="Ex. Dr. Sameer">
            <mat-icon matSuffix>badge</mat-icon>
          </mat-form-field>

          <mat-form-field appearance="outline" class="half-width">
            <mat-label>Email ID</mat-label>
            <input matInput formControlName="email" placeholder="staff@hospital.com">
            <mat-icon matSuffix>email</mat-icon>
          </mat-form-field>
        </div>

        <div class="form-row">
          <mat-form-field appearance="outline" class="half-width">
            <mat-label>Role</mat-label>
            <mat-select formControlName="role">
              <mat-option value="Doctor">Doctor</mat-option>
              <mat-option value="Nurse">Nurse</mat-option>
              <mat-option value="Receptionist">Receptionist</mat-option>
              <mat-option value="Admin">Admin</mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline" class="half-width">
            <mat-label>Department</mat-label>
            <mat-select formControlName="dept">
              <mat-option value="Cardiology">Cardiology</mat-option>
              <mat-option value="Neurology">Neurology</mat-option>
              <mat-option value="General">General</mat-option>
              <mat-option value="Emergency">Emergency</mat-option>
              <mat-option value="HR">HR & Admin</mat-option>
            </mat-select>
          </mat-form-field>
        </div>
      </form>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-stroked-button mat-dialog-close color="warn">Cancel</button>
      <button mat-raised-button color="primary" [disabled]="!staffForm.valid" (click)="save()">
        Confirm Onboarding
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .dialog-header { background: #f8fafc; padding: 20px 24px; border-bottom: 1px solid #e2e8f0; margin: -24px -24px 20px -24px; }
    .dialog-header h2 { margin: 0; display: flex; align-items: center; gap: 10px; color: #0f172a; font-size: 1.25rem; }
    .dialog-header p { margin: 5px 0 0 34px; color: #64748b; font-size: 0.85rem; }
    .staff-form { display: flex; flex-direction: column; gap: 10px; min-width: 500px; }
    .form-row { display: flex; gap: 15px; }
    .half-width { width: 50%; }
  `]
})
export class AddStaffDialog {
  staffForm: FormGroup;
  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<AddStaffDialog>) {
    this.staffForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      dept: ['', Validators.required]
    });
  }
  save() { if (this.staffForm.valid) this.dialogRef.close(this.staffForm.value); }
}

// --- MAIN DASHBOARD ---
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatCardModule, MatTableModule, MatDialogModule, MatTooltipModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  displayedColumns: string[] = ['name', 'role', 'dept', 'status', 'actions'];
  staffList: Staff[] = [
    { id: 1, name: "Dr. Arvind Gupta", email: "arvind@mednex.com", role: "Doctor", dept: "Cardiology", status: "Active", joinDate: new Date() },
    { id: 2, name: "Priya Sharma", email: "priya@mednex.com", role: "Nurse", dept: "Emergency", status: "On Leave", joinDate: new Date() },
    { id: 3, name: "Dr. Sarah Khan", email: "sarah@mednex.com", role: "Doctor", dept: "Neurology", status: "Active", joinDate: new Date() },
    { id: 4, name: "Rohan Das", email: "rohan@mednex.com", role: "Admin", dept: "HR", status: "Active", joinDate: new Date() },
  ];

  constructor(private dialog: MatDialog) {}

  openAddStaffDialog() {
    const dialogRef = this.dialog.open(AddStaffDialog, {
      width: '600px', // Dialog thoda bada kiya
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '200ms',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.staffList = [...this.staffList, { ...result, id: Date.now(), status: 'Active', joinDate: new Date() }];
      }
    });
  }

  deleteStaff(id: number) {
    if (confirm("Remove this employee permanently?")) {
      this.staffList = this.staffList.filter(s => s.id !== id);
    }
  }
}