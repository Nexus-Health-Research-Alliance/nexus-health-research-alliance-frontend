import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { provideRouter } from '@angular/router'

import { Home } from './home'
import { HeroSection } from '../../../../../projects/ui-components/src/public-api'
import { ourPurpose, contentCard } from './../../../logics/constants/home-page.constants'

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

  it('should initialize contentCard property', () => {
    expect(component.contentCard).toBeDefined()
    expect(component.contentCard).toBe(contentCard)
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

  describe('Our Purpose Section', () => {
    it('should render "Our Purpose" heading', () => {
      const heading = fixture.debugElement.query(By.css('#our-purpose-heading'))

      expect(heading).toBeTruthy()
      expect(heading.nativeElement.textContent.trim()).toBe('Our Purpose')
    })

    it('should render purpose titles correctly', () => {
      const purposeSection = fixture.debugElement.query(
        By.css('section[aria-labelledby="our-purpose-heading"]'),
      )
      const titles = purposeSection.queryAll(By.css('article h3'))

      expect(titles.length).toBe(ourPurpose.length)
      titles.forEach((titleElement, index) => {
        expect(titleElement.nativeElement.textContent.trim()).toBe(ourPurpose[index].title)
      })
    })

    it('should render purpose descriptions correctly', () => {
      const purposeSection = fixture.debugElement.query(
        By.css('section[aria-labelledby="our-purpose-heading"]'),
      )
      const descriptions = purposeSection.queryAll(By.css('article p'))

      expect(descriptions.length).toBe(ourPurpose.length)
      descriptions.forEach((descElement, index) => {
        expect(descElement.nativeElement.textContent.trim()).toBe(ourPurpose[index].description)
      })
    })

    it('should render purpose icons', () => {
      const purposeSection = fixture.debugElement.query(
        By.css('section[aria-labelledby="our-purpose-heading"]'),
      )
      const icons = purposeSection.queryAll(By.css('article img'))

      expect(icons.length).toBe(ourPurpose.length)
      icons.forEach((iconElement, index) => {
        expect(iconElement.nativeElement.getAttribute('width')).toBe(
          ourPurpose[index].iconWidth.toString(),
        )
        expect(iconElement.nativeElement.getAttribute('height')).toBe('26.67')
      })
    })
  })

  describe('Who We Are Section', () => {
    it('should render "Who we are" heading', () => {
      const heading = fixture.debugElement.query(By.css('#who-we-are-heading'))

      expect(heading).toBeTruthy()
      expect(heading.nativeElement.textContent.trim()).toBe('Who we are')
    })

    it('should render the main logo', () => {
      const logos = fixture.debugElement.queryAll(
        By.css('img[alt="Nexus Health Research Alliance Logo"]'),
      )

      expect(logos.length).toBeGreaterThanOrEqual(1)
      logos.forEach((logo) => {
        expect(logo.nativeElement.getAttribute('src')).toBe('/images/logo.webp')
      })
    })

    it('should have proper section structure with aria-labelledby', () => {
      const whoWeAreSection = fixture.debugElement.query(
        By.css('section[aria-labelledby="who-we-are-heading"]'),
      )

      expect(whoWeAreSection).toBeTruthy()
      expect(whoWeAreSection.nativeElement.getAttribute('aria-labelledby')).toBe(
        'who-we-are-heading',
      )
    })

    it('should have responsive layout classes for mobile and desktop', () => {
      const mobileLayout = fixture.debugElement.query(By.css('.flex.flex-col.gap-4.lg\\:hidden'))
      expect(mobileLayout).toBeTruthy()

      const desktopLayout = fixture.debugElement.query(
        By.css('.hidden.lg\\:flex.lg\\:justify-between'),
      )
      expect(desktopLayout).toBeTruthy()
    })

    it('should render content cards in both mobile and desktop layouts', () => {
      const allContentCards = fixture.debugElement.queryAll(By.css('lib-content-card'))

      expect(allContentCards.length).toBe(contentCard.length * 2)
    })
  })
})
