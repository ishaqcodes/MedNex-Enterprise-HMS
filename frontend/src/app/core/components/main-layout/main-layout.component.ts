import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  template: `
    <div class="app-container">
      <app-sidebar></app-sidebar> <div class="content-area">
        <router-outlet></router-outlet> </div>
    </div>
  `,
  styles: [`
    .app-container { display: flex; height: 100vh; overflow: hidden; }
    .content-area { flex-grow: 1; overflow-y: auto; background-color: #f1f5f9; }
  `]
})
export class MainLayoutComponent {}