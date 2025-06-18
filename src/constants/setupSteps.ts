export const SETUP_STEPS = {
  GROUP: 'group',
  CURRENCY: 'currency',
  CATEGORIES: 'categories',
  COMPLETE: 'complete',
} as const

export type SetupStep = (typeof SETUP_STEPS)[keyof typeof SETUP_STEPS]
