import { ClassValue } from 'class-variance-authority/types'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

export const mergeClasses = (
  ...inputs: (string | undefined | null | false | ClassValue)[]
): string => twMerge(clsx(inputs.filter(Boolean)))
