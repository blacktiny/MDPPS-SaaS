import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'

interface Props {
  customClass?: string
}

const CardComponent = styled.div`
  &.cardtabs {
    width: calc(200px + 3.125vw);
    margin-right: calc(12px + 0.938vw);
  }
  @media only screen and (max-width: 1919px) and (min-width: 1440px) {
    &.cardtabs {
      width: calc(200px + 3.125vw);
    }
  }
  @media only screen and (max-width: 1439px) {
    &.cardtabs {
      width: calc(190px + 3.125vw);
    }
  }
  @media only screen and (max-width: 1024px) {
    &.cardtabs {
      width: calc(185px + 3.125vw);
    }
  }
  @media only screen and (max-width: 992px) {
    &.cardtabs {
      width: calc(175px + 3.125vw);
    }
  }
  @media only screen and (max-width: 767px) {
    &.cardtabs {
      width: 40px;
      max-width: 40px;
      min-width: 40px;
      margin-right: 10px;
    }
  }
`

const Card: FunctionComponent<Props> = props => {
  const { customClass } = props
  return <CardComponent className={customClass}>{props.children}</CardComponent>
}
export default Card
