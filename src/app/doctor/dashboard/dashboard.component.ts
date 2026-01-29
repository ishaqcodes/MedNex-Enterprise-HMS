import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  patients = [
    { name: 'John Doe', age: 45, hospital: 'City Hospital' },
    { name: 'Jane Smith', age: 30, hospital: 'Metro Hospital' }
  ];
}
