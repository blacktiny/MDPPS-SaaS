import { cleanup, render } from '@testing-library/react'
import MockAxios from 'jest-mock-axios'
import React from 'react'
import { Provider } from 'react-redux'
import { Store } from 'redux'
import configureStore from 'redux-mock-store'
import { AccountTypeKey } from '../../../constants/common'
import NotificationBarProvider from '../../../shared/context/NotificationBarProvider'
import UserPersonalProfile from '../UserPersonalProfile'
// import { navigate } from '@reach/router'

let mockStore: Store

jest.mock('@reach/router', () => ({
  navigate: jest.fn()
}))

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
    },
    options: {
      location: [
        {
          key: '/api/companies/5327/addresses/5677/',
          value: '/api/companies/5327/addresses/5677/',
          text: 'Star bucks'
        }
      ]
    }
  })
})

afterEach(() => {
  cleanup()
})

// test('Is data are displayed in User profile page', async () => {
//   const { getByTestId } = render(
//     <Provider store={mockStore}>
//       <NotificationBarProvider>
//         <UserPersonalProfile toggleLoader={() => {}} />
//       </NotificationBarProvider>
//     </Provider>
//   )
//   expect(getByTestId('personalProfile-email').innerHTML).toBe(
//     'brand_user@mdpps.com'
//   )
// })

// test('Location should be displaying and Address should not be available', async () => {
//   const { getByText, queryByText } = render(
//     <Provider store={mockStore}>
//       <NotificationBarProvider>
//         <UserPersonalProfile toggleLoader={() => {}} />
//       </NotificationBarProvider>
//     </Provider>
//   )
//   expect(getByText('Location')).toBeInTheDocument()
//   expect(queryByText('Address')).not.toBeInTheDocument()
// })

// test('On Edit Profile should redirect to user profile form', async () => {
//   const { getByTestId } = render(
//     <Provider store={mockStore}>
//       <NotificationBarProvider>
//         <UserPersonalProfile toggleLoader={() => {}} />
//       </NotificationBarProvider>
//     </Provider>
//   )

//   await act(async () => {
//     getByTestId('editprofile-redirectbutton').click()
//   })
//   expect(navigate).toHaveBeenCalledWith('/dashboard/home/user-profile/edit')
// })

// test('Location should be displaying and Address should not be available', async () => {
//   const { getByText, queryByText, getByTestId } = render(
//     <Provider store={mockStore}>
//       <NotificationBarProvider>
//         <UserPersonalProfile toggleLoader={() => {}} />
//       </NotificationBarProvider>
//     </Provider>
//   )

//   await act(async () => {
//     getByTestId('editprofile-redirectbutton').click()
//   })

//   expect(navigate).toHaveBeenCalledWith('/dashboard/home/user-profile/edit')

//   expect(getByText('Location')).toBeInTheDocument()
//   expect(queryByText('Country')).not.toBeInTheDocument()
//   expect(queryByText('State')).not.toBeInTheDocument()
//   expect(queryByText('Street Address')).not.toBeInTheDocument()
//   expect(queryByText('Street Address 2/Locality')).not.toBeInTheDocument()
//   expect(queryByText('City')).not.toBeInTheDocument()
//   expect(queryByText('Zip/Postal Code')).not.toBeInTheDocument()
//   expect(queryByText('Zip/Postal Code')).not.toBeInTheDocument()
// })

// test('Save Button should be enabled as there as required fields with empty string', async () => {
//   const { getByText } = render(
//     <Provider store={mockStore}>
//       <NotificationBarProvider>
//         <UserPersonalProfile showEdit={true} toggleLoader={() => {}} />
//       </NotificationBarProvider>
//     </Provider>
//   )
//   expect(navigate).toHaveBeenCalledWith('/dashboard/home/user-profile/edit')
//   expect(getByText('Save')).toBeEnabled()
// })

// test('On cancel clicked redirect to user profile details page', async () => {
//   const { getByTestId } = render(
//     <Provider store={mockStore}>
//       <NotificationBarProvider>
//         <UserPersonalProfile showEdit={true} toggleLoader={() => {}} />
//       </NotificationBarProvider>
//     </Provider>
//   )

//   expect(getByTestId('UserProfile-PersonalProfileForm')).toBeInTheDocument()

//   await act(async () => {
//     getByTestId('cancel-editprofile').click()
//   })
//   expect(navigate).toHaveBeenCalledWith('/dashboard/home/user-profile')
// })

// test('Should show error message if user enters invalid email format', async () => {
//   const { getByTestId, getByPlaceholderText, getByText } = render(
//     <Provider store={mockStore}>
//       <NotificationBarProvider>
//         <UserPersonalProfile showEdit={true} toggleLoader={() => {}} />
//       </NotificationBarProvider>
//     </Provider>
//   )

//   expect(getByTestId('UserProfile-PersonalProfileForm')).toBeInTheDocument()

//   fireEvent.change(getByPlaceholderText('Your email address'), {
//     target: { value: 'hjhjhj' }
//   })

//   expect(getByText('Save')).toBeEnabled()
// })
test('Snapshot test', () => {
  const { getByTestId } = render(
    <Provider store={mockStore}>
      <NotificationBarProvider>
        <UserPersonalProfile toggleLoader={() => {}} />
      </NotificationBarProvider>
    </Provider>
  )
  expect(getByTestId).toMatchSnapshot()
})
