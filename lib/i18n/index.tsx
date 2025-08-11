
'use client'
import ar from './ar.json'
import en from './en.json'
import { createContext, useContext, useMemo, useState } from 'react'

type Locale = 'ar' | 'en'
const I18nCtx = createContext<{t:(k:keyof typeof en)=>string, locale:Locale, setLocale:(l:Locale)=>void} | null>(null)

export function I18nProvider({children}:{children:React.ReactNode}){
  const [locale, setLocale] = useState<Locale>('ar')
  const dict = locale==='ar' ? (ar as any) : (en as any)
  const value = useMemo(()=>({ t:(k:keyof typeof en)=>dict[k] ?? String(k), locale, setLocale }),[dict, locale])
  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>
}
export function useI18n(){
  const ctx = useContext(I18nCtx)
  if(!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
