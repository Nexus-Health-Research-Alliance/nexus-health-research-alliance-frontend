import { CommonModule } from '@angular/common'
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core'
import { RouterLink } from '@angular/router'
import { ButtonHtmlType, LinkTarget, LinkType } from '../logics/models/types/button.types'
import { mergeClasses } from '../../public-api'
import { ButtonVariantProps, buttonVariant } from '../variants/button.variant'
import { ClassValue } from 'clsx'

@Component({
  selector: 'lib-button',
  imports: [RouterLink, CommonModule],
  templateUrl: './button.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Button {
  public variant = input<ButtonVariantProps['variant']>('primary')
  public size = input<ButtonVariantProps['size']>('medium')
  public type = input<ButtonHtmlType>('button')
  public isDisabled = input(false, { transform: booleanAttribute })
  public isLoading = input(false, { transform: booleanAttribute })
  public ariaLabel = input('')
  public className = input<ClassValue | string>('')
  public linkType = input<LinkType>('anchor')
  public linkUrl = input<string>('')
  public linkTarget = input<LinkTarget>('_self')

  public btnClick = output<Event>()

  public readonly isLinkVariant = computed(() => this.variant() === 'link')

  public readonly computedClasses = computed(() => {
    const baseClasses = buttonVariant({
      variant: this.variant(),
      size: this.size(),
    })

    const loadingClasses = this.isLoading() ? 'cursor-wait' : ''

    return mergeClasses(baseClasses, loadingClasses, this.className())
  })

  public onClick(event: Event): void {
    if (this.isDisabled() || this.isLoading()) {
      event.preventDefault()
      return
    }
    this.btnClick.emit(event)
  }

  public onKeyDown(event: KeyboardEvent): void {
    if ((event.key === 'Enter' || event.key === ' ') && !this.isDisabled() && !this.isLoading()) {
      event.preventDefault()
      this.onClick(event)
    }
  }
}
