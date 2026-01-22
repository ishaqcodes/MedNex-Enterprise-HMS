import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'admission',
    loadComponent: () =>
      import('./patient-admission/patient-admission/patient-admission.component')
        .then(m => m.PatientAdmissionComponent)
  }
];
