import { Component } from '@angular/core';

interface Bed {
  id: string;
  status: 'Occupied' | 'Available';
}

@Component({
  selector: 'app-bed-availability',
  templateUrl: './bed-availability.component.html',
  styleUrls: ['./bed-availability.component.scss']
})
export class BedAvailabilityComponent {
  // Logic from BedMap.jsx
  beds: Bed[] = Array.from({ length: 12 }, (_, i) => ({
    id: `Room-${i + 1}`,
    status: i % 3 === 0 ? 'Occupied' : 'Available'
  }));

  toggleBed(id: string) {
    this.beds = this.beds.map(bed => {
      if (bed.id === id) {
        return { ...bed, status: bed.status === 'Available' ? 'Occupied' : 'Available' };
      }
      return bed;
    });
  }
}