
import { db } from '../db/dexie'

export async function exportCSV(): Promise<Blob> {
  const items = await db.records.toArray()
  const header = [
    'id','company','refType','refNumber','date','status','description','startDate','endDate','durationDays','notes','tags','createdAt','updatedAt'
  ]
  const rows = [header]
  for(const r of items){
    const line = [
      r.id, r.company, r.refType, r.refNumber,
      (r as any).date || '',
      (r as any).status || '',
      (r as any).description || '',
      (r as any).startDate || '',
      (r as any).endDate || '',
      (r as any).durationDays?.toString() || '',
      (r as any).notes || '',
      (r.tags||[]).join('|'),
      r.createdAt, r.updatedAt,
    ]
    rows.push(line.map(v=>String(v).replaceAll('\n',' ').replaceAll(',',';')))
  }
  const csv = rows.map(r=>r.join(',')).join('\n')
  return new Blob([csv], {type:'text/csv;charset=utf-8;'})
}
