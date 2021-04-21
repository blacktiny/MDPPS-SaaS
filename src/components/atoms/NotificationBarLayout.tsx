import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'

export interface Props {
  notificationType?: 'success' | 'error' | 'warning'
  notificationText: string
  show?: boolean
}

const getNotificationColor = (type: string) => {
  if (type === 'success') return '#70B603'
  if (type === 'error') return '#ff3b00'
  if (type === 'warning') return 'yellow'
  return 'white'
}

const NotificationBarLayoutContainer = styled.div<{ show: boolean }>`
  height: 40px;
  top: ${({ show }) => (show ? '3.75rem' : '0')};
  transition: ${({ show }) => (show ? '0.3s' : '0.7s')};
  overflow: hidden;
  position: relative;
  background-color: #eff3f5;
  left: 0;
  position: absolute;
  width: 100%;
  z-index: 49;
`
const BarLayout = styled.div<{ notificationType: string }>`
  background-color: ${({ notificationType }) => getNotificationColor(notificationType)};
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  width:100%
  transition: 0.3s;
`
const NotificationText = styled.span`
  color: white;
  text-align: center;
  font-size: 14px;
`

const NotificationBarLayout: FunctionComponent<Props> = props => {
  const { notificationType, notificationText, show } = props
  return (
    <NotificationBarLayoutContainer show={show}>
      <BarLayout notificationType={notificationType}>
        <NotificationText>{notificationText}</NotificationText>
      </BarLayout>
    </NotificationBarLayoutContainer>
  )
}
export default NotificationBarLayout
