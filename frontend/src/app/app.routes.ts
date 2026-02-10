import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard/admin-dashboard.component';
import { DoctorDashboardComponent } from './dashboard/doctor-dashboard/doctor-dashboard.component';
import { PatientAdmissionComponent } from './dashboard/patient-admission/patient-admission.component';
import { BedAvailabilityComponent } from './dashboard/bed-availability/bed-availability.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'doctor', component: DoctorDashboardComponent },
  { path: 'patient', component: PatientAdmissionComponent }, // Using Form as Dashboard for Patient
  { path: 'receptionist', component: BedAvailabilityComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }