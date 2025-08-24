import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,  // <-- This makes it a standalone component
  imports: [
    IonicModule,     // <-- This gives it access to <ion-tabs>, <ion-icon>, etc.
    CommonModule,
    RouterModule
  ],
})
export class TabsPage {
  constructor() {}
}