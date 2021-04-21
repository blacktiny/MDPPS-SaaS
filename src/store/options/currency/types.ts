export interface Currency {
  value: string
  text: string
  key: string
}

export enum CurrencyActionTypes {
  SET = '@@currency/SET',
  RESET = '@@currency/RESET'
}
