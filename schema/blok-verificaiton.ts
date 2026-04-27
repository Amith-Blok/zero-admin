import z from 'zod'
export const BlokVerificationSchema = z.object({
  companyName: z.string().min(2, { message: 'Company name is required' }),
  phone: z.string().min(5, { message: 'Phone number is required' }),
})
