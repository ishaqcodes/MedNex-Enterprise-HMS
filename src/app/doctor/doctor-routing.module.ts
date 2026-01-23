import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdmitPatientComponent } from './admit-patient/admit-patient.component';
import { PatientListComponent } from './patient-list/patient-list.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    // canActivate: [AuthGuard], // <-- comment out until login/JWT is ready
    children: [
      { path: 'admit-patient', component: AdmitPatientComponent },
      { path: 'patients', component: PatientListComponent },
      { path: '', redirectTo: 'patients', pathMatch: 'full' } // default child
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule {}
