import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // SnackBar Import
import { BedManagementService, Bed } from '../../core/services/bed-management.service';

@Component({
  selector: 'app-bed-availability',
  standalone: true,
  // 👇 Imports check kar lena
  imports: [CommonModule, MatIconModule, MatCardModule, MatSnackBarModule],
  templateUrl: './bed-availability.component.html',
  styleUrls: ['./bed-availability.component.scss'],
})
export class BedAvailabilityComponent implements OnInit {
  beds: Bed[] = [];

  constructor(
    private bedService: BedManagementService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.bedService.beds$.subscribe((data) => {
      this.beds = data;
    });
  }

  // 👇 YE FUNCTION DISCHARGE KAREGA
  handleBedClick(bed: Bed) {
    console.log('Bed Clicked:', bed); // Debugging ke liye

    // Case 1: Agar Bed Khali hai
    if (bed.status === 'Available') {
      this.snackBar.open(
        'ℹ️ Ye bed khali hai. Admit karne ke liye "Admission" page par jayein.',
        'OK',
        { duration: 3000 },
      );
      return;
    }

    // Case 2: Agar Bed Occupied hai (Discharge Logic)
    if (bed.status === 'Occupied') {
      const confirmDischarge = confirm(
        `Kya aap ${bed.patientName} ko Discharge karna chahte hain?`,
      );

      if (confirmDischarge) {
        // Service call karke bed free karo
        this.bedService.dischargeBed(bed.id);

        // Success Message
        this.snackBar.open(`✅ Patient Discharged! Bed ${bed.id} is now Available.`, 'Close', {
          duration: 5000,
          panelClass: ['success-snackbar'],
        });
      }
    }
  }
}
