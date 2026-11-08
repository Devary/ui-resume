import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { App } from './app';
import { routes } from './app.routes';
import { ThemeStore } from './theme.store';
import { LanguageStore } from './i18n/language.store';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes, withComponentInputBinding())],
    }).compileComponents();
    TestBed.inject(LanguageStore).setLang('en');
  });

  /** The page at this URL, rendered. */
  async function open(url = '/'): Promise<{ el: HTMLElement; harness: RouterTestingHarness }> {
    const harness = await RouterTestingHarness.create(url);
    return { el: harness.routeNativeElement as HTMLElement, harness };
  }

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('shows who the CV is about and the current job', async () => {
    const { el } = await open();
    expect(el.querySelector('h1')?.textContent).toContain('Fakher Hammami');
    expect(el.querySelector('.current')?.textContent).toContain('Technical Lead');
    expect(el.querySelector('.current')?.textContent).toContain('LALUX');
  });

  it('marks only the job that runs to the present as current', async () => {
    const { el } = await open();
    const current = el.querySelectorAll('.entry.is-current');
    expect(current.length).toBe(1);
    expect(current[0].textContent).toContain('LALUX');
    expect(current[0].querySelector('.now')?.textContent).toContain('Current');
  });

  it('shows the key figures, the website, the one CV download and the employer badges', async () => {
    const { el } = await open();
    const stats = [...el.querySelectorAll('.stat')].map((s) => `${s.querySelector('dd')?.textContent} ${s.querySelector('dt')?.textContent}`);
    expect(stats).toEqual(['10+ Years', '7 Companies', '2 Certifications']);
    expect(el.querySelector<HTMLAnchorElement>('.contacts a[href="https://www.veegine.com"]')?.textContent).toBe('www.veegine.com');
    expect(el.querySelector('.contacts')?.textContent).toMatch(/Born 1992 \(\d{2}\)/);
    expect(el.querySelector('.contacts')?.textContent).not.toContain('661 151 092');

    const downloads = [...el.querySelectorAll<HTMLAnchorElement>('.downloads a')].map((a) => a.getAttribute('href'));
    expect(downloads).toEqual(['cv/Fakher-Hammami-CV.pdf']);

    const logos = [...el.querySelectorAll<HTMLImageElement>('.badge.logo img')].map((img) => img.getAttribute('src'));
    expect(logos).toEqual(['logos/lalux.png', 'logos/societe-generale.svg', 'logos/cjeu.svg', 'logos/european-parliament.svg', 'logos/vermeg.png']);
    const monograms = [...el.querySelectorAll('.badge.monogram')].map((m) => m.textContent?.trim());
    expect(monograms).toEqual(['DG', 'GE']);
  });

  it('tells the intro as old school, the twist, then the agentic architect', async () => {
    const { el } = await open();
    expect(el.querySelector('.intro .lead')?.textContent).toContain('Old-school gem');
    expect(el.querySelector('.intro .twist')?.textContent).toContain('not really old school');
    expect(el.querySelector('.intro .body')?.textContent).toContain('agentic architect');
    expect(el.querySelector('.intro .body')?.textContent).toContain('With AI or without it');
    expect(el.querySelector('.intro .lab')?.textContent).toContain('enterprise-grade personal lab with AI agents');
    expect([...el.querySelectorAll('.school-label')].map((l) => l.textContent)).toEqual(['Old school', 'New school']);
  });

  it('shows the AI skills under the hero, Claude at the top level', async () => {
    const { el } = await open();
    const tools = [...el.querySelectorAll('.tool')].map((t) => `${t.querySelector('.name')?.textContent}: ${t.querySelector('.level')?.textContent}`);
    expect(tools).toEqual(['Claude: Agentic architect', 'Codex: Prompt engineer']);
    expect(el.querySelector('.tool.top .name')?.textContent).toBe('Claude');
    expect([...el.querySelectorAll<HTMLImageElement>('.tool .tile img')].map((i) => i.getAttribute('src'))).toEqual(['logos/claude.svg', 'logos/openai.svg']);
  });

  it('lists every section, numbered', async () => {
    const { el } = await open();
    const titles = [...el.querySelectorAll('.section-title')].map((t) => t.textContent?.trim());
    expect(titles).toEqual(['AI Skills', 'Languages', 'About', 'Experience', 'Skills', 'Education & Certifications', 'Creative Works']);
  });

  it('switches the CV to French, then to Arabic read right to left', async () => {
    const { el, harness } = await open();
    const language = TestBed.inject(LanguageStore);

    language.setLang('fr');
    harness.detectChanges();
    expect(el.querySelector('.section-title')?.textContent?.trim()).toBe('Compétences IA');
    expect(el.querySelector('.now')?.textContent).toContain('Actuel');
    expect(document.documentElement.lang).toBe('fr');
    expect(document.documentElement.dir).toBe('ltr');

    language.setLang('ar');
    harness.detectChanges();
    expect(el.querySelector('h1')?.textContent).toContain('فاخر');
    expect(el.querySelector('.section-title')?.textContent?.trim()).toBe('مهارات الذكاء الاصطناعي');
    expect(document.documentElement.dir).toBe('rtl');
  });

  it('picks the language from the toolbar menu', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    el.querySelector<HTMLButtonElement>('.lang-switch .tool-btn')?.click();
    fixture.detectChanges();

    const options = [...el.querySelectorAll<HTMLButtonElement>('.lang-menu button')];
    expect(options.map((o) => [...o.querySelectorAll('span')].map((s) => s.textContent).join(' '))).toEqual(['English EN', 'Français FR', 'العربية AR']);
    options[1].click();
    fixture.detectChanges();
    expect(TestBed.inject(LanguageStore).lang()).toBe('fr');
    expect(el.querySelector('.lang-menu')).toBeNull();
  });

  it('links each creative work to its own page', async () => {
    const { el } = await open();
    const links = [...el.querySelectorAll<HTMLAnchorElement>('.work-link')].map((a) => a.getAttribute('href'));
    expect(links).toEqual(['/works/my-lab', '/works/jqcd', '/works/virtual-links', '/works/devops-system']);
  });

  it('opens a work page, ready for its description and diagram', async () => {
    const { el } = await open('/works/virtual-links');
    expect(el.querySelector('.title')?.textContent).toContain('Virtual Links');
    expect([...el.querySelectorAll('.section-title')].map((t) => t.textContent?.trim())).toEqual(['Technical description', 'Diagram']);
    expect(el.querySelectorAll('.soon').length).toBe(2);
    expect(el.querySelector('.back')?.getAttribute('href')).toBe('/');
  });

  it('switches between light and dark from the toolbar', () => {
    const fixture = TestBed.createComponent(App);
    const theme = TestBed.inject(ThemeStore);
    theme.setTheme('light');
    fixture.detectChanges();
    const toggle = (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>('.tool-btn.icon-only');
    toggle?.click();
    fixture.detectChanges();
    expect(theme.theme()).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });
});
