import { Routes } from '@angular/router';
import { CvPageComponent } from './pages/cv-page/cv-page.component';

export const routes: Routes = [
  { path: '', component: CvPageComponent },
  { path: 'works/:slug', loadComponent: () => import('./pages/work-page/work-page.component').then((m) => m.WorkPageComponent) },
  // Not linked from the home page.
  { path: 'ats', loadComponent: () => import('./pages/ats-page/ats-page.component').then((m) => m.AtsPageComponent) },
  { path: '**', redirectTo: '' },
];
