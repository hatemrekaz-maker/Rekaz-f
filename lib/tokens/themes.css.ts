
export const themeByCompany = {
  OMAN_OIL: { primary: 'var(--accent-blue)', ripple: 'oil' },
  NAMA: { primary: 'var(--accent-red)', ripple: 'water' },
} as const
export type CompanyKey = keyof typeof themeByCompany
