import React, { ReactNode } from 'react'
import { SubMenu } from '../../../constants/menuConfig'
import { Popover, Whisper, Button, Dropdown } from 'rsuite'
import styled from '@emotion/styled'
import classNames from 'classnames'
import './style.scss'
interface MenuProps {
  onClickMenuItem?: (value: SubMenu, isDisabled: boolean) => void
  options: SubMenu[]
  menuChild?: ReactNode
  menuHeader?: ReactNode
  onClose?: Function
  menuId?: string
  menuState?: string
  isDisabled?: boolean
}
interface MenuItemProps {
  onSelect: Function
  options: SubMenu[]
  className?: string
}

const DropdownIcon = styled.i`
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 1.25rem;
  color: #98a0ac;
`
const DropdownName = styled.p`
  font-size: 1rem;
  color: #565456;
  letter-spacing: 0.28px;
`

const MenuPopover: React.FC<MenuItemProps> = props => {
  const { onSelect, options } = props
  return (
    <Popover {...props} full>
      <Dropdown.Menu onSelect={onSelect}>
        {options.map((option: SubMenu, index: number) => (
          <Dropdown.Item key={index} eventKey={index + 1}>
            <DropdownIcon className={option.iconClass} />
            <DropdownName>{option.name}</DropdownName>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Popover>
  )
}

const WithDropdown: React.FC<MenuProps> = props => {
  const [isActive, setActive] = React.useState(false)

  const { options } = props
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const triggerRef: React.Ref<any> = React.createRef()
  const handleSelectMenu = () => {
    triggerRef.current.hide()
    // onClickMenuItem()
  }
  let menuIconButtonClass = classNames({
    'menu-disabled': options && options.length === 0
  })
  let menuIconClass = classNames({
    'active-menu-icon': isActive,
    'icon-menu': true,
    'headermenu-icon': true
  })
  const onOpenHandler = () => {
    setActive(true)
  }
  const onCloseHandler = () => {
    setActive(false)
  }

  return (
    <Whisper
      placement="bottomEnd"
      trigger="click"
      triggerRef={triggerRef}
      onOpen={onOpenHandler}
      onClose={onCloseHandler}
      speaker={
        <MenuPopover
          className="businessMenu"
          onSelect={handleSelectMenu}
          options={options}
        />
      }
    >
      <Button data-testid="businessMenu" className={menuIconButtonClass}>
        <span className={menuIconClass} />
      </Button>
    </Whisper>
  )
}

export default WithDropdown
