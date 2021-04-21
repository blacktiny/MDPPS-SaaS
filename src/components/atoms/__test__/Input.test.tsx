import React from 'react'
import { render } from '@testing-library/react'
import Input from '../Input'

test('should render children correctly', () => {
  const { getByLabelText } = render(
    <Input label="User Name" name="username" placeholder="Enter username" />
  )

  expect(getByLabelText('User Name')).toBeInTheDocument()
})

test('should look as expected in the NORMAL state', () => {
  const { baseElement } = render(
    <Input label="User Name" name="username" placeholder="Enter username" />
  )
  expect(baseElement).toMatchSnapshot()
})

test('should look as expected in the Invalid state', () => {
  const { baseElement } = render(
    <Input
      label="User Name"
      name="username"
      placeholder="Enter username"
      invalid
    />
  )
  expect(baseElement).toMatchSnapshot()
})

test('should look as expected in the DISABLED state', () => {
  const { baseElement } = render(
    <Input
      label="User Name"
      name="username"
      placeholder="Enter username"
      disabled
    />
  )

  expect(baseElement).toMatchSnapshot()
})
