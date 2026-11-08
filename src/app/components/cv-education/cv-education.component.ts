import { Component, inject } from '@angular/core';
import { SpotlightDirective } from '../../shared/spotlight.directive';
import { LanguageStore } from '../../i18n/language.store';

@Component({
  selector: 'app-cv-education',
  standalone: true,
  imports: [SpotlightDirective],
  templateUrl: './cv-education.component.html',
  styleUrl: './cv-education.component.scss'
})
export class CvEducationComponent {
  readonly t = inject(LanguageStore).content;
}
