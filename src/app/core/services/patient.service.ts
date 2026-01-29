import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private apiUrl = 'http://localhost:8080/api/patients';

  constructor(private http: HttpClient) {}

  savePatient(data: any) {
    return this.http.post(this.apiUrl, data);
  }
}
