import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ClickOutside } from './click-outside'
import { Component } from '@angular/core'
import { By } from '@angular/platform-browser'

@Component({
  template: `
    <div data-testid="container">
      <div
        data-testid="target"
        appClickOutside
        (clickOutside)="onClickOutside($event)"
        class="target-element"
      >
        <span data-testid="child">Child element</span>
      </div>
      <div data-testid="outside">Outside element</div>
    </div>
  `,
  imports: [ClickOutside],
})
class TestHost {
  public clickOutsideEvent: Event | null = null

  public onClickOutside(event: Event): void {
    this.clickOutsideEvent = event
  }
}

describe('ClickOutside', () => {
  let fixture: ComponentFixture<TestHost>
  let directive: ClickOutside
  let targetElement: HTMLElement
  let childElement: HTMLElement
  let outsideElement: HTMLElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClickOutside],
    }).compileComponents()

    fixture = TestBed.createComponent(TestHost)
    directive = fixture.debugElement.query(By.directive(ClickOutside)).injector.get(ClickOutside)
    fixture.detectChanges()

    targetElement = fixture.debugElement.query(By.css('[data-testid="target"]')).nativeElement
    childElement = fixture.debugElement.query(By.css('[data-testid="child"]')).nativeElement
    outsideElement = fixture.debugElement.query(By.css('[data-testid="outside"]')).nativeElement
  })

  afterEach(() => {
    fixture.destroy()
  })
  it('should create the directive', () => {
    expect(directive).toBeTruthy()
  })

  it('should emit clickOutside when clicking outside the host element', () => {
    const host = fixture.componentInstance
    const clickEvent = new MouseEvent('click', { bubbles: true })
    outsideElement.dispatchEvent(clickEvent)
    fixture.detectChanges()
    expect(host.clickOutsideEvent).toBe(clickEvent)
  })

  it('should not emit clickOutside when clicking inside the host element', () => {
    const host = fixture.componentInstance
    const clickEvent = new MouseEvent('click', { bubbles: true })
    targetElement.dispatchEvent(clickEvent)
    fixture.detectChanges()
    expect(host.clickOutsideEvent).toBeNull()
  })

  it('should not emit clickOutside when clicking a child of the host element', () => {
    const host = fixture.componentInstance
    const clickEvent = new MouseEvent('click', { bubbles: true })
    childElement.dispatchEvent(clickEvent)
    fixture.detectChanges()
    expect(host.clickOutsideEvent).toBeNull()
  })

  it('should emit clickOutside for multiple outside clicks', () => {
    const host = fixture.componentInstance
    const clickEvent1 = new MouseEvent('click', { bubbles: true })
    const clickEvent2 = new MouseEvent('click', { bubbles: true })
    outsideElement.dispatchEvent(clickEvent1)
    fixture.detectChanges()
    expect(host.clickOutsideEvent).toBe(clickEvent1)
    host.clickOutsideEvent = null
    outsideElement.dispatchEvent(clickEvent2)
    fixture.detectChanges()
    expect(host.clickOutsideEvent).toBe(clickEvent2)
  })
})
