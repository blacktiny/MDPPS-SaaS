import Sidebarlogo from '../assets/images/logo-menu-closed.svg'
import SidebarMenuLogo from '../assets/images/logo-menu-min.svg'
import * as TextResource from './TextResource'
import { USER_PROFILE } from 'constants/pagesPath'

export interface SideBarLogo {
  [index: string]: string | boolean

  id: string
  name: string
  logo: string
  menuLogo: string
  brand: boolean
  distributor: boolean
  dealer: boolean
  employee: boolean
  customer: boolean
  manufacturer: boolean
  permission: string
  Paid_NotFree_SubscriptionRequired: boolean
  isAddOn: boolean
}

export interface LastSubMenu extends SubMenu {}

export interface SubMenu {
  [index: string]: string | boolean | string[] | LastSubMenu[] | HTMLImageElement | JSX.Element

  id?: string
  name?: string
  showOnboarding?: boolean
  brand?: boolean
  manufacturer?: boolean
  distributor?: boolean
  dealer?: boolean | string
  employee?: string | boolean
  customer?: boolean
  permission?: string | boolean
  Paid_NotFree_SubscriptionRequired?: boolean | string[]
  isAddOn?: boolean
  subMenu?: LastSubMenu[]
  key?: string
  label?: string
  iconClass?: string
  iconImage?: string
  image?: string
  isSubMenu?: boolean
  isHeader?: boolean
  element?: JSX.Element
  isPanel?: boolean
}

export interface TopMenu {
  id: string
  name: string
  brand: boolean
  distributor: boolean
  manufacturer: boolean
  dealer: boolean
  employee: string
  customer: string | boolean
  permission: string
  Paid_NotFree_SubscriptionRequired: boolean
  isAddOn: boolean
  subMenu?: SubMenu
}

export interface SideBar {
  [index: string]: string | boolean | string[] | SubMenu[]

  id: string
  hasBadge?: boolean
  name: string
  title: string
  brand: boolean
  manufacturer: boolean
  distributor: boolean
  dealer: boolean
  employee: boolean | string
  customer: boolean
  permission: string
  Paid_NotFree_SubscriptionRequired: boolean | string[]
  isAddOn: boolean
  className: string
  subMenu?: SubMenu[]
}

export interface UserAvatar {
  id: string
  name: string
  brand: boolean
  manufacturer: boolean
  distributor: boolean
  dealer: boolean
  employee: string
  customer: boolean
  permission: string
  Paid_NotFree_SubscriptionRequired: boolean
  isAddOn: boolean
  subMenu?: SubMenu[]
}

export interface BusinessMenu {
  [index: string]: string | boolean | string[]
  id: string
  name: string
  brand: boolean
  manufacturer: boolean
  distributor: boolean
  dealer: boolean
  employee: string
  customer: boolean
  permission: string
  Paid_NotFree_SubscriptionRequired: boolean
  isAddOn: boolean
}

export interface SettingsMenu {
  [index: string]: string | boolean | string[]
  id: string
  name: string
  icon: string
  link: string
  permission: string[]
}

export interface MenuConfig {
  sideBarLogo: SideBarLogo
  sideBar: SideBar[]
  topMenu: TopMenu[]
  userAvatar: UserAvatar
  businessMenu: BusinessMenu[]
  settingsMenu: SettingsMenu[]
}

export const menuConfig: MenuConfig = {
  sideBarLogo: {
    id: 'logoMark',
    name: 'Logo Mark',
    logo: Sidebarlogo,
    menuLogo: SidebarMenuLogo,
    brand: true,
    distributor: true,
    dealer: true,
    employee: true,
    customer: true,
    manufacturer: true,
    permission: 'Authenticated',
    Paid_NotFree_SubscriptionRequired: false,
    isAddOn: false
  },
  sideBar: [
    {
      id: 'home',
      name: 'Dashboard',
      title: 'Dashboard',
      brand: true,
      distributor: true,
      dealer: true,
      employee: true,
      customer: true,
      manufacturer: true,
      permission: 'Authenticated',
      Paid_NotFree_SubscriptionRequired: false,
      isAddOn: false,
      className: 'sidebar-icon icon-home'
    },
    {
      id: 'businessVerification',
      hasBadge: true,
      name: 'Business Verification',
      title: 'Business Verification',
      brand: true,
      distributor: true,
      dealer: true,
      employee: 'inherit',
      customer: false,
      manufacturer: true,
      permission: 'Authenticated',
      Paid_NotFree_SubscriptionRequired: false,
      isAddOn: false,
      className: 'sidebar-icon icon-check-cir'
    },
    {
      id: 'marketplace',
      name: 'Marketplace',
      title: 'Marketplace',
      brand: true,
      distributor: true,
      dealer: true,
      employee: 'inherit',
      customer: true,
      manufacturer: true,
      permission: 'Authenticated',
      Paid_NotFree_SubscriptionRequired: false,
      isAddOn: false,
      className: 'sidebar-icon icon-marketplace',
      subMenu: [
        {
          id: 'manufacturer',
          name: 'Manufacturers',
          brand: true,
          distributor: true,
          dealer: true,
          employee: 'inherit',
          customer: true,
          permission: 'Authenticated',
          manufacturer: true,
          Paid_NotFree_SubscriptionRequired: false,
          isAddOn: false
        },
        {
          id: 'distributors',
          name: 'Distributors',
          brand: true,
          distributor: true,
          dealer: true,
          employee: 'inherit',
          customer: true,
          permission: 'Authenticated',
          manufacturer: true,
          Paid_NotFree_SubscriptionRequired: false,
          isAddOn: false
        },
        {
          id: 'dealers',
          name: 'Dealers',
          brand: true,
          distributor: true,
          dealer: true,
          employee: 'inherit',
          customer: true,
          permission: 'Authenticated',
          manufacturer: true,
          Paid_NotFree_SubscriptionRequired: false,
          isAddOn: false
        }
      ]
    },
    {
      id: 'commonApplication',
      name: 'Common Application',
      title: 'Common Application',
      brand: true,
      distributor: true,
      dealer: true,
      employee: 'inherit',
      customer: false,
      manufacturer: true,
      permission: 'adn.view_member',
      Paid_NotFree_SubscriptionRequired: false,
      isAddOn: false,
      className: 'sidebar-icon icon-dealer-app',
      subMenu: [
        {
          id: 'applicants',
          name: 'Applicants',
          brand: true,
          distributor: false,
          dealer: false,
          employee: 'inherit',
          customer: false,
          permission: '',
          manufacturer: true,
          Paid_NotFree_SubscriptionRequired: ['brand', 'manufacturer', 'distributor'],
          isAddOn: false
        },
        {
          id: 'templates',
          name: 'Templates',
          brand: true,
          distributor: false,
          dealer: false,
          employee: 'inherit',
          customer: false,
          permission: '',
          manufacturer: true,
          Paid_NotFree_SubscriptionRequired: ['brand', 'manufacturer', 'distributor'],
          isAddOn: false
        }
      ]
    },
    {
      id: 'businessNetwork',
      name: 'Buisness Network',
      title: 'Business Network',
      brand: true,
      distributor: true,
      dealer: true,
      employee: 'inherit',
      customer: false,
      manufacturer: true,
      permission: 'adn.view_dealerapplicationconfiguration',
      Paid_NotFree_SubscriptionRequired: ['brand', 'manufacturer', 'distributor'],
      isAddOn: false,
      className: 'sidebar-icon icon-adn',
      subMenu: [
        {
          id: 'manufacturer',
          name: 'Manufacturers',
          brand: true,
          distributor: false,
          dealer: false,
          employee: 'inherit',
          customer: true,
          permission: 'Authenticated',
          manufacturer: true,
          Paid_NotFree_SubscriptionRequired: false,
          isAddOn: false
        },
        {
          id: 'distributors',
          name: 'Distributors',
          brand: true,
          distributor: false,
          dealer: false,
          employee: 'inherit',
          customer: true,
          permission: 'Authenticated',
          manufacturer: true,
          Paid_NotFree_SubscriptionRequired: false,
          isAddOn: false
        },
        {
          id: 'dealers',
          name: 'Dealers',
          brand: true,
          distributor: false,
          dealer: false,
          employee: 'inherit',
          customer: true,
          permission: 'Authenticated',
          manufacturer: true,
          Paid_NotFree_SubscriptionRequired: false,
          isAddOn: false
        }
      ]
    },
    {
      id: 'brandManager',
      name: 'Brands',
      title: 'Brands (Consumer brands only)',
      brand: true,
      distributor: true,
      dealer: true,
      employee: 'inherit',
      customer: false,
      manufacturer: true,
      permission: 'brand_manager.view_brand',
      Paid_NotFree_SubscriptionRequired: false,
      isAddOn: false,
      className: 'sidebar-icon icon-brands'
    },
    {
      id: 'products',
      name: 'Products',
      title: 'Products',
      brand: true,
      distributor: false,
      dealer: false,
      employee: 'inherit',
      customer: false,
      manufacturer: true,
      permission: 'adn.view_dealerapplicationconfiguration',
      Paid_NotFree_SubscriptionRequired: false,
      isAddOn: true,
      className: 'sidebar-icon icon-products',
      subMenu: [
        {
          id: 'manufacturer',
          name: 'Manufacturers',
          brand: true,
          distributor: false,
          dealer: false,
          employee: 'inherit',
          customer: true,
          permission: 'Authenticated',
          manufacturer: true,
          Paid_NotFree_SubscriptionRequired: false,
          isAddOn: false
        },
        {
          id: 'distributors',
          name: 'Distributors',
          brand: true,
          distributor: false,
          dealer: false,
          employee: 'inherit',
          customer: true,
          permission: 'Authenticated',
          manufacturer: true,
          Paid_NotFree_SubscriptionRequired: false,
          isAddOn: false
        },
        {
          id: 'dealers',
          name: 'Dealers',
          brand: true,
          distributor: false,
          dealer: false,
          employee: 'inherit',
          customer: true,
          permission: 'Authenticated',
          manufacturer: true,
          Paid_NotFree_SubscriptionRequired: false,
          isAddOn: false
        }
      ]
    },
    {
      id: 'locator',
      name: 'Locator',
      title: 'Locator',
      brand: true,
      manufacturer: true,
      distributor: true,
      dealer: true,
      employee: 'inherit',
      customer: true,
      permission: 'Authenticated',
      Paid_NotFree_SubscriptionRequired: false,
      isAddOn: true,
      className: 'sidebar-icon icon-search'
    },
    {
      id: 'businessDirectory',
      name: 'Business Directory',
      title: 'Business Directory',
      brand: true,
      manufacturer: true,
      distributor: true,
      dealer: true,
      employee: 'inherit',
      customer: true,
      permission: 'Authenticated',
      Paid_NotFree_SubscriptionRequired: false,
      isAddOn: true,
      className: 'sidebar-icon icon-nav-supplier-application'
    },
    {
      id: 'admin',
      name: 'Admin',
      title: 'Admin',
      brand: false,
      manufacturer: false,
      distributor: false,
      dealer: false,
      employee: false,
      customer: false,
      permission: 'Authenticated',
      Paid_NotFree_SubscriptionRequired: false,
      isAddOn: true,
      className: 'sidebar-icon icon-key'
    }
  ],
  /**
   *   Top Menu
   */
  topMenu: [
    {
      id: 'taskManager',
      name: 'Task Manager',
      brand: true,
      manufacturer: true,
      distributor: true,
      dealer: true,
      employee: 'inherit',
      customer: false,
      permission: 'Authenticated',
      Paid_NotFree_SubscriptionRequired: false,
      isAddOn: true
    },
    {
      id: 'apps',
      name: 'Apps',
      brand: true,
      manufacturer: true,
      distributor: true,
      dealer: true,
      employee: 'inherit',
      customer: false,
      permission: 'Authenticated',
      Paid_NotFree_SubscriptionRequired: false,
      isAddOn: true
    }
  ],
  /**
   *   User Avatar Menu
   */
  userAvatar: {
    id: 'userAvatar',
    name: 'User Avatar',
    brand: true,
    manufacturer: true,
    distributor: true,
    dealer: true,
    employee: 'inherit',
    customer: true,
    permission: 'Authenticated',
    Paid_NotFree_SubscriptionRequired: false,
    isAddOn: true,
    subMenu: [
      {
        id: 'businessVerification',
        name: 'Business Verification',
        showOnboarding: false,
        brand: true,
        manufacturer: true,
        distributor: true,
        dealer: true,
        employee: false,
        customer: false,
        permission: 'Authenticated',
        Paid_NotFree_SubscriptionRequired: false,
        isAddOn: false,
        key: 'LABEL_TEXT_IDENTITY_VERIFICATION',
        label: 'Business Verification',
        iconClass: 'icon-check-cir'
      },
      {
        id: 'sendInvitation',
        name: 'Send Invitation',
        showOnboarding: false,
        brand: true,
        manufacturer: true,
        distributor: true,
        dealer: true,
        employee: true,
        customer: false,
        permission: 'Authenticated',
        Paid_NotFree_SubscriptionRequired: false,
        isAddOn: false,
        key: 'LABEL_TEXT_SEND_INVITATION',
        label: 'Send Invitation',
        iconClass: 'icon-gift'
      },
      {
        id: 'settings',
        name: 'Settings',
        showOnboarding: false,
        brand: true,
        manufacturer: true,
        distributor: true,
        dealer: true,
        employee: 'inherit',
        customer: true,
        permission: 'Authenticated',
        Paid_NotFree_SubscriptionRequired: false,
        isAddOn: true,
        key: 'LABEL_TEXT_APPLICATION_SETTING',
        label: 'Settings',
        iconClass: 'icon-nav-settings longmenu-icon'
      },
      {
        id: 'support',
        name: 'Support',
        showOnboarding: true,
        brand: true,
        manufacturer: true,
        distributor: true,
        dealer: true,
        employee: 'inherit',
        customer: true,
        permission: 'Authenticated',
        Paid_NotFree_SubscriptionRequired: false,
        isAddOn: true,
        key: 'LABEL_TEXT_SUPPORT',
        label: TextResource.LABEL_TEXT_SUPPORT,
        iconClass: 'icon-question-square longmenu-icon'
      },
      {
        id: 'logOut',
        name: 'Log Out',
        showOnboarding: true,
        brand: true,
        manufacturer: true,
        distributor: true,
        dealer: true,
        employee: 'inherit',
        customer: true,
        permission: 'Authenticated',
        Paid_NotFree_SubscriptionRequired: false,
        isAddOn: true,
        key: 'LABEL_TEXT_LOGOUT',
        label: TextResource.LABEL_TEXT_LOGOUT,
        iconClass: 'icon-arrow-doc longmenu-icon'
      }
    ]
  },
  businessMenu: [
    {
      id: 'businessDirectory',
      name: 'Business Directory',
      brand: true,
      manufacturer: true,
      distributor: true,
      dealer: true,
      employee: 'inherit',
      customer: false,
      permission: 'Authenticated',
      Paid_NotFree_SubscriptionRequired: false,
      isAddOn: true,
      iconClass: 'icon-nav-supplier-application'
    },
    {
      id: 'locateADealer',
      name: 'Locate a Dealer',
      brand: true,
      manufacturer: true,
      distributor: true,
      dealer: true,
      employee: 'inherit',
      customer: true,
      permission: 'Authenticated',
      Paid_NotFree_SubscriptionRequired: false,
      isAddOn: true,
      iconClass: 'icon-map-pin'
    }
  ],
  settingsMenu: [
    {
      id: 'profile',
      name: 'Profile',
      icon: 'icon-user-female',
      link: USER_PROFILE,
      permission: ['brand', 'manufacturer', 'dealer', 'distributor', 'employee', 'customer']
    },
    {
      id: 'company',
      name: 'Company',
      icon: 'icon-portfolio',
      link: '',
      permission: ['brand', 'manufacturer', 'dealer', 'distributor']
    },
    {
      id: 'addresses',
      name: 'addresses',
      icon: 'icon-map-pin',
      link: '',
      permission: ['brand', 'manufacturer', 'dealer', 'distributor']
    },
    {
      id: 'location',
      name: 'Locations & Storefronts',
      icon: 'icon-building',
      link: '/dashboard/home/user-profile/localization',
      permission: ['brand', 'manufacturer', 'dealer', 'distributor']
    },
    {
      id: 'businessVerification',
      name: 'Business Verification',
      icon: 'icon-check-cir',
      link: '/dashboard/home/user-profile/password',
      permission: ['brand', 'manufacturer', 'dealer', 'distributor']
    },
    {
      id: 'team',
      name: 'Team',
      icon: 'icon-user-female',
      link: '',
      permission: ['brand', 'manufacturer', 'dealer', 'distributor']
    },
    {
      id: 'billing',
      name: 'Billing & Subscription',
      icon: 'icon-clock-dollar',
      link: '',
      permission: ['brand', 'manufacturer', 'dealer', 'distributor']
    },
    {
      id: 'notification',
      name: 'Notification',
      icon: 'icon-nav-notifications',
      link: '/dashboard/home/user-profile/notification',
      permission: ['brand', 'manufacturer', 'dealer', 'distributor', 'employee', 'customer']
    },
    {
      id: 'security',
      name: 'Security',
      icon: 'icon-shield',
      link: '/dashboard/home/user-profile/privacy-and-security',
      permission: ['brand', 'manufacturer', 'dealer', 'distributor', 'employee', 'customer']
    }
  ]
}
