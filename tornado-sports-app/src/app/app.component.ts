import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { IonicModule } from '@ionic/angular'; // <-- Make sure this is imported

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    IonicModule, // <-- And make sure it is added here
  ],
})
export class AppComponent {
  constructor() {}
}