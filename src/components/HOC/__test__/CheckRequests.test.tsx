import React from 'react'
import mockAxios from 'jest-mock-axios'
import useAxios from 'axios-hooks'
import axios from 'axios'
import checkRequests from '../CheckRequests'
import { render, waitForDomChange } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { Store } from 'redux'

let mockStore: Store

jest.mock('@reach/router', () => ({
  navigate: jest.fn()
}))

beforeEach(() => {
  mockAxios.reset()
  mockAxios.mockClear()
  mockStore = configureStore()({})
})

const UnauthReqComp: React.FC = checkRequests(() => {
  const [{ data, loading, error }] = useAxios(
    'https://my-custom-not-working.endpoint'
  )

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
})

test('should response be intercepted', async () => {
  render(
    <Provider store={mockStore}>
      <UnauthReqComp />
    </Provider>
  )
  expect(axios.interceptors.response.use).toHaveBeenCalledTimes(1)
})

test('should child component to render correctly with an error message', async () => {
  const { getByText } = render(
    <Provider store={mockStore}>
      <UnauthReqComp />
    </Provider>
  )
  mockAxios.mockError({ code: '401' })

  await waitForDomChange()

  expect(mockAxios).toHaveBeenCalled()

  expect(getByText('Error!')).toBeInTheDocument()
})
