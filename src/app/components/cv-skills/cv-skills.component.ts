import { Component } from '@angular/core';
import { SpotlightDirective } from '../../shared/spotlight.directive';

export interface SkillGroup {
  label: string;
  items: string[];
}

@Component({
  selector: 'app-cv-skills',
  standalone: true,
  imports: [SpotlightDirective],
  templateUrl: './cv-skills.component.html',
  styleUrl: './cv-skills.component.scss'
})
export class CvSkillsComponent {
  /** The main stack: highlighted among the chips. */
  private readonly core = new Set(['Java 8–17', 'Quarkus', 'Spring Boot', 'Kafka Streams', 'Microservices', 'Oracle', 'OpenShift', 'Kubernetes']);

  isCore(item: string): boolean {
    return this.core.has(item);
  }

  readonly skillGroups: SkillGroup[] = [
    {
      label: 'Languages & Frameworks',
      items: [
        'Java 8–17', 'Java EE', 'Spring Core', 'Spring Boot', 'Spring MVC',
        'Spring Security', 'Spring Data', 'Spring AOP', 'Quarkus',
        'Kafka Streams', 'Keycloak',
        'JavaScript', 'jQuery', 'NodeJS', 'ExpressJS',
        'RESTful API', 'SOAP', 'HTML5', 'CSS', 'JSON', 'XML', 'WSDL', 'XSD', 'XPDL'
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
      items: [
        'Docker', 'Kubernetes', 'OpenShift', 'GitHub Actions', 'Jenkins', 'Grafana',
        'Rundeck', 'XLDeploy', 'XL Release', 'Containerization'
      ]
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
