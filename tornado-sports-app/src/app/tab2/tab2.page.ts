// src/app/tab2/tab2.page.ts

import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true, // <-- This is the key
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule
  ],
})
export class Tab2Page {
  constructor() {}
}