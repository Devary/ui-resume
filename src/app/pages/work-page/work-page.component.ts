import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageStore } from '../../i18n/language.store';
import { SpotlightDirective } from '../../shared/spotlight.directive';
import { ZoomableImageComponent } from '../../shared/zoomable-image.component';

/**
 * One creative work's own page (/works/<slug>): its technical description and a diagram to
 * zoom into. Until they are written (details in cv-content.ts), both say "coming soon".
 */
@Component({
  selector: 'app-work-page',
  standalone: true,
  imports: [RouterLink, SpotlightDirective, ZoomableImageComponent],
  templateUrl: './work-page.component.html',
  styleUrl: './work-page.component.scss'
})
export class WorkPageComponent {
  readonly t = inject(LanguageStore).content;
  /** From the route, /works/:slug. */
  readonly slug = input('');

  readonly work = computed(() => this.t().works.find((w) => w.slug === this.slug()));

  readonly viewerLabels = computed(() => {
    const ui = this.t().ui;
    return { open: ui.openDiagram, zoomIn: ui.zoomIn, zoomOut: ui.zoomOut, reset: ui.resetZoom, close: ui.close };
  });
}
