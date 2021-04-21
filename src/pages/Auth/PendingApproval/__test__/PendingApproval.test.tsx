import React from 'react'
import { render } from '@testing-library/react'
import { navigate } from '@reach/router'
import { LOGIN } from '../../../../constants/pagesPath'
import PendingApprovalPage from '../PendingApprovalPage'

jest.mock('@reach/router', () => ({
  navigate: jest.fn()
}))

test('Should redirect to correct path if user click on Browse Now button', async () => {
  const { getByText } = render(<PendingApprovalPage />)
  getByText('Browse Now').click()
  expect(navigate).toHaveBeenCalledWith(LOGIN)
})
