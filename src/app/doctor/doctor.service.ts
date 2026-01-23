// src/app/doctor/doctor.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private apiUrl = 'http://localhost:8080/api/doctor'; // Replace with your backend URL

  constructor(private http: HttpClient) { }

  // Get list of patients
  getPatients(): Observable<any> {
    const token = localStorage.getItem('token'); // JWT token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/patients`, { headers });
  }

  // Admit a new patient
  admitPatient(patient: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/admit`, patient, { headers });
  }
}
