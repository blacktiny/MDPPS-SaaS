import React from 'react'
import { render, act, cleanup } from '@testing-library/react'
import configureStore from 'redux-mock-store'
import { Store } from 'redux'
import { Provider } from 'react-redux'
import MockAxios from '../../../../__mocks__/axios'
import { navigate } from '@reach/router'
import EmployeesOnboardingComplete from '../complete'

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

describe.skip('complete', () => {
  test('Should redirect to correct path if employee click on Go to Brand Marketplace', async () => {
    const { getByText } = render(
      <Provider store={mockStore}>
        <EmployeesOnboardingComplete />
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
