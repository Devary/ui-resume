import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { ThemeStore } from './theme.store';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  function render(): HTMLElement {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('shows who the CV is about and the current job', () => {
    const el = render();
    expect(el.querySelector('h1')?.textContent).toContain('Fakher Hammami');
    expect(el.querySelector('.current')?.textContent).toContain('Technical Lead');
    expect(el.querySelector('.current')?.textContent).toContain('LALUX');
  });

  it('marks only the job that runs to the present as current', () => {
    const el = render();
    const current = el.querySelectorAll('.entry.is-current');
    expect(current.length).toBe(1);
    expect(current[0].textContent).toContain('LALUX');
    expect(current[0].querySelector('.now')?.textContent).toContain('Current');
  });

  it('shows the key figures, the website link and a monogram per job', () => {
    const el = render();
    const stats = [...el.querySelectorAll('.stat')].map((s) => `${s.querySelector('dd')?.textContent} ${s.querySelector('dt')?.textContent}`);
    expect(stats).toEqual(['10+ Years', '7 Companies', '2 Certifications']);
    expect(el.querySelector<HTMLAnchorElement>('.contacts a[href="https://www.fakher.dev"]')?.textContent).toBe('fakher.dev');
    const monograms = [...el.querySelectorAll('.monogram')].map((m) => m.textContent?.trim());
    expect(monograms.slice(0, 4)).toEqual(['LA', 'SG', 'EU', 'EP']);
  });

  it('lists every section, numbered', () => {
    const el = render();
    const titles = [...el.querySelectorAll('.section-title')].map((t) => t.textContent?.trim());
    expect(titles).toEqual(['Languages', 'About', 'Experience', 'Skills', 'Education & Certifications', 'Creative Works']);
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
