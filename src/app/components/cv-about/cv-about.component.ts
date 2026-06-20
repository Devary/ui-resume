import { Component } from '@angular/core';

@Component({
  selector: 'app-cv-about',
  standalone: true,
  imports: [],
  templateUrl: './cv-about.component.html',
  styleUrl: './cv-about.component.scss'
})
export class CvAboutComponent {
  readonly text =
    'Senior Java engineer with 10+ years of experience designing and evolving enterprise systems ' +
    'in banking, insurance, and institutional environments. Specialized in modernizing legacy platforms ' +
    'into scalable microservices and improving delivery reliability in critical applications. ' +
    'Hands-on profile combining development, production investigation, and technical decision support ' +
    'across multi-team contexts. Focused on maintainability, performance, and pragmatic architecture evolution.';
}
