import mockAxios from 'jest-mock-axios'
import { HistoryLocation } from '@reach/router'
export default mockAxios

export const configureLocation = (state: object): HistoryLocation => {
  return {
    state: state
  } as HistoryLocation
}
