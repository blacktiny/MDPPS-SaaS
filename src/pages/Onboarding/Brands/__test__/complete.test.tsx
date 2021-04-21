import React from 'react'
import { render, act, cleanup } from '@testing-library/react'
import configureStore from 'redux-mock-store'
import { Store } from 'redux'
import { Provider } from 'react-redux'
import MockAxios from '../../../../__mocks__/axios'
import { navigate } from '@reach/router'
import BrandsOnboardingCompletePage from '../complete'

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
        type_company: 'parent_brand'
      }
    }
  })
})
afterEach(() => {
  cleanup()
})

describe.skip('complete ', () => {
  test('Should redirect to correct path if brand user click on Go to Business Directory button', async () => {
    const { getByText } = render(
      <Provider store={mockStore}>
        <BrandsOnboardingCompletePage />
      </Provider>
    )
    await act(async () => {
      await MockAxios.mockResponse({
        data: {
          email: 'test@email.com'
        }
      })
    })
    expect(MockAxios).toHaveBeenCalledTimes(1)

    getByText('Go to Business Directory').click()

    expect(navigate).toHaveBeenCalledWith('../../home')
  })
})
