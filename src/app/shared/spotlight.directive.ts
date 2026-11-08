import { Directive, ElementRef, inject } from '@angular/core';

/**
 * A soft light that follows the mouse across the element: sets --spot-x / --spot-y, which
 * the ".spotlight" styles in styles.scss draw from. Only on devices with a real pointer.
 */
@Directive({
  selector: '[appSpotlight]',
  standalone: true,
  host: {
    class: 'spotlight',
    '(pointermove)': 'move($event)',
  },
})
export class SpotlightDirective {
  private readonly el = inject(ElementRef<HTMLElement>);

  move(event: PointerEvent): void {
    if (event.pointerType !== 'mouse') {
      return;
    }
    const el = this.el.nativeElement as HTMLElement;
    const box = el.getBoundingClientRect();
    el.style.setProperty('--spot-x', `${event.clientX - box.left}px`);
    el.style.setProperty('--spot-y', `${event.clientY - box.top}px`);
  }
}
