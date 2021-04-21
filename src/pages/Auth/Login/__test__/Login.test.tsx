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
import mockAxios from 'jest-mock-axios'
import { navigate } from '@reach/router'
import LoginPage from '../LoginPage'
import {
  ONBOARDING,
  ACCOUNT_UNBLOCK,
  OTP
} from '../../../../constants/pagesPath'

let mockStore: Store

jest.mock('@reach/router', () => ({
  navigate: jest.fn()
}))
jest.mock('axios')

beforeEach(() => {
  // setup a DOM element as a render target
  mockAxios.reset()
  mockAxios.mockClear()
  mockStore = configureStore()({})
})
afterEach(() => {
  cleanup()
})

it('should have input for email and password', () => {
  //Email and password input field should be present
  const { getByLabelText } = render(
    <Provider store={mockStore}>
      <LoginPage />
    </Provider>
  )
  expect(getByLabelText('E-mail')).toBeInTheDocument()
  expect(getByLabelText('Password')).toBeInTheDocument()
})
test('Should success if user enters a valid email and password', async () => {
  const { getByText, getByLabelText } = render(
    <Provider store={mockStore}>
      <LoginPage />
    </Provider>
  )
  fireEvent.change(getByLabelText('E-mail'), {
    target: { value: 'test@cmailing.com' }
  })
  fireEvent.change(getByLabelText('Password'), {
    target: { value: 'mdpps123' }
  })

  getByText('Sign in').click()

  await waitForDomChange()

  await act(async () => {
    await mockAxios.mockResponse({
      data: {
        access_token: 'rZ5vgQzbI1FV6oPbuO6UL0EjIszJbv',
        expires_in: 604800,
        token_type: 'Bearer',
        scope:
          'administer_warranty apply_warranty administer_map administer_member administer_pricing_level administer_policy administer_agreement_document',
        refresh_token: '34eseTQODoM45IwhGqpWqihKzUHjeO'
      }
    })
  })

  await act(async () => {
    await mockAxios.mockResponse({
      data: {}
    })
  })

  expect(mockAxios).toHaveBeenCalledTimes(2)
  expect(navigate).toHaveBeenCalledWith(ONBOARDING)
})

test('Should fail if invalid email or password entered', async () => {
  const { getByText, getByLabelText } = render(
    <Provider store={mockStore}>
      <LoginPage />
    </Provider>
  )
  const errorResp = {
    code: 400,
    status: 400,
    response: { data: { message: 'invalid data' } }
  }

  fireEvent.change(getByLabelText('E-mail'), {
    target: { value: 'test@xyz.com' }
  })

  fireEvent.change(getByLabelText('Password'), {
    target: { value: 'mdpps_test' }
  })

  getByText('Sign in').click()

  await waitForDomChange()

  await act(async () => {
    mockAxios.mockError(errorResp)
  })

  expect(mockAxios).toHaveBeenCalledTimes(1)

  expect(getByText(errorResp?.response?.data?.message)).toBeInTheDocument()
})

test('Should redirect to correct path if account is blocked', async () => {
  const { getByText, getByLabelText } = render(
    <Provider store={mockStore}>
      <LoginPage />
    </Provider>
  )
  const errorResp = {
    code: 400,
    status: 400,
    response: {
      data: { message: 'this account is blocked', error: 'blocked_account' }
    }
  }

  fireEvent.change(getByLabelText('E-mail'), {
    target: { value: 'test@xyz.com' }
  })

  fireEvent.change(getByLabelText('Password'), {
    target: { value: 'mdpps_test' }
  })

  getByText('Sign in').click()

  await waitForDomChange()

  await act(async () => {
    mockAxios.mockError(errorResp)
  })

  expect(mockAxios).toHaveBeenCalledTimes(1)
  expect(navigate).toHaveBeenCalledWith(ACCOUNT_UNBLOCK)
})

test('Should redirect to correct path if email is not confirmed', async () => {
  const email = 'test@xyz.com'
  const { getByText, getByLabelText } = render(
    <Provider store={mockStore}>
      <LoginPage />
    </Provider>
  )
  const errorResp = {
    code: 400,
    status: 400,
    response: {
      data: {
        message: 'this account is not confirmed',
        error: 'email_not_confirmed'
      }
    }
  }

  fireEvent.change(getByLabelText('E-mail'), {
    target: { value: email }
  })

  fireEvent.change(getByLabelText('Password'), {
    target: { value: 'mdpps_test' }
  })

  getByText('Sign in').click()

  await waitForDomChange()

  await act(async () => {
    mockAxios.mockError(errorResp)
  })

  expect(mockAxios).toHaveBeenCalledTimes(1)
  expect(navigate).toHaveBeenCalledWith(OTP, {
    state: { email, fromPage: 'register' }
  })
})
