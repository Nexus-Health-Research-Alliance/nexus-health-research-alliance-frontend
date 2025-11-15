import { Component } from '@angular/core'
import { NgOptimizedImage } from '@angular/common'
import { HeroSection } from '../../../../../projects/ui-components/src/public-api'

@Component({
  selector: 'app-who-we-are',
  imports: [HeroSection, NgOptimizedImage],
  templateUrl: './who-we-are.html',
})
export class WhoWeAre {}
