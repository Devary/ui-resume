import { Component, HostListener, computed, input, signal } from '@angular/core';

const MIN_SCALE = 1;
const MAX_SCALE = 8;

/**
 * An image (a diagram) that opens full screen to zoom and pan: mouse wheel or +/− to zoom,
 * drag to move, pinch on touch screens, double-click to zoom in or back, Escape to close.
 */
@Component({
  selector: 'app-zoomable-image',
  standalone: true,
  templateUrl: './zoomable-image.component.html',
  styleUrl: './zoomable-image.component.scss',
})
export class ZoomableImageComponent {
  readonly src = input.required<string>();
  readonly alt = input('');
  readonly labels = input({ open: 'Open full screen', zoomIn: 'Zoom in', zoomOut: 'Zoom out', reset: 'Reset zoom', close: 'Close' });

  readonly open  = signal(false);
  readonly scale = signal(1);
  readonly x     = signal(0);
  readonly y     = signal(0);
  readonly transform = computed(() => `translate(${this.x()}px, ${this.y()}px) scale(${this.scale()})`);
  readonly percent   = computed(() => Math.round(this.scale() * 100));

  /** The pointers on the image now (for drag, and pinch with two). */
  private readonly pointers = new Map<number, { x: number; y: number }>();
  private pinchDistance = 0;

  show(): void {
    this.reset();
    this.open.set(true);
  }

  close(): void {
    this.open.set(false);
    this.pointers.clear();
  }

  reset(): void {
    this.scale.set(1);
    this.x.set(0);
    this.y.set(0);
  }

  zoomBy(factor: number, cx = 0, cy = 0): void {
    const from = this.scale();
    const to = Math.min(MAX_SCALE, Math.max(MIN_SCALE, from * factor));
    if (to === from) return;
    // Keep the point under (cx, cy) – relative to the stage centre – where it is.
    const k = to / from;
    this.x.set(cx - (cx - this.x()) * k);
    this.y.set(cy - (cy - this.y()) * k);
    this.scale.set(to);
    if (to === MIN_SCALE) this.reset();
  }

  onWheel(event: WheelEvent, stage: HTMLElement): void {
    event.preventDefault();
    const [cx, cy] = this.fromCentre(event, stage);
    this.zoomBy(event.deltaY < 0 ? 1.15 : 1 / 1.15, cx, cy);
  }

  onDoubleClick(event: MouseEvent, stage: HTMLElement): void {
    const [cx, cy] = this.fromCentre(event, stage);
    if (this.scale() > 1) {
      this.reset();
    } else {
      this.zoomBy(2.5, cx, cy);
    }
  }

  onPointerDown(event: PointerEvent): void {
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
    this.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    this.pinchDistance = this.distance();
  }

  onPointerMove(event: PointerEvent, stage: HTMLElement): void {
    const last = this.pointers.get(event.pointerId);
    if (!last) return;
    this.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (this.pointers.size === 2) {
      const d = this.distance();
      if (this.pinchDistance > 0) {
        const [a, b] = [...this.pointers.values()];
        const [cx, cy] = this.fromCentre({ clientX: (a.x + b.x) / 2, clientY: (a.y + b.y) / 2 }, stage);
        this.zoomBy(d / this.pinchDistance, cx, cy);
      }
      this.pinchDistance = d;
    } else if (this.scale() > 1) {
      this.x.update((v) => v + event.clientX - last.x);
      this.y.update((v) => v + event.clientY - last.y);
    }
  }

  onPointerUp(event: PointerEvent): void {
    this.pointers.delete(event.pointerId);
    this.pinchDistance = this.distance();
  }

  @HostListener('document:keydown', ['$event'])
  onKey(event: KeyboardEvent): void {
    if (!this.open()) return;
    if (event.key === 'Escape') this.close();
    else if (event.key === '+' || event.key === '=') this.zoomBy(1.25);
    else if (event.key === '-') this.zoomBy(1 / 1.25);
    else if (event.key === '0') this.reset();
  }

  private distance(): number {
    if (this.pointers.size !== 2) return 0;
    const [a, b] = [...this.pointers.values()];
    return Math.hypot(a.x - b.x, a.y - b.y);
  }

  /** A point on screen, measured from the centre of the stage (where the image is scaled from). */
  private fromCentre(p: { clientX: number; clientY: number }, stage: HTMLElement): [number, number] {
    const box = stage.getBoundingClientRect();
    return [p.clientX - box.left - box.width / 2, p.clientY - box.top - box.height / 2];
  }
}
