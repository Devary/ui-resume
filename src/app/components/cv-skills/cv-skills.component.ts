import { Component, inject } from '@angular/core';
import { SpotlightDirective } from '../../shared/spotlight.directive';
import { LanguageStore } from '../../i18n/language.store';

@Component({
  selector: 'app-cv-skills',
  standalone: true,
  imports: [SpotlightDirective],
  templateUrl: './cv-skills.component.html',
  styleUrl: './cv-skills.component.scss'
})
export class CvSkillsComponent {
  readonly t = inject(LanguageStore).content;

  /** The main stack: highlighted among the chips. */
  private readonly core = new Set(['Java 8–17', 'Quarkus', 'Spring Boot', 'Kafka Streams', 'Microservices', 'Oracle', 'OpenShift', 'Kubernetes']);

  isCore(item: string): boolean {
    return this.core.has(item);
  }
}
