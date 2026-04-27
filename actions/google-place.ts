'use server'

import { GeoLocationResponse, GoogleLocationResponse } from '@/types/google'

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY ?? ''

export const googleAutoByInput = async (input: string, country: string) => {
  try {
    const respone = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&types=geocode&components=country:${country}&key=${GOOGLE_API_KEY}`
    )
    const response = (await respone.json()) as GoogleLocationResponse
    const data = response.predictions
    return data
  } catch (error) {
    console.log(error)
    return null
  }
}
export const getGoogleLocationByPlaceId = async (placeid: string) => {
  try {
    if (!placeid) return
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeid}&key=${GOOGLE_API_KEY}`
    )
    const data = (await response.json()) as GeoLocationResponse
    if (!data.result?.geometry.location) throw new Error('Location not found')
    return data.result.geometry.location
  } catch (error) {
    console.error('Error fetching geolocation:', (error as Error).message)
    throw null
  }
}
