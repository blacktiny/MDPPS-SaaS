export interface Token {
  access_token?: string
  expires_in?: number
  token_type?: string
  scope?: string
  refresh_token?: string
  time?: number
}

export enum TokenActionTypes {
  SET = '@@token/SET',
  RESET = '@@token/RESET'
}
