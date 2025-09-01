import { ComponentFixture, TestBed } from '@angular/core/testing'
import { HeroSection } from './hero-section'
import { Button } from '../button/button'
import { provideRouter } from '@angular/router'

describe('HeroSection', () => {
  let component: HeroSection
  let fixture: ComponentFixture<HeroSection>
  let compiled: HTMLElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroSection, Button],
      providers: [provideRouter([])],
    }).compileComponents()

    fixture = TestBed.createComponent(HeroSection)
    component = fixture.componentInstance
    compiled = fixture.nativeElement as HTMLElement
  })

  describe('Component Creation', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy()
    })

    it('should have required inputs defined', () => {
      expect(component.title).toBeDefined()
      expect(component.subtitle).toBeDefined()
      expect(component.videoSrc).toBeDefined()
    })

    it('should have optional inputs with default values', () => {
      expect(component.description).toBeDefined()
      expect(component.videoAriaLabel).toBeDefined()
      expect(component.showCtaButtons).toBeDefined()
    })
  })

  describe('Required Inputs Rendering', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('title', 'Test Hero Title')
      fixture.componentRef.setInput('subtitle', 'Test Hero Subtitle')
      fixture.componentRef.setInput('videoSrc', 'test-video.mp4')
      fixture.detectChanges()
    })

    it('should render the title correctly', () => {
      const titleElement = compiled.querySelector('#hero-title')
      expect(titleElement).toBeTruthy()
      expect(titleElement?.textContent?.trim()).toBe('Test Hero Title')
    })

    it('should render the subtitle correctly', () => {
      const subtitleElement = compiled.querySelector('[role="doc-subtitle"]')
      expect(subtitleElement).toBeTruthy()
      expect(subtitleElement?.textContent?.trim()).toBe('Test Hero Subtitle')
    })

    it('should render the video with correct src', () => {
      const videoElement = compiled.querySelector('video') as HTMLVideoElement
      expect(videoElement).toBeTruthy()
      expect(videoElement.src).toContain('test-video.mp4')
    })

    it('should have video with correct attributes', () => {
      const videoElement = compiled.querySelector('video') as HTMLVideoElement
      expect(videoElement.autoplay).toBe(true)
      expect(videoElement.loop).toBe(true)
      expect(videoElement.hasAttribute('playsinline')).toBe(true)
    })
  })

  describe('CTA Buttons Configuration', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('title', 'Test Title')
      fixture.componentRef.setInput('subtitle', 'Test Subtitle')
      fixture.componentRef.setInput('videoSrc', 'test-video.mp4')
      fixture.componentRef.setInput('showCtaButtons', true)
      fixture.detectChanges()
    })

    it('should show CTA buttons when showCtaButtons is true', () => {
      fixture.componentRef.setInput('showCtaButtons', true)
      fixture.detectChanges()

      const ctaSection = compiled.querySelector('[aria-label="Hero section actions"]')
      expect(ctaSection).toBeTruthy()

      const buttons = compiled.querySelectorAll('lib-button')
      expect(buttons.length).toBe(2)
    })

    it('should hide CTA buttons when showCtaButtons is false', () => {
      fixture.componentRef.setInput('showCtaButtons', false)
      fixture.detectChanges()

      const ctaSection = compiled.querySelector('[aria-label="Hero section actions"]')
      expect(ctaSection).toBeFalsy()

      const buttons = compiled.querySelectorAll('lib-button')
      expect(buttons.length).toBe(0)
    })

    it('should render primary CTA button with correct attributes', () => {
      const primaryButton = compiled.querySelector('lib-button[linkUrl="/projects"]')
      expect(primaryButton).toBeTruthy()
      expect(primaryButton?.getAttribute('variant')).toBe('link')
      expect(primaryButton?.getAttribute('linkType')).toBe('routerLink')
      expect(primaryButton?.getAttribute('size')).toBe('medium')
      expect(primaryButton?.getAttribute('ariaLabel')).toBe(
        'Explore Our Research - Navigate to projects page',
      )
    })

    it('should render secondary CTA button with correct attributes', () => {
      const secondaryButton = compiled.querySelector('lib-button[linkUrl="/who-we-are"]')
      expect(secondaryButton).toBeTruthy()
      expect(secondaryButton?.getAttribute('variant')).toBe('secondary')
      expect(secondaryButton?.getAttribute('linkType')).toBe('routerLink')
      expect(secondaryButton?.getAttribute('size')).toBe('medium')
      expect(secondaryButton?.getAttribute('ariaLabel')).toBe(
        'Learn More - Navigate to who we are page',
      )
    })

    it('should render button text content correctly', () => {
      const buttons = compiled.querySelectorAll('lib-button span')
      expect(buttons[0]?.textContent?.trim()).toBe('Explore Our Research')
      expect(buttons[1]?.textContent?.trim()).toBe('Learn More')
    })
  })
})
