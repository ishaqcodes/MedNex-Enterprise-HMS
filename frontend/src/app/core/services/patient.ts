import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PatientService {
  private apiUrl = '/api'; // Proxy handle karega
  constructor(private http: HttpClient) {}

  addPatient(patient: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/patient/admission`, patient);
  }
}