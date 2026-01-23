import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {
  patients: any[] = [];

  constructor(private doctorService: DoctorService) {}

  ngOnInit() {
    this.loadPatients();
  }

  loadPatients() {
    this.doctorService.getPatients().subscribe({
      next: (res) => this.patients = res,
      error: (err) => alert('Error fetching patients: ' + err.message)
    });
  }
}
