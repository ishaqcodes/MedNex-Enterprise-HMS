import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);
  
  const token = localStorage.getItem('token'); // Login pe save kiya tha

  if (token) {
    return true; // ✅ Allowed
  } else {
    // ❌ Blocked
    snackBar.open('⛔ Unauthorized Access! Please Login.', 'Close', { duration: 3000 });
    router.navigate(['/login']);
    return false;
  }
};