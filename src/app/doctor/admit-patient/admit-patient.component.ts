import { Component } from '@angular/core';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-admit-patient',
  templateUrl: './admit-patient.component.html',
  styleUrls: ['./admit-patient.component.scss']
})
export class AdmitPatientComponent {
  patient = { name: '', age: 0, hospital: '' };

  constructor(private doctorService: DoctorService) {}

  admitPatient() {
    this.doctorService.admitPatient(this.patient).subscribe({
      next: (res) => alert(`${this.patient.name} admitted successfully!`),
      error: (err) => alert('Error admitting patient: ' + err.message)
    });
  }
}
