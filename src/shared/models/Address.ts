import { OperationType } from '../../constants/Enums'

export interface Address {
  id: number
  is_default: boolean
  is_active: boolean
  title: string
  address1: string
  address2: string
  city: string
  state: string
  phone_number: string
  zip_code: string
  specialties: []
  country: string
  working_hours: []
  interior: []
  exterior: []
  specialty: []
  signage: []
  inventory: []
  annual_sales_volume: number
  operation_type: OperationType
  number_of_employees: number
  [key: string]:
    | string
    | number
    | boolean
    | string[]
    | { [key: string]: number | string }
}
