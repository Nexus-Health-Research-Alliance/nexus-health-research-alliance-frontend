import { ContentCardWithVariant } from '../../../../projects/ui-components/src/public-api'

export const ourPurpose = [
  {
    icon: '/icons/bulb.svg',
    iconWidth: '16',
    iconBackground: 'bg-brand-200',
    borderGradient: 'from-brand-500 to-secondary-600',
    title: 'Mission',
    description:
      'To conduct high-quality, data-driven research that informs clinical decisionmaking and supports the continuous advancement of healthcare services.',
  },
  {
    icon: '/icons/wheels.svg',
    iconWidth: '26.67',
    iconBackground: 'bg-secondary-200',
    borderGradient: 'from-secondary-600 to-brand-500',
    title: 'Vision',
    description:
      'To be recognized as a leader in health research, generating impactful scientific evidence that shapes local clinical guidelines, supports evidence-based practice, health policy, and fosters research capacity for the long term.',
  },
] as const

export const contentCard: ContentCardWithVariant[] = [
  {
    title: 'Interdisciplinary Excellence',
    description:
      "Our diverse expertise spans clinical medicine, pharmacology, epidemiology, public health, laboratory sciences, and translational research—bringing together the full spectrum of skills needed to address Africa's complex health challenges.",
    icon: '/icons/interdisciplinary.svg',
    iconWidth: 21.33,
    iconHeight: 26.67,
    iconBackground: 'bg-secondary-200',
    variant: 'interdisciplinary',
  },
  {
    title: 'Clinical Medicine',
    description: 'Expert clinicians driving evidence-based practice',
    icon: '/icons/heart.svg',
    iconWidth: 26.67,
    iconHeight: 24,
    iconBackground: 'bg-brand-200',
    variant: 'clinical',
  },
  {
    title: 'Research Sciences',
    description: 'Pharmacology, epidemiology, and translational research',
    icon: '/icons/book.svg',
    iconWidth: 21.33,
    iconHeight: 26.67,
    iconBackground: 'bg-secondary-200',
    variant: 'research',
  },
  {
    title: 'Public Health',
    description: 'Population health and community-focused interventions',
    icon: '/icons/users.svg',
    iconWidth: 26.67,
    iconHeight: 24,
    iconBackground: 'bg-brand-200',
    variant: 'publicHealth',
  },
] as const
