type selectInput = { name: string; url: string; code2: string; id: number }[]
type selectInput2 = { name: string; id: string }[]
type addressInput = {
  address1: string
  address2: string
  annual_sales_volume: number
  city: string
  country: string
  coverage_radius: number
  id: number
  is_active: boolean
  is_default: boolean
  number_of_employees: number
  operation_type: string
  phone_number: string
  specialties: []
  state: string
  title: string
  representation: string
  url: string
  working_hours: []
  zip_code: string
}[]
type choicesInput = { name: string; id: string }[]
type companiesInput = { business_name: string; id: number }[]

export const convertJsonForSelect = (data: selectInput) => data?.map(({ name, url }) => ({ label: name, value: url }))

export const convertJsonForChoices = (data: choicesInput) =>
  data?.map(({ name, id }) => ({ text: name, value: id, key: name }))

export const convertJsonForCompanies = (data: companiesInput) =>
  data?.map(({ business_name, id }) => ({
    label: business_name.toString(),
    value: id.toString()
  }))

export const convertJsonForCompaniesLabel = (data: companiesInput) =>
  data?.map(({ business_name }) => business_name.toString())

export const convertJsonForCompaniesSelect = (data: companiesInput) =>
  data?.map(({ business_name, id }) => ({
    text: business_name,
    value: id.toString(),
    key: id.toString()
  }))

export const convertJsonForSearchableSelect = (data: selectInput) =>
  data?.map(({ name, url }) => ({
    text: name,
    value: url,
    key: url
  }))

export const convertJsonForSearchableSelectWithoutUrl = (data: selectInput2) =>
  data?.map(({ name, id }) => ({
    text: name,
    value: id,
    key: id
  }))

export const convertJsonForSearchableLocationSelect = (data: addressInput) =>
  data?.map(({ representation, state, url, zip_code }) => ({
    text: `${representation.split('-').join('')}, ${state}, ${zip_code}`,
    value: url,
    key: url
  }))
