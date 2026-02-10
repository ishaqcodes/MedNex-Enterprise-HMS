import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor(private router: Router) {
    // Check if logged in
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token && role) {
      this.userSubject.next({ role, token });
    }
  }

  login(role: string, email: string) {
    const userData = { name: "Shreeharini", role, email, tenantId: "HOSP-AUTO-01" };
    this.userSubject.next(userData);
    localStorage.setItem('token', 'simulated-jwt-token');
    localStorage.setItem('role', role);
    localStorage.setItem('tenantId', 'apollo'); // Default tenant
    
    // Redirect based on role
    if(role === 'Admin') this.router.navigate(['/admin']);
    else if(role === 'Doctor') this.router.navigate(['/doctor']);
    else if(role === 'Patient') this.router.navigate(['/patient']);
    else if(role === 'Receptionist') this.router.navigate(['/receptionist']);
  }
}