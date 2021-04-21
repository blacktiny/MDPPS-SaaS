import styled from '@emotion/styled'
import React from 'react'
import userimg from '../../../../../assets/images/user_Logo.svg'
import { formatDateForMessages } from '../../../../../utils/Date/DateUtils'
import { hidePartOfTheText } from '../../../../../utils/text'
// import axios from '../../../../../../utils/http/client'
import Notification from '../type'
import './style.scss'
interface Props {
  showNotification: Notification[]
  reload: Function
}
// const menuOptions = [
//   {
//     key: 'read',
//     label: 'read'
//   },
//   {
//     key: 'remove',
//     label: 'remove'
//   }
// ]
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
`

const MenuContainer = styled.div`
  padding: 0.9375rem 1.5625rem;
  display: block;
`

const List = styled.div`
  display: inline-block;
  flex-direction: column;
  padding-left: 1rem;
  width: 100%;
`

const Gap = styled.div`
  flex: 1;
`

const DateTime = styled.div`
  color: #657786;
  letter-spacing: 0.4px;
  font-size: 0.75rem;
  min-width: 5.4375rem;
`

const UserName = styled.span`
  color: #3469c7 !important;
  padding-right: 0.313rem;
`
const Read = styled.span`
  font-weight: bold;
`

const UserImage = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 3.125rem;
`
const NoMessage = styled.div`
  padding: 1.25rem;
`
const MessagePreview = styled.p`
  text-size: 0.875rem;
  color: #7f7f7f;
  line-height: 1.25rem;
  text-align: left;
`

const NotificationList: React.FC<Props> = ({ showNotification, reload }) => {
  const getMenuItems = () => {
    return showNotification && showNotification.length > 0 ? (
      showNotification.map((menuData: Notification, index: number) => {
        return <MenuItem key={index} data={menuData} reload={reload} />
      })
    ) : (
      <NoMessage>{"As of now you don't have any new message."}</NoMessage>
    )
  }

  return (
    <>
      <Container className="message-header">
        <Heading>
          <span className="message-title">New Messages</span>
        </Heading>
        <Gap />
        <Task>
          <span className="task-title">View All</span>
        </Task>
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
  // const handleOnClick = (key: string, data: Notification) => {
  //   if (key === 'read') {
  //     axios({ method: 'post', url: `notifications/${data.id}/read/` })
  //       .then(() => {
  //         props.reload()
  //       })
  //       .catch(() => {})
  //       .finally(() => {})
  //   } else {
  //     axios({ method: 'delete', url: `notifications/${data.id}/` })
  //       .then(() => {
  //         props.reload()
  //       })
  //       .catch(() => {})
  //       .finally(() => {})
  //   }
  // }
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
    <MenuContainer className="message-list">
      <UserImage className="message-userpic" src={userImage} />
      <List>
        <div className="user-message">
          {userName && <UserName>{userName}</UserName>}
          {props.data.is_read ? (
            <>
              <span>{hidePartOfTheText(28)(props.data.title)}</span>
              <DateTime>{formatDateForMessages(date)}</DateTime>
            </>
          ) : (
            <>
              <Read>{hidePartOfTheText(28)(props.data.title)}</Read>
              <DateTime>{formatDateForMessages(date)}</DateTime>
            </>
          )}
        </div>
        <MessagePreview>
          {hidePartOfTheText(44)(props.data.description)}
        </MessagePreview>
      </List>
    </MenuContainer>
  )
}
