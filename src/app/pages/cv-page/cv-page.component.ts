import { Component } from '@angular/core';
import { CvHeroComponent } from '../../components/cv-hero/cv-hero.component';
import { CvAboutComponent } from '../../components/cv-about/cv-about.component';
import { CvSkillsComponent } from '../../components/cv-skills/cv-skills.component';
import { CvExperienceComponent } from '../../components/cv-experience/cv-experience.component';
import { CvEducationComponent } from '../../components/cv-education/cv-education.component';
import { CvCreativeComponent } from '../../components/cv-creative/cv-creative.component';
import { CvLanguagesComponent } from '../../components/cv-languages/cv-languages.component';
import { CvAiSkillsComponent } from '../../components/cv-ai-skills/cv-ai-skills.component';

/** The CV itself: the side column (who, languages) and the main column. */
@Component({
  selector: 'app-cv-page',
  standalone: true,
  imports: [
    CvHeroComponent,
    CvAboutComponent,
    CvSkillsComponent,
    CvExperienceComponent,
    CvEducationComponent,
    CvCreativeComponent,
    CvLanguagesComponent,
    CvAiSkillsComponent,
  ],
  templateUrl: './cv-page.component.html',
  styleUrl: './cv-page.component.scss'
})
export class CvPageComponent {}
