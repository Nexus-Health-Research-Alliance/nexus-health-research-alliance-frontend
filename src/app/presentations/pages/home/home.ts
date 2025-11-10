import { ourPurpose, contentCard } from './../../../logics/constants/home-page.constants'
import { Component } from '@angular/core'
import { NgOptimizedImage } from '@angular/common'
import { ContentCard, HeroSection, Button } from '../../../../../projects/ui-components/src/public-api'

@Component({
  selector: 'app-home',
  imports: [HeroSection, ContentCard, Button, NgOptimizedImage],
  templateUrl: './home.html',
  styles: [
    `
      .custom-flex {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      @media (min-width: 834px) {
        .custom-flex {
          flex-direction: row;
        }
      }
    `,
  ],
})
export class Home {
  public readonly ourPurpose = ourPurpose
  public readonly contentCard = contentCard
}
