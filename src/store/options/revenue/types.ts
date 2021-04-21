export interface Revenue {
  text: string
  value: string
  key: string
}

export enum RevenueActionTypes {
  SET = '@@revenue/SET',
  RESET = '@@revenue/RESET'
}
