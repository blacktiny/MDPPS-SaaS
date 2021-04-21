import { Revenue } from './revenue'
import { Country } from './country'
import { Timezone } from './timezone'
import { Currency } from './currency'
import { Language } from './language'
import { Location } from './location'

export interface OptionsState {
  revenue: Revenue[]
  country: Country[]
  timezone: Timezone[]
  currency: Currency[]
  language: Language[]
  location: Location[]
}
