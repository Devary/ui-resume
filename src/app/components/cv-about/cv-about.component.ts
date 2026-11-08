import { Component, inject } from '@angular/core';
import { SpotlightDirective } from '../../shared/spotlight.directive';
import { LanguageStore } from '../../i18n/language.store';

@Component({
  selector: 'app-cv-about',
  standalone: true,
  imports: [SpotlightDirective],
  templateUrl: './cv-about.component.html',
  styleUrl: './cv-about.component.scss'
})
export class CvAboutComponent {
  readonly t = inject(LanguageStore).content;
}
