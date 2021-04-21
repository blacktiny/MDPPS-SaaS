import React from 'react'
import { render, cleanup, waitForDomChange, act } from '@testing-library/react'
import configureStore from 'redux-mock-store'
import { Store } from 'redux'
import { Provider } from 'react-redux'
import MockAxios from 'jest-mock-axios'
import userEvent from '@testing-library/user-event'
import NotificationBarProvider from '../../../shared/context/NotificationBarProvider'
import UserOptionPrivacyAndSecurityForm from '../UserOptionPrivacyAndSecurityForm'
import { AccountTypeKey } from '../../../constants/common'

let mockStore: Store

beforeEach(() => {
  MockAxios.reset()
  MockAxios.mockClear()
  mockStore = configureStore()({
    auth: {
      user: {
        account_activity_new_app_email: false,
        account_activity_new_app_sms: false,
        account_activity_new_browser_email: false,
        account_activity_new_browser_sms: false,
        account_activity_new_device_email: false,
        account_activity_new_device_sms: false,
        account_type: AccountTypeKey.BRAND,
        address1: '',
        address2: '',
        bio: '',
        brands_own: [],
        city: '',
        country: 'https://dev.mdpps.com/api/countrys/105/',
        currency: 'EUR',
        date_joined: '2020-05-19T07:09:55.808087-06:00',
        email: 'brand_user@mdpps.com',
        first_name: 'brand_user',
        is_disabled: false,
        is_frozen: false,
        is_onboarding_complete: true,
        job_company: '',
        job_title: '',
        language: 'en',
        last_name: 'brand',
        marketing_company_news_email: false,
        marketing_company_news_sms: false,
        marketing_latest_news_email: false,
        marketing_latest_news_sms: false,
        marketing_weekly_email: false,
        marketing_weekly_sms: false,
        message_visibility: 'everyone',
        mobile_phone_number: '+13434343434',
        my_network_someone_follows_me_email: false,
        my_network_someone_follows_me_sms: false,
        my_network_someone_mentions_me_email: false,
        my_network_someone_mentions_me_sms: false,
        my_network_someone_replies_to_me_email: false,
        my_network_someone_replies_to_me_sms: false,
        office_phone_number: '+13434343434',
        profile_visibility: 'private',
        sms_notification: false,
        state: '',
        timezone: 'Etc/GMT+11',
        zip_code: ''
      }
    }
  })
})

afterEach(() => {
  cleanup()
})

test('Should successfully submit if  Profile Visibility changes ', async () => {
  const { getByLabelText, getByText } = render(
    <Provider store={mockStore}>
      <NotificationBarProvider>
        <UserOptionPrivacyAndSecurityForm toggleLoader={() => {}} />
      </NotificationBarProvider>
    </Provider>
  )

  await act(async () => {
    userEvent.click(getByLabelText('No One'))
  })

  await act(async () => {
    userEvent.click(getByText('Update Settings'))
  })

  await waitForDomChange()
  await act(async () => {
    MockAxios.mockResponse({
      data: { message: 'success' }
    })
  })
  expect(MockAxios).toHaveBeenCalledTimes(1)
})

test('Submit Button should be disabled as on change in form', async () => {
  const { getByText } = render(
    <Provider store={mockStore}>
      <NotificationBarProvider>
        <UserOptionPrivacyAndSecurityForm toggleLoader={() => {}} />
      </NotificationBarProvider>
    </Provider>
  )
  expect(getByText('Update Settings')).toBeDisabled()
})
