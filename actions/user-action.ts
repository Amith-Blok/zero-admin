'use server'
import { updateUserCompanyNameAndPhone } from '@/data/user'
import { revalidatePath } from 'next/cache'

export async function blokVerificationAction(
  userId: string,
  companyName: string,
  phone: string
) {
  try {
    console.log({ userId, companyName, phone })
    const response = await updateUserCompanyNameAndPhone({
      id: userId,
      companyName,
      phone,
      isBlokVerified: true,
    })
    if (!response) {
      throw new Error('Failed to update user company name and phone')
    }
    return { success: true }
  } catch (error) {
    console.log(error)
    return { error: error }
  }
}
export async function updateUserProfileAction(params: {
  id: string
  name: string
  companyName: string
  phone: string
}) {
  try {
    console.log({ params })
    const response = await updateUserCompanyNameAndPhone(params)
    if (!response) {
      return { error: 'Failed to update user company name and phone' }
    }
    console.log({ response })
    revalidatePath('/settings/profile')
    return { success: true }
  } catch (error) {
    console.log(error)
    return { error: error }
  }
}
