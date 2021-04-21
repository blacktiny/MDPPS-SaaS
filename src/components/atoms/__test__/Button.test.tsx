import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Button from '../Button'

const MyText = 'my test content'
test('should render children correctly', () => {
  const { queryByText } = render(<Button>{MyText}</Button>)

  expect(queryByText(MyText)).toBeInTheDocument()
})

test('should look as expected in the NORMAL state', () => {
  const { baseElement } = render(<Button>{MyText}</Button>)
  expect(baseElement).toMatchSnapshot()
})

test('should look as expected in the DISABLED state', () => {
  const { baseElement } = render(<Button disabled>{MyText}</Button>)

  expect(baseElement).toMatchSnapshot()
})

test('should look as expected in the NORMAL state with Secondary Attribute', () => {
  const { baseElement } = render(<Button secondary>{MyText}</Button>)

  expect(baseElement).toMatchSnapshot()
})

test('should look as expected in the DISABLED state with Secondary Attribute', () => {
  const { baseElement } = render(
    <Button secondary disabled={true}>
      {MyText}
    </Button>
  )

  expect(baseElement).toMatchSnapshot()
})

const clickCallback = jest.fn()
test('should trigger the click callback when clicked', () => {
  const { getByText } = render(
    <Button onClick={clickCallback}>{MyText}</Button>
  )
  fireEvent.click(getByText(MyText))
  expect(clickCallback).toHaveBeenCalledTimes(1)
})
