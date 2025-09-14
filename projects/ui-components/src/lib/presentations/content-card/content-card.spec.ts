import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

import { ContentCard } from './content-card'
import { ContentCardData } from '../../logics/models/interfaces/content-card.interface'

describe('ContentCard', () => {
  let component: ContentCard
  let fixture: ComponentFixture<ContentCard>

  const mockCardData: ContentCardData = {
    title: 'Clinical Research',
    description:
      'Advancing evidence-based medicine through rigorous clinical trials and research studies.',
    icon: '/images/clinical-icon.svg',
    iconWidth: 32,
    iconHeight: 32,
    iconBackground: 'bg-blue-100',
  }

  const mockInterdisciplinaryCardData: ContentCardData = {
    title: 'Interdisciplinary Collaboration',
    description:
      'Fostering partnerships across multiple disciplines to address complex health challenges.',
    icon: '/images/interdisciplinary-icon.svg',
    iconWidth: 28,
    iconHeight: 28,
    iconBackground: 'bg-green-100',
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentCard],
    }).compileComponents()

    fixture = TestBed.createComponent(ContentCard)
    component = fixture.componentInstance
  })

  describe('Component Creation', () => {
    it('should create the component', () => {
      fixture.componentRef.setInput('cardData', mockCardData)
      fixture.detectChanges()

      expect(component).toBeTruthy()
    })

    it('should have default variant as "clinical"', () => {
      fixture.componentRef.setInput('cardData', mockCardData)
      fixture.detectChanges()

      expect(component.variant()).toBe('clinical')
    })

    it('should have empty className by default', () => {
      fixture.componentRef.setInput('cardData', mockCardData)
      fixture.detectChanges()

      expect(component.className()).toBe('')
    })

    it('should have empty ariaLabel by default', () => {
      fixture.componentRef.setInput('cardData', mockCardData)
      fixture.detectChanges()

      expect(component.ariaLabel()).toBe('')
    })
  })

  describe('Input Properties', () => {
    it('should accept and use cardData input', () => {
      fixture.componentRef.setInput('cardData', mockCardData)
      fixture.detectChanges()

      expect(component.cardData()).toEqual(mockCardData)
    })

    it('should accept and use variant input', () => {
      fixture.componentRef.setInput('cardData', mockCardData)
      fixture.componentRef.setInput('variant', 'interdisciplinary')
      fixture.detectChanges()

      expect(component.variant()).toBe('interdisciplinary')
    })

    it('should accept and use className input', () => {
      const customClass = 'custom-class'
      fixture.componentRef.setInput('cardData', mockCardData)
      fixture.componentRef.setInput('className', customClass)
      fixture.detectChanges()

      expect(component.className()).toBe(customClass)
    })

    it('should accept and use ariaLabel input', () => {
      const customAriaLabel = 'Custom aria label'
      fixture.componentRef.setInput('cardData', mockCardData)
      fixture.componentRef.setInput('ariaLabel', customAriaLabel)
      fixture.detectChanges()

      expect(component.ariaLabel()).toBe(customAriaLabel)
    })
  })

  describe('Computed Properties', () => {
    describe('isVariantInterdisciplinary', () => {
      it('should return true when variant is "interdisciplinary"', () => {
        fixture.componentRef.setInput('cardData', mockCardData)
        fixture.componentRef.setInput('variant', 'interdisciplinary')
        fixture.detectChanges()

        expect(component.isVariantInterdisciplinary()).toBe(true)
      })

      it('should return false when variant is not "interdisciplinary"', () => {
        fixture.componentRef.setInput('cardData', mockCardData)
        fixture.componentRef.setInput('variant', 'clinical')
        fixture.detectChanges()

        expect(component.isVariantInterdisciplinary()).toBe(false)
      })
    })

    describe('computedClasses', () => {
      it('should include max-width class for interdisciplinary variant', () => {
        fixture.componentRef.setInput('cardData', mockCardData)
        fixture.componentRef.setInput('variant', 'interdisciplinary')
        fixture.detectChanges()

        const classes = component.computedClasses()
        expect(classes).toContain('lg:max-w-[612px]')
      })

      it('should include max-width class for non-interdisciplinary variant', () => {
        fixture.componentRef.setInput('cardData', mockCardData)
        fixture.componentRef.setInput('variant', 'clinical')
        fixture.detectChanges()

        const classes = component.computedClasses()
        expect(classes).toContain('lg:max-w-[282px]')
      })

      it('should include custom className when provided', () => {
        const customClass = 'custom-test-class'
        fixture.componentRef.setInput('cardData', mockCardData)
        fixture.componentRef.setInput('className', customClass)
        fixture.detectChanges()

        const classes = component.computedClasses()
        expect(classes).toContain(customClass)
      })
    })
  })

  describe('Template Rendering', () => {
    describe('Basic Structure', () => {
      beforeEach(() => {
        fixture.componentRef.setInput('cardData', mockCardData)
        fixture.detectChanges()
      })

      it('should render title', () => {
        const title = fixture.debugElement.query(By.css('#card-title'))

        expect(title).toBeTruthy()
        expect(title.nativeElement.textContent.trim()).toBe(mockCardData.title)
      })

      it('should render description', () => {
        const description = fixture.debugElement.query(By.css('#card-description'))

        expect(description).toBeTruthy()
        expect(description.nativeElement.textContent.trim()).toBe(mockCardData.description)
      })

      it('should render icon with correct attributes', () => {
        const icon = fixture.debugElement.query(By.css('img'))

        expect(icon).toBeTruthy()
        expect(icon.nativeElement.getAttribute('width')).toBe(mockCardData.iconWidth.toString())
        expect(icon.nativeElement.getAttribute('height')).toBe(mockCardData.iconHeight.toString())
      })

      it('should apply icon background class', () => {
        const iconContainer = fixture.debugElement.query(By.css('.w-16.h-16'))

        expect(iconContainer).toBeTruthy()
        expect(iconContainer.nativeElement.className).toContain(mockCardData.iconBackground)
      })
    })

    describe('Variant-specific Rendering', () => {
      describe('Clinical Variant (Default)', () => {
        beforeEach(() => {
          fixture.componentRef.setInput('cardData', mockCardData)
          fixture.componentRef.setInput('variant', 'clinical')
          fixture.detectChanges()
        })

        it('should render title before icon', () => {
          const header = fixture.debugElement.query(By.css('header'))
          const titleElement = header.query(By.css('h3'))
          const iconElement = header.query(By.css('div.w-16'))

          const titlePosition = Array.from(header.nativeElement.children).indexOf(
            titleElement.nativeElement,
          )
          const iconPosition = Array.from(header.nativeElement.children).indexOf(
            iconElement.nativeElement,
          )

          expect(titlePosition).toBeLessThan(iconPosition)
        })

        it('should have margin-bottom class on title for clinical variant', () => {
          const title = fixture.debugElement.query(By.css('#card-title'))
          expect(title.nativeElement.className).toContain('mb-3')
        })
      })

      describe('Interdisciplinary Variant', () => {
        beforeEach(() => {
          fixture.componentRef.setInput('cardData', mockInterdisciplinaryCardData)
          fixture.componentRef.setInput('variant', 'interdisciplinary')
          fixture.detectChanges()
        })

        it('should render icon before title', () => {
          const header = fixture.debugElement.query(By.css('header'))
          const iconElement = header.query(By.css('div.w-16'))
          const titleElement = header.query(By.css('h3'))

          const iconPosition = Array.from(header.nativeElement.children).indexOf(
            iconElement.nativeElement,
          )
          const titlePosition = Array.from(header.nativeElement.children).indexOf(
            titleElement.nativeElement,
          )

          expect(iconPosition).toBeLessThan(titlePosition)
        })

        it('should have margin-bottom class on icon container for interdisciplinary variant', () => {
          const iconContainer = fixture.debugElement.query(By.css('div.w-16'))
          expect(iconContainer.nativeElement.className).toContain('mb-3')
        })

        it('should not have margin-bottom class on title for interdisciplinary variant', () => {
          const title = fixture.debugElement.query(By.css('#card-title'))
          expect(title.nativeElement.className).not.toContain('mb-3')
        })
      })
    })

    describe('Dynamic Data Updates', () => {
      it('should update when cardData changes', () => {
        fixture.componentRef.setInput('cardData', mockCardData)
        fixture.detectChanges()

        let title = fixture.debugElement.query(By.css('#card-title'))
        expect(title.nativeElement.textContent.trim()).toBe(mockCardData.title)

        const newCardData = { ...mockCardData, title: 'New Title' }
        fixture.componentRef.setInput('cardData', newCardData)
        fixture.detectChanges()

        title = fixture.debugElement.query(By.css('#card-title'))
        expect(title.nativeElement.textContent.trim()).toBe('New Title')
      })

      it('should update layout when variant changes', () => {
        fixture.componentRef.setInput('cardData', mockCardData)
        fixture.componentRef.setInput('variant', 'clinical')
        fixture.detectChanges()

        let classes = component.computedClasses()
        expect(classes).toContain('lg:max-w-[282px]')

        fixture.componentRef.setInput('variant', 'interdisciplinary')
        fixture.detectChanges()

        classes = component.computedClasses()
        expect(classes).toContain('lg:max-w-[612px]')
      })
    })
  })
})
