import { cva, type VariantProps } from 'class-variance-authority'

export const buttonVariant = cva(
  'inline-flex items-center justify-center text-base leading-6 font-bold focus:outline-none transition-colors disabled:cursor-not-allowed no-underline',
  {
    variants: {
      variant: {
        primary:
          'bg-brand-700 hover:bg-brand-400 text-white rounded focus:border-[3px] focus:border-primaryBlue-50 active:bg-brand-800 active:border-0 disabled:bg-accent-300 disabled:text-white',
        secondary:
          'bg-transparent text-brand-700 border-[1.5px] border-brand-700 hover:bg-accent-100 hover:border-brand-400 hover:text-brand-400 focus:border-brand-700 focus:ring-4 focus:ring-[#5DAFF6] focus:ring-offset-0 active:bg-accent-100 active:border-brand-700 disabled:border-accent-100 disabled:text-accent-200 disabled:bg-accent-100',
        tertiary:
          'bg-transparent text-brand-700 hover:bg-accent-100 hover:text-brand-400 focus:bg-accent-100 focus:ring-4 focus:ring-[#5DAFF6] focus:ring-offset-0 active:bg-accent-100 active:focus:ring-0 disabled:text-accent-300 disabled:bg-transparent',
        link: 'relative bg-transparent text-brand-500 hover:text-brand-600 active:text-brand-800 disabled:text-accent-300 disabled:hover:no-underline before:content-[""] before:absolute before:left-0 before:-bottom-1 before:h-[2px] before:w-0 before:bg-current before:transition-all before:duration-300 hover:before:w-full',
      },
      size: {
        giant: 'px-6 py-4',
        large: 'px-5 py-3.5',
        medium: 'px-4 py-3',
        small: 'px-3 py-2',
        tiny: 'px-2 py-1.5',
        none: 'px-0 py-0',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
    },
  },
)

export type ButtonVariantProps = VariantProps<typeof buttonVariant>
