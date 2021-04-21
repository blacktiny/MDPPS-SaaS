import { cleanup, render } from '@testing-library/react'
import { Provider } from 'react-redux'
import React from 'react'
import { Store } from 'redux'
import MockAxios from '../../../__mocks__/axios'
import configureStore from 'redux-mock-store'
import HomePage from '../HomePage'
import { AccountTypeKey } from '../../../constants/common'
let mockStore: Store
let mockStoreDisablePopup: Store

jest.mock('@reach/router', () => ({
  navigate: jest.fn()
}))

beforeEach(() => {
  MockAxios.reset()
  MockAxios.mockClear()
  mockStore = configureStore()({
    auth: {
      user: {
        is_frozen: true,
        account_type: AccountTypeKey.BRAND,
        first_name: 'test user',
        active_company: { status: 'active' },
        is_disabled: false
      }
    }
  })
  mockStoreDisablePopup = configureStore()({
    auth: {
      user: {
        is_frozen: true,
        account_type: AccountTypeKey.BRAND,
        first_name: 'test user',
        active_company: { status: 'active' },
        is_disabled: true
      }
    }
  })
})

afterEach(() => {
  cleanup()
})

test('Check account frozen popup', async () => {
  const text = 'You account and profile is frozen'
  const { getByText } = render(
    <Provider store={mockStore}>
      <HomePage />
    </Provider>
  )
  expect(getByText(text)).toBeInTheDocument()
})

test('Check account disabled popup', async () => {
  const text = 'You account and profile is frozen'
  const { getByText } = render(
    <Provider store={mockStoreDisablePopup}>
      <HomePage />
    </Provider>
  )
  expect(getByText(text)).toBeInTheDocument()
})
