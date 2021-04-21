import React from 'react'
import { render } from '@testing-library/react'
import { navigate } from '@reach/router'
import { LOGIN } from '../../../../constants/pagesPath'
import SuspendedByPlatformPage from '../SuspendedByPlatformPage'

jest.mock('@reach/router', () => ({
  navigate: jest.fn()
}))

test('Should redirect to correct path if user click on Back To Sign In button', async () => {
  const { getByText } = render(<SuspendedByPlatformPage />)
  getByText('Back to sign in').click()
  expect(navigate).toHaveBeenCalledWith(LOGIN)
})
