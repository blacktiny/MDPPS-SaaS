import React from 'react'
import { AxiosError } from 'axios'
import { ErrorMsg } from '../style'
import { isArray } from 'util'
import { User } from '../../shared/models/User'

export const extractErrorStatus = (data: AxiosError) => {
  const status = data?.response?.data?.status
  return status && <ErrorMsg>{status}</ErrorMsg>
}

export const extractErrorMessage = (data: AxiosError) => {
  const message = data?.response?.data?.message
  return message && <ErrorMsg data-testid="error-msg">{message}</ErrorMsg>
}

export const extractErrorPassResetMessage = (data: AxiosError) => {
  const message = data?.response?.data?.errors?.email[0]
  return message && <ErrorMsg data-testid="error-reset">{message}</ErrorMsg>
}

export const extractErrorResetEmail = (data: AxiosError) => {
  const message = data?.response?.data?.errors?.new_email[0]
  return message && <ErrorMsg data-testid="error-reset">{message}</ErrorMsg>
}

export const extractErrorMsgFromArray = (data: AxiosError, key?: string) => {
  const error = data?.response?.data?.errors

  let errorMessagesArray = []
  if (error) {
    if (error.user && key in error.user) {
      errorMessagesArray = error.user[key]
    } else if (key in error) {
      if (isArray(error[key])) {
        errorMessagesArray = error[key]
      } else {
        errorMessagesArray = [error[key]]
      }
    } else if (!key) {
      const errorKeys = Object.keys(error)
      if (errorKeys.length > 0) {
        errorMessagesArray = error[errorKeys[0]]
      }
    } else if (isArray(error) && key in error[0]) {
      errorMessagesArray = error[0][key]
    }
  }

  return (
    errorMessagesArray &&
    errorMessagesArray.length > 0 && (
      <div>
        {errorMessagesArray.map((message: string) => (
          <ErrorMsg key={message}>{message}</ErrorMsg>
        ))}
      </div>
    )
  )
}

export const extractErrorMsgFromMultiple = (data: AxiosError, key?: string) => {
  const error = data?.response?.data?.errors

  let errorMessagesArray = []
  if (error) {
    if (key in error) {
      if (isArray(error[key])) {
        errorMessagesArray = error[key]
      } else {
        errorMessagesArray = error[key] && error[key][0] ? error[key][0] : []
      }
    }
  }

  return (
    errorMessagesArray &&
    errorMessagesArray.length > 0 && (
      <div>
        {errorMessagesArray.map((message: string) => (
          <ErrorMsg key={message}>{message}</ErrorMsg>
        ))}
      </div>
    )
  )
}

export const extractErroraddressMessage = (data: AxiosError, key: string) => {
  const error = data?.response?.data?.errors?.main_address
  return error && error[key] && <ErrorMsg>{error[key]}</ErrorMsg>
}

export const setUserCrossDomain = (data: User) => {
  //This define the user like loggedin, for other domains.
  var date = new Date()
  date.setDate(date.getDate() + 7)
  var value = 'true'
  if (
    data.profile_photo?.file_cropped !== '' &&
    data.profile_photo?.file_cropped !== undefined &&
    data.profile_photo?.file_cropped !== null
  )
    value = data.profile_photo?.file_cropped
  document.cookie =
    'user-production=' + value + '; expires=Tue, ' + date.toUTCString() + '; path=/; secure; domain=.mdpps.com'
}

const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

export const niceBytes = (x: number | string) => {
  let l = 0,
    n = parseInt(x as string, 10) || 0

  while (n >= 1024 && ++l) {
    n = n / 1024
  }
  //include a decimal point and a tenths-place digit if presenting
  //less than ten of KB or greater units
  return n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]
}

export const formatDate = (ms: number | string) => {
  const dateObj = new Date(ms)

  let date: number | string = dateObj.getDate()
  date = date === 1 ? '1st' : date === 2 ? '2nd' : date === 3 ? '3rd' : date + 'th'
  let month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(dateObj).toLocaleLowerCase()
  month = month.charAt(0).toUpperCase() + month.slice(1)
  let year = dateObj.getFullYear()
  let [hour, minute] = dateObj.toLocaleTimeString().slice(0, 7).split(':')

  return `${date} ${month}, ${year} at ${hour}:${minute}`
}
