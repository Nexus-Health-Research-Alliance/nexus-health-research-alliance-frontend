import { Component, signal } from '@angular/core'
import { Button } from '../../../../../projects/ui-components/src/public-api'
import { ClickOutside } from '../../../logics/directives/click-outside/click-outside'
import { NgOptimizedImage } from '@angular/common'

@Component({
  selector: 'app-header',
  imports: [Button, ClickOutside, NgOptimizedImage],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  public isMenuOpen = signal(false)

  public toggleMenu(): void {
    this.isMenuOpen.update((value) => !value)
  }

  public closeMenu(): void {
    this.isMenuOpen.set(false)
  }

  public onClickOutside(): void {
    if (this.isMenuOpen()) {
      this.closeMenu()
    }
  }
}
