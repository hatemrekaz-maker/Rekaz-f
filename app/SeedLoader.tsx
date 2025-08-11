
'use client'
import { useEffect } from 'react'
import { db } from '@/lib/db/dexie'

export default function SeedLoader(){
  useEffect(()=>{
    const run = async ()=>{
      const done = localStorage.getItem('seed-imported')
      if(done) return
      try{
        const res = await fetch('/data/wo-seed.json', { cache: 'no-store' })
        if(!res.ok) return
        const items = await res.json()
        const toPut = items.map((r:any)=> ({
          ...r,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }))
        // Only WO & status fields kept; others stay as in schema
        await db.records.bulkPut(toPut)
        localStorage.setItem('seed-imported', '1')
        console.log('WO seed imported:', toPut.length)
      }catch(e){ console.warn('Seed import failed', e) }
    }
    run()
  },[])
  return null
}
