import { navigate, RouteComponentProps } from '@reach/router'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import bigLogo from '../../assets/images/logo-menu-open.svg'
import menuIcon from '../../assets/icons/ico-bars.svg'
import { menuConfig, SideBar as SideBarProps } from '../../constants/menuConfig'
import { User } from '../../shared/models/User'
import { RootState } from '../../store/types'
import SideBar from '../../components/organisms/NewSideBar'
import { getSideBarMenuItemsBasedOnRole, isSideBarLogoNeeded } from '../../utils/Menu/MenuUtils'
import IntegrationPopUp from './IntegrationPopup'
import { ENGINEERING_IN_PROCESS } from '../../constants/pagesPath'

interface Props extends RouteComponentProps {
  open?: boolean
  isCollapsible?: boolean
  onSideBarClose: (event?: boolean) => void
}

const SideBarComponent: React.FC<Props> = props => {
  const { open, isCollapsible, onSideBarClose } = props
  const [toggleSideBar, setCollapsed] = useState(true)
  const [selectedMenu, setMenuSelection] = useState(null)
  const [showPopup, setShowPopup] = useState<boolean>(false)

  const { initial_account_type, active_company } = useSelector<RootState>(({ auth }) => auth?.user) as User

  const menuItems: SideBarProps[] = getSideBarMenuItemsBasedOnRole(initial_account_type, active_company)
  const isLogoNeeded: boolean | string = isSideBarLogoNeeded(initial_account_type)

  const menuClickHandler = (menu: SideBarProps) => {
    let subscriptionAlertNeed = false
    if (typeof menu.Paid_NotFree_SubscriptionRequired === 'boolean') {
      if (menu.Paid_NotFree_SubscriptionRequired && !(active_company && active_company.is_subscribed))
        subscriptionAlertNeed = true
    } else if (menu.Paid_NotFree_SubscriptionRequired.indexOf(initial_account_type) > -1) {
      if (!(active_company && active_company.is_subscribed)) subscriptionAlertNeed = true
    }
    if (subscriptionAlertNeed) {
      setShowPopup(true)
      return
    }
    if (menu && menu.subMenu && menu.subMenu.length) {
      if (selectedMenu === null) {
        setMenuSelection(menu)
        setCollapsed(false)
      } else if (selectedMenu && menu.id === selectedMenu.id) {
        setCollapsed(!toggleSideBar)
      } else if (selectedMenu && menu.id !== selectedMenu.id) {
        setMenuSelection(menu)
        setCollapsed(false)
      }
    } else {
      setMenuSelection(menu)
      setCollapsed(true)
      if (menu.id === 'home') navigate('/dashboard/' + menu.id)
      else navigate('/dashboard/home/in-progress')
    }
  }

  const handelOnSubMenuSelected = () => {
    navigate(ENGINEERING_IN_PROCESS)
  }

  const handleSidebarClick = ({ key }: { id: number | string; key: number | string }) => {
    if (typeof key === 'string' && key.includes('-')) {
      handelOnSubMenuSelected()
    } else {
      menuClickHandler(menuConfig.sideBar[+key])
    }
  }

  return (
    <SideBar
      isOpen={open}
      isCollapsible={isCollapsible}
      isLogoNeeded={!!isLogoNeeded}
      sideBarBodyConfig={menuItems}
      defaultClosedLogo={menuConfig.sideBarLogo.logo}
      defaultHeaderIcon={menuIcon}
      defaultOpenLogo={bigLogo}
      onCollapse={onSideBarClose}
      onClick={event => {
        handleSidebarClick({
          id: event.id.valueOf(),
          key: event.key.valueOf()
        })
      }}
    >
      <IntegrationPopUp show={showPopup} handleClose={setShowPopup} />
    </SideBar>
  )
}

export default SideBarComponent
