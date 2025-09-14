import { Component, computed, input } from '@angular/core'
import { ContentCardData } from '../../logics/models/interfaces/content-card.interface'
import { ClassValue } from 'clsx'
import { CommonModule, NgOptimizedImage } from '@angular/common'
import { mergeClasses } from '../../../public-api'
import { ContentCardVariantProps, contentCardVariant } from '../../variants/content-card.variant'

@Component({
  selector: 'lib-content-card',
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './content-card.html',
})
export class ContentCard {
  public variant = input<ContentCardVariantProps['variant']>('clinical')
  public cardData = input.required<ContentCardData>()
  public className = input<ClassValue | string>('')
  public ariaLabel = input('')

  public isVariantInterdisciplinary = computed(() => this.variant() === 'interdisciplinary')

  public computedClasses = computed(() => {
    const variantClasses = contentCardVariant({ variant: this.variant() })
    const maxWidthClass = this.isVariantInterdisciplinary()
      ? 'lg:max-w-[612px]'
      : 'lg:max-w-[282px]'
    return mergeClasses(variantClasses, maxWidthClass, this.className())
  })
}
