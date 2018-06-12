import { Directive, HostListener, ElementRef, Input, NgModule, Component, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[sub-dropdown]'
})

export class SubDropDownDirective {
  constructor(private el: ElementRef) { }

  @Input('sub-dropdown') status: boolean;

  @HostListener('click', ['$event']) onMouseDown(e) {
    e.stopPropagation();
    e.preventDefault();
    let next = e.target.nextElementSibling;
    if (next.classList.contains("dropdown-submenu")) {
      if (next.classList.contains("expand-sub"))
        next.classList.remove('expand-sub');
      else
        next.classList.add('expand-sub');
    }
  }
  @HostListener('window:click', ['$event']) onMouseDownd(e) {
    if (this.el.nativeElement.nextElementSibling.classList.contains("expand-sub")) {
      this.el.nativeElement.nextElementSibling.classList.remove("expand-sub");
    }
  }
}
