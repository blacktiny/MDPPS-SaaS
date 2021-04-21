import React from 'react'
import { render, act, cleanup } from '@testing-library/react'
import configureStore from 'redux-mock-store'
import { Store } from 'redux'
import { Provider } from 'react-redux'
import MockAxios from '../../../../__mocks__/axios'
import { navigate } from '@reach/router'
import CustomersOnboardingComplete from '../complete'

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
  test('Should redirect to correct path if user click on Go To Dashboard button', async () => {
    const { getByText } = render(
      <Provider store={mockStore}>
        <CustomersOnboardingComplete />
      </Provider>
    )
    getByText('Go To Dashboard').click()

    await act(async () => {
      await MockAxios.mockResponse({
        data: {}
      })
    })
    expect(MockAxios).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledWith('../../home')
  })
})
