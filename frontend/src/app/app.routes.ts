import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { MainLayoutComponent } from './core/components/main-layout/main-layout.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard/admin-dashboard.component';
import { PatientDashboardComponent } from './dashboard/patient-dashboard/patient-dashboard.component';
import { DoctorDashboardComponent } from './dashboard/doctor-dashboard/doctor-dashboard.component';
import { PatientAdmissionComponent } from './dashboard/patient-admission/patient-admission.component';
import { BedAvailabilityComponent } from './dashboard/bed-availability/bed-availability.component';
import { authGuard } from './core/guards/auth-guard'; // Security Guard
import { BillingComponent } from './dashboard/billing/billing.component';

export const routes: Routes = [
  // 1. Public Route (Login Page - Ispe Sidebar nahi dikhega)
  { path: 'login', component: LoginComponent },

  { path: 'billing', component: BillingComponent },

  // 2. Protected Routes (In sab pe Sidebar aur Security rahegi)
  {
    path: '',
    component: MainLayoutComponent, // Ye wrapper hai jisme Sidebar hai
    canActivate: [authGuard], // Ye check karega "Login ho ya nahi?"
    children: [
      { path: 'admin', component: AdminDashboardComponent },
      { path: 'doctor', component: DoctorDashboardComponent },
      { path: 'patient', component: PatientDashboardComponent },
      { path: 'receptionist', component: BedAvailabilityComponent }, // Bed Dashboard
      { path: 'admission', component: PatientAdmissionComponent }, // Admission Form

      // Agar koi sirf slash '/' khole to login pe bhejo
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },

  // 3. Catch All (Agar koi galat URL daale to Login pe fenk do)
  { path: '**', redirectTo: 'login' },
];
