import React, { ReactNode, useCallback, useEffect, useState } from 'react'
import { Dropdown, Nav, Sidenav, Tooltip, Whisper } from 'rsuite'
import { navigate } from '@reach/router'
import { ENGINEERING_IN_PROCESS } from 'constants/pagesPath'
import './side-bar.scss'

const tooltip = (name: string) => {
  return <Tooltip>{name}</Tooltip>
}

const SideBarIcon = ({
  sideBarOpen,
  className,
  name
}: {
  sideBarOpen: boolean
  className: string
  name: string
  title: string
}) => {
  return (
    <Whisper placement="right" trigger="hover" speaker={tooltip(name)}>
      <div className={['menu-item-icon', sideBarOpen ? 'open' : 'closed'].join(' ')}>
        <span className={['side-bar-icon', className].join(' ')} />
        {sideBarOpen ? null : <span className="side-bar-icon-name">{name}</span>}
      </div>
    </Whisper>
  )
}

const SideBarItem = ({
  icon,
  className = '',
  sideBarOpen,
  children,
  badge,
  onClick = () => {}
}: {
  badge?: boolean
  className?: string
  sideBarOpen?: boolean
  icon?: ReactNode
  children?: ReactNode
  onClick?: () => void
}) => (
  <button className={`${className} menu-btn`} onClick={onClick}>
    {icon}
    <div className={['side-bar-item-content', sideBarOpen ? 'open' : 'closed'].join(' ')}>
      {sideBarOpen ? children : null}
    </div>
    {badge && <div className={['menu-item-badge', sideBarOpen ? 'open' : 'closed'].join(' ')} />}
  </button>
)

type MenuType = {
  id?: string
  hasBadge?: boolean
  name?: string
  title?: string
  className?: string
  subMenu?: MenuType[]
}

type SideBarProps = {
  sideBarHeader?: ReactNode
  defaultOpenLogo?: string
  defaultClosedLogo?: string
  defaultHeaderIcon?: string
  sideBarBodyConfig?: MenuType[]
  sideBarBody?: ReactNode
  isOpen?: boolean
  className?: string
  defaultMenuSelected?: number | string
  isCollapsible?: boolean
  children?: ReactNode
  isLogoNeeded?: boolean
  onCollapse?: (open?: boolean) => void
  onClick?: (event: { id: string | number; key?: string | number }) => void
}

function SideBar({
  sideBarHeader,
  defaultClosedLogo,
  defaultOpenLogo,
  defaultHeaderIcon,
  sideBarBodyConfig = [],
  sideBarBody,
  isOpen: open = false,
  isCollapsible = true,
  defaultMenuSelected,
  isLogoNeeded = true,
  children,
  onCollapse = () => {},
  className = ''
}: SideBarProps) {
  const [sideBarOpen, setSideBarOpen] = useState(false)
  const [activeMenuKey, setActiveMenuKey] = useState('')
  const [activeOpenKeys, setActiveOpenKeys] = useState([''])

  useEffect(() => {
    setSideBarOpen(open)
  }, [defaultMenuSelected, open])

  const handleSidebarNavItemSelected = useCallback(
    eventKey => {
      const indexOfMenuItem = sideBarBodyConfig.findIndex(menuItem => menuItem.id === eventKey)
      if (indexOfMenuItem >= 0) {
        // if dropdown menu is clicked
        if (sideBarBodyConfig[indexOfMenuItem].subMenu && sideBarBodyConfig[indexOfMenuItem].subMenu.length > 0) {
          onCollapse(true)
          setSideBarOpen(true)
          setActiveOpenKeys([eventKey])
          setActiveMenuKey('')
        } else {
          setActiveMenuKey(eventKey)
          if (!eventKey.includes(activeOpenKeys[0])) setActiveOpenKeys([])
          navigate(ENGINEERING_IN_PROCESS)
        }
      }
    },
    [activeOpenKeys, onCollapse, sideBarBodyConfig]
  )

  return (
    <div className={[className, 'side-bar', sideBarOpen ? 'open' : 'closed'].join(' ')}>
      <div className="side-bar-header">
        {!isLogoNeeded ? null : sideBarHeader ? (
          { sideBarHeader }
        ) : (
          <SideBarItem
            sideBarOpen={sideBarOpen}
            onClick={() => {
              onCollapse(sideBarOpen)
              setSideBarOpen(open => (isCollapsible ? !open : true))
            }}
            icon={
              sideBarOpen ? (
                <div className="menu-item-icon open">
                  <img className="menu-logo open" src={defaultHeaderIcon} alt="menu" />
                </div>
              ) : (
                <div className="menu-item-icon closed">
                  <img className="menu-logo closed" src={defaultHeaderIcon} alt="menu" />
                  <img className="brand-logo closed" src={defaultClosedLogo} alt="Sidebarlogo" />
                </div>
              )
            }
          >
            {sideBarOpen ? <img className="brand-logo open" src={defaultOpenLogo} alt="logo" /> : null}
          </SideBarItem>
        )}
      </div>
      <div className={`side-bar-body ${sideBarOpen ? 'open' : 'close'}`}>
        <Sidenav
          expanded={sideBarOpen}
          activeKey={activeMenuKey}
          onSelect={handleSidebarNavItemSelected}
          onOpenChange={openKeys => {
            setActiveMenuKey('')
            setActiveOpenKeys(openKeys.length > 0 ? openKeys.filter(openKey => openKey !== activeOpenKeys[0]) : [''])
          }}
          openKeys={activeOpenKeys}
        >
          <Sidenav.Body>
            <Nav>
              {sideBarBody
                ? sideBarBody
                : sideBarBodyConfig.map((menuItem, key) => {
                    if (!sideBarOpen || !menuItem.subMenu || menuItem.subMenu.length < 1)
                      return (
                        <Nav.Item
                          key={key}
                          className={
                            'menu-item' +
                            (menuItem.hasBadge ? ' badge' : '') +
                            (menuItem.id === activeMenuKey ? ' active' : '')
                          }
                          eventKey={menuItem.id}
                          icon={
                            <SideBarIcon
                              sideBarOpen={sideBarOpen}
                              className={menuItem.className}
                              name={menuItem.name}
                              title={menuItem.title}
                            />
                          }
                        >
                          {menuItem.name}
                        </Nav.Item>
                      )
                    return (
                      <Dropdown
                        key={key}
                        className={'menu-item'}
                        placement="rightStart"
                        eventKey={menuItem.id}
                        title={menuItem.name}
                        icon={
                          <SideBarIcon
                            sideBarOpen={sideBarOpen}
                            title={menuItem.title}
                            name={menuItem.name}
                            className={menuItem.className}
                          />
                        }
                      >
                        {sideBarOpen &&
                          menuItem.subMenu.map((subMenuItem, subKey) => {
                            const menuKey = `${menuItem.id}-${subMenuItem.id}`
                            return (
                              <Dropdown.Item
                                key={subKey}
                                eventKey={menuKey}
                                className={activeMenuKey === menuKey ? 'active' : ''}
                              >
                                {subMenuItem.name}
                              </Dropdown.Item>
                            )
                          })}
                      </Dropdown>
                    )
                  })}
            </Nav>
          </Sidenav.Body>
        </Sidenav>
      </div>
      {children}
    </div>
  )
}

export default SideBar
