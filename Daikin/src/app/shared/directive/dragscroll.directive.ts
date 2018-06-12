import { Directive, HostListener, ElementRef, Input, NgModule, Component, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[drag-scroll]'
})

export class DragScrollDirective {
  clicked: boolean = false;
  clickY: number;
  constructor(private el: ElementRef) { }

  @Input('drag-scroll') status: boolean;

  @HostListener('mouseup') onMouseUp() {
    this.clicked = false;
  }
  @HostListener('mousedown', ['$event']) onMouseDown(e) {
    this.clicked = true;
    this.clickY = e.clientY;
  }

  @HostListener('mousemove', ['$event']) onMouseMove(e) {
    if (this.clicked && this.status) {
      window.scroll(window.scrollX, window.scrollY - (e.clientY - this.clickY));
    }
  }

}
