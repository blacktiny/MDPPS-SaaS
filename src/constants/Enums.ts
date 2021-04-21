export enum AccountType {
  brand = 'brand',
  distributor = 'distributor',
  dealer = 'dealer',
  customer = 'customer',
  employee = 'employee'
}

export enum TaxIdentifierSelected {
  ssn,
  ein
}

export enum BusinessEntityType {
  'proprietor',
  'llc',
  'sb-corp',
  'corp',
  'non-profit',
  'limited-liability',
  'na'
}

export enum Status {
  active,
  pending_review,
  deactive,
  denied
}

export enum Language {
  en,
  es
}

export enum Currency {
  USD,
  CAD,
  EUR,
  MXN
}

export enum OperationType {
  online,
  storefront,
  storefront_installer,
  storefront_online,
  storefront_online_installer,
  ebay,
  amazon,
  racer,
  na
}

export enum CompanyTypes {
  parent_brand,
  holding_company
}
