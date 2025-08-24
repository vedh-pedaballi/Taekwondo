import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html', // Corrected from './login.page.html'
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  // Ensure the imports array is correct for a standalone component
  imports: [IonicModule, CommonModule, RouterModule],
})
export class Tab1Page { // The class name is correctly 'Tab1Page'
  constructor(private router: Router) {}

  // This is your navigation function for the buttons
  navigate(path: string) {
    console.log('Navigating to:', path);
    this.router.navigateByUrl(path);
  }

  // This is the function for your "Click Me" button
  myFunction() {
    console.log('Button was clicked!');
  }
}