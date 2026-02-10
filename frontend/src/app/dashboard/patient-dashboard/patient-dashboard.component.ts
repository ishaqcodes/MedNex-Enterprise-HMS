import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatListModule,
    MatDividerModule,
    MatChipsModule,
  ],
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.scss'],
})
export class PatientDashboardComponent {
  // Mock Data: Patient ka naam aur details
  patientName = 'Tony Stark';
  patientId = 'MED-2026-001';

  // Vitals
  vitals = [
    { label: 'Heart Rate', value: '72 bpm', icon: 'favorite', color: '#ef4444' },
    { label: 'Blood Pressure', value: '120/80', icon: 'compress', color: '#3b82f6' },
    { label: 'Temperature', value: '98.6°F', icon: 'thermostat', color: '#f59e0b' },
    { label: 'Weight', value: '78 kg', icon: 'monitor_weight', color: '#10b981' },
  ];

  // Prescriptions History
  prescriptions = [
    {
      date: '10 Feb 2026',
      doctor: 'Dr. Strange',
      diagnosis: 'Viral Fever',
      medicine: 'Paracetamol 650',
      status: 'Active',
    },
    {
      date: '15 Jan 2026',
      doctor: 'Dr. Sarah',
      diagnosis: 'Migraine',
      medicine: 'Naproxen 500',
      status: 'Completed',
    },
  ];

  // Lab Reports
  reports = [
    { name: 'Complete Blood Count (CBC)', date: '10 Feb 2026', result: 'Normal' },
    { name: 'X-Ray Chest PA', date: '12 Jan 2026', result: 'Clear' },
  ];

  downloadReport(reportName: string) {
    alert(`Downloading ${reportName}...`);
  }
}
