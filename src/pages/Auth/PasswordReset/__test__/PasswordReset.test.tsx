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
import { navigate } from '@reach/router'
import MockAxios from '../../../../__mocks__/axios'
import { OTP, LOGIN, SIGNUP } from '../../../../constants/pagesPath'
import PasswordResetPage from '../PasswordResetPage'

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
test('Should success if user enters a valid email or mobile phone number', async () => {
  const mockedEmail = 'test@email.com'
  const { getByText, getByPlaceholderText, getByLabelText } = render(
    <Provider store={mockStore}>
      <PasswordResetPage />
    </Provider>
  )
  getByLabelText('via Email').click()
  fireEvent.change(getByPlaceholderText('Enter your email address'), {
    target: { value: mockedEmail }
  })

  getByText('Send OTP').click()
  await waitForDomChange()

  await act(async () => {
    await MockAxios.mockResponse({
      data: {}
    })
  })
  expect(MockAxios).toHaveBeenCalledTimes(1)
  expect(navigate).toHaveBeenCalledWith(OTP, {
    state: { fromPage: 'reset-password', email: mockedEmail }
  })
})

test('Should show error message if user enters an invalid email or mobile phone number', async () => {
  const mockedEmail = 'test@email.com'
  const { getByText, getByPlaceholderText, getByLabelText } = render(
    <Provider store={mockStore}>
      <PasswordResetPage />
    </Provider>
  )
  const emailErrMsg =
    "We couldn't find an account associate with that email. Please enter another email account."

  const errorResp = {
    response: {
      data: {
        errors: {
          email: [emailErrMsg]
        }
      }
    }
  }
  getByLabelText('via Email').click()
  fireEvent.change(getByPlaceholderText('Enter your email address'), {
    target: { value: mockedEmail }
  })

  getByText('Send OTP').click()
  await waitForDomChange()

  await act(async () => {
    await MockAxios.mockError(errorResp)
  })
  expect(MockAxios).toHaveBeenCalledTimes(1)
  expect(getByText(emailErrMsg)).toBeInTheDocument()
})

test('Should redirect to correct path if user click on Back to sign in button', async () => {
  const { getByText } = render(
    <Provider store={mockStore}>
      <PasswordResetPage />
    </Provider>
  )
  act(() => {
    getByText('Back to sign in').click()
  })
  expect(navigate).toHaveBeenCalledWith(LOGIN)
})

test('Should redirect to correct path if user click on Sign up button', async () => {
  const { getByText } = render(
    <Provider store={mockStore}>
      <PasswordResetPage />
    </Provider>
  )
  act(() => {
    getByText('Sign up').click()
  })
  expect(navigate).toHaveBeenCalledWith(SIGNUP)
})
