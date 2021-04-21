import React from 'react'
import {
  render,
  waitForDomChange,
  fireEvent,
  act,
  cleanup
} from '@testing-library/react'

import configureStore from 'redux-mock-store'
import { Store } from 'redux'
import { Provider } from 'react-redux'
import { navigate, HistoryLocation } from '@reach/router'
import MockAxios, { configureLocation } from '../../../../__mocks__/axios'
import ConfirmOTP from '../ConfirmOTPPage'
import { ONBOARDING, NEW_PASSWORD } from '../../../../constants/pagesPath'

let mockStore: Store
let location: HistoryLocation

jest.mock('@reach/router', () => ({
  navigate: jest.fn()
}))

beforeEach(() => {
  MockAxios.reset()
  MockAxios.mockClear()
  mockStore = configureStore()({})
  location = configureLocation({
    email: 'test@email.com',
    fromPage: 'register'
  })
})
afterEach(() => {
  cleanup()
})
test('Should success if user enters a valid otp code and get from signup page', async () => {
  const { getByText, getByLabelText } = render(
    <Provider store={mockStore}>
      <ConfirmOTP location={location} />
    </Provider>
  )

  fireEvent.change(getByLabelText('Enter OTP'), {
    target: { value: '123456' }
  })

  getByText('Continue').click()

  await waitForDomChange()

  await act(async () => {
    await MockAxios.mockResponse({
      data: {}
    })
  })

  await act(async () => {
    await MockAxios.mockResponse({
      data: {}
    })
  })
  expect(MockAxios).toHaveBeenCalledTimes(2)
  expect(navigate).toHaveBeenCalledWith(ONBOARDING)
})

test('Should success if user enters a valid otp code and not get from reset password page', async () => {
  const mockedOtp = '123456'
  location.state.fromPage = 'reset-password'
  const { getByText, getByLabelText } = render(
    <Provider store={mockStore}>
      <ConfirmOTP location={location} />
    </Provider>
  )
  fireEvent.change(getByLabelText('Enter OTP'), {
    target: { value: mockedOtp }
  })

  getByText('Continue').click()

  await waitForDomChange()

  await act(async () => {
    await MockAxios.mockResponse({
      data: {}
    })
  })

  expect(MockAxios).toHaveBeenCalledTimes(1)
  expect(navigate).toHaveBeenCalledWith(NEW_PASSWORD, {
    state: { otp: mockedOtp }
  })
})

test('Should show error message if user enters invalid otp code', async () => {
  const mockedOtp = '123456'
  const { getByText, getByLabelText } = render(
    <Provider store={mockStore}>
      <ConfirmOTP location={location} />
    </Provider>
  )
  const otpErrMsg =
    'The OTP password entered is not valid. Please check and try again.'
  const errorResp = {
    response: {
      data: {
        message: otpErrMsg
      }
    }
  }

  fireEvent.change(getByLabelText('Enter OTP'), {
    target: { value: mockedOtp }
  })

  getByText('Continue').click()

  await waitForDomChange()

  await act(async () => {
    await MockAxios.mockError(errorResp)
  })
  expect(MockAxios).toHaveBeenCalledTimes(1)
  expect(getByText(otpErrMsg)).toBeInTheDocument()
})
