import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatTableModule, MatDividerModule],
  template: `
    <div class="billing-container">
      <h2><mat-icon>receipt_long</mat-icon> Patient Billing & Invoicing</h2>

      <mat-card class="search-card">
        <div class="search-box">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Enter Patient Name or ID</mat-label>
            <input matInput [(ngModel)]="searchTerm" placeholder="Ex. Tony Stark">
            <button mat-icon-button matSuffix (click)="searchPatient()"><mat-icon>search</mat-icon></button>
          </mat-form-field>
        </div>
      </mat-card>

      <mat-card class="invoice-card" *ngIf="showInvoice">
        <div class="invoice-header">
          <div class="hospital-info">
            <h3>MEDNEX ENTERPRISE</h3>
            <p>123, Health Tech Park, Mumbai</p>
          </div>
          <div class="invoice-meta">
            <h3>INVOICE</h3>
            <p>Date: {{ today | date }}</p>
            <p>Bill #: INV-2026-098</p>
          </div>
        </div>

        <mat-divider></mat-divider>

        <div class="patient-details">
          <p><strong>Patient:</strong> {{ searchTerm }}</p>
          <p><strong>Admission Type:</strong> IPD (General Ward)</p>
        </div>

        <table class="bill-table">
          <thead>
            <tr>
              <th>Description</th>
              <th class="right">Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Room Charges (5 Days)</td><td class="right">10,000</td></tr>
            <tr><td>Doctor Consultation</td><td class="right">3,500</td></tr>
            <tr><td>Pharmacy / Medicines</td><td class="right">2,100</td></tr>
            <tr><td>Nursing Charges</td><td class="right">1,000</td></tr>
            <tr class="total-row">
              <td><strong>TOTAL PAYABLE</strong></td>
              <td class="right"><strong>₹16,600</strong></td>
            </tr>
          </tbody>
        </table>

        <div class="actions">
          <button mat-stroked-button color="primary">Download PDF</button>
          <button mat-raised-button color="primary" (click)="printBill()">Print Invoice</button>
        </div>
      </mat-card>
    </div>
  `,
  styles: [`
    .billing-container { padding: 30px; background: #f8fafc; min-height: 100vh; }
    h2 { display: flex; align-items: center; gap: 10px; color: #1e293b; margin-bottom: 20px; }
    .search-card { padding: 20px; margin-bottom: 30px; }
    .full-width { width: 100%; }
    
    .invoice-card { 
      padding: 40px; max-width: 800px; margin: 0 auto; border-top: 5px solid #3b82f6; 
      font-family: 'Courier New', Courier, monospace; // Receipt look
    }
    .invoice-header { display: flex; justify-content: space-between; margin-bottom: 20px; }
    .hospital-info h3 { margin: 0; color: #3b82f6; }
    .invoice-meta { text-align: right; }
    
    .bill-table { width: 100%; margin-top: 20px; border-collapse: collapse; }
    .bill-table th { text-align: left; border-bottom: 2px solid #ddd; padding: 10px; }
    .bill-table td { padding: 10px; border-bottom: 1px solid #eee; }
    .bill-table .right { text-align: right; }
    .total-row td { border-top: 2px solid #000; border-bottom: none; font-size: 1.2rem; padding-top: 20px; }
    
    .actions { margin-top: 30px; display: flex; gap: 15px; justify-content: flex-end; }
    @media print { .billing-container { background: white; } .search-card, button { display: none; } }
  `]
})
export class BillingComponent {
  searchTerm: string = '';
  showInvoice: boolean = false;
  today = new Date();

  searchPatient() {
    if (this.searchTerm) {
      this.showInvoice = true;
    }
  }

  printBill() {
    window.print();
  }
}