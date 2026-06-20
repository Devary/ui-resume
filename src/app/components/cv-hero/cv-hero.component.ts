import { Component } from '@angular/core';

@Component({
  selector: 'app-cv-hero',
  standalone: true,
  imports: [],
  templateUrl: './cv-hero.component.html',
  styleUrl: './cv-hero.component.scss'
})
export class CvHeroComponent {
  readonly name       = 'Fakher Hammami';
  readonly title      = 'Senior Java Engineer · 10+ Years';
  readonly location   = 'Luxembourg';
  readonly email      = 'hfekher@gmail.com';
  readonly phone      = '(+352) 661 151 092';
  readonly linkedin   = 'fakher-hammami';
  readonly whatsapp   = '+352661151092';
  readonly workPermit = 'Luxembourgish';
  readonly dob        = '15 / 10 / 1992';
}
