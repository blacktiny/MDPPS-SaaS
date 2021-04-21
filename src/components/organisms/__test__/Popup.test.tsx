import { cleanup, render } from '@testing-library/react'
import { Provider } from 'react-redux'
import Popup from '../ProfileFrozenPopup'
import React from 'react'
import { Store } from 'redux'
import MockAxios from '../../../__mocks__/axios'
import configureStore from 'redux-mock-store'

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
test('Check popup content displayed successfully', async () => {
  const { getByText } = render(
    <Provider store={mockStore}>
      <Popup show={true} handleClose={() => {}} content={'test the content'} />
    </Provider>
  )
  expect(getByText('test the content')).toBeInTheDocument()
})
