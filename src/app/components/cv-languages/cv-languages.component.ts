import { Component } from '@angular/core';

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
  imports: [],
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
}
