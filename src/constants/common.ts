export const AccountTypeKey = {
  BRAND: 'brand',
  DISTRIBUTOR: 'distributor',
  DEALER: 'dealer',
  CUSTOMER: 'customer',
  EMPLOYEE: 'employee',
  MANUFACTURER: 'manufacturer'
}
export const Status = {
  PENDING_REVIEW: 'pending_review'
}

export const AccountTypeOptions = [
  { text: 'Brand', value: 'brand', key: AccountTypeKey.BRAND },
  {
    text: 'Manufacturer',
    value: 'manufacturer',
    key: AccountTypeKey.MANUFACTURER
  },
  {
    text: 'Distributor',
    value: 'distributor',
    key: AccountTypeKey.DISTRIBUTOR
  },
  { text: 'Dealer', value: 'dealer', key: AccountTypeKey.DEALER },
  { text: 'Employee', value: 'employee', key: AccountTypeKey.EMPLOYEE },
  { text: 'Customer', value: 'customer', key: AccountTypeKey.CUSTOMER }
]

export const RELATIONSHIP = {
  PARENT: 'parent',
  CHILD: 'child',
  DISTRIBUTOR: AccountTypeKey.DISTRIBUTOR,
  DEALER: AccountTypeKey.DEALER,
  CUSTOMER: AccountTypeKey.CUSTOMER,
  EMPLOYEE: AccountTypeKey.EMPLOYEE
}

export class RegexPatterns {
  public static readonly NUMBERS = /^(\(?\+?[0-9]*\)?)?[0-9_\- ()]*$/
  public static readonly EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/
}

export class KeyCodes {
  public static readonly ENTER = 13
}

export const ACCOUNT_TIMEOUT = {
  warningTime: 1000 * 60 * 29,
  signoutTime: 1000 * 60 * 30,
  renewTime: 1000 * 60 * 15
}
