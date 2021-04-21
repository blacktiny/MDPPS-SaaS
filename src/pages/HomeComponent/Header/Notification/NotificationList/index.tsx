import React from 'react'
import styled from '@emotion/styled'
import { formatDateForNotification } from '../../../../../utils/Date/DateUtils'
import axios from '../../../../../utils/http/client'
import NotificationMessageOption from '../NotificationMessageOption'
import Notification from '../type'
import userimg from '../../../../../assets/images/user.jpg'
import * as TextResource from '../../../../../constants/TextResource'
import './style.scss'
interface Props {
  showNotification: Notification[]
  reload: Function
}
const menuOptions = [
  {
    key: 'read',
    label: 'read'
  },
  {
    key: 'remove',
    label: 'remove'
  }
]
const Container = styled.div`
  display: flex;
  padding: 1.188rem;
`

const Heading = styled.div`
  color: #14171a;
  font-size: 0.875rem;
  font-weight: normal;
`

const Task = styled.div`
  color: #3469c7;
  font-size: 0.625rem;
  font-weight: normal;
  padding-right: 0.625rem;
`

const Setting = styled.div`
  color: #3469c7;
  font-size: 0.625rem;
  font-seight: normal;
`

const MenuContainer = styled.div`
  padding: 0.813rem;
  display: block;
`

const List = styled.div`
  display: inline-block;
  flex-direction: column;
  padding-left: 1rem;
  width: calc(100% - 5.938rem);
`

const Gap = styled.div`
  flex: 1;
`

const DateTime = styled.div`
  color: #657786;
  letter-spacing: 0.4px;
  font-size: 0.625rem;
`

const UserName = styled.span`
  color: #3469c7 !important;
  padding-right: 0.313rem;
`
const Read = styled.span`
  font-weight: bold;
`
const ThreeDot = styled.span`
  display: inline-block;
  vertical-align: top;
`

const UserImage = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 3.125rem;
`
const NoNotification = styled.div`
  padding: 1.25rem;
`

const NotificationList: React.FC<Props> = ({ showNotification, reload }) => {
  const getMenuItems = () => {
    return showNotification && showNotification.length > 0 ? (
      showNotification.map((menuData: Notification, index: number) => {
        return <MenuItem key={index} data={menuData} reload={reload} />
      })
    ) : (
      <NoNotification>
        {TextResource.NOTIFICATION_DEFAULT_TEXT_MESSAGE}
      </NoNotification>
    )
  }

  return (
    <>
      <Container className="notification-header">
        <Heading>
          <span className="notification-title">Notifications</span>
        </Heading>
        <Gap />
        <Task>
          <span className="task-title">See All Tasks</span>
        </Task>
        <Setting>
          <span className="settings-title">Settings</span>
        </Setting>
      </Container>
      {getMenuItems()}
    </>
  )
}

export default NotificationList

interface MenuItemProps {
  data: Notification
  reload: Function
}

const MenuItem: React.FC<MenuItemProps> = props => {
  const handleOnClick = (key: string, data: Notification) => {
    if (key === 'read') {
      axios({ method: 'post', url: `notifications/${data.id}/read/` })
        .then(() => {
          props.reload()
        })
        .catch(() => {})
        .finally(() => {})
    } else {
      axios({ method: 'delete', url: `notifications/${data.id}/` })
        .then(() => {
          props.reload()
        })
        .catch(() => {})
        .finally(() => {})
    }
  }
  let date = new Date(props.data.created)
  const { actor } = props.data
  let userName = ''
  if (actor) {
    if (actor.first_name) {
      userName += actor.first_name
      if (actor.last_name) {
        userName += ' ' + actor.last_name
      }
    }
  }
  const userImage = actor && actor.profile_photo ? actor.profile_photo : userimg

  return (
    <MenuContainer className="notification-list">
      <UserImage className="notification-userpic" src={userImage} />
      <List>
        <div className="usernotificatino">
          {userName && <UserName>{userName}</UserName>}
          {props.data.is_read ? (
            <span>{props.data.title}</span>
          ) : (
            <Read>{props.data.title}</Read>
          )}
        </div>
        <DateTime>{formatDateForNotification(date)}</DateTime>
      </List>
      <ThreeDot>
        <NotificationMessageOption
          onClickMenuItem={handleOnClick}
          options={menuOptions}
          data={props.data}
        />
      </ThreeDot>
    </MenuContainer>
  )
}
