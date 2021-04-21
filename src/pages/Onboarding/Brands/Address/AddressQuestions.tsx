import { RouteComponentProps, navigate } from '@reach/router'
import React, { useEffect, useMemo, useState } from 'react'
import { Loader } from '../../../../components/atoms/Loader'
import { useDispatch, useStore } from 'react-redux'
import axios from '../../../../utils/http/client'
import { clearConsole } from '../../../../utils/console/clearConsole'
import { AccountTypeKey } from '../../../../constants/common'
import AddressQuestionForm from './AddressQuestionForm'
import { createFormData } from 'utils/helpers'
import { setUserData } from 'store/auth'

interface Props extends RouteComponentProps {}

interface FormDataType {
  address1: string
  address2: string
  city: string
  state: string
  zip_code: string
  country: string
  PhoneNumber: string
}

const AddressQuestions: React.FC<Props> = () => {
  const store = useStore()
  const dispatch = useDispatch()

  const auth = store.getState()?.auth

  const initialData = {
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip_code: '',
    country: '',
    PhoneNumber: ''
  }

  const [phoneValue, setphoneValue] = useState(initialData.PhoneNumber)
  const [phoneError, setPhoneError] = useState(false)
  const [data, setData] = useState(initialData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [showErrors, setShowErrors] = useState({
    address: false,
    city: false,
    postalCode: false,
    address2: false,
    state: false,
    PhoneNumber: false
  })

  const nextStep = useMemo(() => {
    if (auth?.user.initial_account_type === 'customer') return 'finish'
    return 'team-members'
  }, [auth])

  useEffect(() => {
    const accountType = auth?.user?.initial_account_type

    if (accountType === 'customer') {
      setData({
        address1: auth?.user?.address1 || '',
        address2: auth?.user?.address2 || '',
        city: auth?.user?.city || '',
        state: auth?.user?.state || '',
        zip_code: auth?.user?.zip_code || '',
        country: auth?.user?.country || '',
        PhoneNumber: ''
      })
      setphoneValue('')
    } else if (auth?.user?.active_company && auth?.user?.active_company.id) {
      axios({
        url: `companies/${auth?.user?.active_company.id}/`,
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
        .then(response => {
          const { data, status } = response
          if (status === 200 && data && data.id) {
            const { main_address = null } = data
            if (main_address) {
              setData({
                address1: main_address.address1 || '',
                address2: main_address.address2 || '',
                city: main_address.city || '',
                state: main_address.state || '',
                zip_code: main_address.zip_code || '',
                country: main_address.country || '',
                PhoneNumber: main_address.phone_number || ''
              })
              setphoneValue(main_address.phone_number || '')
            }
          }
        })
        .catch(error => {
          const {
            data: { message },
            status
          } = error.response

          if (status === 400) {
            console.log(
              `[API POST /companies/${auth?.user?.active_company && auth?.user?.active_company.id}] error = `,
              message
            )
            setError(error)
          }
        })
    }
  }, [auth])

  const onSubmit = ({ address1, address2, city, state, country, zip_code }: FormDataType) => {
    const dataJson = {
      address1,
      address2,
      city,
      state,
      country,
      zip_code
    }

    if (auth?.user.initial_account_type !== 'customer') {
      dataJson['phone_number'] = `+${phoneValue}`
    }

    if (auth?.user.initial_account_type === 'customer') {
      setLoading(true)
      axios({
        url: `users/me`,
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        data: dataJson
      })
        .then(response => {
          const { data, status } = response
          if ((status === 200 || status === 201) && data) {
            dispatch(setUserData(data))
            navigate(nextStep)
          }
        })
        .catch(err => {
          clearConsole()
          setShowErrors({
            address: true,
            city: true,
            postalCode: true,
            address2: true,
            state: true,
            PhoneNumber: true
          })
          setError(err)
        })
        .finally(() => {
          setLoading(false)
        })
    } else if (auth?.user?.active_company && auth?.user?.active_company.id) {
      const form = new FormData()
      createFormData(form, 'main_address', JSON.stringify(dataJson))
      createFormData(form, 'business_name', auth?.user?.active_company?.business_name)
      setLoading(true)

      axios({
        url: `companies/${auth?.user?.active_company.id}/`,
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        data: form
      })
        .then(response => {
          const { data, status } = response
          if ((status === 200 || status === 201) && data && data.id) {
            navigate(nextStep)
          }
        })
        .catch(err => {
          clearConsole()
          setShowErrors({
            address: true,
            city: true,
            postalCode: true,
            address2: true,
            state: true,
            PhoneNumber: true
          })
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
      <AddressQuestionForm
        data={data}
        onSubmit={onSubmit}
        error={error}
        backPath={auth?.user.initial_account_type === 'customer' ? 'personal' : 'company'}
        pageType={AccountTypeKey.BRAND}
        isCustomer={auth?.user.initial_account_type === 'customer'}
        setShowErrors={setShowErrors}
        showErrors={showErrors}
        setPhoneNumber={setphoneValue}
        setPhoneError={setPhoneError}
        phoneError={phoneError}
        phoneValue={phoneValue}
      />
    </>
  )
}

export default AddressQuestions
