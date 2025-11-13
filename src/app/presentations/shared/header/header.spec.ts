import { ComponentFixture, TestBed } from '@angular/core/testing'

import { Header } from './header'
import { ClickOutside } from '../../../logics/directives/click-outside/click-outside'
import { provideRouter } from '@angular/router'

describe('Header', () => {
  let component: Header
  let fixture: ComponentFixture<Header>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header, ClickOutside],
      providers: [provideRouter([])],
    }).compileComponents()

    fixture = TestBed.createComponent(Header)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should toggle menu open state when toggleMenu is called', () => {
    expect(component.isMenuOpen()).toBe(false)
    component.toggleMenu()
    expect(component.isMenuOpen()).toBe(true)
    component.toggleMenu()
    expect(component.isMenuOpen()).toBe(false)
  })

  it('should close menu when closeMenu is called', () => {
    component.isMenuOpen.set(true)
    component.closeMenu()
    expect(component.isMenuOpen()).toBe(false)
  })

  it('should close menu on click outside if menu is open', () => {
    component.isMenuOpen.set(true)
    component.onClickOutside()
    expect(component.isMenuOpen()).toBe(false)
  })

  it('should not close menu on click outside if menu is already closed', () => {
    component.isMenuOpen.set(false)
    component.onClickOutside()
    expect(component.isMenuOpen()).toBe(false)
  })
})
