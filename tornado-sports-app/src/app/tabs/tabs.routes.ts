import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1', // <-- This defines the route for your first tab
        loadComponent: () => import('../tab1/tab1.page').then((m) => m.Tab1Page),
      },
      {
        path: 'tab2',
        loadComponent: () => import('../tab2/tab2.page').then((m) => m.Tab2Page),
      },
      {
        path: 'tab3',
        loadComponent: () => import('../tab3/tab3.page').then((m) => m.Tab3Page),
      },
      {
        path: '', // <-- If the path is just '/tabs', it redirects to tab1
        redirectTo: '/tabs/tab1',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '', // <-- If the path is empty, it redirects to the tabs layout
    redirectTo: '/tabs/tab1',
    pathMatch: 'full',
  },
];