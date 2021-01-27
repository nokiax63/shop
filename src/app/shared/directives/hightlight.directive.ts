import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appHightlight]'
})
export class HightlightDirective {
  @HostBinding('style.background')background!: string;
  @HostListener('mouseenter') onMouseIn(): void {
    this.background = '#b4b9de';
  }
  @HostListener('mouseleave') onMouseOut(): void {
    this.background = '#FFFFFF';
  }

  constructor() { }
}
