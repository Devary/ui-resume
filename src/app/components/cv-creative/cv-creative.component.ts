import { Component } from '@angular/core';

export interface CreativeWork {
  title:       string;
  year:        string;
  context:     string;
  description: string;
}

@Component({
  selector: 'app-cv-creative',
  standalone: true,
  imports: [],
  templateUrl: './cv-creative.component.html',
  styleUrl: './cv-creative.component.scss'
})
export class CvCreativeComponent {
  readonly works: CreativeWork[] = [
    {
      title:       'JQCD — Jira Query Centralized Database',
      year:        '2023',
      context:     'Vermeg',
      description: 'Tool to extract and centralize all Jira queries delivered to Vermeg clients from 2008 to the present, enabling cross-project analysis and reporting.'
    },
    {
      title:       'Virtual Links',
      year:        '2023',
      context:     'Vermeg',
      description: 'Batch system creating a relationship graph across approximately 2,300 non-relational database entities, enabling navigation and impact analysis of otherwise disconnected records.'
    },
    {
      title:       'DevOps System',
      year:        '2018',
      context:     'Dewinter',
      description: 'Automated CI/CD pipeline replacing manual FTP-based deployments by integrating Jenkins and Git, significantly reducing deployment time and human error.'
    }
  ];
}
