import { act, cleanup, render } from '@testing-library/react'
import { Provider } from 'react-redux'
import React from 'react'
import { Store } from 'redux'
import UserMenu from '../UserMenu'
import MockAxios from '../../../../__mocks__/axios'
import configureStore from 'redux-mock-store'
import { AccountTypeKey } from '../../../../constants/common'

let mockStore: Store

jest.mock('@reach/router', () => ({
  navigate: jest.fn()
}))
jest.mock('axios')

beforeEach(() => {
  MockAxios.reset()
  MockAxios.mockClear()
  mockStore = configureStore()({
    auth: {
      user: {
        first_name: 'test user',
        active_company: { status: 'pending_review' },
        account_type: AccountTypeKey.BRAND
      }
    }
  })
})
afterEach(() => {
  cleanup()
})
test('should open dropdown if click avatar', async () => {
  const { getByRole, getByTestId } = render(
    <Provider store={mockStore}>
      <UserMenu />
    </Provider>
  )

  act(() => {
    getByTestId('userMenu').click()
  })
  const menu = getByRole('menu')
  expect(menu.childElementCount).toBeGreaterThan(1)
})
