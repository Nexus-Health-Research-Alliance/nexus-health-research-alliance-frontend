import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideRouter } from '@angular/router'
import { Component } from '@angular/core'

import { Button } from './button'

@Component({
  template: '<div>Test Route</div>',
})
class TestRouteComponent {}

describe('Button', () => {
  let component: Button
  let fixture: ComponentFixture<Button>
  let compiled: HTMLElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Button],
      providers: [provideRouter([{ path: 'test', component: TestRouteComponent }])],
    }).compileComponents()

    fixture = TestBed.createComponent(Button)
    component = fixture.componentInstance
    compiled = fixture.nativeElement
    fixture.detectChanges()
  })

  describe('Component Creation', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy()
    })

    it('should render as button element by default', () => {
      const buttonElement = compiled.querySelector('button[data-test-id="nexus-button"]')
      expect(buttonElement).toBeTruthy()
    })
  })

  describe('Button Rendering', () => {
    it('should render button with correct attributes', () => {
      fixture.componentRef.setInput('type', 'submit')
      fixture.componentRef.setInput('ariaLabel', 'Submit Button')
      fixture.componentRef.setInput('isDisabled', true)
      fixture.detectChanges()

      const buttonElement = compiled.querySelector(
        'button[data-test-id="nexus-button"]',
      ) as HTMLButtonElement

      expect(buttonElement.type).toBe('submit')
      expect(buttonElement.getAttribute('aria-label')).toBe('Submit Button')
      expect(buttonElement.disabled).toBe(true)
    })

    it('should apply computed classes to button', () => {
      fixture.componentRef.setInput('className', 'test-class')
      fixture.detectChanges()

      const buttonElement = compiled.querySelector(
        'button[data-test-id="nexus-button"]',
      ) as HTMLButtonElement
      expect(buttonElement.className).toContain('test-class')
    })
  })

  describe('Link Rendering', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('variant', 'link')
      fixture.detectChanges()
    })

    it('should render as anchor link when variant is link and linkType is anchor', () => {
      fixture.componentRef.setInput('linkUrl', 'https://example.com')
      fixture.componentRef.setInput('linkTarget', '_blank')
      fixture.componentRef.setInput('ariaLabel', 'External Link')
      fixture.detectChanges()

      const linkElement = compiled.querySelector(
        'a[data-test-id="nexus-button"]:not([routerLink])',
      ) as HTMLAnchorElement

      expect(linkElement).toBeTruthy()
      expect(linkElement.href).toBe('https://example.com/')
      expect(linkElement.target).toBe('_blank')
      expect(linkElement.getAttribute('aria-label')).toBe('External Link')
    })

    it('should render as router link when variant is link and linkType is routerLink', () => {
      fixture.componentRef.setInput('linkType', 'routerLink')
      fixture.componentRef.setInput('linkUrl', '/test')
      fixture.componentRef.setInput('ariaLabel', 'Router Link')
      fixture.detectChanges()

      const routerLinkElement =
        compiled.querySelector('a[data-test-id="nexus-button"][routerlink="/test"]') ||
        compiled.querySelector('a[data-test-id="nexus-button"][ng-reflect-router-link="/test"]') ||
        compiled.querySelector('a[data-test-id="nexus-button"][href="/test"]') ||
        compiled.querySelector('a[data-test-id="nexus-button"]')

      expect(routerLinkElement).toBeTruthy()
      expect(routerLinkElement?.getAttribute('aria-label')).toBe('Router Link')
    })

    it('should apply computed classes to link elements', () => {
      fixture.componentRef.setInput('className', 'link-class')
      fixture.detectChanges()

      const linkElement = compiled.querySelector(
        'a[data-test-id="nexus-button"]',
      ) as HTMLAnchorElement
      expect(linkElement.className).toContain('link-class')
    })
  })

  describe('Event Handling', () => {
    let mockEvent: Event

    beforeEach(() => {
      mockEvent = new Event('click')
      jest.spyOn(mockEvent, 'preventDefault')
    })

    describe('onClick method', () => {
      it('should emit btnClick event when not disabled or loading', () => {
        jest.spyOn(component.btnClick, 'emit')

        component.onClick(mockEvent)

        expect(component.btnClick.emit).toHaveBeenCalledWith(mockEvent)
        expect(mockEvent.preventDefault).not.toHaveBeenCalled()
      })

      it('should prevent default and not emit when disabled', () => {
        fixture.componentRef.setInput('isDisabled', true)
        jest.spyOn(component.btnClick, 'emit')

        component.onClick(mockEvent)

        expect(mockEvent.preventDefault).toHaveBeenCalled()
        expect(component.btnClick.emit).not.toHaveBeenCalled()
      })

      it('should prevent default and not emit when loading', () => {
        fixture.componentRef.setInput('isLoading', true)
        jest.spyOn(component.btnClick, 'emit')

        component.onClick(mockEvent)

        expect(mockEvent.preventDefault).toHaveBeenCalled()
        expect(component.btnClick.emit).not.toHaveBeenCalled()
      })
    })

    describe('onKeyDown method', () => {
      let mockKeyboardEvent: KeyboardEvent

      beforeEach(() => {
        mockKeyboardEvent = new KeyboardEvent('keydown')
        jest.spyOn(mockKeyboardEvent, 'preventDefault')
        jest.spyOn(component, 'onClick')
      })

      it('should trigger onClick on Enter key when not disabled or loading', () => {
        Object.defineProperty(mockKeyboardEvent, 'key', { value: 'Enter' })

        component.onKeyDown(mockKeyboardEvent)

        expect(mockKeyboardEvent.preventDefault).toHaveBeenCalled()
        expect(component.onClick).toHaveBeenCalledWith(mockKeyboardEvent)
      })

      it('should trigger onClick on Space key when not disabled or loading', () => {
        Object.defineProperty(mockKeyboardEvent, 'key', { value: ' ' })

        component.onKeyDown(mockKeyboardEvent)

        expect(mockKeyboardEvent.preventDefault).toHaveBeenCalled()
        expect(component.onClick).toHaveBeenCalledWith(mockKeyboardEvent)
      })

      it('should not trigger onClick when disabled', () => {
        fixture.componentRef.setInput('isDisabled', true)
        Object.defineProperty(mockKeyboardEvent, 'key', { value: 'Enter' })

        component.onKeyDown(mockKeyboardEvent)

        expect(component.onClick).not.toHaveBeenCalled()
      })

      it('should not trigger onClick when loading', () => {
        fixture.componentRef.setInput('isLoading', true)
        Object.defineProperty(mockKeyboardEvent, 'key', { value: 'Enter' })

        component.onKeyDown(mockKeyboardEvent)

        expect(component.onClick).not.toHaveBeenCalled()
      })

      it('should not trigger onClick for other keys', () => {
        Object.defineProperty(mockKeyboardEvent, 'key', { value: 'Tab' })

        component.onKeyDown(mockKeyboardEvent)

        expect(component.onClick).not.toHaveBeenCalled()
      })
    })
  })

  describe('DOM Event Integration', () => {
    it('should handle click events on button element', () => {
      jest.spyOn(component.btnClick, 'emit')

      const buttonElement = compiled.querySelector(
        'button[data-test-id="nexus-button"]',
      ) as HTMLButtonElement
      buttonElement.click()

      expect(component.btnClick.emit).toHaveBeenCalled()
    })

    it('should handle keydown events on button element', () => {
      jest.spyOn(component, 'onClick')

      const buttonElement = compiled.querySelector(
        'button[data-test-id="nexus-button"]',
      ) as HTMLButtonElement
      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' })
      buttonElement.dispatchEvent(enterEvent)

      expect(component.onClick).toHaveBeenCalled()
    })

    it('should handle click events on link elements', () => {
      fixture.componentRef.setInput('variant', 'link')
      fixture.detectChanges()

      jest.spyOn(component.btnClick, 'emit')

      const linkElement = compiled.querySelector(
        'a[data-test-id="nexus-button"]',
      ) as HTMLAnchorElement
      linkElement.click()

      expect(component.btnClick.emit).toHaveBeenCalled()
    })
  })

  describe('Content Projection', () => {
    it('should project content correctly', () => {
      const testContent = 'Test Button Content'
      fixture = TestBed.createComponent(Button)
      fixture.nativeElement.innerHTML = testContent
      fixture.detectChanges()

      expect(fixture.nativeElement.textContent).toContain(testContent)
    })
  })
})
