import React from 'react'
import { render, act, cleanup, fireEvent, waitForDomChange } from '@testing-library/react'
import configureStore from 'redux-mock-store'
import { Store } from 'redux'
import { Provider } from 'react-redux'
import MockAxios from '../../../../__mocks__/axios'
import { navigate } from '@reach/router'
import { selectValue } from '../../../../utils/test/formUtils'
import { OTP } from '../../../../constants/pagesPath'
import SignUpPage from '../SignUpPage'

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

jest.mock('@reach/router', () => ({
  navigate: jest.fn()
}))

const companyData = {
  data: [
    { business_name: 'MDPPS', id: 1 },
    { business_name: 'string', id: 50 }
  ]
}

describe.skip('sign up', () => {
  test('Should show autosuggest company name if the selected account type is "brand/distributor/dealer"', async () => {
    const email = 'test@cmailing.com'
    const userRegisteredRes = {
      data: {
        user: { email, first_name: 'a', last_name: 'a' }
      }
    }

    const unclaimedDataRes = {
      data: [
        { business_name: '3:10 Diesel + Auto Works', id: 17 },
        { business_name: '321 Auto', id: 18 }
      ]
    }

    const { getByLabelText, getByTestId, getByText, getByPlaceholderText } = render(
      <Provider store={mockStore}>
        <SignUpPage />
      </Provider>
    )
    await act(async () => {
      await MockAxios.mockResponse(companyData)
    })

    fireEvent.change(getByLabelText('First Name'), {
      target: { value: 'fName' }
    })
    fireEvent.change(getByLabelText('Last Name'), {
      target: { value: 'lName' }
    })

    fireEvent.change(getByLabelText('Email Address'), {
      target: { value: email }
    })

    fireEvent.change(getByLabelText('Password'), {
      target: { value: 'Mdpps123' }
    })

    await act(async () => {
      selectValue(getByTestId, getByText, 'account_type', 'Distributor')
    })

    const input = getByPlaceholderText('Your company')

    fireEvent.change(input, {
      target: { value: '3' }
    })
    await waitForDomChange({ timeout: 5000 })

    await act(async () => {
      await MockAxios.mockResponse(unclaimedDataRes)
    })

    input.focus()
    await act(async () => {
      getByText('321 Auto').click()
    })

    await act(async () => {
      getByLabelText('I accept the Data processing Terms as required by GDPR.').click()
    })

    await act(async () => {
      getByText('Continue').click()
    })

    await waitForDomChange()

    await act(async () => {
      await MockAxios.mockResponse(userRegisteredRes)
    })

    expect(MockAxios).toHaveBeenCalledTimes(4)
    expect(navigate).toHaveBeenCalledWith(OTP, {
      state: { email, fromPage: 'register' }
    })
  })

  test('Should hide the company name if the selected account type is "Customer"', async () => {
    const email = 'test@cmailing.com'
    const res = {
      data: [
        {
          business_name: 'business_name'
        }
      ]
    }

    const userRegisteredRes = {
      data: {
        user: { email, first_name: 'a', last_name: 'a' }
      }
    }

    const { getByLabelText, getByTestId, getByText } = render(
      <Provider store={mockStore}>
        <SignUpPage />
      </Provider>
    )
    await act(async () => {
      await MockAxios.mockResponse(res)
    })

    fireEvent.change(getByLabelText('First Name'), {
      target: { value: 'fName' }
    })
    fireEvent.change(getByLabelText('Last Name'), {
      target: { value: 'lName' }
    })

    fireEvent.change(getByLabelText('Email Address'), {
      target: { value: email }
    })

    fireEvent.change(getByLabelText('Password'), {
      target: { value: 'mdpps123' }
    })

    await act(async () => {
      selectValue(getByTestId, getByText, 'account_type', 'Customer')
    })

    getByLabelText('I accept the Data processing Terms as required by GDPR.').click()

    getByText('Continue').click()

    await waitForDomChange()

    await act(async () => {
      await MockAxios.mockResponse(userRegisteredRes)
    })

    expect(MockAxios).toHaveBeenCalledTimes(2)
    expect(navigate).toHaveBeenCalledWith(OTP, {
      state: { email, fromPage: 'register' }
    })
  })

  test('Should show error msg if email is already registered ', async () => {
    const email = 'test@cmailing.com'
    const res = {
      data: [
        {
          business_name: 'business_name'
        }
      ]
    }
    const errorMsg = 'This email address is already registered.'
    const userRegisteredError = {
      response: {
        data: {
          errors: {
            user: { email: [errorMsg] }
          }
        }
      }
    }

    const { getByLabelText, getByTestId, getByText } = render(
      <Provider store={mockStore}>
        <SignUpPage />
      </Provider>
    )
    await act(async () => {
      await MockAxios.mockResponse(res)
    })

    fireEvent.change(getByLabelText('First Name'), {
      target: { value: 'fName' }
    })
    fireEvent.change(getByLabelText('Last Name'), {
      target: { value: 'lName' }
    })

    fireEvent.change(getByLabelText('Email Address'), {
      target: { value: email }
    })

    fireEvent.change(getByLabelText('Password'), {
      target: { value: 'Mdpps123' }
    })

    await act(async () => {
      selectValue(getByTestId, getByText, 'account_type', 'Customer')
    })

    getByLabelText('I accept the Data processing Terms as required by GDPR.').click()

    getByText('Continue').click()

    await waitForDomChange()

    await act(async () => {
      await MockAxios.mockError(userRegisteredError)
    })
    expect(MockAxios).toHaveBeenCalledTimes(2)
    expect(getByText(errorMsg)).toBeInTheDocument()
  })
})
