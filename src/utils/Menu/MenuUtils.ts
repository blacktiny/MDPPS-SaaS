import { menuConfig } from '../../constants/menuConfig'
import { ActiveCompany } from '../../shared/models/User'
import { SideBar, SubMenu, BusinessMenu } from '../../constants/menuConfig'
import { AccountTypeKey, Status } from '../../constants/common'

/**
 *   Get SideBar Menu Items list according user account type
 */
export const getSideBarMenuItemsBasedOnRole = (role: string, activeCompany: ActiveCompany) => {
  let menu: SideBar[] = []
  let permission: string[] = null
  let tmpRole = role

  if (activeCompany) {
    if (activeCompany.permissions && activeCompany.permissions?.length > 0) permission = activeCompany.permissions

    if (role === 'employee') tmpRole = activeCompany.role
  } else if (role === 'employee') {
    tmpRole = 'customer'
  }

  menuConfig.sideBar.forEach((menuData: SideBar) => {
    const tmpMenuData = JSON.parse(JSON.stringify(menuData))

    if (tmpMenuData[tmpRole]) {
      if (
        !permission ||
        tmpMenuData.permission === 'Authenticated' ||
        (tmpMenuData.permission && permission.indexOf(tmpMenuData.permission) > -1)
      ) {
        if (tmpMenuData.subMenu && tmpMenuData.subMenu.length) {
          tmpMenuData.subMenu = getSideBarSubMenu(tmpRole, activeCompany, tmpMenuData.subMenu)
        }

        menu.push(tmpMenuData)
      }
    }
  })

  return menu
}

const getSideBarSubMenu = (role: string, activeCompany: ActiveCompany, subMenu: SubMenu[]) => {
  let menu: SubMenu[] = []
  let permission: string[] = null

  if (activeCompany && activeCompany.permissions) permission = activeCompany.permissions

  subMenu.forEach((menuData: SubMenu) => {
    if (menuData[role]) {
      let hasPermission = false
      if (typeof menuData.permission === 'boolean' && menuData.permission) {
        hasPermission = true
      } else if (
        typeof menuData.permission !== 'boolean' &&
        (!permission ||
          menuData.permission === '' ||
          menuData.permission === 'Authenticated' ||
          (menuData.permission && permission.indexOf(menuData.permission) > -1))
      ) {
        hasPermission = true
      }

      if (hasPermission) {
        if (menuData.subMenu && menuData.subMenu.length) {
          menuData.subMenu = getSideBarSubMenu(role, activeCompany, menuData.subMenu)
        }
        menu.push(menuData)
      }
    }
  })

  return menu
}

export const isSideBarLogoNeeded = (role: string) => {
  return menuConfig.sideBarLogo[role]
}

export const getUserItemsBasedOnRole = (role: string, isOnboarding?: boolean) => {
  let menu: SubMenu[] = []

  menuConfig.userAvatar.subMenu
    .filter(({ showOnboarding }) => (isOnboarding ? showOnboarding : true))
    .forEach((menuData: SubMenu) => {
      if (menuData[role]) {
        menu.push(menuData)
      }
    })

  return menu
}

export const getAppMenuBasedOnRole = (role: string) => {
  let menu: BusinessMenu[] = []
  menuConfig.businessMenu.forEach((menuData: BusinessMenu) => {
    if (menuData[role]) {
      menu.push(menuData)
    }
  })
  return menu
}

export const getStatusPendingResult = (accountType: string, activeCompany: ActiveCompany) => {
  let isPending = false
  if (
    accountType === AccountTypeKey.BRAND ||
    accountType === AccountTypeKey.MANUFACTURER ||
    accountType === AccountTypeKey.DISTRIBUTOR ||
    accountType === AccountTypeKey.DEALER ||
    accountType === AccountTypeKey.EMPLOYEE
  ) {
    if (activeCompany?.status === Status?.PENDING_REVIEW) isPending = true
  }
  return isPending
}
