import React, {
  FunctionComponent,
  useState,
  MouseEvent,
  useCallback
} from 'react'
import { default as Menu } from '../../atoms/SideBarSubMenuLayout'
import { default as SubMenu } from '../../atoms/SubSubMenuList'
import { default as MenuTitle } from '../../atoms/SubMenuTitle'
import {
  LastSubMenu,
  SubMenu as MenuProps
} from '../../../constants/menuConfig'
import classNames from 'classnames'
import './style.scss'

interface SideBarSubMenu {
  menu: MenuProps
  onSubMenuSelected: (menuId: string) => void
}

const SideBarSubMenu: FunctionComponent<SideBarSubMenu> = props => {
  const { menu, onSubMenuSelected } = props
  const [expand, setExpand] = useState(false)

  const handleToggle = (menu: MenuProps) => {
    if (menu.subMenu) setExpand(!expand)
    else onSubMenuSelected(menu.id)
  }

  const onClickSubMenu = useCallback(
    (event: MouseEvent<HTMLElement>, subMenuId: string) => {
      event.stopPropagation()
      onSubMenuSelected(subMenuId)
    },
    [onSubMenuSelected]
  )

  const GetSubMenuItems = useCallback(
    (menu: MenuProps) => {
      if (!menu) return
      return (
        <Menu customClass={'sidebar-sub-submenu'}>
          {menu.subMenu &&
            menu.subMenu.map((subMenu: LastSubMenu, index: number) => {
              return (
                <SubMenu key={index}>
                  <div
                    onClick={event => onClickSubMenu(event, subMenu.id)}
                    onKeyDown={() => false}
                    tabIndex={0}
                    role="button"
                  >
                    <MenuTitle>{subMenu.name}</MenuTitle>
                  </div>
                </SubMenu>
              )
            })}
        </Menu>
      )
    },
    [onClickSubMenu]
  )

  let subMenuClass = classNames({
    submenulist: true,
    'has-subemnu': menu.subMenu,
    expanded: expand
  })

  let activeMenuClass = classNames({
    menuname: true,
    activeMenu: expand
  })
  return (
    <li className={subMenuClass}>
      <div
        role="button"
        tabIndex={0}
        data-testid={menu.name}
        onKeyPress={() => false}
        onClick={() => handleToggle(menu)}
      >
        <span
          className={activeMenuClass}
          role="button"
          tabIndex={0}
          onClick={() => handleToggle(menu)}
          onKeyDown={() => false}
        >
          {menu.name}
        </span>
        {menu.subMenu ? (
          <>
            <span className="dd-icon icon-caret" />
            {GetSubMenuItems(menu)}
          </>
        ) : null}
      </div>
    </li>
  )
}

export default SideBarSubMenu
