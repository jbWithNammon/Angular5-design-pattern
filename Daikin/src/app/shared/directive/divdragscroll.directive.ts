import { Directive, HostListener, ElementRef, Input, NgModule, Component, Output, EventEmitter, Renderer } from '@angular/core';

@Directive({
    selector: '[div-drag-scroll]'
})

export class DivDragScrollDirective {
    clicked: boolean = false;
    clickY: number;
    constructor(private el: ElementRef, renderer: Renderer) {
        renderer.listen(el.nativeElement, 'mousedown', (e) => {
            this.clicked = true;
            this.clickY = (e.clientY);
            //console.log(this.clickY);
        });
        renderer.listen(el.nativeElement, 'mousemove', (e) => {
            if (this.clicked) {
                //console.log('el',this.el.nativeElement.scrollTop,'   move',e.clientY);
                this.el.nativeElement.scrollTo(0,(this.el.nativeElement.scrollTop+((e.clientY-this.clickY)/6)));
            }
        })
    }

    @Input('div-drag-scroll') numpad: string;

    @HostListener('window:mouseup') onMouseUp() {
        this.clicked = false;
    }
    //   @HostListener('mousedown',['$event']) onMouseDown(e) {    
    //     this.clicked = true;
    //     this.clickY = e.clientY;    
    //   }  

    @HostListener('mousemove', ['$event']) onMouseMove(e) {
        if (this.clicked) {
            window.scroll(window.scrollX, window.scrollY);
        }
    }

}
