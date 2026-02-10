import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component'; // <--- Yahan naam sahi kar diya

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Agar tumne Sidebar ko Standalone banaya hai to 'imports' me, 
      // agar module based hai to 'declarations' me aayega. 
      // Safety ke liye hum ise 'declarations' maan kar chal rahe hain:
      declarations: [ SidebarComponent ] 
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});