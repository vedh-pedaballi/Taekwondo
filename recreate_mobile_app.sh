#!/bin/bash

# --- This script will completely reset and run your mobile app ---

echo " "
echo "STEP 1: Cleaning up the old project..."
rm -rf tornado-sports-app
echo "Cleanup complete."
echo " "

echo "STEP 2: Creating a fresh Ionic project..."
ionic start tornado-sports-app tabs --type=angular --no-interactive --git=false
echo "Project created."
echo " "

echo "STEP 3: Applying your UI code..."
cd tornado-sports-app

# Delete unnecessary files
rm src/app/tab1/tab1.module.ts 2>/dev/null

# Replace tab1.page.ts
echo "import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class Tab1Page {
  constructor() {}
}" > src/app/tab1/tab1.page.ts

# Replace tab1.page.html
echo '<ion-content>
  <div class="container">
    <div class="logo-container">
      <h1>Tornado Sports Club</h1>
    </div>
    <div class="button-container">
      <ion-button class="login-button">Log In</ion-button>
      <ion-button class="signup-button">Sign Up</ion-button>
    </div>
  </div>
</ion-content>' > src/app/tab1/tab1.page.html

# Replace tab1.page.scss
echo '.container { display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; background: linear-gradient(135deg, #292a72, #c03535); padding: 20px; }
.logo-container { text-align: center; margin-bottom: 60px; }
.logo-container h1 { font-size: 2.8rem; font-weight: bold; color: white; text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3); }
.button-container { width: 100%; max-width: 320px; display: flex; flex-direction: column; gap: 20px; }
ion-button { --border-radius: 25px; height: 50px; font-weight: 600; font-size: 1.1rem; text-transform: none; --box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1); }
.login-button { --background: white; --color: #292a72; }
.signup-button { --background: white; --color: #c03535; }' > src/app/tab1/tab1.page.scss

# Replace tabs.routes.ts
echo "import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      { path: 'tab1', loadComponent: () => import('../tab1/tab1.page').then((m) => m.Tab1Page) },
      { path: 'tab2', loadComponent: () => import('../tab2/tab2.page').then((m) => m.Tab2Page) },
      { path: 'tab3', loadComponent: () => import('../tab3/tab3.page').then((m) => m.Tab3Page) },
      { path: '', redirectTo: '/tabs/tab1', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: '/tabs/tab1', pathMatch: 'full' },
];" > src/app/tabs/tabs.routes.ts

echo "UI code applied."
echo " "

echo "STEP 4: Building and running the simulator..."
ionic capacitor run ios