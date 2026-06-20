import { Component } from '@angular/core';

export interface SubRole {
  title:  string;
  period: string;
  tasks:  string[];
}

export interface Experience {
  company:   string;
  location:  string;
  period:    string;
  role:      string;
  type:      string;
  project?:  string;
  summary?:  string;
  subRoles?: SubRole[];
  tasks?:    string[];
}

@Component({
  selector: 'app-cv-experience',
  standalone: true,
  imports: [],
  templateUrl: './cv-experience.component.html',
  styleUrl: './cv-experience.component.scss'
})
export class CvExperienceComponent {
  readonly experiences: Experience[] = [
    {
      company:  'Societe Generale',
      location: 'Esch-sur-Alzette, Luxembourg',
      period:   '09/2025 – Present',
      role:     'Technical Expert',
      type:     'External',
      project:  'Main Banking Payments Platform',
      tasks: [
        'Migrated artifact repository from Nexus to JFrog Artifactory + Xray',
        'Refactored blocking services into reactive endpoints',
        'Investigated production performance issues using logs and monitoring',
        'Adapted CI/CD pipelines to new delivery architecture',
        'Evaluated Spring vs Quarkus native image proof of concept',
        'Contributed to evolution of legacy payment workflows into SOA'
      ]
    },
    {
      company:  'European Union Justice Court',
      location: 'Luxembourg',
      period:   '02/2025 – 08/2025',
      role:     'Senior Software Engineer',
      type:     'External',
      project:  'Distributed Search Platform',
      tasks: [
        'Built document processing engine extracting structured content from Word files (Apache POI)',
        'Implemented multilingual content pipeline with Angular frontend and Azure DevOps',
        'Developed resilient Spring Boot APIs serving documents from cloud storage',
        'Implemented Elasticsearch indexing for full-text and faceted search',
        'Integrated workflows across distributed microservices environment'
      ]
    },
    {
      company:  'European Parliament',
      location: 'Kirchberg, Luxembourg',
      period:   '02/2024 – 12/2024',
      role:     'Senior Software Engineer',
      type:     'External',
      project:  'EP-VOTE',
      tasks: [
        'Integrated applications into unified microfrontend architecture',
        'Developed reactive services using CQRS, SAGA and Event Sourcing',
        'Implemented CI/CD automation pipelines',
        'Mentored developers on clean code and testing',
        'Worked on containerized environments (Docker, Kubernetes, Nginx, Rundeck)'
      ]
    },
    {
      company:  'VERMEG',
      location: 'Tunis, Tunisia',
      period:   '01/2019 – 01/2024',
      role:     'Team Lead → Software Engineer',
      type:     'Permanent',
      project:  'SOLIFE — Core Insurance & Asset Management Platform',
      subRoles: [
        {
          title:  'Team Lead',
          period: '01/2023 – 01/2024',
          tasks: [
            'Led team of 5 developers delivering features for life insurance platform',
            'Coordinated estimations and technical discussions with stakeholders',
            'Technical analysis and ticket dispatching',
            'Managed complex production issues and high-priority corrections',
            'Organized knowledge sharing sessions'
          ]
        },
        {
          title:  'Software Engineer',
          period: '01/2019 – 01/2023',
          tasks: [
            'Developed REST services and database logic in high-volume financial environment',
            'Investigated root-cause production issues',
            'Implemented release packaging and deployment processes',
            'Contributed to multi-client deployments (Luxembourg, France, Belgium, Italy)'
          ]
        }
      ]
    },
    {
      company:  'Dewinter Group',
      location: 'Tunis, Tunisia',
      period:   '09/2017 – 12/2018',
      role:     'Software Engineer',
      type:     'Permanent',
      tasks: [
        'Implemented online payment processing including fee and tax calculations',
        'Developed backend administrative dashboard',
        'Improved performance and usability of web applications'
      ]
    },
    {
      company:  'Genioworx',
      location: 'Tunis, Tunisia',
      period:   '06/2016 – 09/2017',
      role:     'Software Engineer Junior / Intern',
      type:     'Permanent',
      tasks: [
        'Developed Java backend services and ORM mappings',
        'Integrated Angular dashboards with backend data',
        'Participated in testing, deployment, and user training'
      ]
    }
  ];
}
