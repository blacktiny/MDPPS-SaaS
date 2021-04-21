import React from 'react'
import { RouteComponentProps } from '@reach/router'
import { useStore } from 'react-redux'
import { AuthState } from '../../../../store/auth'
import { getUserItemsBasedOnRole } from '../../../../utils/Menu/MenuUtils'
import { SubMenu } from '../../../../constants/menuConfig'
import { Popover, Whisper, Badge } from 'rsuite'
import NotificationList from './NotificationList'
import Notification from './type'
import useCustomFetch from '../../../../hooks/useCustomFetch'
import './style.scss'
const headers = { 'Content-Type': 'application/x-www-form-urlencoded' }

interface MenuItemProps {
  options: SubMenu[]
  showNotification: Notification[]
  reload: Function
  className?: string
}

const MenuPopover: React.FC<MenuItemProps> = props => {
  const { showNotification, reload, ...rest } = props
  return (
    <Popover data-testid="notificationMenuPopover" {...rest}>
      <NotificationList showNotification={showNotification} reload={reload} />
    </Popover>
  )
}
const NotificationComponent: React.FC<RouteComponentProps> = () => {
  const [notifications, reload] = useCustomFetch(
    'GET',
    'notifications/',
    headers
  )

  let showNotification: Notification[] = []
  if (notifications) {
    const { data } = notifications
    showNotification = data
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
            showNotification={showNotification}
            reload={reload}
            className="notificationpopover"
          />
        }
      >
        <span data-testid="notificationMenu">
          {showNotification.length ? (
            <Badge className="notificationinfo" content={''}>
              <span className="icon-nav-notifications headermenu-icon" />
            </Badge>
          ) : (
            <span className="icon-nav-notifications headermenu-icon" />
          )}
        </span>
      </Whisper>
    </>
  )
}
export default NotificationComponent
