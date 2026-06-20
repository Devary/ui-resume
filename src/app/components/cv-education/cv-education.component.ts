import { Component } from '@angular/core';

export interface Degree {
  title:       string;
  institution: string;
  location:    string;
  period:      string;
}

export interface Certification {
  title:  string;
  issuer: string;
  url:    string;
}

@Component({
  selector: 'app-cv-education',
  standalone: true,
  imports: [],
  templateUrl: './cv-education.component.html',
  styleUrl: './cv-education.component.scss'
})
export class CvEducationComponent {
  readonly degrees: Degree[] = [
    {
      title:       'Computer Science Engineer',
      institution: 'ESPRIT',
      location:    'Tunis, Tunisia',
      period:      '09/2018 – 07/2022'
    },
    {
      title:       'Higher Technical Diploma (Computer Science)',
      institution: 'ISET Kelibia',
      location:    'Tunisia',
      period:      '09/2012 – 06/2016'
    }
  ];

  readonly certifications: Certification[] = [
    {
      title:  'Certified Professional Scrum Master',
      issuer: 'scrum.org',
      url:    'https://www.credly.com/badges/04c0ebab-60b6-4bba-954a-2abe473b0e1c'
    },
    {
      title:  'Oracle Certified Professional: Java SE 11 Developer',
      issuer: 'Oracle',
      url:    'https://www.credly.com/badges/d0827170-6e2a-47d1-b7c1-a41ff100fec7'
    }
  ];
}
