import { Injectable, computed, effect, signal } from '@angular/core';
import { CONTENT, LANGS, Lang } from './cv-content';

const STORAGE_KEY = 'cv-lang';

/**
 * The CV's language: from ?lang=, else the last choice, else the browser's language. Sets
 * <html lang/dir> (Arabic reads right to left) and the page title to match.
 */
@Injectable({ providedIn: 'root' })
export class LanguageStore {
  private readonly _lang = signal<Lang>(this.detectInitial());
  readonly lang    = this._lang.asReadonly();
  readonly content = computed(() => CONTENT[this._lang()]);
  readonly isRtl   = computed(() => this._lang() === 'ar');
  readonly options = LANGS.map((code) => ({ code, label: CONTENT[code].label }));

  constructor() {
    effect(() => {
      const lang = this._lang();
      const root = document.documentElement;
      root.lang = lang;
      root.dir = lang === 'ar' ? 'rtl' : 'ltr';
      document.title = CONTENT[lang].pageTitle;
    });
  }

  setLang(lang: Lang): void {
    this._lang.set(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Storage off (private mode): the choice lasts for this visit only.
    }
  }

  private detectInitial(): Lang {
    const isLang = (v: string | null | undefined): v is Lang => !!v && (LANGS as string[]).includes(v);
    if (typeof window === 'undefined') return 'en';

    const fromUrl = new URLSearchParams(window.location.search).get('lang');
    if (isLang(fromUrl)) return fromUrl;

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (isLang(saved)) return saved;
    } catch {
      // No storage: fall through to the browser's language.
    }

    const browser = navigator.language?.slice(0, 2).toLowerCase();
    return isLang(browser) ? browser : 'en';
  }
}
