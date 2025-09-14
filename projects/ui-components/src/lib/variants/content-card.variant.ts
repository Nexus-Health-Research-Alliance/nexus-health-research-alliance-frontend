import { cva, type VariantProps } from 'class-variance-authority'

export const contentCardVariant = cva('py-5 px-6 rounded-2xl shadow-xl', {
  variants: {
    variant: {
      clinical: 'bg-brand-300',
      research: 'bg-secondary-300',
      publicHealth: 'bg-brand-300',
      interdisciplinary: 'bg-secondary-300',
    },
  },
  defaultVariants: {
    variant: 'clinical',
  },
})

export type ContentCardVariantProps = VariantProps<typeof contentCardVariant>
