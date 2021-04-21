import React, { FunctionComponent } from 'react'
import SideBarLayout from '../../molecules/SidebarLayout'
import SidebarSubMenu from '../../molecules/SidebarSubMenu'
import classNames from 'classnames'
import { SideBar as MenuProps, SubMenu } from '../../../constants/menuConfig'
import './style.scss'
import styled from '@emotion/styled'

interface SideBar {
  menus: MenuProps[]
  isLogoNeeded?: boolean | string
  logo: string
  selectedMenu: MenuProps
  onMenuSelected: (menu: MenuProps) => void
  showSideBar: boolean
  onSideBarClose: (showSideBar: boolean) => void
  handelOnSubMenuSelected: (menuId: string) => void
  onSideBarCloseOnToggleX: () => void
}

const List = styled.li`
  display: flex;
  flex-flow: column;
  align-items: center;
  padding: 0.625rem 0.313rem;
  position: relative;
  cursor: pointer;
  @media only screen and (max-height: 642px), screen and (max-width: 768px) {
    padding: 0.45rem 0.188rem;
  }
  @media only screen and (max-height: 590px), screen and (max-width: 768px) {
    flex-flow: row;
    padding: 0.625rem 0.813rem;
  }
`

const SideBar: FunctionComponent<SideBar> = props => {
  const {
    menus,
    isLogoNeeded = true,
    showSideBar,
    onSideBarClose,
    logo,
    selectedMenu,
    onMenuSelected,
    handelOnSubMenuSelected,
    onSideBarCloseOnToggleX
  } = props

  const handelSideBarToggle = () => {
    onSideBarClose(!showSideBar)
  }

  let sideBarClassName = classNames({
    sidebarcontent: true,
    collapsed: showSideBar
  })

  const getSubMenu = () => (
    <>
      {selectedMenu &&
        selectedMenu.subMenu &&
        selectedMenu.subMenu.map((subMenu: SubMenu, index: number) => {
          return (
            <SidebarSubMenu
              onSubMenuSelected={handelOnSubMenuSelected}
              key={index}
              menu={subMenu}
            />
          )
        })}
    </>
  )

  return (
    <div className={sideBarClassName}>
      <SideBarLayout
        onSideBarClose={onSideBarCloseOnToggleX}
        subMenus={getSubMenu()}
        selectedMenu={selectedMenu}
        toggleSideBarMenu={handelSideBarToggle}
        logo={logo}
        logoRequired={isLogoNeeded}
        testDataId={'sidebar-menu'}
        CollapsibleSidebarClass={'collapsesidebar'}
        subSideBarMenuClass={'sidebar-submenu'}
      >
        {menus.map((menu: MenuProps, index: number) => {
          return (
            <List
              key={index}
              role="row"
              data-testid={'button_' + menu.id}
              className={
                selectedMenu && menu.id === selectedMenu.id
                  ? 'menulist active'
                  : 'menulist'
              }
              onClick={() => onMenuSelected(menu)}
              onKeyDown={() => false}
            >
              <span className={menu.className} />
              <span className="menuname">{menu.name}</span>
              <span className="menutooltip">{menu.title}</span>
            </List>
          )
        })}
      </SideBarLayout>
      {props.children}
    </div>
  )
}

export default SideBar
