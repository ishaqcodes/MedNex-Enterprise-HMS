// src/app/admin/admin.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // ✅ Needed for <router-outlet>
import { FormsModule } from '@angular/forms';   // Optional, if admin uses forms

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
// Import other admin components here if you have them
// e.g. UsersComponent, ReportsComponent, etc.

@NgModule({
  declarations: [
    DashboardComponent,
    // Add other admin components here
  ],
  imports: [
    CommonModule,
    FormsModule,       // ✅ Include if using ngModel in admin forms
    RouterModule,      // ✅ Needed for <router-outlet> in dashboard
    AdminRoutingModule
  ]
})
export class AdminModule { }
