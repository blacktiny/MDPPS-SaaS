import React from 'react'
import { render, act, cleanup } from '@testing-library/react'
import configureStore from 'redux-mock-store'
import { Store } from 'redux'
import { Provider } from 'react-redux'
import MockAxios, { configureLocation } from '../../../../__mocks__/axios'
import ConfirmOTP from '../ConfirmOTPPage'
import { HistoryLocation } from '@reach/router'

let mockStore: Store
let location: HistoryLocation

beforeEach(() => {
  MockAxios.reset()
  MockAxios.mockClear()
  mockStore = configureStore()({})
  location = configureLocation({ email: 'test@email.com', fromPage: 'signup' })
})
afterEach(() => {
  cleanup()
})
test('Should success and show check email message if user click on resend button and get from signup page', async () => {
  const mockedEmail = 'test@email.com'
  const mockCheckMsg = 'Please check your email for the new OTP'
  const { getByText } = render(
    <Provider store={mockStore}>
      <ConfirmOTP location={location} />
    </Provider>
  )
  getByText('Resend OTP').click()
  await act(async () => {
    await MockAxios.mockResponse({
      data: { email: mockedEmail }
    })
  })
  expect(MockAxios).toHaveBeenCalledTimes(1)
  expect(getByText(mockCheckMsg)).toBeInTheDocument()
})

test('Should success and show check email message if user click on resend button and not get from reset password page', async () => {
  const mockedEmail = 'test@email.com'
  const mockCheckMsg = 'Please check your email for the new OTP'
  location.state.fromPage = 'reset-password'

  const { getByText } = render(
    <Provider store={mockStore}>
      <ConfirmOTP location={location} />
    </Provider>
  )
  getByText('Resend OTP').click()
  await act(async () => {
    await MockAxios.mockResponse({
      data: { email: mockedEmail }
    })
  })
  expect(MockAxios).toHaveBeenCalledTimes(1)
  expect(getByText(mockCheckMsg)).toBeInTheDocument()
})

test('Should show error message if resend faild', async () => {
  location.state.fromPage = 'reset-password'
  const { getByText } = render(
    <Provider store={mockStore}>
      <ConfirmOTP location={location} />
    </Provider>
  )
  const resendErrMsg = 'Email is incorrect'
  const errorResp = {
    response: {
      data: {
        errors: {
          email: [resendErrMsg]
        }
      }
    }
  }
  getByText('Resend OTP').click()
  await act(async () => {
    await MockAxios.mockError(errorResp)
  })
  expect(MockAxios).toHaveBeenCalledTimes(1)
  expect(getByText(resendErrMsg)).toBeInTheDocument()
})
