// src/app/tab3/tab3.page.ts

import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true, // <-- This is the key
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule
  ],
})
export class Tab3Page {
  constructor() {}
}