import { CommonModule } from '@angular/common'
import { booleanAttribute, Component, input } from '@angular/core'
import { Button } from '../button/button'

@Component({
  selector: 'lib-hero-section',
  imports: [CommonModule, Button],
  templateUrl: './hero-section.html',
  styles: [
    `
      @media (min-width: 1440px) {
        .textSize {
          font-size: 4.5rem;
        }
      }
    `,
  ],
})
export class HeroSection {
  public title = input.required<string>()
  public subtitle = input.required<string>()
  public description = input('')
  public videoSrc = input.required<string>()
  public videoAriaLabel = input('')
  public showCtaButtons = input(false, { transform: booleanAttribute })
}
