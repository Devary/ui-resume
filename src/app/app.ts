import { Component, HostListener, OnInit, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeStore } from './theme.store';
import { LanguageStore } from './i18n/language.store';
import { Lang } from './i18n/cv-content';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private readonly themeStore = inject(ThemeStore);
  private readonly language   = inject(LanguageStore);

  readonly isStandalone = window.self === window.top;
  readonly isDark       = this.themeStore.isDark;
  readonly toggleTheme  = () => this.themeStore.toggle();
  readonly year         = new Date().getFullYear();

  readonly t           = this.language.content;
  readonly lang        = this.language.lang;
  readonly langOptions = this.language.options;
  /** The language menu is open. */
  readonly langOpen    = signal(false);

  /** "PDF": the browser's print dialog, where the print styles lay the CV out as one clean column. */
  print(): void {
    window.print();
  }

  chooseLang(lang: Lang): void {
    this.language.setLang(lang);
    this.langOpen.set(false);
  }

  /** A click anywhere outside the language menu closes it; so does Escape. */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.langOpen() && !(event.target as HTMLElement).closest('.lang-switch')) {
      this.langOpen.set(false);
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.langOpen.set(false);
  }

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
