import { Routes } from '@angular/router';
import { CvPageComponent } from './pages/cv-page/cv-page.component';

export const routes: Routes = [
  { path: '', component: CvPageComponent },
  { path: 'works/:slug', loadComponent: () => import('./pages/work-page/work-page.component').then((m) => m.WorkPageComponent) },
  { path: '**', redirectTo: '' },
];
