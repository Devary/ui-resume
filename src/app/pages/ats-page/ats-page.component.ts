import { Component, OnDestroy, computed, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { LanguageStore } from '../../i18n/language.store';
import { SpotlightDirective } from '../../shared/spotlight.directive';

/** One résumé language: its name in itself, and its files under public/ats. */
interface AtsFile { code: 'en' | 'fr' | 'ar'; name: string; dir: 'ltr' | 'rtl'; base: string; }

/**
 * /ats: plain-text résumés made for applicant tracking systems (one column, no tables). It is not linked
 * from anywhere and asks search engines not to index it, so it is for whoever has the address.
 */
@Component({
  selector: 'app-ats-page',
  standalone: true,
  imports: [RouterLink, SpotlightDirective],
  templateUrl: './ats-page.component.html',
  styleUrl: './ats-page.component.scss'
})
export class AtsPageComponent implements OnDestroy {
  private readonly meta = inject(Meta);
  readonly t = inject(LanguageStore).content;
  readonly ats = computed(() => this.t().ats);

  readonly files: AtsFile[] = [
    { code: 'en', name: 'English',  dir: 'ltr', base: 'ats/Fakher-Hammami-ATS-EN' },
    { code: 'fr', name: 'Français', dir: 'ltr', base: 'ats/Fakher-Hammami-ATS-FR' },
    { code: 'ar', name: 'العربية',  dir: 'rtl', base: 'ats/Fakher-Hammami-ATS-AR' },
  ];

  constructor() {
    this.meta.addTag({ name: 'robots', content: 'noindex, nofollow' });
  }

  ngOnDestroy(): void {
    this.meta.removeTag('name="robots"');
  }
}
