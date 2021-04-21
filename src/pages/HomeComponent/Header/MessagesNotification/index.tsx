import React from 'react'
import { RouteComponentProps } from '@reach/router'
import { useStore } from 'react-redux'
import { Popover, Whisper, Badge } from 'rsuite'
import MessageList from './MessageList'
import Message from './type'
import './style.scss'
import { SubMenu } from '../../../../constants/menuConfig'
import useCustomFetch from '../../../../hooks/useCustomFetch'
import { AuthState } from '../../../../store/auth'
import { getUserItemsBasedOnRole } from '../../../../utils/Menu/MenuUtils'
const headers = { 'Content-Type': 'application/x-www-form-urlencoded' }

interface MenuItemProps {
  options: SubMenu[]
  showNotification: Message[]
  reload: Function
  className?: string
}

const MenuPopover: React.FC<MenuItemProps> = props => {
  const { showNotification, reload, ...rest } = props
  return (
    <Popover data-testid="notificationMenuPopover" {...rest}>
      <MessageList showNotification={showNotification} reload={reload} />
    </Popover>
  )
}
const MessageNotificationMenu: React.FC<RouteComponentProps> = () => {
  const [messages, reload] = useCustomFetch('GET', 'notifications/', headers)

  let showMessage: Message[] = []
  if (messages) {
    // const { data } = messages
    showMessage = []
  }

  const store = useStore()
  const auth: AuthState = store.getState()?.auth
  const accountType = auth?.user?.account_type
  const userDetails: SubMenu[] = getUserItemsBasedOnRole(accountType)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const triggerRef: React.Ref<any> = React.createRef()

  return (
    <>
      <Whisper
        placement="bottomEnd"
        trigger="click"
        triggerRef={triggerRef}
        speaker={
          <MenuPopover
            options={userDetails}
            showNotification={showMessage}
            reload={reload}
            className="message-popover"
          />
        }
      >
        <span data-testid="notificationMenu">
          {showMessage.length === 0 ? (
            <Badge className="message-info">
              <span className="icon-message headermenu-icon" />
            </Badge>
          ) : (
            <span className="icon-message headermenu-icon" />
          )}
        </span>
      </Whisper>
    </>
  )
}
export default MessageNotificationMenu
