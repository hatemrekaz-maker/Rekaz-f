
'use client'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@/lib/db/dexie'
import StatusChip from './StatusChip'

export default function RecordList(){
  const items = useLiveQuery(()=>db.records.orderBy('createdAt').reverse().toArray(), []) || []
  if(items.length===0) return <div className="card muted">لا توجد بيانات حتى الآن</div>
  return (
    <div className="card" style={{display:'grid', gap:'.5rem'}}>
      {items.map(r=>(
        <div key={r.id} style={{display:'flex', gap:'.5rem', alignItems:'center', justifyContent:'space-between', padding:'.5rem 0', borderBottom:'1px solid rgba(0,0,0,0.06)'}}>
          <div style={{display:'flex', flexDirection:'column'}}>
            <strong>{r.refType} #{r.refNumber}</strong>
            <small className="muted">{r.company}</small>
          </div>
          <div>
            {r.refType==='WO' && <StatusChip label={(r as any).status}/>}
            {r.refType==='WNSC' && <StatusChip label={(r as any).endDate ? 'Completed' : 'In Progress'}/>}
          </div>
        </div>
      ))}
    </div>
  )
}
