import { cleanup, render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { Store } from 'redux'
import configureStore from 'redux-mock-store'
import MockAxios from '../../../__mocks__/axios'
import SideBarComponent from '../SideBar'
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
        account_type: 'brand',
        active_company: {
          id: 5324,
          url: 'https://dev.mdpps.com/api/companies/5324/',
          business_name: 'Softsuave 2',
          microsite_name: 'softsuave-2-2',
          permissions: [
            'brand_manager.view_brand',
            'adn.view_dealerapplicationconfiguration',
            'analytics.view_integration',
            'Authenticated',
            'accounts.view_powerprofile'
          ],
          is_subscribed: false,
          status: 'pending_review'
        }
      }
    }
  })
})
afterEach(() => {
  cleanup()
})
test('Side bar is loaded', async () => {
  const { getByTestId } = render(
    <Provider store={mockStore}>
      <SideBarComponent onSideBarClose={() => {}} />
    </Provider>
  )
  expect(getByTestId).toMatchSnapshot()
})
// test('Integration popup is opened', async () => {
//   const { getByTestId } = render(
//     <Provider store={mockStore}>
//       <SideBarComponent onSideBarClose={() => {}} />
//     </Provider>
//   )
//   act(() => {
//     getByTestId('button_integrations').click()
//   })
//   expect(getByTestId('button_integrations')).toHaveAttribute(
//     'data-testid',
//     'button_integrations'
//   )
// })
// test('Marketplace submenu will be open in the sidebar', async () => {
//   const { getByTestId } = render(
//     <Provider store={mockStore}>
//       <SideBarComponent onSideBarClose={() => {}} />
//     </Provider>
//   )
//   act(() => {
//     getByTestId('button_marketplace').click()
//   })
//   expect(getByTestId('Brand')).toHaveAttribute('data-testid', 'Brand')
// })

// test('Should redirect to correct path if user click on Sign up button', async () => {
//   const { getByTestId } = render(
//     <Provider store={mockStore}>
//       <SideBarComponent onSideBarClose={() => {}} />
//     </Provider>
//   )
//   act(() => {
//     getByTestId('button_myBrands').click()
//   })

//   expect(navigate).toHaveBeenCalledTimes(1)
//   expect(navigate).toHaveBeenCalledWith('/dashboard/home/in-progress')
// })
