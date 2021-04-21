import { Industry } from './Industry'
import { Logo } from './Logo'
import { Address } from './Address'
import {
  TaxIdentifierSelected,
  BusinessEntityType,
  Status,
  Language,
  Currency
} from '../../constants/Enums'

export interface Company {
  id: number
  microsite_name: string
  tax_identifier_selected: TaxIdentifierSelected
  use_legal_name: Boolean
  roles: number
  business_name: string
  legal_name: string
  ssn: string
  ein: string
  business_entity_type: BusinessEntityType
  website: string
  description: string
  industry: Industry
  logo: Logo
  status: Status
  timezone: string
  language: Language
  currency: Currency
  business_licence: Logo
  business_addresses: Address[] | Address
  main_address: Address
  locations: Address[] | Address
  facebook: string
  twitter: string
  instagram: string
  pinterest: string
  github: string
  linkedin: string
  medium: string
  is_parent_brand: string
  product_types: number
  [key: string]: string | number | boolean | string[] | object
}
