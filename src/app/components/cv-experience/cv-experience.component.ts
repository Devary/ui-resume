import { Component, inject } from '@angular/core';
import { RevealDirective } from '../../shared/reveal.directive';
import { SpotlightDirective } from '../../shared/spotlight.directive';
import { LanguageStore } from '../../i18n/language.store';

@Component({
  selector: 'app-cv-experience',
  standalone: true,
  imports: [RevealDirective, SpotlightDirective],
  templateUrl: './cv-experience.component.html',
  styleUrl: './cv-experience.component.scss'
})
export class CvExperienceComponent {
  readonly t = inject(LanguageStore).content;
}
