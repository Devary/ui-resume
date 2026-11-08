import { Component, inject } from '@angular/core';
import { SpotlightDirective } from '../../shared/spotlight.directive';
import { LanguageStore } from '../../i18n/language.store';

/** The side card under the hero: the AI tools I work with, and at what level. */
@Component({
  selector: 'app-cv-ai-skills',
  standalone: true,
  imports: [SpotlightDirective],
  templateUrl: './cv-ai-skills.component.html',
  styleUrl: './cv-ai-skills.component.scss'
})
export class CvAiSkillsComponent {
  readonly t = inject(LanguageStore).content;
}
