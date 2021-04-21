/* eslint-disable no-unused-vars */
import React from 'react'
import { Notification } from 'rsuite'

interface Props {
  type: 'info' | 'success' | 'warning' | 'error'
  title: React.ReactNode
  description: React.ReactNode
}

export const closeAlert = () => {
  Notification.closeAll()
}
export const openAlert = (props: Props) => {
  const { type, title, description } = props
  const info = {}
  Notification[type]({
    title: title,
    description: description,
    style: info,
    duration: 0
  })
}
