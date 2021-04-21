import { CompanyTypes } from '../../constants/Enums'

export interface Onboarding {
  company: string
  user: string
  type_company: CompanyTypes
  number_employees: number
  annual_revenue: string
  number_suppliers: number
  number_distributors: number
  number_brands_portfolio: number
  number_products: number
  number_dealers: number
  [key: string]: string | number | boolean
}
