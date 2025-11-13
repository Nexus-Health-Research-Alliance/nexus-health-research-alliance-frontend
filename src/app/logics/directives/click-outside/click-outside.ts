import { Directive, ElementRef, HostListener, inject, output } from '@angular/core'

@Directive({
  selector: '[appClickOutside]',
})
export class ClickOutside {
  public clickOutside = output<Event>()
  private readonly elementRef = inject(ElementRef)

  @HostListener('document:click', ['$event'])
  public onDocumentClick(event: Event): void {
    const clickedElement = event.target as HTMLElement
    const hostElement = this.elementRef.nativeElement as HTMLElement

    if (!hostElement.contains(clickedElement)) {
      this.clickOutside.emit(event)
    }
  }
}
