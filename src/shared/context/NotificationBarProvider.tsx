import React, { FunctionComponent, useState, createContext, useEffect } from 'react'
import NotificationBarLayout, {
  Props as NotificationBarLayoutProps
} from '../../components/atoms/NotificationBarLayout'

interface Props {}

export const NotificationBarContext = createContext(null)

const NotificationBarProvider: FunctionComponent<Props> = props => {
  const [notify, setNotify] = useState<boolean>(false)
  const [notificationBarLayoutState, setNotificationBarLayoutState] = useState<NotificationBarLayoutProps>({
    notificationText: ''
  })

  useEffect(() => {
    if (notify) {
      const closeNotify = setInterval(() => {
        setNotify(false)
      }, 4000)
      return () => clearInterval(closeNotify)
    }
  }, [notify])

  const showNotification = ({ notificationText, notificationType }: NotificationBarLayoutProps) => {
    setNotify(true)
    setNotificationBarLayoutState({ notificationText, notificationType })
  }

  return (
    <NotificationBarContext.Provider value={{ showNotification }}>
      <NotificationBarLayout show={notify} {...notificationBarLayoutState} />
      {props.children}
    </NotificationBarContext.Provider>
  )
}
export default NotificationBarProvider
