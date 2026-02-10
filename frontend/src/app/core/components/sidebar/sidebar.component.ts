import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatListModule, MatIconModule, MatButtonModule],
  template: `
    <div class="sidebar-container">
      <div class="brand">
        <mat-icon>local_hospital</mat-icon>
        <span>MedNex</span>
      </div>

      <mat-nav-list>
        <a
          mat-list-item
          *ngFor="let item of menuItems"
          [routerLink]="item.path"
          routerLinkActive="active-link"
        >
          <mat-icon matListItemIcon>{{ item.icon }}</mat-icon>
          <span matListItemTitle>{{ item.label }}</span>
        </a>
      </mat-nav-list>

      <div class="logout-section">
        <button mat-flat-button color="warn" (click)="logout()">
          <mat-icon>logout</mat-icon> Logout
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .sidebar-container {
        height: 100vh;
        width: 260px;
        background: #1e293b; // Dark Slate
        color: white;
        display: flex;
        flex-direction: column;
        box-shadow: 4px 0 10px rgba(0, 0, 0, 0.1);
      }
      .brand {
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        font-size: 1.5rem;
        font-weight: 700;
        background: rgba(255, 255, 255, 0.05);
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        mat-icon {
          color: #3b82f6;
        }
      }
      mat-nav-list {
        flex-grow: 1;
        padding-top: 20px;
      }
      a[mat-list-item] {
        color: #94a3b8;
        transition: all 0.3s;
        &:hover {
          color: white;
          background: rgba(255, 255, 255, 0.05);
        }
        &.active-link {
          color: #3b82f6;
          background: rgba(59, 130, 246, 0.1);
          border-right: 3px solid #3b82f6;
        }
      }
      .logout-section {
        padding: 20px;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
      }
      button {
        width: 100%;
      }
    `,
  ],
})
export class SidebarComponent implements OnInit {
  role: string = '';
  menuItems: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.role = localStorage.getItem('role') || '';
    this.generateMenu();
  }

  generateMenu() {
    // --- 1. ADMIN MENU ---
    if (this.role === 'Admin') {
      this.menuItems = [
        { label: 'Dashboard', icon: 'dashboard', path: '/admin' },
        { label: 'Staff Management', icon: 'people', path: '/admin' }, // Future: /admin/staff
        { label: 'Inventory', icon: 'inventory', path: '/admin' }, // Future: /admin/inventory
      ];
    }
    // --- 2. DOCTOR MENU ---
    else if (this.role === 'Doctor') {
      this.menuItems = [
        { label: 'OPD Console', icon: 'stethoscope', path: '/doctor' },
        { label: 'My Patients', icon: 'masks', path: '/doctor' },
        { label: 'Appointments', icon: 'calendar_month', path: '/doctor' },
      ];
    }
    // --- 3. RECEPTIONIST MENU ---
    else if (this.role === 'Receptionist') {
      this.menuItems = [
        { label: 'Bed Availability', icon: 'bedroom_parent', path: '/receptionist' },
        { label: 'Patient Admission', icon: 'app_registration', path: '/admission' },
        { label: 'Generate Bill', icon: 'receipt_long', path: '/billing' },
      ];
    }

    // --- 4. PATIENT MENU ---
    else if (this.role === 'Patient') {
      this.menuItems = [
        { label: 'My Health Dashboard', icon: 'monitor_heart', path: '/patient' },
        { label: 'My Prescriptions', icon: 'medication', path: '/patient' },
        { label: 'Invoices', icon: 'receipt', path: '/patient' },
      ];
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
