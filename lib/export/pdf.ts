
import { jsPDF } from 'jspdf'
import { db } from '../db/dexie'

export async function exportPDF(): Promise<Blob|null> {
  const items = await db.records.toArray()
  const doc = new jsPDF()
  doc.setFontSize(14)
  doc.text('Rekaz Monthly Summary', 14, 16)
  if(items.length === 0){
    doc.setFontSize(12)
    doc.text('No data available for the selected period.', 14, 28)
    return doc.output('blob')
  }
  let y = 28
  doc.setFontSize(10)
  for(const r of items.slice(0, 50)){ // keep it light
    const row = `${r.refType} ${r.refNumber} | ${r.company} | created ${r.createdAt}`
    doc.text(row, 14, y)
    y += 6
    if(y > 280){ doc.addPage(); y = 20 }
  }
  return doc.output('blob')
}
