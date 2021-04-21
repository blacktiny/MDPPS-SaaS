export interface Language {
  value: string
  text: string
  key: string
}

export enum LanguageActionTypes {
  SET = '@@language/SET',
  RESET = '@@language/RESET'
}
