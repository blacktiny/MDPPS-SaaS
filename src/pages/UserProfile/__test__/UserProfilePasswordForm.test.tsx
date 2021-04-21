import React from 'react'
import userEvent from '@testing-library/user-event'
import { render, act, cleanup } from '@testing-library/react'
import UserProfilePasswordForm from '../UserProfilePasswordForm'
import NotificationBarProvider from '../../../shared/context/NotificationBarProvider'

beforeEach(() => {})
afterEach(() => {
  cleanup()
})

test('Should show error Current and new password are same on same password', async () => {
  const { getByLabelText, getByText } = render(
    <NotificationBarProvider>
      <UserProfilePasswordForm
        showForgotPasswordModal={() => {}}
        toggleLoader={() => {}}
      />
    </NotificationBarProvider>
  )

  await act(async () => {
    userEvent.type(getByLabelText('Current Password'), 'SoftSuave123@#$')
    userEvent.type(getByLabelText('New Password'), 'SoftSuave123@#$')
  })
  expect(
    getByText('Your new password must be different from your previous password')
  ).toBeInTheDocument()
})

test('Update password button should be enabled if the current and new password and different and the new password is has at least one upper case letter, a symbol, a number and contain a minimum of 8', async () => {
  const { getByLabelText, getByText } = render(
    <NotificationBarProvider>
      <UserProfilePasswordForm
        showForgotPasswordModal={() => {}}
        toggleLoader={() => {}}
      />
    </NotificationBarProvider>
  )

  await act(async () => {
    userEvent.type(getByLabelText('Current Password'), 'some password')
    userEvent.type(getByLabelText('New Password'), 'SoftSuave123@#$')
  })
  expect(getByText('Update Password')).toBeEnabled()
})
