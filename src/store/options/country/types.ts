export interface Country {
  text: string
  value: string
  key: string
}

export enum CountryActionTypes {
  SET = '@@country/SET',
  RESET = '@@country/RESET'
}
