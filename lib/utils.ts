import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export const meterToMile = (distance: number): number => {
  return distance / 1609.34
}

export const meterToKilometer = (distance: number): number => {
  return distance / 1000
}
export const lbsToKg = (lbs: number) => {
  return lbs * 0.45359237
}
export const usFormater = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})
export const inFormater = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export function formatPhoneNumber(raw: string): string {
  if (!raw.startsWith('+')) return raw

  const cleaned = raw.replace(/\D/g, '') // Only digits
  if (cleaned.startsWith('91') && cleaned.length === 12) {
    // India: +91 XXXXXXXXXX => +91 XXXXX YYYYY
    const cc = '+91'
    const number = cleaned.slice(2)
    return `${cc} ${number.slice(0, 5)} ${number.slice(5)}`
  }

  if (cleaned.startsWith('1') && cleaned.length === 11) {
    // India: +91 XXXXXXXXXX => +91 XXXXX YYYYY
    // USA/Canada: +1 XXXXXXXXXX => +1 (XXX) XXX-XXXX
    const cc = '+1'
    const number = cleaned.slice(1)
    return `${cc} (${number.slice(0, 3)}) ${number.slice(3, 6)}-${number.slice(6)}`
  }

  // India: +91 XXXXXXXXXX => +91 XXXXX YYYYY
  // Fallback: just group every 3 digits
  const ccMatch = cleaned.match(/^(\d{1,3})/)
  const cc = ccMatch ? '+' + ccMatch[1] : '+'
  const rest = cleaned.slice(cc.length - 1)
  const grouped = rest.match(/.{1,3}/g) || []

  return `${cc} ${grouped.join(' ')}`
}
export function toTitleCase(text: string): string {
  return text
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

