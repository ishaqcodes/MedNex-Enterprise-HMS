// import { Routes } from '@angular/router';
// import { PatientAdmissionComponent } from './shared/patient-admission/patient-admission.component';

// export const routes: Routes = [
//   {
//     path: 'admission',
//     component: PatientAdmissionComponent
//   }
// ];
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'doctor', loadChildren: () => import('./doctor/doctor.module').then(m => m.DoctorModule) },
  { path: '**', redirectTo: '/login' }
];
