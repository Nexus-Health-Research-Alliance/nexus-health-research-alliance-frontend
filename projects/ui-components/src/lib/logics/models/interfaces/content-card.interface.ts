import { ContentCardVariantProps } from "../../../variants/content-card.variant"

export interface ContentCardData {
  title: string
  description: string
  icon: string
  iconWidth: number
  iconHeight: number
  iconBackground: string
}

export interface ContentCardWithVariant extends ContentCardData {
  variant: ContentCardVariantProps['variant']
}
