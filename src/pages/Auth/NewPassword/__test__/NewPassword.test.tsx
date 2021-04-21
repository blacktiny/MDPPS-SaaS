import { navigate } from '@reach/router'
import {
  act,
  cleanup,
  fireEvent,
  render,
  waitForDomChange
} from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { Store } from 'redux'
import configureStore from 'redux-mock-store'
import { LOGIN } from '../../../../constants/pagesPath'
import MockAxios from '../../../../__mocks__/axios'
import NewPasswordPage from '../NewPasswordPage'

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
test('Should success if user enters a valid password and new password', async () => {
  const { getByText, getByLabelText } = render(
    <Provider store={mockStore}>
      <NewPasswordPage otp={'123456'} />
    </Provider>
  )
  fireEvent.change(getByLabelText('Your New Password'), {
    target: { value: 'password123' }
  })

  getByText('Confirm').click()

  await waitForDomChange()

  await act(async () => {
    await MockAxios.mockResponse({
      data: {}
    })
  })
  expect(MockAxios).toHaveBeenCalledTimes(1)
  expect(navigate).toHaveBeenCalledWith(LOGIN)
})

test('Should show error when user enters invalid password format', async () => {
  const { getByText, getByLabelText } = render(
    <Provider store={mockStore}>
      <NewPasswordPage otp={'123456'} />
    </Provider>
  )

  const passErrMsg =
    'Your password must contain at least 8 characters, one number and has a mix of uppercase and lowercase letters'
  const errorResp = {
    response: {
      data: {
        errors: {
          password: [passErrMsg]
        }
      }
    }
  }
  fireEvent.change(getByLabelText('Your New Password'), {
    target: { value: 'password123' }
  })

  getByText('Confirm').click()

  await waitForDomChange()

  await act(async () => {
    await MockAxios.mockError(errorResp)
  })
  expect(MockAxios).toHaveBeenCalledTimes(1)
  expect(getByText(passErrMsg)).toBeInTheDocument()
})
