export interface Location {
  text: string
  value: string
  key: string
}

export enum LocationActionTypes {
  SET = '@@location/SET',
  RESET = '@@location/RESET'
}
