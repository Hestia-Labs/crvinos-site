import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge class names with Tailwind's utility classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
} 