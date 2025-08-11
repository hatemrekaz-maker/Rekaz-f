
import Dexie, { Table } from 'dexie'

export interface BaseRecord {
  id: string
  company: 'OMAN_OIL' | 'NAMA'
  refType: 'WO' | 'WNSC'
  refNumber: string
  tags?: string[]
  createdAt: string
  updatedAt: string
}
export interface WORecord extends BaseRecord {
  company: 'OMAN_OIL'
  refType: 'WO'
  date: string
  status: 'Open'|'WaitForApproval'|'Approved'|'Completed'
  description?: string
  photosBefore?: string[]
  photosAfter?: string[]
}
export interface WNSCRecord extends BaseRecord {
  company: 'NAMA'
  refType: 'WNSC'
  startDate: string
  endDate?: string
  durationDays?: number
  notes?: string
}

export type AnyRecord = WORecord | WNSCRecord

class RekazDB extends Dexie {
  records!: Table<AnyRecord, string>
  photoAssets!: Table<{id:string, blob:Blob, createdAt:string}, string>

  constructor(){
    super('rekaz-db')
    this.version(1).stores({
      records: 'id, refNumber, company, refType, status, date, startDate, endDate, createdAt, updatedAt',
      photoAssets: 'id, createdAt'
    })
  }
}
export const db = new RekazDB()

export async function savePhotoBlob(blob: Blob){
  const id = crypto.randomUUID()
  await db.photoAssets.put({ id, blob, createdAt: new Date().toISOString() })
  return id
}
export async function getPhotoBlob(id: string){
  const rec = await db.photoAssets.get(id)
  return rec?.blob ?? null
}
