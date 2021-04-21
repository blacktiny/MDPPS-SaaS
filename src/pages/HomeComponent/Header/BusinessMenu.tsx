import React from 'react'
import { RouteComponentProps } from '@reach/router'
import PopoverMenu from '../../../components/organisms/PopoverMenu'
import { getAppMenuBasedOnRole } from '../../../utils/Menu/MenuUtils'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/types'
import { User } from '../../../shared/models/User'

const BusinessMenu: React.FC<RouteComponentProps> = () => {
  const { account_type } = useSelector<RootState>(
    ({ auth }) => auth?.user
  ) as User
  const data = getAppMenuBasedOnRole(account_type)
  return <PopoverMenu options={data} />
}
export default BusinessMenu
