import React, { FunctionComponent } from 'react'
import { navigate } from '@reach/router'
import UserPersonalProfileForm from './UserPersonalProfileForm'
import { User } from '../../shared/models/User'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/types'
import Card from '../../components/atoms/Card'
import { useStore } from 'react-redux'
import { AuthState } from '../../store/auth'
import { AccountTypeKey } from '../../constants/common'

interface Props {
  toggleLoader: (value: boolean) => void
  showEdit?: boolean
}

const UserPersonalProfile: FunctionComponent<Props> = props => {
  const store = useStore()
  const auth: AuthState = store.getState()?.auth
  const accountType = auth?.user?.account_type
  const isaCustomer = accountType === AccountTypeKey.CUSTOMER || accountType === AccountTypeKey.EMPLOYEE

  const { toggleLoader } = props

  const userData = useSelector<RootState>(({ auth }) => auth?.user) as User

  const handelRedirectToUserPersonalProfileDetails = () => {
    navigate('/dashboard/home/user-profile')
  }

  return (
    <React.Fragment>
      <Card>
        <UserPersonalProfileForm
          isCustomer={isaCustomer}
          toggleLoader={toggleLoader}
          userData={userData}
          redirectToUserPersonalProfileDetails={handelRedirectToUserPersonalProfileDetails}
        />
      </Card>
    </React.Fragment>
  )
}

export default UserPersonalProfile
