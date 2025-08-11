
import type { AnyRecord } from './db/dexie'

const MUSCAT_TZ = 'Asia/Muscat'

function toDateOnlyISO(d: Date){ // no implicit "today", always from input
  return new Date(d.toLocaleString('en-US', { timeZone: MUSCAT_TZ })).toISOString().slice(0,10)
}

export function bucketCompletedOverTime(records: AnyRecord[]) {
  const groups = new Map<string, number>()
  for(const r of records){
    const isCompleted = (r.refType==='WO' && (r as any).status==='Completed') ||
                        (r.refType==='WNSC' && (r as any).endDate)
    if(!isCompleted) continue
    const raw = r.refType==='WO' ? (r as any).date : (r as any).endDate
    if(!raw) continue
    const key = toDateOnlyISO(new Date(raw))
    groups.set(key, (groups.get(key)||0)+1)
  }
  return Array.from(groups.entries()).sort((a,b)=>a[0].localeCompare(b[0]))
    .map(([date,count])=>({ date, count }))
}

export function woStatusBreakdown(records: AnyRecord[]) {
  const statuses = ['Open','WaitForApproval','Approved','Completed']
  const counts: Record<string, number> = Object.fromEntries(statuses.map(s=>[s,0]))
  for(const r of records){
    if(r.refType!=='WO') continue
    const s = (r as any).status
    if (s && counts[s] !== undefined) counts[s]++
  }
  return statuses.map(s=>({ status:s, count: counts[s] }))
}

export function wnscDurationHistogram(records: AnyRecord[]) {
  const durations: number[] = []
  for(const r of records){
    if(r.refType!=='WNSC') continue
    const d = (r as any).durationDays
    if(typeof d === 'number') durations.push(d)
  }
  if(durations.length===0) return []
  const max = Math.max(...durations)
  const binSize = Math.max(1, Math.ceil(max/10))
  const bins: Record<string, number> = {}
  for(const d of durations){
    const bucket = `${Math.floor(d/binSize)*binSize}-${Math.floor(d/binSize)*binSize+binSize-1}`
    bins[bucket] = (bins[bucket]||0)+1
  }
  return Object.entries(bins).map(([range,count])=>({ range, count }))
}
