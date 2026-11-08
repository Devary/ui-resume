import { Component } from '@angular/core';

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
  phone:    'M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2',
  pin:      'M12 21s-7-6.2-7-11.5A7 7 0 0119 9.5C19 14.8 12 21 12 21zM12 12a2.5 2.5 0 100-5 2.5 2.5 0 000 5',
  chat:     'M4 20l1.4-4.2A8 8 0 1112 20a8 8 0 01-3.8-1L4 20z',
  linkedin: 'M4 4h16v16H4zM8 10v6M8 7.5v.01M12 16v-3.5a2 2 0 014 0V16M12 10v6',
  badge:    'M4 5h16v14H4zM8 10a2 2 0 104 0 2 2 0 00-4 0M6.5 16a3.5 3.5 0 017 0M15 9h3M15 13h3',
  calendar: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4',
} as const;

@Component({
  selector: 'app-cv-hero',
  standalone: true,
  imports: [],
  templateUrl: './cv-hero.component.html',
  styleUrl: './cv-hero.component.scss'
})
export class CvHeroComponent {
  readonly name       = 'Fakher Hammami';
  readonly title      = 'Technical Lead · Senior Java Engineer · 10+ Years';
  /** Shown as "Currently" under the title. */
  readonly current    = { role: 'Technical Lead', company: 'LALUX' };
  readonly location   = 'Luxembourg';
  readonly email      = 'hfekher@gmail.com';
  readonly phone      = '(+352) 661 151 092';
  readonly linkedin   = 'fakher-hammami';
  readonly whatsapp   = '+352661151092';
  readonly workPermit = 'Luxembourgish';
  readonly dob        = '15 / 10 / 1992';

  readonly icons = ICONS;

  readonly contacts: Contact[] = [
    { icon: 'mail',     label: this.email,                    href: `mailto:${this.email}` },
    { icon: 'phone',    label: this.phone,                    href: `tel:${this.whatsapp}` },
    { icon: 'chat',     label: 'WhatsApp',                    href: `https://wa.me/${this.whatsapp}`, external: true },
    { icon: 'linkedin', label: `linkedin.com/in/${this.linkedin}`, href: `https://www.linkedin.com/in/${this.linkedin}`, external: true },
    { icon: 'pin',      label: this.location },
    { icon: 'badge',    label: `Work permit: ${this.workPermit}` },
    { icon: 'calendar', label: `Born ${this.dob}` },
  ];
}
