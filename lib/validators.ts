
import { z } from 'zod'

export const woSchema = z.object({
  id: z.string().uuid(),
  company: z.literal('OMAN_OIL'),
  refType: z.literal('WO'),
  refNumber: z.string().min(1),
  date: z.string().min(1), // ISO string selected by user; no auto-fill
  status: z.enum(['Open','WaitForApproval','Approved','Completed']),
  description: z.string().optional(),
  photosBefore: z.array(z.string()).default([]),
  photosAfter: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  createdAt: z.string().min(1),
  updatedAt: z.string().min(1),
})

export const wnscSchema = z.object({
  id: z.string().uuid(),
  company: z.literal('NAMA'),
  refType: z.literal('WNSC'),
  refNumber: z.string().min(1),
  startDate: z.string().min(1),
  endDate: z.string().optional(),
  durationDays: z.number().optional(),
  notes: z.string().optional(),
  tags: z.array(z.string()).default([]),
  createdAt: z.string().min(1),
  updatedAt: z.string().min(1),
}).refine((v)=>!v.endDate || (new Date(v.endDate).getTime() >= new Date(v.startDate).getTime()),{
  message:'endDate must be after or equal to startDate'
})
