import { Component, OnInit, inject } from '@angular/core';
import { ThemeStore } from './theme.store';
import { CvHeroComponent } from './components/cv-hero/cv-hero.component';
import { CvAboutComponent } from './components/cv-about/cv-about.component';
import { CvSkillsComponent } from './components/cv-skills/cv-skills.component';
import { CvExperienceComponent } from './components/cv-experience/cv-experience.component';
import { CvEducationComponent } from './components/cv-education/cv-education.component';
import { CvCreativeComponent } from './components/cv-creative/cv-creative.component';
import { CvLanguagesComponent } from './components/cv-languages/cv-languages.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CvHeroComponent,
    CvAboutComponent,
    CvSkillsComponent,
    CvExperienceComponent,
    CvEducationComponent,
    CvCreativeComponent,
    CvLanguagesComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private readonly themeStore = inject(ThemeStore);

  readonly isStandalone = window.self === window.top;
  readonly isDark       = this.themeStore.isDark;
  readonly toggleTheme  = () => this.themeStore.toggle();

  ngOnInit(): void {
    if (this.isStandalone) return;

    window.addEventListener('message', (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      const data = event.data as { type?: string; theme?: string } | null;
      if (data?.type === 'ui-resume:theme' && (data.theme === 'light' || data.theme === 'dark')) {
        this.themeStore.setTheme(data.theme as 'light' | 'dark');
      }
    });

    window.parent?.postMessage({ type: 'ui-resume:request-theme' }, window.location.origin);
  }
}
