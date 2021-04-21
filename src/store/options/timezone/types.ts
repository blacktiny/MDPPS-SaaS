export interface Timezone {
  value: string
  text: string
  key: string
}

export enum TimezoneActionTypes {
  SET = '@@timezone/SET',
  RESET = '@@timezone/RESET'
}
