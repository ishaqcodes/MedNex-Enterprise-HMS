// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

// import { DoctorRoutingModule } from './doctor-routing.module';


// @NgModule({
//   declarations: [],
//   imports: [
//     CommonModule,
//     DoctorRoutingModule
//   ]
// })
// export class DoctorModule { }
// src/app/doctor/doctor.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';       // ✅ Needed for ngModel
import { RouterModule } from '@angular/router';     // ✅ Needed for router-outlet

import { DoctorRoutingModule } from './doctor-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdmitPatientComponent } from './admit-patient/admit-patient.component';
import { PatientListComponent } from './patient-list/patient-list.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AdmitPatientComponent,
    PatientListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    DoctorRoutingModule
  ]
})
export class DoctorModule { }
