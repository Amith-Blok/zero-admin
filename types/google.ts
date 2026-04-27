export type Prediction = {
  description: string
  matched_substrings: string[]
  place_id: string
  reference: string
  structured_formatting: object
  terms: string[]
  types: string[]
}
export type GoogleLocationResponse = {
  predictions: Prediction[]
}

//Type for getGoogleLocationByPlaceId
type Geometry = {
  location: { lng: number; lat: number }
  viewport: object
}
type Result = {
  address_components: object[]
  adr_address: string
  formatted_address: string
  geometry: Geometry
  icon: string
  icon_background_color: string
  icon_mask_base_uri: string
  name: string
  photos: object[]
  place_id: string
  reference: string
  types: string[]
  url: string
  utc_offset: number
  vicinity: string
}

export type GeoLocationResponse = {
  html_attributions: any[] // Replace 'any' with the actual type
  result: Result
  status: string
}

export type Coordinates = {
  latitude: number
  longitude: number
}

export type DistanceInfo = {
  distance: {
    text: string
    value: number
  }
  duration: {
    text: string
    value: number
  }
}

export type PredictionWithZipcode = Prediction & {
  zipcode?: string
}
