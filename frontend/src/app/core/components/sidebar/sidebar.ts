import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() role: string = 'Admin'; // Default for now
  
  menuItems = [
    { label: 'Staff Management', icon: 'people', path: '/admin', roles: ['Admin'] },
    { label: 'Appointments', icon: 'assignment', path: '/doctor', roles: ['Doctor'] },
    { label: 'My Records', icon: 'local_hospital', path: '/patient', roles: ['Patient'] },
    { label: 'Bed Allotment', icon: 'hotel', path: '/receptionist', roles: ['Receptionist'] }
  ];

  logout() {
    localStorage.clear();
    window.location.reload();
  }
}