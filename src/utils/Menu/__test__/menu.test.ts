import {
  isSideBarLogoNeeded,
  getUserItemsBasedOnRole,
  getAppMenuBasedOnRole
} from '../MenuUtils'

test('is side bar needed', () => {
  expect(isSideBarLogoNeeded('brand')).toBe(true)
})
test('got user item based on name', () => {
  expect(getUserItemsBasedOnRole('brand')).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        brand: true
      })
    ])
  )
})
test('got app menu base on role', () => {
  expect(getAppMenuBasedOnRole('brand')).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        brand: true
      })
    ])
  )
})
