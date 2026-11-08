import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SpotlightDirective } from '../../shared/spotlight.directive';
import { LanguageStore } from '../../i18n/language.store';

@Component({
  selector: 'app-cv-creative',
  standalone: true,
  imports: [RouterLink, SpotlightDirective],
  templateUrl: './cv-creative.component.html',
  styleUrl: './cv-creative.component.scss'
})
export class CvCreativeComponent {
  readonly t = inject(LanguageStore).content;
}
