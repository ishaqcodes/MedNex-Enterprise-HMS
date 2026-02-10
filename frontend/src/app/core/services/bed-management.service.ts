import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Bed {
  id: string;
  type: 'General' | 'ICU' | 'Ventilator';
  status: 'Available' | 'Occupied' | 'Cleaning';
  patientName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BedManagementService {
  
  // Default Mock Data (Agar pehli baar khul raha hai)
  private initialBeds: Bed[] = Array.from({ length: 12 }, (_, i) => ({
    id: `B-${100 + i + 1}`,
    type: i < 4 ? 'ICU' : 'General', 
    status: 'Available', 
    patientName: undefined
  }));

  private bedsSubject = new BehaviorSubject<Bed[]>(this.loadBeds());
  beds$ = this.bedsSubject.asObservable();

  constructor() {}

  // 1. Load from LocalStorage (Memory se uthao)
  private loadBeds(): Bed[] {
    const savedBeds = localStorage.getItem('hospital_beds');
    return savedBeds ? JSON.parse(savedBeds) : this.initialBeds;
  }

  // 2. Save to LocalStorage (Memory me daalo)
  private saveBeds(beds: Bed[]) {
    localStorage.setItem('hospital_beds', JSON.stringify(beds));
    this.bedsSubject.next(beds); // Update UI immediately
  }

  // Occupy Bed Logic
  occupyBed(patientName: string, bedType: 'General' | 'ICU'): string | null {
    const currentBeds = this.bedsSubject.value;
    
    // Find free bed
    const bedIndex = currentBeds.findIndex(b => b.status === 'Available' && b.type === bedType);

    if (bedIndex !== -1) {
      // Update Bed
      const updatedBeds = [...currentBeds];
      updatedBeds[bedIndex] = { 
        ...updatedBeds[bedIndex], 
        status: 'Occupied', 
        patientName: patientName 
      };
      
      this.saveBeds(updatedBeds); // <--- SAVE KARO
      return updatedBeds[bedIndex].id;
    }
    
    return null;
  }

  // Discharge Logic
  dischargeBed(bedId: string) {
    const currentBeds = this.bedsSubject.value;
    
    // Bed dhoond kar reset karo
    const updatedBeds = currentBeds.map(bed => 
      bed.id === bedId ? { ...bed, status: 'Available' as const, patientName: undefined } : bed
    );

    this.saveBeds(updatedBeds); // <--- YE LINE SABSE IMPORTANT HAI (Save to LocalStorage)
  }

  // Reset System (Testing ke liye)
  resetSystem() {
    localStorage.removeItem('hospital_beds');
    this.bedsSubject.next(this.initialBeds);
    window.location.reload();
  }
}