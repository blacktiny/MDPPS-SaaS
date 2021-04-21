import { cleanup, render } from '@testing-library/react'
import { Provider } from 'react-redux'
import Error404 from '../Error404'
import React from 'react'
import { Store } from 'redux'
import MockAxios from '../../../__mocks__/axios'
import configureStore from 'redux-mock-store'

let mockStore: Store

jest.mock('@reach/router', () => ({
  navigate: jest.fn()
}))

beforeEach(() => {
  MockAxios.reset()
  MockAxios.mockClear()
  mockStore = configureStore()({})
})
afterEach(() => {
  cleanup()
})
test('Check 404 page loaded successfully', async () => {
  const { getByText } = render(
    <Provider store={mockStore}>
      <Error404 />
    </Provider>
  )
  expect(getByText('Take Me Back')).toBeInTheDocument()
})
