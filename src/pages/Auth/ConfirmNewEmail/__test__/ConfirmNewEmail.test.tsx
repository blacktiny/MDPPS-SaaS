import React from 'react'
import { render, cleanup } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { Store } from 'redux'
import { navigate } from '@reach/router'
import MockAxios from '../../../../__mocks__/axios'
import { LOGIN } from '../../../../constants/pagesPath'
import ConfirmNewEmailPage from '../ConfirmNewEmailPage'

let mockStore: Store

jest.mock('@reach/router', () => ({
  navigate: jest.fn()
}))

beforeEach(() => {
  MockAxios.reset()
  MockAxios.mockClear()
  mockStore = configureStore()({
    auth: {
      user: {
        email: 'test@email.com'
      }
    }
  })
})
afterEach(() => {
  cleanup()
})

test('Should redirect to correct path if user click on Browse Now button', async () => {
  const { getByText } = render(
    <Provider store={mockStore}>
      <ConfirmNewEmailPage />
    </Provider>
  )
  getByText('Back to sign in').click()
  expect(navigate).toHaveBeenCalledWith(LOGIN)
})
