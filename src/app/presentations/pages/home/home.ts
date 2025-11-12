import { ourPurpose, contentCard } from './../../../logics/constants/home-page.constants'
import { Component } from '@angular/core'
import { NgOptimizedImage } from '@angular/common'
import {
  ContentCard,
  ProjectCard,
  HeroSection,
  Button,
} from '../../../../../projects/ui-components/src/public-api'

@Component({
  selector: 'app-home',
  imports: [HeroSection, ContentCard, Button, ProjectCard, NgOptimizedImage],
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
  public readonly projectCards = [
    {
      id: '1',
      imageUrl: '/images/project-image-1.svg',
      imageAlt: 'Two researchers in white lab coats conducting clinical research with microscope and test samples',
      title: 'Chronic Kidney Disease Outcomes in Ghana',
      buttonText: 'Learn More',
      buttonLink: '/projects/chronic-kidney-disease-ghana',
      imageWidth: 736,
      imageHeight: 736,
    },
    {
      id: '2',
      imageUrl: '/images/project-image-2.svg',
      imageAlt: 'Taking blood sample from patient for clinical research',
      title: 'Impact of Diabetes on Cardiovascular Disease in Nigeria',
      buttonText: 'Learn More',
      buttonLink: '/projects/impact-of-diabetes-on-cardiovascular-disease-nigeria',
      imageWidth: 736,
      imageHeight: 736,
    },
    {
      id: '3',
      imageUrl: '/images/project-image-3.svg',
      imageAlt: 'ECG machine displaying heart rhythm data for clinical research',
      title: 'Valvular Heart Disease and Arrhythmia in West Africa (Multicenter Study)',
      buttonText: 'Learn More',
      buttonLink: '/projects/valvular-heart-disease-arrhythmia-west-africa',
      imageWidth: 700,
      imageHeight: 933,
    },
  ]
}
