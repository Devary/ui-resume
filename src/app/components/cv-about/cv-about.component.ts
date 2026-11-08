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
    'Technical lead and senior Java engineer with 10+ years of experience designing and evolving enterprise ' +
    'systems in banking, insurance, and institutional environments. Leads backend teams as codebase owner and ' +
    'reviewer, setting the bar for code quality, performance, and security. Specialized in modernizing legacy ' +
    'platforms into scalable Quarkus and Spring microservices, and in running them reliably from development ' +
    'to production on Kubernetes and OpenShift. Hands-on profile combining development, production ' +
    'investigation, and technical decision-making across multi-team contexts.';
}
