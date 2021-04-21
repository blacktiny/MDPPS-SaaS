import { cleanup, render } from '@testing-library/react'
import { Provider } from 'react-redux'
import React from 'react'
import { Store } from 'redux'
import MockAxios from '../../../__mocks__/axios'
import configureStore from 'redux-mock-store'
import UserProfile from '../index'
import { navigate } from '@reach/router'
import NotificationBarProvider from '../../../shared/context/NotificationBarProvider'
import LoaderProvider from '../../../shared/context/LoaderProvider'
import { AccountTypeKey } from '../../../constants/common'

let mockStore: Store

jest.mock('@reach/router', () => ({
  navigate: jest.fn()
}))

beforeEach(() => {
  MockAxios.reset()
  MockAxios.mockClear()
  mockStore = configureStore()({
    options: {
      timezone: [
        {
          key: 'Africa/Abidjan',
          id: 'Africa/Abidjan',
          name: 'Africa/Abidjan'
        },
        {
          key: 'Africa/Accra',
          id: 'Africa/Accra',
          name: 'Africa/Accra'
        }
      ],
      currency: [
        {
          key: 'EUR',
          id: 'EUR',
          name: 'Euro'
        },
        {
          key: 'FJD',
          id: 'FJD',
          name: 'Fiji Dollar'
        },
        {
          key: 'FKP',
          id: 'FKP',
          name: 'Falkland Islands Pound'
        },
        {
          key: 'GBP',
          id: 'GBP',
          name: 'Pound Sterling'
        }
      ],
      language: [
        {
          key: 'en',
          id: 'en',
          name: 'English'
        },
        {
          key: 'es',
          id: 'es',
          name: 'Spanish'
        }
      ]
    },
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

// test('should render the Localization form on "Localization" clicked', async () => {
//   const { getByTestId } = render(
//     <Provider store={mockStore}>
//       <LoaderProvider>
//         <NotificationBarProvider>
//           <UserProfile />
//         </NotificationBarProvider>
//       </LoaderProvider>
//     </Provider>
//   )

//   getByTestId('UserProfile-Localization').click()
//   expect(navigate).toHaveBeenCalledWith(
//     '/dashboard/home/user-profile/localization'
//   )
// })

test.skip('should render the  Notification form on "Notification" clicked', async () => {
  const { getByTestId } = render(
    <Provider store={mockStore}>
      <LoaderProvider>
        <NotificationBarProvider>
          <UserProfile />
        </NotificationBarProvider>
      </LoaderProvider>
    </Provider>
  )
  getByTestId('UserProfile-Notification').click()
  expect(navigate).toHaveBeenCalledWith(
    '/dashboard/home/user-profile/notification'
  )
})

test.skip('should render the  Privacy & Security form on "Privacy & Security" clicked', async () => {
  const { getByTestId } = render(
    <Provider store={mockStore}>
      <LoaderProvider>
        <NotificationBarProvider>
          <UserProfile />
        </NotificationBarProvider>
      </LoaderProvider>
    </Provider>
  )

  getByTestId('UserProfile-Privacy&Security').click()
  expect(navigate).toHaveBeenCalledWith(
    '/dashboard/home/user-profile/privacy-and-security'
  )
})

test.skip('should render the  Passwords form on "Passwords" clicked', async () => {
  const { getByTestId } = render(
    <Provider store={mockStore}>
      <LoaderProvider>
        <NotificationBarProvider>
          <UserProfile />
        </NotificationBarProvider>
      </LoaderProvider>
    </Provider>
  )
  getByTestId('UserProfile-Passwords').click()
  expect(navigate).toHaveBeenCalledWith('/dashboard/home/user-profile/password')
})

test.skip('should render the  Profile Component on "Profile" clicked', async () => {
  const { getByTestId } = render(
    <Provider store={mockStore}>
      <LoaderProvider>
        <NotificationBarProvider>
          <UserProfile />
        </NotificationBarProvider>
      </LoaderProvider>
    </Provider>
  )

  getByTestId('UserProfile-Profile').click()
  expect(navigate).toHaveBeenCalledWith('/dashboard/home/user-profile')
})
