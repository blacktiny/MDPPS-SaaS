import { combineReducers } from 'redux'
import { OptionsState } from './types'
import { revenueReducer } from './revenue'
import { countryReducer } from './country'
import { timezoneReducer } from './timezone'
import { currencyReducer } from './currency'
import { languageReducer } from './language'
import { locationReducer } from './location'

const reducer = combineReducers<OptionsState>({
  revenue: revenueReducer,
  country: countryReducer,
  timezone: timezoneReducer,
  currency: currencyReducer,
  language: languageReducer,
  location: locationReducer
})

export default reducer
