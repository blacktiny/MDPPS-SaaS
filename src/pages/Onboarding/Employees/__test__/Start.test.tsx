import React from 'react'
import { render, act, cleanup } from '@testing-library/react'
import configureStore from 'redux-mock-store'
import { Store } from 'redux'
import { Provider } from 'react-redux'
import MockAxios from '../../../../__mocks__/axios'
import { navigate } from '@reach/router'
import EmployeesOnboardingStart from '../Start'

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
        first_name: 'test user'
      }
    }
  })
})
afterEach(() => {
  cleanup()
})

describe.skip('start', () => {
  test('Check if employee name displayed successfully', async () => {
    const { getByText } = render(
      <Provider store={mockStore}>
        <EmployeesOnboardingStart />
      </Provider>
    )
    const state = mockStore.getState()?.auth
    expect(getByText(`Welcome, ${state?.user?.first_name}`)).toBeInTheDocument()
  })

  test('Should redirect to correct path if employee click on Get Started button', async () => {
    const { getByText } = render(
      <Provider store={mockStore}>
        <EmployeesOnboardingStart />
      </Provider>
    )
    act(() => {
      getByText('Get Started').click()
    })
    expect(navigate).toHaveBeenCalledWith('employee/general-questions')
  })
})
