import React from 'react'
import { render } from '@testing-library/react'
import App from '../App'
import configureStore from 'redux-mock-store'

import { Store } from 'redux'
import { Provider } from 'react-redux'

let mockStore: Store

beforeEach(() => {
  mockStore = configureStore()({})
})

test('app renders', () => {
  const { baseElement } = render(
    <Provider store={mockStore}>
      <App />
    </Provider>
  )
  expect(baseElement).toBeInTheDocument()
})
