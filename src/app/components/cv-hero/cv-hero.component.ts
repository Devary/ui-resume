import { Component, computed, inject } from '@angular/core';
import { SpotlightDirective } from '../../shared/spotlight.directive';
import { LanguageStore } from '../../i18n/language.store';

/** A contact line of the side card: its icon, text, and link (none for plain facts). */
interface Contact {
  icon:  keyof typeof ICONS;
  label: string;
  href?: string;
  external?: boolean;
}

/** Line icons (24×24, stroked), so the contacts look the same on every system. */
const ICONS = {
  mail:     'M4 6h16v12H4zM4 7l8 6 8-6',
  pin:      'M12 21s-7-6.2-7-11.5A7 7 0 0119 9.5C19 14.8 12 21 12 21zM12 12a2.5 2.5 0 100-5 2.5 2.5 0 000 5',
  chat:     'M4 20l1.4-4.2A8 8 0 1112 20a8 8 0 01-3.8-1L4 20z',
  linkedin: 'M4 4h16v16H4zM8 10v6M8 7.5v.01M12 16v-3.5a2 2 0 014 0V16M12 10v6',
  badge:    'M4 5h16v14H4zM8 10a2 2 0 104 0 2 2 0 00-4 0M6.5 16a3.5 3.5 0 017 0M15 9h3M15 13h3',
  calendar: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4',
  download: 'M12 4v11m0 0l-4.5-4.5M12 15l4.5-4.5M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2',
  globe:    'M12 21a9 9 0 100-18 9 9 0 000 18zM3 12h18M12 3c2.5 2.6 3.5 5.6 3.5 9s-1 6.4-3.5 9c-2.5-2.6-3.5-5.6-3.5-9s1-6.4 3.5-9',
} as const;

@Component({
  selector: 'app-cv-hero',
  standalone: true,
  imports: [SpotlightDirective],
  templateUrl: './cv-hero.component.html',
  styleUrl: './cv-hero.component.scss'
})
export class CvHeroComponent {
  private readonly language = inject(LanguageStore);
  readonly t = this.language.content;

  readonly company   = 'LALUX';
  readonly email     = 'hfekher@gmail.com';
  readonly linkedin  = 'fakher-hammami';
  readonly whatsapp  = '+352661151092';
  readonly website   = 'www.veegine.com';
  /** Day of birth; only the year and the age are shown. */
  private readonly birthDate = new Date(1992, 9, 15);

  /** Whole years since the day of birth. */
  readonly age = (() => {
    const now = new Date();
    const hadBirthday = now.getMonth() > this.birthDate.getMonth()
      || (now.getMonth() === this.birthDate.getMonth() && now.getDate() >= this.birthDate.getDate());
    return now.getFullYear() - this.birthDate.getFullYear() - (hadBirthday ? 0 : 1);
  })();

  readonly icons = ICONS;

  /** Key figures under the "Currently" badge. */
  readonly stats = computed(() => {
    const ui = this.t().ui;
    return [
      { value: '10+', label: ui.years },
      { value: '7',   label: ui.companies },
      { value: '2',   label: ui.certs },
    ];
  });

  readonly contacts = computed<Contact[]>(() => {
    const hero = this.t().hero;
    return [
      { icon: 'mail',     label: this.email,   href: `mailto:${this.email}` },
      { icon: 'chat',     label: 'WhatsApp',   href: `https://wa.me/${this.whatsapp}`, external: true },
      { icon: 'globe',    label: this.website, href: `https://${this.website}`, external: true },
      { icon: 'linkedin', label: `linkedin.com/in/${this.linkedin}`, href: `https://www.linkedin.com/in/${this.linkedin}`, external: true },
      { icon: 'pin',      label: hero.location },
      { icon: 'badge',    label: hero.workPermit },
      { icon: 'calendar', label: hero.born.replace('{age}', String(this.age)) },
    ];
  });
}
