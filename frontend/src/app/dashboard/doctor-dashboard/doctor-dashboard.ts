import { Component } from '@angular/core';

@Component({
  selector: 'app-doctor-dashboard',
  template: `
    <div class="dashboard-container">
      <h2><mat-icon>search</mat-icon> Patient EMR Search</h2>
      <input type="text" placeholder="Search by Patient ID..." class="search-box">
      
      <div class="prescription-card">
        <h3>Prescription Form (HL7/FHIR Compliant)</h3>
        <input placeholder="Diagnosis" class="input-field">
        <textarea placeholder="Medication Details (JSONB Format)" class="text-area"></textarea>
        <button mat-raised-button color="primary">Print Prescription</button>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container { padding: 20px; }
    .search-box { width: 100%; padding: 10px; margin-top: 10px; border: 1px solid #ccc; border-radius: 5px; }
    .prescription-card { background: white; padding: 20px; margin-top: 20px; border: 1px solid #eee; border-radius: 10px; }
    .input-field, .text-area { width: 100%; margin-bottom: 10px; padding: 8px; border: 1px solid #ddd; }
    .text-area { height: 100px; }
  `]
})
export class DoctorDashboardComponent {}