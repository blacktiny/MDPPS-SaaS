import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'

const BoldTopicComponent = styled.p`
  font-size: 0.875rem;
  color: #14171a;
  font-family: roboto-medium;
  letter-spacing: 0.39px;
  line-height: 1.375rem;
  &.optionmenu {
    font-family: roboto;
    color: #555;
  }
`

interface Props {
  customClass?: string
}

const BoldTopic: FunctionComponent<Props> = props => {
  const { customClass } = props
  return (
    <BoldTopicComponent className={customClass}>
      {props.children}
    </BoldTopicComponent>
  )
}
export default BoldTopic
