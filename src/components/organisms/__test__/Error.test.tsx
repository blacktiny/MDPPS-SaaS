import { cleanup, render } from '@testing-library/react'
import { Provider } from 'react-redux'
import ErrorPage from '../Error'
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
test('Check 500 page loaded successfully', async () => {
  const { getByText } = render(
    <Provider store={mockStore}>
      <ErrorPage />
    </Provider>
  )
  expect(getByText('Go to Home Page')).toBeInTheDocument()
})
