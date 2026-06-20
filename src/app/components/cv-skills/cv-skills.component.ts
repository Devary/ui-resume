import { Component } from '@angular/core';

export interface SkillGroup {
  label: string;
  items: string[];
}

@Component({
  selector: 'app-cv-skills',
  standalone: true,
  imports: [],
  templateUrl: './cv-skills.component.html',
  styleUrl: './cv-skills.component.scss'
})
export class CvSkillsComponent {
  readonly skillGroups: SkillGroup[] = [
    {
      label: 'Languages & Frameworks',
      items: [
        'Java 8–17', 'Java EE', 'Spring Core', 'Spring Boot', 'Spring MVC',
        'Spring Security', 'Spring Data', 'Spring AOP', 'Quarkus',
        'JavaScript', 'jQuery', 'NodeJS', 'ExpressJS',
        'RESTful API', 'HTML5', 'CSS', 'JSON', 'XML', 'WSDL', 'XSD', 'XPDL'
      ]
    },
    {
      label: 'Databases',
      items: ['Oracle', 'PostgreSQL', 'Redis', 'ElasticSearch']
    },
    {
      label: 'Architectures',
      items: ['Microservices', 'Microfrontends', 'MVC', 'Semi-monolithic', 'Monolithic']
    },
    {
      label: 'Design Patterns',
      items: ['Chassis Design', 'CQRS', 'SAGA', 'Event Sourcing']
    },
    {
      label: 'DevOps',
      items: ['Docker', 'Kubernetes', 'Jenkins', 'Rundeck', 'XLDeploy', 'XL Release', 'Containerization']
    },
    {
      label: 'Dev Practices',
      items: ['BDD', 'TDD', 'Agile', 'Scrum', 'Functional Reactive Programming']
    },
    {
      label: 'Repository & Build',
      items: ['Maven', 'NPM', 'Yarn', 'Composer', 'Nexus', 'JFrog Artifactory']
    },
    {
      label: 'Versioning',
      items: ['Git', 'SVN']
    },
    {
      label: 'Tools',
      items: [
        'IntelliJ IDEA', 'DataGrip', 'Oracle SQL Developer', 'PL/SQL',
        'JBoss 6 & 7', 'Postman', 'SoapUI', 'MINIO',
        'Jira', 'Confluence', 'Azure DevOps', 'Apache POI'
      ]
    }
  ];
}
