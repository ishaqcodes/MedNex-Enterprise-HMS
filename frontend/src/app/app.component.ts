import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // <--- Ye Zaroori Hai

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // <--- Ye bhi check karna
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}