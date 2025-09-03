import { ourPurpose } from './../../../logics/constants/home-page.constants';
import { HeroSection } from './../../../../../projects/ui-components/src/lib/presentations/hero-section/hero-section'
import { Component } from '@angular/core'
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [HeroSection, NgOptimizedImage],
  templateUrl: './home.html',
})
export class Home {
  public readonly ourPurpose = ourPurpose
}
