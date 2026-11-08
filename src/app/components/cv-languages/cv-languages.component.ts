import { Component, computed, inject } from '@angular/core';
import { SpotlightDirective } from '../../shared/spotlight.directive';
import { CefrSkills, Language } from '../../i18n/cv-content';
import { LanguageStore } from '../../i18n/language.store';

@Component({
  selector: 'app-cv-languages',
  standalone: true,
  imports: [SpotlightDirective],
  templateUrl: './cv-languages.component.html',
  styleUrl: './cv-languages.component.scss'
})
export class CvLanguagesComponent {
  readonly t = inject(LanguageStore).content;

  private readonly cefrKeys: (keyof CefrSkills)[] = ['listening', 'reading', 'writing', 'spokenProduction', 'spokenInteraction'];

  readonly cefrOrder = computed(() => this.cefrKeys.map((key) => ({ key, label: this.t().ui.cefr[key] })));

  cefrLevel(lang: Language, key: keyof CefrSkills): string {
    return lang.skills?.[key] ?? '';
  }

  /** The six CEFR levels, A1 to C2, as the steps of a level bar. */
  private readonly levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  readonly steps = [1, 2, 3, 4, 5, 6];

  /** 1 for A1 ... 6 for C2; 0 when unknown. */
  levelIndex(level: string): number {
    return this.levels.indexOf(level.toUpperCase()) + 1;
  }

  /** The level most of the language's skills are at (the higher one on a tie). */
  overall(lang: Language): string {
    const counts = new Map<string, number>();
    for (const key of this.cefrKeys) {
      const level = this.cefrLevel(lang, key);
      if (level) {
        counts.set(level, (counts.get(level) ?? 0) + 1);
      }
    }
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1] || this.levelIndex(b[0]) - this.levelIndex(a[0]))[0]?.[0] ?? '';
  }
}
