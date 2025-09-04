import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { provideRouter } from '@angular/router'

import { Home } from './home'
import { HeroSection } from '../../../../../projects/ui-components/src/lib/presentations/hero-section/hero-section'
import { ourPurpose } from './../../../logics/constants/home-page.constants'

describe('Home Component', () => {
  let component: Home
  let fixture: ComponentFixture<Home>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home, HeroSection],
      providers: [provideRouter([])],
    }).compileComponents()

    fixture = TestBed.createComponent(Home)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create the component', () => {
    expect(component).toBeTruthy()
  })

  it('should initialize ourPurpose property', () => {
    expect(component.ourPurpose).toBeDefined()
    expect(component.ourPurpose).toBe(ourPurpose)
  })

  describe('Hero Section', () => {
    it('should render hero section with correct properties', () => {
      const heroElement = fixture.debugElement.query(By.css('lib-hero-section'))

      expect(heroElement).toBeTruthy()
      expect(heroElement.attributes['title']).toBe('Nexus Health Research Alliance.')
      expect(heroElement.attributes['subtitle']).toBe(
        'Advancing Clinical Research and Health Outcomes',
      )
      expect(heroElement.attributes['videoSrc']).toBe('/videos/hero-video.mp4')
      expect(heroElement.attributes['videoAriaLabel']).toBe('Promotional content')
    })
  })

  describe('Purpose Items Rendering', () => {
    it('should render all purpose items', () => {
      const listItems = fixture.debugElement.queryAll(By.css('div[role="listitem"]'))

      expect(listItems.length).toBe(ourPurpose.length)
    })

    it('should render purpose titles correctly', () => {
      const titles = fixture.debugElement.queryAll(By.css('article h3'))

      expect(titles.length).toBe(ourPurpose.length)
      titles.forEach((titleElement, index) => {
        expect(titleElement.nativeElement.textContent.trim()).toBe(ourPurpose[index].title)
      })
    })

    it('should render purpose descriptions correctly', () => {
      const descriptions = fixture.debugElement.queryAll(By.css('article p'))

      expect(descriptions.length).toBe(ourPurpose.length)
      descriptions.forEach((descElement, index) => {
        expect(descElement.nativeElement.textContent.trim()).toBe(ourPurpose[index].description)
      })
    })

    it('should apply correct CSS classes from ourPurpose data', () => {
      const gradientContainers = fixture.debugElement.queryAll(By.css('div[role="listitem"]'))

      gradientContainers.forEach((container) => {
        const classAttribute = container.nativeElement.getAttribute('class')
        expect(classAttribute).toContain('bg-gradient-to-b')
      })
    })
  })
})
