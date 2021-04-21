import React, { useState } from 'react'
import { RouteComponentProps, navigate } from '@reach/router'
import { useSelector } from 'react-redux'
import { Loader } from '../../../../../components/atoms/Loader'
import { InviteEmployeesFormComponent } from '../../../../../components/organisms/InviteEmployeesFormComponent'
import { User } from '../../../../../shared/models/User'
import { RootState } from '../../../../../store/types'
import axios from '../../../../../utils/http/client'
import { InviteEmployeeFormData } from '../../../../../utils/data/inviteFormsUtils'
import { clearConsole } from '../../../../../utils/console/clearConsole'

export const InviteEmployees: React.FC<RouteComponentProps> = () => {
  const { active_company, type_company } = useSelector<RootState>(({ auth }) => auth?.user) as User

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [showErrors, setShowErrors] = useState({
    email: true
  })
  const [requiredOneEmailError, setRequiredOneEmailError] = useState(false)

  const nextPath = 'finish'
  const skipPath = 'finish'
  const backPath = 'address'
  const isHolding = type_company === 'holding_company'

  const onSubmit = (data: InviteEmployeeFormData) => {
    setShowErrors({
      email: true
    })

    if (active_company && data && data.Employees) {
      const mappedData = data.Employees.map(employee => {
        return {
          type: 'access_granted',
          destination_email: employee.Email,
          extra_data: {
            first_name: employee.FirstName,
            last_name: employee.LastName
          }
        }
      })

      setLoading(true)
      axios({
        url: `companies/${active_company.id}/invitations/`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify(mappedData)
      })
        .then(response => {
          const { data, status } = response
          if ((status === 200 || status === 201) && data && data.length > 0) {
            setLoading(false)
            navigate(nextPath)
          }
        })
        .catch(err => {
          clearConsole()
          setError(err)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }

  return (
    <>
      {loading && <Loader />}
      <InviteEmployeesFormComponent
        lastStep={true}
        skipPath={skipPath}
        backPath={backPath}
        onSubmit={onSubmit}
        error={error}
        addText={isHolding ? 'Add More' : 'Add Additional Team Members'}
        skipText={'You can also do this later as a bulk upload'}
        setShowErrors={setShowErrors}
        showErrors={showErrors}
        requiredOneEmailError={requiredOneEmailError}
        setRequiredOneEmailError={setRequiredOneEmailError}
      />
    </>
  )
}
