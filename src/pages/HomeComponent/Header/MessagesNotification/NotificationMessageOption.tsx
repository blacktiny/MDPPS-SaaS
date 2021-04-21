import React from 'react'
import Message from './type'
import { Dropdown } from 'rsuite'
interface Option {
  key: string
  label: string
}

interface NotificationMenuProps {
  onClickMenuItem?: Function
  options?: Option[]
  data: Message
}

const NotificationMessageOption: React.FC<NotificationMenuProps> = props => {
  const { onClickMenuItem, options, data } = props

  const handleMenuClick = (key: string, data: Message) => {
    onClickMenuItem(key, data)
  }

  return (
    <div className="notification-icon">
      <Dropdown
        placement="bottomEnd"
        onSelect={key => handleMenuClick(key, data)}
        renderTitle={() => {
          return <span className="icon-notification-read" />
        }}
      >
        {options.map((option: Option) => (
          <Dropdown.Item key={option.key} eventKey={option.key}>
            {option.label}
          </Dropdown.Item>
        ))}
      </Dropdown>
    </div>
  )
}

export default NotificationMessageOption
