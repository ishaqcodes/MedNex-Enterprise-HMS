import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatCardModule, 
    MatFormFieldModule, MatInputModule, MatButtonModule, 
    MatSelectModule, MatIconModule, MatSnackBarModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      // 1. HOSPITAL ID (Sabse Important)
      tenantId: ['apollo', Validators.required], 
      
      role: ['Admin', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { tenantId, role, email } = this.loginForm.value;

      // --- SIMULATED LOGIN LOGIC ---
      // (Asli backend connect hone par yahan API call hogi)
      
      console.log(`🔐 Authenticating for Hospital: ${tenantId}`);

      // 1. Clear Old Data
      localStorage.clear();

      // 2. Save NEW Credentials
      localStorage.setItem('token', 'dummy-jwt-token-xyz');
      localStorage.setItem('tenantId', tenantId); // <--- YE INTERCEPTOR USE KAREGA
      localStorage.setItem('role', role);
      localStorage.setItem('userEmail', email);

      // 3. Success Message
      this.snackBar.open(`✅ Welcome to ${tenantId.toUpperCase()} Hospital System`, 'Dismiss', {
        duration: 3000,
        verticalPosition: 'top'
      });

      // 4. Redirect based on Role
      setTimeout(() => {
        if (role === 'Admin') this.router.navigate(['/admin']);
        else if (role === 'Doctor') this.router.navigate(['/doctor']);
        else if (role === 'Receptionist') this.router.navigate(['/receptionist']);
        else if (role === 'Patient') this.router.navigate(['/patient']);
      }, 1000);

    } else {
      this.snackBar.open('⚠️ Please fill all fields correctly', 'Close', { duration: 3000 });
    }
  }
}