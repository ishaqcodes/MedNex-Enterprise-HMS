import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  staffList = [
    { id: 1, name: "Dr. Arvind", role: "Doctor", dept: "Cardiology", status: "Active" },
    { id: 2, name: "Nurse Priya", role: "Nurse", dept: "Emergency", status: "On Leave" },
  ];

  addStaff() {
    const name = prompt("Enter Staff Name:");
    if (name) {
      this.staffList.push({ id: Date.now(), name, role: "New Hire", dept: "General", status: "Active" });
    }
  }

  deleteStaff(id: number) {
    if (confirm("Delete this staff record from Tenant Schema?")) {
      this.staffList = this.staffList.filter(s => s.id !== id);
    }
  }
}