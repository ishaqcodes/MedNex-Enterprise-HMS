import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  // Ensure this matches your Backend Port
  private apiUrl = 'http://localhost:8080/api/patients';

  constructor(private http: HttpClient) {}

  // Helper to create headers with Tenant ID
  private getHeaders(tenantId: string): HttpHeaders {
    return new HttpHeaders().set('X-TenantID', tenantId);
  }

  addPatient(patientData: any, tenantId: string): Observable<any> {
    return this.http.post(this.apiUrl, patientData, {
      headers: this.getHeaders(tenantId),
    });
  }

  getPatients(tenantId: string): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, {
      headers: this.getHeaders(tenantId),
    });
  }
}
