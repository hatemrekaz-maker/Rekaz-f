
'use client'
import { useI18n, I18nProvider } from '@/lib/i18n'
function SettingsInner(){
  const {locale, setLocale} = useI18n()
  return (
    <div className="container">
      <h1>الإعدادات</h1>
      <div className="card" style={{display:'grid', gap:'.5rem'}}>
        <label>اللغة</label>
        <select value={locale} onChange={e=>setLocale(e.target.value as any)}>
          <option value="ar">العربية</option>
          <option value="en">English</option>
        </select>
      </div>
    </div>
  )
}
export default function SettingsPage(){
  return <I18nProvider><SettingsInner/></I18nProvider>
}
