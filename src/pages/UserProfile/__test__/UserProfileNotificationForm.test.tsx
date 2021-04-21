import React from 'react'
import { render, cleanup, act } from '@testing-library/react'
import configureStore from 'redux-mock-store'
import { Store } from 'redux'
import { Provider } from 'react-redux'
import MockAxios from 'jest-mock-axios'
import userEvent from '@testing-library/user-event'
import NotificationBarProvider from '../../../shared/context/NotificationBarProvider'
import UserProfileNotificationForm from '../UserProfileNotificationForm'
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
        profile_visibility: 'everyone',
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

test('On sms_notification is true is sms related option are enabled ', async () => {
  const { getByTestId } = render(
    <Provider store={mockStore}>
      <NotificationBarProvider>
        <UserProfileNotificationForm toggleLoader={() => {}} />
      </NotificationBarProvider>
    </Provider>
  )
  //check is the check box disabled as sms_notification is false
  expect(getByTestId('my_network_someone_follows_me_sms')).toBeDisabled()

  await act(async () => {
    userEvent.click(getByTestId('sms_notifications_management-toggle'))
  })

  expect(getByTestId('my_network_someone_follows_me_sms')).toBeEnabled()
})

test('On Select All Account Activity Options is both email and sms option are toggled while sms_notification is true', async () => {
  const { getByTestId } = render(
    <Provider store={mockStore}>
      <NotificationBarProvider>
        <UserProfileNotificationForm toggleLoader={() => {}} />
      </NotificationBarProvider>
    </Provider>
  )
  await act(async () => {
    userEvent.click(getByTestId('sms_notifications_management-toggle'))
  })

  await act(async () => {
    userEvent.click(getByTestId('toggleall-accountActivityOptions'))
  })

  expect(getByTestId('account_activity_new_browser_email')).toBeChecked()
  expect(getByTestId('account_activity_new_browser_sms')).toBeChecked()
  expect(getByTestId('account_activity_new_device_email')).toBeChecked()
  expect(getByTestId('account_activity_new_device_sms')).toBeChecked()
  expect(getByTestId('account_activity_new_app_email')).toBeChecked()
  expect(getByTestId('account_activity_new_app_sms')).toBeChecked()
})

test('On Select All Account Activity Options is only email  option are toggled while sms_notification is false', async () => {
  const { getByTestId } = render(
    <Provider store={mockStore}>
      <NotificationBarProvider>
        <UserProfileNotificationForm toggleLoader={() => {}} />
      </NotificationBarProvider>
    </Provider>
  )

  await act(async () => {
    userEvent.click(getByTestId('toggleall-accountActivityOptions'))
  })

  expect(getByTestId('account_activity_new_browser_email')).toBeChecked()
  expect(getByTestId('account_activity_new_device_email')).toBeChecked()
  expect(getByTestId('account_activity_new_app_email')).toBeChecked()
  expect(getByTestId('account_activity_new_browser_sms')).toBeDisabled()
  expect(getByTestId('account_activity_new_device_sms')).toBeDisabled()
  expect(getByTestId('account_activity_new_app_sms')).toBeDisabled()
})

test('On sms_notification is false "SMS Phone Number" input should disabled and if it is true then enabled', async () => {
  const { getByTestId } = render(
    <Provider store={mockStore}>
      <NotificationBarProvider>
        <UserProfileNotificationForm toggleLoader={() => {}} />
      </NotificationBarProvider>
    </Provider>
  )

  expect(getByTestId('sms_phone_number')).toBeDisabled

  //enabling the  sms notification
  await act(async () => {
    userEvent.click(getByTestId('sms_notifications_management-toggle'))
  })

  expect(getByTestId('sms_phone_number')).toBeEnabled
})
