import { Component } from '@angular/core';
import { SpotlightDirective } from '../../shared/spotlight.directive';

export interface CefrSkills {
  listening?:          string;
  reading?:            string;
  writing?:            string;
  spokenProduction?:   string;
  spokenInteraction?:  string;
}

export interface Language {
  name:          string;
  motherTongue?: boolean;
  skills?:       CefrSkills;
}

@Component({
  selector: 'app-cv-languages',
  standalone: true,
  imports: [SpotlightDirective],
  templateUrl: './cv-languages.component.html',
  styleUrl: './cv-languages.component.scss'
})
export class CvLanguagesComponent {
  readonly languages: Language[] = [
    {
      name:         'Arabic',
      motherTongue: true
    },
    {
      name: 'English',
      skills: {
        listening:         'C1',
        reading:           'C1',
        writing:           'C1',
        spokenProduction:  'B2',
        spokenInteraction: 'C1'
      }
    },
    {
      name: 'French',
      skills: {
        listening:         'C1',
        reading:           'C1',
        writing:           'C1',
        spokenProduction:  'B2',
        spokenInteraction: 'B2'
      }
    }
  ];

  readonly cefrOrder: { key: keyof CefrSkills; label: string }[] = [
    { key: 'listening',         label: 'Listening' },
    { key: 'reading',           label: 'Reading' },
    { key: 'writing',           label: 'Writing' },
    { key: 'spokenProduction',  label: 'Spoken Production' },
    { key: 'spokenInteraction', label: 'Spoken Interaction' }
  ];

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
    for (const { key } of this.cefrOrder) {
      const level = this.cefrLevel(lang, key);
      if (level) {
        counts.set(level, (counts.get(level) ?? 0) + 1);
      }
    }
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1] || this.levelIndex(b[0]) - this.levelIndex(a[0]))[0]?.[0] ?? '';
  }
}
