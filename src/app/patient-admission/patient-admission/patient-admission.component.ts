// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-patient-admission',
//   standalone: true,
//   imports: [],
//   templateUrl: './patient-admission.component.html',
//   styleUrl: './patient-admission.component.scss'
// })
// export class PatientAdmissionComponent {

// }
import { Component } from '@angular/core';
import { PatientService } from '../../core/services/patient.service';

@Component({
  selector: 'app-patient-admission',
  standalone: true,
  imports: [],
  templateUrl: './patient-admission.component.html',
  styleUrl: './patient-admission.component.scss'
})
export class PatientAdmissionComponent {

  constructor(private patientService: PatientService) {}

  submit() {
    const dummyPatient = {
      name: 'Test Patient',
      age: 30
    };

    this.patientService.savePatient(dummyPatient).subscribe({
      next: () => alert('Patient saved successfully'),
      error: () => alert('Error saving patient')
    });
  }
}
